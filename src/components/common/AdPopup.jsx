import React, { useState } from "react";


function AdPopup(){


    let [on,change] = useState(true)

    function check(){
        change(false)
        document.body.style.marginTop = 0
    }


    return(
        <div>
            { on&&(
    <div className="AD-container">
        <div className="AD-item1">
            <a href="#">첫 쇼핑시 3,000원 할인 회원가입 쿠폰 증정</a>
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