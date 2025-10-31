import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";

function TopMenu(){

    let [user,setuser] = useState(null)
    let navigate = useNavigate()

    useEffect(()=>{
        const checkSession = async ()=>{
            const {data, error} = await supabase.auth.getSession()
            if(error){console.log(error.message)}
            else{setuser(data.session?.user ?? null)}
        }
        checkSession()
    },[])

    const handleLogout = async ()=>{
        const {error} = await supabase.auth.signOut()
        if(error){console.log(error.message)}
        else{setuser(null); navigate('/');}
    }



    useEffect(()=>{
        window.gtranslateSettings = {
      default_language: "ko",
      native_language_names: true,
      detect_browser_language: true,
      languages: ["ko", "ja", "en", "zh-CN"],
      wrapper_selector: ".gtranslate_wrapper",
      flag_size: 24,
      alt_flags: { en: "usa" }
    };

    if(!document.querySelector('script[src="https://cdn.gtranslate.net/widgets/latest/flags.js"]')){
        const script = document.createElement("script")
        script.src = "https://cdn.gtranslate.net/widgets/latest/flags.js"
        script.defer = true
        document.body.appendChild(script)
    }
    },[])



    return(


        <div>

    <div className="menu-container">

        <div className="option-container">
        {user ? <button onClick={handleLogout}>로그아웃</button> : (
        <>
        <Link to="/signup">회원가입</Link>
        <Link to="/login">로그인</Link>
        </>)}

        <a href="#">주문조회</a>
        <a href="#">찜한상품</a>
        <a href="#">고객지원</a>
        </div>

        <div className="menuicon-container">
        <div className="gtranslate_wrapper"></div>

        <Link to="/mypage" onClick={(e)=>{
            e.preventDefault()
            if(!user){ alert("로그인이 필요한 서비스 입니다."); navigate("/login");}
            else{navigate('/mypage')}
        }}><i className="fa-regular fa-user"></i></Link>

        <a href="#"><i className="fa-solid fa-basket-shopping"></i></a>
        <a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
        </div>

    </div>

        </div>

    )

}










export default TopMenu;