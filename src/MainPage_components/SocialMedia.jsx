import { useState, useEffect } from 'react'
import './MainPage.css';


function SocialMedia(){


    return(

    <div>

        <div className="newproduct-title-container Social">
            <hr className="hr-Social"/>
            <h1>Social Media</h1>
            <h2>소셜미디어를 통해 더 많은 소식을 들어보세요 !</h2>
        </div>

        <div className="Social-container">
            <div className="Socialbox item1"><img src="https://img.freepik.com/premium-psd/cosmetic-packaging-mockup_23-2151014157.jpg?ga=GA1.1.1152520471.1754054064&semt=ais_incoming&w=740&q=80" alt="" /></div>
            <div className="Socialbox item2"><img src="https://img.freepik.com/premium-psd/white-facewash-tube-lying-beige-surface-surrounded-by-white-flowers_1189127-1684.jpg?ga=GA1.1.1152520471.1754054064&semt=ais_incoming&w=740&q=80" alt="" /></div>
            <div className="Socialbox item3"><img src="https://img.freepik.com/premium-psd/shampoo-bottles-water-product-mockup_1283503-451.jpg?ga=GA1.1.1152520471.1754054064&semt=ais_incoming&w=740&q=80" alt="" /></div>
            <div className="Socialbox item4"><img src="https://img.freepik.com/premium-psd/blank-white-cosmetic-tube-product-mockup-flat-stone-with-white-rocks_1189127-1482.jpg?ga=GA1.1.1152520471.1754054064&semt=ais_incoming&w=740&q=80" alt="" /></div>
            <div className="Socialbox item5"><img src="https://img.freepik.com/premium-psd/cosmetic-packaging-mockup_23-2151014161.jpg?ga=GA1.1.1152520471.1754054064&semt=ais_incoming&w=740&q=80" alt="" /></div>
            <div className="Socialbox item6"><img src="https://img.freepik.com/premium-psd/cosmetic-tube-mockup_659711-592.jpg?ga=GA1.1.1152520471.1754054064&semt=ais_incoming&w=740&q=80" alt="" /></div>
        </div>

        <div className="Link-container">
            <h1>From Instargram <i class="fa-brands fa-instagram"></i></h1>
            <a href="https://www.instagram.com/moodea_beauty25/" target="_blank">#MOODEA 해시태그 이벤트 참여하기</a>
        </div>

    </div>

    )
    
}







export default SocialMedia