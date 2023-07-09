import React from "react"; // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import Mentor from "../Mentor";

function TeamSwiper({ data }) {
  return (
    <Swiper
      spaceBetween={30}
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="mySwiper mt-20"
      breakpoints={{
        768: {
          slidesPerView: 1,
        },
        1280: {
          slidesPerView: data.length > 4 ? 5 : data.length,
        },
      }}
    >
      {data.map((data, i) => (
        <SwiperSlide key={i} className="pb-24">
          <Mentor
            title={data.name}
            subtitle={data.position}
            image={data.image}
            theme={"dark"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default TeamSwiper;
