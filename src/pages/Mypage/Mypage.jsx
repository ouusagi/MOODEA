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
    const [inputusername,setinputusername] = useState('') || username
    const [userphone,setuserphone] = useState('')
    const [useraddress,setuseraddress] = useState('')
    const [useraddressline2,setuseraddressline2] = useState('')
    const [upDateInfo,setupDateInfo] = useState(false)
    const [deleteuser,setdeleteuser] = useState(false)
    let navigate = useNavigate()


        const fetchUser = async ()=>{
            const {data, error} = await supabase.auth.getSession()
            if(error){console.log(error.message)}
            else{
                // userInfo
                setuserSession(data.session?.access_token || "")
                setuseremail(data.session?.user?.email || "")
                setuserId(data?.session?.user?.id || null)
              }
        }     

        const UserName = async ()=>{
                const { data:NameData, error:NameError } = await supabase 
                .from("users")
                .select("username")
                .eq("id", userId)
                .single()
                if(NameError){console.log(NameError.message); return;}
                setusername(NameData.username)
                }

        const fetchCoupons = async ()=>{
                const {data:CouponData, error:CouponError} = await supabase.from("user_coupons")
                .select("*")
                .eq("user_id",userId)
                .eq("used",false)
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
                    UserName()
                    fetchCoupons()
                    UserPoint()
                    UserCart()
                    UserOrder()
                    Wishlist()
                    TotalAmount()
                    UserProfile()
                  }
                },[userId, userSession])

        const OpenUpdateInfo = ()=>{
          setupDateInfo(true)
        }


        const handleCheckUsername = async ()=>{
        const trimmed = inputusername.trim();
        if(trimmed.trim() === ""){alert("닉네임을 입력해주세요."); return;}
        const {data : usernamecheck, error : usernamererror} = await supabase
        .from('user_public')
        .select('id')
        .eq('username', trimmed)
        .neq('id', userId)
        if(usernamererror){console.log(usernamererror.message); return;}
        if(usernamecheck.length > 0){alert("이미 사용중인 닉네임 입니다."); return;}
        else{alert("사용 가능한 닉네임 입니다.");}
        }


        const UserInfoChange = async()=>{
          if(userphone.trim() === ""){alert("휴대전화 번호를 입력해주세요"); return;}
          if(useraddress.trim() === ""){alert("우편번호를 입력해주세요"); return;}
          if(useraddressline2.trim() === ""){alert("상세주소를 입력해주세요"); return;}
          const updateData = 
          {userphone:userphone, 
          users_address:useraddress, 
          users_address_line2:useraddressline2}
          if(inputusername.trim() !== ""){updateData.username = inputusername}
          const {error: changeError} = await supabase
          .from('users')
          .update(updateData)
          .eq('id',userId)
          if(changeError){console.log(changeError.message); alert("닉네임 중복검사 시도 후 혹은 휴대전화 번호의 하이폰을 제외 후 다시 시도해주세요."); return;}
          alert("회원 정보가 변경되었습니다 🎉 !");
          setupDateInfo(false);
        }

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
                    <button onClick={()=>{OpenUpdateInfo()}}>회원정보 수정</button>
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



        <div className={`Modal-Overlay ${upDateInfo === true ? "open" : false}`} onClick={() => setupDateInfo(false)}></div>
        <div className={`Modal-Overlay ${deleteuser === true ? "open" : false}`} onClick={() => setupDateInfo(false)}></div>



        <div className={`Update-Info-container ${upDateInfo === true ? "open" : false}`}>

          <div className="Info-close-container">
             <i className="fa-solid fa-x Info-close-btn" onClick={()=>{setupDateInfo(false)}}></i>
          </div>

          <div className="Update-Info-Top">
            <img src={userProfile} alt="user_img" />
            <i className="fa-solid fa-pen-to-square Update-Info-profile-change-icon"><input className="change-input" type="file" accept="image/*" onChange={(e)=> handleProfile(e.target.files[0])}/></i>
            <p>{username}</p>
          </div>

          <div className="Update-Info-level">
            <p>WHITE 회원 🤍</p>
          </div>
          

          <div className="Update-Info-middle">
            <p>회원 정보 수정</p>

            <div className="Update-Info-middle-input">
              <label htmlFor="name">닉네임</label>
              <button onClick={()=>{handleCheckUsername()}}>중복확인</button>
              <input id="name" type="text" placeholder={username} value={inputusername} onChange={(e)=>{setinputusername(e.target.value)}}/>

              <label htmlFor="phone">휴대전화</label>
              <input id="phone" type="text" placeholder="070-xxxx-xxxx (하이폰 제외)" value={userphone} onChange={(e)=>{setuserphone(e.target.value)}}/>

              <label htmlFor="address">우편번호</label>
              <input id="address" type="text" placeholder="서울 강남구" value={useraddress} onChange={(e)=>{setuseraddress(e.target.value)}}/>

              <label htmlFor="address2">상세주소</label>
              <input id="address2" type="text" placeholder="108동 201호" value={useraddressline2} onChange={(e)=>{setuseraddressline2(e.target.value)}}/>
            </div>

            <div className="Update-Info-btn">
              <button onClick={()=>{UserInfoChange()}}>정보수정</button>
            </div>
            
            <div className="Update-Info-Userclose">
              <button onClick={()=>{setdeleteuser(true); setupDateInfo(false)}}>회원탈퇴</button>
            </div>
            
          </div>

        </div>

        <div className={`Delete-Account-container ${deleteuser === true ? "open" : ""}`}>
           <i className="fa-solid fa-x Delete-Account-icon" onClick={()=>{setdeleteuser(false)}}></i>
          <div className="Delete-Account-Top">
            <p>MOODÉA</p>
          </div>

          <div className="Delete-Account-middle">
            <p>회원탈퇴</p>
          </div>

          <div className="Delete-Account-middle2">
            <p>회원탈퇴 시 계정 정보와 주문 내역, 보유 포인트 및 쿠폰을 포함한 <br />
            모든 이용 기록이 삭제되며 복구가 불가능합니다. <br />
            탈퇴 후에는 일부 서비스 이용에 제한이 있을 수 있습니다. <br />
            </p>
          </div>

          <div className="Delete-Account-bottom-box">
            <p>※ 회원탈퇴 시 아래 사항에 대해 확인이 필요합니다. ※ <br /></p>
            <p>• 회원탈퇴 후 계정 정보 및 개인 설정은 모두 삭제되며 복구할 수 없습니다. <br /> </p>
            <p>• 주문 내역, 결제 기록, 배송 정보 등 서비스 이용 기록이 삭제됩니다. <br /> </p>
            <p>• 보유 중인 포인트 및 쿠폰은 탈퇴와 동시에 소멸되며 환불되지 않습니다. <br /> </p>
            <p>• 탈퇴 후에는 일부 서비스 이용이 제한될 수 있습니다. <br /> </p>
          </div>

          <div className="Delete-Account-bottom">
            <p>회원 탈퇴를 하시겠습니까?</p>
          </div>

          <div className="Delete-Account-btn">
            <button>회원탈퇴</button>
          </div>
          
        </div>

        </div>
    )
}
export default Mypage