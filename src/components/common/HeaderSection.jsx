import { useState } from 'react'
import { Link } from "react-router-dom";


function HeadSection(){

    let Categoryitem = [
        {name : '스킨케어', path: '/skincare'},
        {name : '클렌징', path: '/cleansing'},
        {name: '메이크업', path:'/makeup'},
        {name: '헤어케어', path: '/haircare'},
        {name: '바디케어', path:'/bodycare'}
    ]

    return(

        <div>

        <div className="title-container">
            <Link to="/">MOODÉA</Link>
        </div>

        <div className='Category-container'>
            {Categoryitem.map((item,i)=>(
                <div className='Category-item' key={i}>
                    <Link to={item.path}>{item.name}</Link>
                    <div className='underline'></div>
                </div>
            ))}
        </div>

        </div>


    )


}











export default HeadSection