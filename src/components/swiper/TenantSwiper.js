import React from "react"; // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

function TenanSwiper({ data }) {
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
          slidesPerView: data && data.length > 4 ? 5 : data && data.length,
        },
      }}
    >
      {data &&
        data.map((data, i) => (
          <SwiperSlide key={i} className="pb-24">
            {/* <Mentor
              title={data.name}
              image={data.image}
              theme={"dark"}
              path={`/tenant/${data.slug}`}
            /> */}
            <Link
              href={
                data.path ? data.path : data.slug ? `tenant/${data.slug}` : "/"
                // data.slug ? `tenant/${data.slug}` : data.path ? data.path : "/"
              }
              className="flex justify-center items-center mx-auto"
            >
              <div
                className={`flex flex-col items-center justify-center text-center`}
              >
                <div className="w-full flex justify-center items-end h-[120px]">
                  <Image
                    className="rounded-md object-contain w-[60%] h-full object-bottom"
                    src={data.image}
                    alt={data.name}
                    width={130}
                    height={130}
                  />
                </div>

                <h3 className="head-5 mt-5">{data.name}</h3>
                <span className={`text-sm mt-2`}>{data.position}</span>
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default TenanSwiper;
