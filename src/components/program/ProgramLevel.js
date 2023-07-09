import React from "react";
import Button from "../Button";
import CardStart from "../cards/CardStart";
import Title from "../Title";
import IconInkubasi1 from "@/images/inkubasi-1.svg";
import IconInkubasi2 from "@/images/inkubasi-2.svg";
import IconInkubasi3 from "@/images/inkubasi-3.svg";
import useIsDesktop from "@/hooks/useIsDesktop";

const levels = [
  {
    desc: "Merupakan suatu proses pembinaan, pendampingan, dan pengembangan yang diberikan oleh inkubator bisnis kepada peserta inkubasi (tenant).",
    title: "Pra Inkubasi",
    image: {
      url: IconInkubasi1,
      width: 60,
      height: 60,
    },
  },
  {
    desc: "Merupakan suatu proses pembinaan, pendampingan, dan pengembangan yang diberikan oleh inkubator bisnis kepada peserta inkubasi (tenant).",
    title: "Inkubasi",
    image: {
      url: IconInkubasi2,
      width: 60,
      height: 60,
    },
  },
  {
    desc: "Merupakan suatu proses pembinaan, pendampingan, dan pengembangan yang diberikan oleh inkubator bisnis kepada peserta inkubasi (tenant).",
    title: "Pasca Inkubasi",
    image: {
      url: IconInkubasi3,
      width: 60,
      height: 60,
    },
  },
];

function ProgramLevel() {
  const isDesktop = useIsDesktop();

  return (
    <div className="container">
      <Title
        title={
          "Solotechno Incubator <strong class='text-primary-100'>Program Level</strong> Stages"
        }
        textColor={"text-gray-500"}
      />

      <div className="my-10 pb-20">
        <div className="hidden border-b-3 lg:flex justify-between border-dotted border-spacing-20 mb-20">
          <span className="w-4 h-4 rounded-full bg-gray-400 translate-y-2"></span>
          <span className="w-4 h-4 rounded-full bg-gray-400 translate-y-2"></span>
          <span className="w-4 h-4 rounded-full bg-gray-400 translate-y-2"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
          {levels.map((data, i) => (
            <CardStart
              key={i}
              title={data.title}
              desc={data.desc}
              src={data.image.url}
              width={data.image.width}
              height={data.image.height}
              style={isDesktop ? { marginBottom: `${i * 3}rem` } : {}}
            />
          ))}
        </div>

        <div className="flex justify-center items-center mt-20">
          <Button
            className={"bg-primary-100 text-white inline-block"}
            title={"Back to Home"}
            path="/"
          />
        </div>
      </div>
    </div>
  );
}

export default ProgramLevel;
