import React, { useState,useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect } from "react";
import supabase from "../../supabaseClient";
import { useNavigate } from "react-router-dom";




function Bestseller(){

  let [best,setbest] = useState([])
  let navigate = useNavigate()

  // useEffect(()=>{
  //   fetch('/Bestseller.json')
  //   .then(res=> res.json())
  //   .then(data=>{
  //     setbest(data.Bestseller)
  //   })
  //   .catch(err=>{
  //     console.log(err)
  //   })
  // },[])

  useEffect(()=>{
    async function Bestseller() {
      const { data, error } = await supabase
      .from('Bestseller')
      .select('*')
      .order('id', {ascending: true})

      if(error){
        console.log(error)
      }

      else{
        setbest(data)
      }
    }
    Bestseller()
  },[])


    return(
        <div className="Best-bg">

        <div className="Best">
            <hr className="hr-Bestseller"/>
            <h1>Best Seller</h1>
            <h2>모두에게 사랑받는 제품 지금 바로 확인 해 보세요 !</h2>
        </div>

        <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {best.map((item,i)=>(
        <SwiperSlide key={i}>
          <div className="cardbox-container" key={i} onClick={()=> navigate(`/bestseller/${item.id}`)}>
              <div className="image-container">
                <p>BEST</p>
                <img src={item.photo} alt="photo"/>
              </div>

              <div className="infobox-container">
                <h3>{item.name}</h3>
                <p>★★★★★</p>
                <h4>{item.price.toLocaleString()}원</h4>
              </div>
          </div>
        </SwiperSlide>
        ))}

      </Swiper>

      <div className="banner-container">
        <div className="bannertext-container">
          <h2>당신의 일상을 더 빛나게 만드는 새로운 선택</h2>
          <p>지금 가장 트렌디한 뷰티 아이템으로,<br />매일의 스킨케어가 특별한 경험이 됩니다.</p>
        </div>
      </div>

      
        </div>
    )

}














export default Bestseller;