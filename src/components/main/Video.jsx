import React, { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";


function Video(){

  let [show, setshow] = useState(false)
  let containerRef = useRef(null)
  let navigate = useNavigate()

  useEffect(()=>{
    const obzone = new IntersectionObserver(
      ([data]) => setshow(data.isIntersecting),
      {threshold : 0.2}
    )
    
    if(containerRef.current){
      obzone.observe(containerRef.current)
    }

    return ()=>{
      if(containerRef.current){
        obzone.unobserve(containerRef.current)
      }
    }

  },[])


    return(

        

        <div className="Video-container">
          
        <div className="Brand">
            <hr className="hr-mood"/>
            <h1>BRAND STORY</h1>
            <h2>당신의 일상에 감각적인 무드를 더하세요.</h2>
        </div>


            <div className={`video-container ${show ? "up" : ''}`} ref={containerRef}>
            <video src="https://www.pexels.com/ko-kr/download/video/6663340/" controls autoPlay muted loop></video>
            
              <div className={`text-container ${show ? "up" : ''}`}>
                <h1 style={{fontSize : "40px"}}>“당신의 일상에 머무는 가장 섬세한 무드.” <div className={`hr-class ${show ? "up" : ''}`}></div></h1>
                <h3 style={{fontSize : "25px"}}>MOODEA는 뷰티를 넘어, 감각과 무드를 디자인합니다.<br/>피부에 닿는 순간, 당신의 삶이 특별해집니다.</h3>

                  <div className="video-btn">
                    <button className="btn1">브랜드 철학 더보기</button>
                    <button className="btn2" onClick={()=> navigate("/skincare/1")}>제품 보러가기</button>
                  </div>

              </div>

            </div>
        </div>

    )

}












export default Video;