import { useState,useEffect } from 'react'
import './MainPage.css';


function Footer(){


    return(

    <div className='Footer'>
           
        <div className='Footer-container'>

          <div className='Footer-top-container'>

            <div className='Footer-top1'>
               <a href="./mainpage.html">MOODÉA</a>
            </div>

            <div className='Footer-top2'>
               <a href="#" className='Footer-menu'>BRAND</a>
               <a href="#" className='Footer-menu'>TERMS</a>
               <a href="#" className='Footer-menu'>PRIVACY</a>
               <a href="#" className='Footer-menu'>HELP</a>
            </div>

          </div>


        <div className='Footer-bottom-container'>

            <div className='Footer-info'>
                <p>Company : MOODEA | Ceo : 무데아 | Business Registration No : 202-61-00038</p>
                <p>E-commerce Permit 2025-영등포구-0135 | Tel : 080-361-1243 | Fax : 080-361-1243</p>
                <p>Address : 12354 서울시 영등포구 양천구 목동동로 230 (목동동) 무데아즈</p>
                <p>Personal Information Manager : 무데아(moodea@gmail.com) Hosting by Mudey</p>
                <p>Copyright © 2025 무데아즈. All rights reserved.</p>

                <div className='Footer-info-bottom'>
                   <p>구매안전서비스 : 고객님은 안전거래를 위해 현금 등으로 결제시 저희 쇼핑몰이 가입한 TossPay 구매안전서비스를 이용하실 수 있습니다.</p>
                </div>
                
            </div>

            <div className='Footer-info-tell'>
                <p>CUSTOMER SERVICE</p>
                <h1>080-361-1243</h1>    
                <p>Week 09:00 ~ 18:00 (Lunch 12:00 ~ 13:00)</p>  
                <p>Toss 1234-567-89102</p>
                <p>Woori 4321-765-20198</p>
                <p>Holder : 무데아</p>
            </div>

        </div>    

    </div>

  </div>


    )


}







export default Footer