import React, { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import Aos from "aos";
import Image from "next/image";

function CardNews({ title, subtitle, date, path, image, index }) {
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={`${index * 100}`}
      className="border bg-white rounded-md cursor-default shadow-lg hover:shadow-none"
    >
      <div className="bg-slate-100 h-52 w-full overflow-hidden flex justify-center items-center">
        <Image
          className="w-full h-full object-cover"
          src={image}
          alt={title}
          width={330}
          height={200}
        />
      </div>
      <div className="p-5">
        <div>
          <small className="text-gray-600">{date}</small>
          <h2 className="head-5 capitalize">{title}</h2>
          <p className="my-4 text-gray-600">{subtitle}</p>
        </div>
        <div>
          <Link
            href={path}
            className={`flex items-center text-primary-100 hover:text-secondary-200 transition-all`}
            onMouseOver={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
          >
            Read More
            <svg
              width="15"
              height="8"
              viewBox="0 0 15 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`mt-1 transition-all ${
                isHover ? "translate-x-5" : "translate-x-2"
              }`}
            >
              <path
                d="M14.3536 4.35355C14.5488 4.15829 14.5488 3.84171 14.3536 3.64645L11.1716 0.464467C10.9763 0.269205 10.6597 0.269205 10.4645 0.464467C10.2692 0.659729 10.2692 0.976312 10.4645 1.17157L13.2929 4L10.4645 6.82843C10.2692 7.02369 10.2692 7.34027 10.4645 7.53553C10.6597 7.7308 10.9763 7.7308 11.1716 7.53553L14.3536 4.35355ZM-4.37114e-08 4.5L14 4.5L14 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
                fill={`${isHover ? "#FFAA53" : "#2E62CC"} `}
                // fill="#FFAA53"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CardNews;
