import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const ActiveSlider = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      <Swiper
        pagination={{ dynamicBullets: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="rounded-lg overflow-hidden shadow-lg"
      >
        <SwiperSlide>
          <img
            src="https://www.thepahadistory.com/cdn/shop/articles/shutterstock_719690932_1080-X-683-pxl_A3.jpg?v=1656563550&width=2048"
            alt="Slide 1"
            className="w-full h-64 object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.nescafe.com/au/sites/default/files/2024-04/Untitled-5%20copy_6_0.jpg"
            alt="Slide 2"
            className="w-full h-64 object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Slide 3"
            className="w-full h-64 object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://www.planetorganic.com/cdn/shop/articles/AdobeStock_248929619_1024x1024.jpg?v=1739284106"
            alt="Slide 4"
            className="w-full h-64 object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://img.freepik.com/free-photo/composition-different-delicious-ingredients_23-2149028611.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Slide 5"
            className="w-full h-64 object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ActiveSlider;
