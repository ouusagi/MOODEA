import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./SignupPage.css";


function SignupPage() {  

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        document.body.style.marginTop = "0rem";
        return()=>{
            document.body.style.overflow = "auto"
            document.body.style.marginTop = "3rem"
        }
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault();
    }
    
    return (

    <div className="signup-contents-container">


        <div className="signup-box">

          <div className="signup-title-container">
              <Link to="/">MOODÉA</Link>
              <p>무데아에서 화려함을 찾아보세요</p>
          </div>


           <div className="signup-container">
              <form onSubmit={handleSubmit}>

              <label htmlFor="email">E-mail</label>
              <button className="check-btn">중복확인</button>
              <input type="text" id="email" placeholder="이메일을 입력해주세요."/>

              <label htmlFor="password">password</label>
              <input type="password" id="password" placeholder="비밀번호를 입력해주세요."/>

              <label htmlFor="username">name</label>
              <input type="text" id="name" placeholder="이름(실명)을 입력해주세요."/>

              <label htmlFor="age">age</label>
              <input type="text" id="age" placeholder="생년월일 8자리를 입력해주세요."/>

              <label htmlFor="username">username</label>
              <input type="text" id="username" placeholder="닉네임을 입력해주세요."/>

              <label htmlFor="sex">sex</label>
              <select id="sex">
                <option value="female">여성</option>
                <option value="male">남성</option>
              </select>

              <div className="signup-btn-container">
              <button type="submit" className="signup-btn">회원가입</button>
              </div>

              </form>
           </div>

        </div>

    </div>

  );
}

export default SignupPage;