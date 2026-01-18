import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Swiper ,SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';

function BestSliderSkeleton({ count }) {
  return (
    <>
        <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{0:{slidesPerView:2, spaceBetween:0}, 768:{slidesPerView:5, spaceBetween:30}}}
      >
      {Array.from({ length: count }).map((_, i) => (
        <SwiperSlide key={i}>
            <div className="cardbox-container">
              <div className="image-container">
                <Skeleton height={200} width="100%"/>
              </div>

              <div className="infobox-container">
                <Skeleton height={10} width="80%"/>
                <Skeleton height={10} width="65%"/>
                <Skeleton height={10} width="50%"/>
              </div>
            </div>
        </SwiperSlide>
      ))}
      </Swiper>
    </>
  );
}

export default BestSliderSkeleton;
