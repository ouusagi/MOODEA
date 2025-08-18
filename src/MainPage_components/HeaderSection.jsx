import { useState } from 'react'
import './MainPage.css';


function HeadSection(){

    return(

        <div>

            {/* 헤더 타이틀 + 상품카테고리창 */}
        <div className="title-container">
            <a href="./mainpage.html">MOODÉA</a>
        </div>

        <div className="Kategorie-container">
            <a href="#">스킨케어</a>
            <a href="#">클렌징</a>
            <a href="#">메이크업</a>
            <a href="#">헤어케어</a>
            <a href="#">바디케어</a>
        </div>
    {/* 헤더 타이틀 + 상품카테고리창 */}

        </div>


    )


}











export default HeadSection