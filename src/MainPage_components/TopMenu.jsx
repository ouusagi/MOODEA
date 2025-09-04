import React from "react";
import './MainPage.css';
import { useEffect } from "react";

function TopMenu(){

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
        <a href="#">회원가입</a>
        <a href="#">로그인</a>
        <a href="#">주문조회</a>
        <a href="#">찜한상품</a>
        <a href="#">고객지원</a>
        </div>

        <div className="menuicon-container">
        <div class="gtranslate_wrapper"></div>
        <a href="#"><i className="fa-regular fa-user"></i></a>
        <a href="#"><i className="fa-solid fa-basket-shopping"></i></a>
        <a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
        </div>

    </div>

        </div>

    )

}










export default TopMenu;