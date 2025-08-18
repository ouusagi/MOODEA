import React from "react";
import './MainPage.css';

function TopMenu(){

    return(


        <div>
            {/* 상단 옵션창 */}
    <div className="menu-container">

        <div className="option-container">
        <a href="#">회원가입</a>
        <a href="#">로그인</a>
        <a href="#">주문조회</a>
        <a href="#">찜한상품</a>
        <a href="#">고객지원</a>
        </div>

        <div className="menuicon-container">
        <a href="#"><i className="fa-regular fa-user"></i></a>
        <a href="#"><i className="fa-solid fa-basket-shopping"></i></a>
        <a href="#"><i className="fa-solid fa-magnifying-glass"></i></a>
        </div>

    </div>
    {/* 상단 옵션창 */}
        </div>

    )

}












export default TopMenu;