import React, { useState,useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect } from "react";




function BestSlider({items}){

    return(
        <div className="Best-bg2">
        <Swiper
        slidesPerView={5}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {items.map((item,i)=>(
        <SwiperSlide key={i}>
          <div className="cardbox-container">
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
      
        </div>
    )

}














export default BestSlider;