import React from "react";
import { useEffect } from "react";
import Aos from "aos";
import Image from "next/image";

function CardMitra({ image, index, title }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={`${index * 100}`}
      className="text-gray-700 rounded-lg p-9 flex justify-center items-center"
    >
      {image && (
        <Image
          src={image}
          alt={title}
          className="w-20 rounded-md"
          width={100}
          height={100}
          style={{ filter: "grayscale(100%)" }}
          onMouseEnter={(e) => (e.target.style.filter = "none")}
          onMouseLeave={(e) => (e.target.style.filter = "grayscale(100%)")}
        />
      )}
    </div>
  );
}

export default CardMitra;
