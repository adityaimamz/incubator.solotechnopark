import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import CardNews from "@/components/cards/CardNews";
import Button from "@/components/Button";
import SecondaryLayout from "../layouts/SecondaryLayout";
import axios from "../api/axios";
import DataNotFound from "@/components/DataNotFound";

function News() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      const response = await axios.get("news/all");

      setNewsData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SecondaryLayout>
      <section>
        <div className="container py-24">
          <Title
            title={
              "Some <strong class='text-primary-100' >News</strong> That are Ready to be Presented for You"
            }
            subtitle={
              "Kami adalah lembaga intermediasi yang melakukan proses inkubasi terhadap peserta inkubasi (tenant)."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
            {newsData.length > 0 ? (
              newsData.map((data, i) => (
                <CardNews
                  key={i}
                  title={data.title}
                  date={data.date}
                  image={data.image}
                  path={`/news/${data.slug}`}
                />
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-3 text-center mx-auto flex justify-center items-center">
                <DataNotFound />
              </div>
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

export default News;
