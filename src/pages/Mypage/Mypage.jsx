import { useState, useEffect } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './Mypage.css'
import { useNavigate } from "react-router-dom"

function Mypage(){

    let [username,setusername] = useState("")
    let [useremail,setuseremail] = useState("")
    let [userId,setuserId] = useState(null)
    let [coupon,setcoupon] = useState([])
    let navigate = useNavigate()


        const fetchUser = async ()=>{
            if(!userId) return;
            const {data, error} = await supabase.auth.getSession()
            if(error){console.log(error.message)}
            else{
                // userInfo
                setusername(data.session?.user?.user_metadata?.username || "");
                setuseremail(data.session?.user?.email || "")
                setuserId(data.session.user.id)
              }
        }     


        const fetchCoupons = async ()=>{
                const {data:CouponData, error:CouponError} = await supabase.from("user_coupons")
                .select("*")
                .eq("user_id",userId)
                if(CouponError){console.log(CouponError)}
                else{setcoupon(CouponData)}}



                useEffect(()=>{
                  fetchUser()
                },[])

                useEffect(()=>{
                  if(userId){
                    fetchCoupons()
                  }
                },[userId])


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
                    <img src="https://static.vecteezy.com/system/resources/previews/013/360/247/non_2x/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg" alt="user_img" />
                    <i className="fa-solid fa-pen-to-square profile-change-icon"></i>
                    <p>WHITE 회원 🤍</p>
                </div>
              </div>

              <div className="profile-right">
                <div className="profile-info-box">
                    <p className="info-username">{username}</p>
                    <p className="info-userEmail">({useremail})</p>
                    <p className="info-userTotal">고객님의 총 구매금액은 <span>157,400</span>원 입니다.</p>

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
                <p className="item-box-count">3000</p>
                </div>
              </div>

              <div className="profile-AssetsSection-container">
                <div className="item-box">
                <p>찜목록</p>
                <p className="item-box-count">2</p>
                </div>
              </div>

            </div>
        </div>

        <div className="UserSections-container">

            <div className="title-box">

            <p className="title-p-tag">최근 주문한 상품</p>
            <button>더보기 +</button>
            </div>
            <div className="sections-list-box">
            <p>최근 주문한 상품이 없습니다.</p>
            </div>

            <div className="title-box">
            <p className="title-p-tag">장바구니</p>
            <button onClick={()=>{navigate("/cart")}}>더보기 +</button>
            </div>
            <div className="sections-list-box">
            <p>장바구니에 담긴 상품이 없습니다.</p>
            </div>

            <div className="title-box">
            <p className="title-p-tag">나의 리뷰</p>
            <button>더보기 +</button>
            </div>
            <div className="sections-list-box">
            <p>작성하신 리뷰가 없습니다.</p>
            </div>

        </div>



        </div>
    )
}
export default Mypage