import { useState, useEffect } from "react"
import App from "../../App"
import Cart from "../Cart/Cart"
import supabase from "../../supabaseClient"
import './Mypage.css'
import { useNavigate } from "react-router-dom"
import CartItemList from "../../components/Recycling/CartItemList"

function Mypage(){

    let [userSession,setuserSession] = useState('')
    let [username,setusername] = useState("")
    let [useremail,setuseremail] = useState("")
    let [userId,setuserId] = useState(null)
    let [userProfile,setuserProfile] = useState(null)
    let [coupon,setcoupon] = useState([])
    let [point,setpoint] = useState(0)
    let [cart,setcart] = useState([])
    let [wish,setwish] = useState(0)
    let [Amount,setAmount] = useState('Loding')
    let [Orderlist,setOrderlist] = useState([])
    let [reviw,setreviw] = useState([])
    let navigate = useNavigate()


        const fetchUser = async ()=>{
            const {data, error} = await supabase.auth.getSession()
            if(error){console.log(error.message)}
            else{
                // userInfo
                setuserSession(data.session?.access_token || "")
                setusername(data.session?.user?.user_metadata?.username || "");
                setuseremail(data.session?.user?.email || "")
                setuserId(data?.session?.user?.id || null)
              }
        }     


        const fetchCoupons = async ()=>{
                const {data:CouponData, error:CouponError} = await supabase.from("user_coupons")
                .select("*")
                .eq("user_id",userId)
                if(CouponError){console.log(CouponError)}
                else{setcoupon(CouponData)}}



        const UserPoint = async ()=>{
          const {data:userPoint, error:pointError} = await supabase.from("users")
          .select("point")
          .eq("id",userId)
          .maybeSingle()
          if(pointError){console.log(pointError.message)}
          else(setpoint(userPoint?.point || 0))
        }
        
        
        const UserCart = async ()=>{
          const {data:cartData, error:cartError} = await supabase
          .from("Cart")
          .select("*")
          .eq("user_id",userId)
          .order("created_at",{ascending : false})
          .limit(3)

          if(cartError){console.log(cartError.message); return;}
          else{setcart(cartData)}
        }

        const UserOrder = async ()=>{
          const {data:OrderData, error:OrderError} = await supabase
          .from('Orders')
          .select("*")
          .eq('user_id',userId)
          .order('id', {ascending: false})
          .limit(3)

          if(OrderError){console.log(OrderError.message); return;}
          else{setOrderlist(OrderData)}
        }

        const Wishlist = async ()=>{
          const {data:Wishitem, error:WishError} = await supabase.from("Wishlist")
          .select("product_id")
          .eq("user_id",userId)

          if(WishError){console.log(WishError.message)}
          else{setwish(Wishitem)}
        }

        const TotalAmount = async ()=>{
          const {data:DataAmount, error:ErrorAmount} = await supabase
          .from('OrderHeaders')
          .select('amount')
          .eq('user_id',userId)
          
          if(ErrorAmount){console.log(ErrorAmount.message); return;}
          else{
            const total = DataAmount.reduce((sum,item)=> {return sum + item.amount},0)
            setAmount(total.toLocaleString())
          }
        }

        const UserProfile = async ()=> {
          if(!userSession){alert("로그인이 필요합니다."); return;}
          const {data:ProfileData, error:ProfileError} = await supabase
          .from("users")
          .select("profile")
          .eq("id",userId)
          .maybeSingle()

          if(ProfileError){console.log(ProfileError.message); return;}
          else{setuserProfile(ProfileData?.profile || null)}
        }

        const handleProfile = async (file)=>{
          if(!file) return;
          const FileName = `${userId}.jpg` // 파일 확장자 통일 + 어느 유저가 변경을 했는지 식별하기 위해

          const {error:UploadError} = await supabase.storage
          .from("avatars")
          .upload(FileName, file, {upsert: true}) // 파일명을 기준으로 중복이 있을 시 덮어쓰기 허용
          if(UploadError){console.log(UploadError.message); alert("이미지 업로드를 실패했습니다 다시 시도해주세요."); return;}

          const {data:ProfileUrl} = supabase.storage
          .from("avatars")
          .getPublicUrl(FileName)

          const ProfileUpdate = `${ProfileUrl.publicUrl}?t=${Date.now()}` // 이미지 변경 시 캐시 사용을 방지하기 위해

          await supabase
          .from("users")
          .update({profile:ProfileUpdate})
          .eq("id",userId)
          setuserProfile(ProfileUpdate)
        }



                useEffect(()=>{
                  fetchUser()
                },[])

                useEffect(()=>{
                  if(userId && userSession){
                    fetchCoupons()
                    UserPoint()
                    UserCart()
                    UserOrder()
                    Wishlist()
                    TotalAmount()
                    UserProfile()
                  }
                },[userId, userSession])


    return(
        <div>
        
        <div className="Mypage-container">

            <div className="p-tag">
            <p>마이페이지</p>
            <hr className="hr-green"/>
            </div>

            <div className="profile-container">

              <div className="profile-left">
                <div className="profile-img-box">
                    <img src={userProfile} alt="user_img" />
                    <i className="fa-solid fa-pen-to-square profile-change-icon"><input className="change-input" type="file" accept="image/*" onChange={(e)=> handleProfile(e.target.files[0])}/></i>
                    <p>WHITE 회원 🤍</p>
                </div>
              </div>

              <div className="profile-right">
                <div className="profile-info-box">
                    <p className="info-username">{username}</p>
                    <p className="info-userEmail">({useremail})</p>
                    <p className="info-userTotal">고객님의 총 구매금액은 <span>{Amount}</span>원 입니다.</p>

                    <div className="profile-btn">
                    <button>회원정보 수정</button>
                    <button>등급혜택</button>
                    </div>
                </div>
              </div>

              <div className="profile-AssetsSection-container">
                <div className="item-box">
                <p>쿠폰</p>
                <p className="item-box-count">{coupon.length}개</p>
                </div>
              </div>

              <div className="profile-AssetsSection-container">
                <div className="item-box">
                <p>포인트</p>
                <p className="item-box-count">{point.toLocaleString()}</p>
                </div>
              </div>

              <div className="profile-AssetsSection-container">
                <div className="item-box">
                <p onClick={()=> {if(userId){navigate("/wishlist")}else{alert("로그인이 필요한 서비스입니다."); navigate("/login")}}}>찜목록</p>
                <p onClick={()=> {if(userId){navigate("/wishlist")}else{alert("로그인이 필요한 서비스입니다."); navigate("/login")}}} className="item-box-count">{wish.length}</p>
                </div>
              </div>

            </div>
        </div>

        <div className="UserSections-container">

            <div className="title-box">

            <p className="title-p-tag">최근 주문한 상품</p>
            <button onClick={()=> navigate('/orderlist')}>더보기 +</button>
            </div>
            <div className={`sections-list-box ${Orderlist.length === 0 ? "empty" : ""}`}>
              { Orderlist.length === 0 ? (<p>최근 주문한 상품이 없습니다.</p>) : (Orderlist.map((item,i)=>
                <CartItemList key={i} item={item}/>
              ))}
            </div>

            <div className="title-box">
            <p className="title-p-tag">장바구니</p>
            <button onClick={()=>{navigate("/cart")}}>더보기 +</button>
            </div>
            <div className={`sections-list-box ${cart.length === 0 ? "empty" : ""}`}>
              { cart.length === 0 ? (<p>장바구니에 담긴 상품이 없습니다.</p>) : (cart.map((item,i)=>
                <CartItemList key={i} item={item}/>
              ))}
            </div>

            <div className="title-box">
            <p className="title-p-tag">나의 리뷰</p>
            <button>더보기 +</button>
            </div>
          <div className={`sections-list-box ${reviw.length === 0 ? "empty" : ""}`}>
              { reviw.length === 0 ? (<p>작성하신 리뷰가 없습니다.</p>) : (reviw.map((item,i)=>
                <CartItemList key={i} item={item}/>
              ))}
            </div>

        </div>



        </div>
    )
}
export default Mypage