import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import CardEvent from "@/components/cards/CardEvent";
import Button from "@/components/Button";
import axios from "../api/axios";
import SkeletonEvent from "@/components/skeleton/SkeletonEvent";
import SecondaryLayout from "../layouts/SecondaryLayout";

function Event() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    const response = await axios.get("event/all");

    setEventData(response.data.data);
  };

  return (
    <SecondaryLayout>
      <section>
        <div className="container py-24">
          <Title
            title={
              "Some <strong class='text-primary-100'>Event</strong> That are Ready to be Presented for You"
            }
            subtitle={
              "Kami adalah lembaga intermediasi yang melakukan proses inkubasi terhadap peserta inkubasi (tenant)."
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
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
              </>
            )}
          </div>

          <div className="flex justify-center items-center mt-20">
            <Button
              className={"bg-primary-100 text-white inline-block"}
              title={"Back to Home"}
              path="/"
            />
          </div>
        </div>
      </section>
    </SecondaryLayout>
  );
}

export default Event;
