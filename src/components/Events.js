import React from "react";
import CardEvent from "./cards/CardEvent";
import Button from "./Button";
import SkeletonEvent from "./skeleton/SkeletonEvent";

function Events({ data: eventData }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16 lg:my-20">
        {eventData.length > 0 ? (
          eventData.map((data, i) => (
            <CardEvent
              key={i}
              title={data.title}
              desc={data.subtitle}
              date={data.date}
              image={data.image}
              index={i}
              register={data.url_register}
            />
          ))
        ) : (
          <>
            <SkeletonEvent />
            <SkeletonEvent />
            <SkeletonEvent />
            <SkeletonEvent />
          </>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Button
          className={"bg-secondary-200 text-primary-100 inline-block "}
          title={"Read More"}
          path={"/event"}
        />
      </div>
    </div>
  );
}

export default Events;
