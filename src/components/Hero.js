import React, { useState } from "react";
import Button from "./Button";
import { useEffect } from "react";
import Aos from "aos";
import Image from "next/image";
import HeroImage from "../images/people-hero.png";
import Group368 from "../images/rounded/Group 368.svg";
import Group369 from "../images/rounded/Group 369.svg";
import Group371 from "../images/rounded/Group 371.svg";
import Group373 from "../images/rounded/Group 373.svg";
import Group374 from "../images/rounded/Group 374.svg";
import Group375 from "../images/rounded/Group 375.svg";
// import HeroImage from "../images/image-hero.png";

function Hero({ title, subtitle, link }) {
  const [start, setStart] = useState(false);
  useEffect(() => {
    Aos.init();

    setTimeout(() => {
      setStart(true);
    }, 1000);
  }, []);

  return (
    <div className="container overflow-hidden">
      <div className="lg:h-[95vh] grid grid-cols-1 lg:grid-cols-2 lg:content-center ">
        <div className="text-white py-16 lg:py-0 flex justify-center items-center">
          <div className="">
            <h1
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-bold text-5xl max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="my-8 max-w-2xl mx-auto text-white"
            >
              {subtitle}
            </p>
            <Button
              title={"Join Now"}
              path={link}
              className={"bg-white text-primary-100 py-3 px-8"}
            />
          </div>
        </div>
        <div className="flex justify-end lg:justify-end items-center mt-16 lg:mt-0">
          <Image
            className="lg:translate-y-24 relative z-20"
            src={HeroImage}
            alt={"Image"}
            width={500}
          />
          <Image
            className={`absolute transition-all ${
              start ? "-translate-x-[28em] -translate-y-10" : ""
            }  z-0`}
            src={Group368}
            alt={"Image"}
            width={80}
            height={80}
          />
          <Image
            className={`absolute transition-all ${
              start ? "-translate-x-[18em] -translate-y-52" : ""
            } z-0`}
            src={Group369}
            alt={"Image"}
            width={80}
            height={80}
          />
          <Image
            className={`absolute transition-all ${
              start ? "-translate-y-60 -translate-x-10" : ""
            } z-0`}
            src={Group371}
            alt={"Image"}
            width={80}
            height={80}
          />
          <Image
            className={`absolute transition-all ${
              start ? "-translate-x-[36em] translate-y-60 " : ""
            } z-0`}
            src={Group373}
            alt={"Image"}
            width={80}
            height={80}
          />
          <Image
            className={`absolute transition-all ${
              start ? "-translate-x-[26em] translate-y-80" : ""
            } z-0`}
            src={Group374}
            alt={"Image"}
            width={80}
            height={80}
          />
          <Image
            className={`absolute transition-all`}
            src={Group375}
            alt={"Image"}
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
