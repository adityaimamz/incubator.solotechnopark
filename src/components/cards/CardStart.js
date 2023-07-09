import Image from "next/image";
import React from "react";
import Button from "../Button";

function CardStart({ src, title, desc, width, height, style }) {
  return (
    <div
      className={`card bg-white max-w-md rounded-md py-10 px-5 text-left text-gray-600 flex flex-col justify-between items-start border`}
      style={style}
    >
      <div className="card-header mt-5">
        <Image
          className="mx-auto"
          src={src}
          alt={src}
          width={width}
          height={height}
        />
      </div>
      <h2 className="head-5 my-5">{title}</h2>
      <div className="card-body flex items-start h-full">
        <p>{desc}</p>
      </div>
    </div>
  );
}

export default CardStart;
