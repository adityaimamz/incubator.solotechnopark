import React from "react"; // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination, Scrollbar } from "swiper";
import Mentor from "../Mentor";
import avatar1 from "../../images/avatar-1.jpg";
import avatar2 from "../../images/avatar-2.jpg";
import avatar3 from "../../images/avatar-3.jpg";
import avatar4 from "../../images/avatar-4.jpg";

function MentorSwiper({ className, data }) {
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
        <SwiperSlide key={i} className={`pb-24`}>
          <Mentor
            title={data.name}
            subtitle={data.position}
            image={data.image}
            // theme={"dark"}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default MentorSwiper;
