import React, { useState } from "react";
import { Link } from "react-router-dom";


function AdPopup(){


    let [change,setchange] = useState(true)

    function check(){
        setchange(false)
        document.body.style.marginTop = 0
    }


    return(
        <div>
            { change &&(
    <div className="AD-container">
        <div className="AD-item1">
            <Link to={'/signup'}>첫 쇼핑시 3,000원 할인 회원가입 쿠폰 증정</Link>
        </div>

        <div className="AD-item2">
        <input type="checkbox" onClick={check}/><span>창 닫기</span>
        </div>
    </div>
)}
        </div>
    )

}














export default AdPopup;