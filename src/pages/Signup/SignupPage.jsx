import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SignupPage.css";
import supabase from "../../supabaseClient";


function SignupPage() {  
    
    let navigate = useNavigate()
    let [checkbtn1,setcheckbtn1] = useState(0)
    let [checkbtn2,setcheckbtn2] = useState(0)
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
    let [sex,setsex] = useState("female")
    let DEFAULT_PROFILE = "https://static.vecteezy.com/system/resources/previews/013/360/247/non_2x/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg"
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

    const handleSubmit = async (e)=>{
        e.preventDefault();
        let pass = true;
        if(!email || !password || !name || !age || !username){alert("모든 요소를 입력해주세요."); return;}
        if(checkbtn1 <= 0){alert("이메일 중복확인을 해주세요."); return;}
        if(checkbtn2 <= 0){alert("닉네임 중복확인을 해주세요."); return;}
        if(!emailType.test(email)){setemaillimit("이메일 형식으로 입력해주세요."); pass = false;}
        if(password.length < 8){setpwlimit("패스워드는 8자리 이상 입력해주세요."); pass = false;}
        if(name == ""){setnamelimit("이름(실명)을 입력해주세요."); pass = false;}
        if(age.length < 6){setagelimit("생년월일은 6자리로 입력해주세요."); pass = false;}
        if(username == ""){setusernamelimit("닉네임을 입력해주세요."); pass = false;}

        if(pass == true){

        const {data, error} = await supabase.auth.signUp({email,password, options:{data:{username}}})

        if(error){
          console.log(error); alert("에러가 발생했습니다. 다시 시도해주세요."); return;
        }

        if(data.user){await supabase.from('users').insert({id: data.user.id, email, name, age, username, sex, profile:DEFAULT_PROFILE});
        await SignupCoupon(data.user.id)
        alert(`"${data.user.user_metadata.username}"님 회원가입을 축하합니다! 🎉  신규 가입 축하 쿠폰이 지급 완료되었습니다! 🎁`); navigate('/login');}
        }

        else{
          alert("입력 항목을 정확히 기입하신 후 다시 시도해주세요.")
          return
        }
    }

    useEffect(()=>{
      setcheckbtn1(0)
    },[email])

    useEffect(()=>{
      setcheckbtn2(0)
    },[username])


    const handleCheckEmail = async ()=>{
      const {data : emailcheck, error : emailrerror} = await supabase
      .from('users')
      .select('email')
      .eq('email', email)

      if(emailcheck.length > 0){alert("이미 사용중인 이메일 입니다."); return;}
      if(email == ""){alert("이메일을 입력해주세요."); return;}
      else{alert("사용 가능한 이메일 입니다.");setcheckbtn1(1);}
    }

    const handleCheckUsername = async ()=>{
      const {data : usernamecheck, error : usernamererror} = await supabase
      .from('users')
      .select('username')
      .eq('username', username)

      if(usernamecheck.length > 0){alert("이미 사용중인 닉네임 입니다."); return;}
      if(username == ""){alert("닉네임을 입력해주세요."); return;}
      else{alert("사용 가능한 닉네임 입니다."); setcheckbtn2(1);}
    }

    async function SignupCoupon(userid) {
      const {error:couponerror} = await supabase.from("user_coupons")
      .insert({
        user_id:userid,
        coupon_name:"회원가입 축하 쿠폰",
        amount:3000,
        used:false
      })
      if(couponerror){return alert("에러가 발생하였습니다"); console.log(couponerror.message)}
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
              <button type="button" className="check-btn" onClick={handleCheckEmail}>중복확인</button>
              {!emailType.test(email) ? <p className="limit">{emaillimit}</p> : null}
              <input type="text" id="email" placeholder="이메일을 입력해주세요." value={email} onChange={(e)=>{
               if(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.target.value)){alert("이메일은 영어로 입력해주세요.")} setemail(e.target.value.replace(/[^a-zA-Z0-9._@]/g,"")) // 이메일칸에 입력 할 수 있는 텍스트 제한
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

              <div className="username-wrap">
              <label htmlFor="username">username</label>
              <button type="button" className="check-btn" onClick={handleCheckUsername}>중복확인</button>
              </div>
              {username == "" ? <p className="limit">{usernamelimit}</p> : ""}
              <input type="text" id="username" placeholder="닉네임을 입력해주세요." value={username} onChange={(e)=>{
                setusername(e.target.value)
              }} onBlur={()=>{if(username == ""){setusernamelimit("닉네임을 입력해주세요.")}}}/>

              <label htmlFor="sex">sex</label>
              <select id="sex" value={sex} onChange={(e)=>{setsex(e.target.value)}}>
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