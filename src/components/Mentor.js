import React, { useCallback } from "react";
import ImageCircle from "./ImageCircle";
import { useEffect } from "react";
import Aos from "aos";
import { useRouter } from "next/router";

function Mentor({ title, subtitle, image, theme, index, path }) {
  const router = useRouter();

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <button
      className="flex justify-center items-center mx-auto"
      onClick={() => path && router.push(path)}
    >
      <div
        data-aos="fade-up"
        data-aos-delay={`${index * 100}`}
        className={`flex flex-col items-center justify-center text-center ${
          path ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <ImageCircle src={image} />

        <h3 className="head-5 mt-5">{title}</h3>
        <span
          className={`text-sm mt-2 ${
            theme === "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </button>
  );
}

export default Mentor;
