import { useState } from 'react'
import './MainPage.css';


function HeadSection(){

    let Categoryitem = ['스킨케어','클렌징','메이크업','헤어케어','바디케어']

    return(

        <div>

        <div className="title-container">
            <a href="./mainpage.html">MOODÉA</a>
        </div>

        <div className='Category-container'>
            {Categoryitem.map((item,i)=>(
                <div className='Category-item' key={i}>
                    <a href="#">{item}</a>
                    <div className='underline'></div>
                </div>
            ))}
        </div>

        </div>


    )


}











export default HeadSection