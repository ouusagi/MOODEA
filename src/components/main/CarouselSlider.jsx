import { useState } from 'react'


function CarouselSlider(){

    let [index,setIndex] = useState(0)
    let ImageBox = ['/banner1.png', '/banner2.png', '/banner3.png']
    const clickBtn = (i)=>{setIndex(i)}

    return(

        <div>

    <div className="slider-container">
        <div className="slide" style={{transform : `translate(-${index * 100}vw)`}}>
            {ImageBox.map((image,i)=>(
                <div className='slide-img' key={i} style={{backgroundImage : `url(${image})`}}></div>
            ))}
        </div>

        <div className="indicator-container">
            {ImageBox.map((_,i)=>(
                <div key={i} className={`indicator ${index === i ? 'active' : ''}`}
                onClick={()=> clickBtn(i)}></div>
            ))}
        </div>
    </div>

        </div>

    )

}





export default CarouselSlider