import { useState, useEffect } from "react"
import App from "../../App"
import supabase from "../../supabaseClient"
import './Mypage.css'

function Mypage(){

    let [username,setusername] = useState("")
    let [useremail,setuseremail] = useState("")

    useEffect(()=>{
        const Username = async ()=>{
            const {data, error} = await supabase.auth.getSession()
            if(error){console.log(error.message)}
            else{
                setusername(data.session?.user?.user_metadata?.username || "");
                setuseremail(data.session?.user?.email || "")}
        }
        Username()
    },[])


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
                    <p>WHITE 회원</p>
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

            </div>
        </div>



        </div>
    )
}
export default Mypage