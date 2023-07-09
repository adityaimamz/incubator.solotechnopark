import React from "react";
import Button from "../Button";
import Image from "next/image";

function ProgramLeft({ image, logo, content, url_register, justify }) {
  console.log(url_register);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-20">
      <div
        className={`bg-gray-100 mx-5 lg:mx-0 rounded-lg overflow-hidden lg:rounded-r-xl ${
          justify ? "lg:order-2" : ""
        }`}
      >
        <Image
          className="object-cover w-full h-full"
          src={image}
          alt="facilites image"
          width={536}
          height={722}
        />
      </div>
      <div className="mx-5">
        <Image
          className="pb-2 border-b"
          src={logo}
          alt={logo}
          width={180}
          height={110}
        />
        <div className="text-gray-700 mt-10">
          <div
            className="content-innerHTML"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <div className="flex items-center mt-20">
            <Button
              className={"bg-primary-100 text-white inline-block"}
              title={"Explore"}
              path={url_register}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgramLeft;
