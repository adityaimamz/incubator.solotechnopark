import React from "react";
import CardNews from "./cards/CardNews";

function News({ data }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-20">
      {data.map((data, i) => (
        <CardNews
          key={i}
          title={data.title}
          subtitle={data.subtitle}
          date={data.date}
          image={data.image}
          path={`/news/${data.slug}`}
          index={i}
        />
      ))}
    </div>
  );
}

export default News;
