import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./SignupPage.css";
import { useState } from "react";


function SignupPage() {  

    let [email,setemail] = useState("")
    let [emaillimit,setemaillimit] = useState("")
    let [password,setpassword] = useState("")
    let [pwlimit,setpwlimit] = useState("")
    let [name,setname] = useState("")
    let [namelimit,setnamelimit] = useState("")
    let [age,setage] = useState("")
    let [agelimit,setagelimit] = useState("")
    let [username,setusername] = useState("")
    let [usernamelimit,setusernamelimit] = useState("")
    const emailType = /^\S+@\S+\.\S+$/

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
              {!emailType.test(email) ? <p className="limit">{emaillimit}</p> : null}
              <input type="text" id="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e)=>{
                setemail(e.target.value.replace(/[^a-zA-Z0-9._@]/g,"")) // 이메일칸에 입력 할 수 있는 텍스트 제한
              }} onBlur={()=>{if(!emailType.test(email)){setemaillimit("이메일 형식으로 입력해주세요.")}}}/>

              <label htmlFor="password">password</label>
              {password.length < 8 ? <p className="limit">{pwlimit}</p> : null}
              <input type="password" id="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={(e)=>{
                setpassword(e.target.value)
              }} onBlur={()=>{if(password.length < 8){setpwlimit("패스워드는 8자리 이상 입력해주세요.")}}}/>

              <label htmlFor="username">name</label>
              {name == "" ? <p className="limit">{namelimit}</p> : ""}
              <input type="text" id="name" placeholder="이름(실명)을 입력해주세요." value={name} onChange={(e)=> {
                setname(e.target.value)
                }} onBlur={()=> {if(name == ""){setnamelimit("이름(실명)을 입력해주세요.")}}}/>

              <label htmlFor="age">age</label>
              {age.length < 6 ? <p className="limit">{agelimit}</p> : null}
              <input type="text" id="age" placeholder="생년월일 6자리를 입력해주세요. ex) 010604" value={age} onChange={(e)=>{
                setage(e.target.value.replace(/[^0-9]/g,"").slice(0,6))
                }} onBlur={()=>{if(age.length < 6){setagelimit("생년월일은 6자리로 입력해주세요.")}}}/>

              <label htmlFor="username">username</label>
              {username == "" ? <p className="limit">{usernamelimit}</p> : ""}
              <input type="text" id="username" placeholder="닉네임을 입력해주세요." value={username} onChange={(e)=>{
                setusername(e.target.value)
              }} onBlur={()=>{if(username == ""){setusernamelimit("닉네임을 입력해주세요.")}}}/>

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