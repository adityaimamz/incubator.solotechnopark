import React, { useEffect } from "react";
import Image from "next/image";
import Aos from "aos";
import Button from "./Button";

function Program({ data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-20">
      {data.map((data, i) => (
        <ProgramCard
          key={i}
          slug={data.slug}
          desc={data.description}
          src={data.logo}
          width={180}
          height={100}
          path={data.url_register}
          index={i}
        />
      ))}
    </div>
  );
}

function ProgramCard({ slug, src, desc, path, width, height, index }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="card  max-w-md rounded-md py-10 px-5 text-center text-white flex flex-col justify-between items-start"
    >
      <div className="card-header mt-5 w-full h-20 flex justify-start items-end overflow-hidden">
        <Image
          className="object-contain"
          src={src}
          alt={src}
          width={width}
          height={height}
          style={{
            filter: "brightness(0) invert(1)",
          }}
        />
      </div>
      <div className="card-body my-10 w-full text-start overflow-hidden">
        <p className="text-white">{desc}</p>
      </div>
      <div className="card-footer flex  items-center">
        <Button
          className={
            "bg-secondary-200 text-primary-100 hover:bg-primary-100 hover:opacity-50"
          }
          title={"Register"}
          path={path}
        />
        <Button
          className={
            "bg-transparent text-white hover:bg-transparent hover:text-secondary-200"
          }
          title={"More Info"}
          path={`/program/${slug}`}
        />
      </div>
    </div>
  );
}

export default Program;
