import Image from "next/image";
import React from "react";
import Button from "../Button";
import { useEffect } from "react";
import Aos from "aos";

function CardCenter({ slug, src, desc, path, width, height, index }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="card bg-white max-w-md rounded-md py-10 px-5 text-center text-gray-600 flex flex-col justify-between items-center"
    >
      <div className="card-header mt-5 w-full h-20 flex justify-center items-center overflow-hidden">
        <Image
          className="mx-auto object-contain"
          src={src}
          alt={src}
          width={width}
          height={height}
        />
      </div>
      <div className="card-body my-10 w-full overflow-hidden">
        <p>{desc}</p>
      </div>
      <div className="card-footer flex flex-col gap-5 items-center">
        <Button
          className={"bg-primary-100 text-white"}
          title={"Register"}
          path={path}
        />
        <Button
          className={
            "bg-transparent text-primary-100 hover:bg-transparent hover:text-secondary-200"
          }
          title={"More Info"}
          path={`/program/${slug}`}
        />
      </div>
    </div>
  );
}

export default CardCenter;
