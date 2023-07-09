import Title from "@/components/Title";
import DefaultLayout from "@/pages/layouts";
import React from "react";

function event() {
  return (
    <DefaultLayout>
      <div className="container py-24">
        <Title
          title={
            "<strong class='text-primary-100'>ShineTalk Event</strong> That We Will Open"
          }
          subtitle={
            "Kami adalah lembaga intermediasi yang melakukan proses inkubasi terhadap peserta inkubasi (tenant)."
          }
          textColor={"text-gray-500"}
        />

        <h2 className="head-4">Incoming</h2>
        <h2 className="head-4">Past</h2>
        <h2 className="head-4">Support By</h2>
      </div>
    </DefaultLayout>
  );
}

export default event;
