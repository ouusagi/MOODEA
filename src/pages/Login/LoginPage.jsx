import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { useEffect, useState  } from "react";
import supabase from "../../supabaseClient";


function LoginPage() {  

    let navigate = useNavigate();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    

    useEffect(()=>{
        document.body.style.overflow = "hidden";
        document.body.style.marginTop = "0rem";
        return()=>{
            document.body.style.overflowY = "auto"
            document.body.style.overflowX = "hidden"
            document.body.style.marginTop = "3rem"
        }
    },[])

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!email || !password){alert("이메일과 패스워드를 입력해주세요."); return;}

        const {data, error} = await supabase.auth.signInWithPassword({
            email : email, password : password
        })

        if(error){
            if(error.message.includes("Email not confirmed")){
                alert("가입하신 이메일로 메일 인증 후 재로그인 해주세요.")
                return;
            }
            console.log(error.message); 
            alert("이메일 혹은 패스워드가 일치 하지 않습니다."); 
            return;
        }

        if(data.user){alert(`"${data.user.user_metadata.username}"님 환영합니다 ! 🎉`); navigate('/');}
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
              <input type="text" id="email" value={email} onChange={(e)=>{
                setEmail(e.target.value)
              }} placeholder="이메일을 입력해주세요."/>

              <label htmlFor="password">password</label>
              <input type="password" id="password" value={password} onChange={(e)=>{
                setPassword(e.target.value)
              }} placeholder="비밀번호를 입력해주세요."/>

              <div className="login-btn-container">
              <button type="submit" className="login-btn">이메일로 로그인</button>
              <button type="button" className="signup-btn" onClick={()=>{navigate('/signup')}}>회원가입</button>
              </div>

              </form>
           </div>

        </div>

    </div>

  );
}

export default LoginPage;