import React from "react";
import IconDate from "../../images/date.svg";
import Image from "next/image";
import Button from "../Button";
import generateSlug from "@/utils/generateSlug";
import { useEffect } from "react";
import Aos from "aos";

function CardEvent({ title, desc, date, image, index, register }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className="grid grid-cols-1 lg:grid-cols-12  shadow-lg border bg-white rounded-lg hover:shadow-none transition-all"
    >
      <div
        className="col-span-5 bg-gray-300 overflow-hidden flex justify-center items-center"
        // style={{ backgroundImage: `url(${imageNews.src})` }}
      >
        <Image
          className="object-contain rounded-lg"
          src={image}
          alt={title}
          width={180}
          height={300}
        />
      </div>
      <div className="col-span-7 p-5">
        <h2
          className="head-4 capitalize text-gray-700"
          style={{ color: "#262626" }}
        >
          {title}
        </h2>
        <p className="mt-4 text-gray-600">{desc}</p>
        <div className="my-5 flex items-center gap-2 text-gray-600">
          <Image src={IconDate} alt="date" />
          <span className="text-sm">{date}</span>
        </div>
        <div className="mt-10 flex items-center flex-wrap">
          <Button
            className={"bg-primary-100 text-white inline-block"}
            title={"Register"}
            path={register || "/"}
          />
          <Button
            className={
              "bg-transparent text-primary-100 hover:bg-transparent hover:text-secondary-200"
            }
            title={"More Info"}
            path={`/event/${generateSlug(title)}`}
          />
        </div>
      </div>
    </div>
  );
}

export default CardEvent;
