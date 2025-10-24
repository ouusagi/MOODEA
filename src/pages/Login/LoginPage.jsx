import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useEffect } from "react";


function LoginPage() {  

    let navigate = useNavigate();

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        document.body.style.marginTop = "0rem";
        return()=>{
            document.body.style.overflowY = "auto"
            document.body.style.overflowX = "hidden"
            document.body.style.marginTop = "3rem"
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    
    return (

    <div className="login-contents-container">


        <div className="login-box">

          <div className="Login-title-container">
              <Link to="/">MOODÉA</Link>
              <p>무데아에서 화려함을 찾아보세요</p>
          </div>


           <div className="login-container">
              <form onSubmit={handleSubmit}>

              <label htmlFor="email">E-mail</label>
              <input type="text" id="email" placeholder="이메일을 입력해주세요."/>

              <label htmlFor="password">password</label>
              <input type="password" id="password" placeholder="비밀번호를 입력해주세요."/>

              <div className="login-btn-container">
              <button type="submit" className="login-btn">이메일로 로그인</button>
              <button type="submit" className="signup-btn" onClick={()=>{navigate('/signup')}}>회원가입</button>
              </div>

              </form>
           </div>

        </div>

    </div>

  );
}

export default LoginPage;