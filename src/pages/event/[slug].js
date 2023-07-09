import React from "react";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import axios from "../api/axios";
import Image from "next/image";
import ToTop from "@/components/ToTop";
import LoadingError from "@/components/LoadingError";
import SecondaryLayout from "../layouts/SecondaryLayout";
import Link from "next/link";

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { slug } = params;

    const event = await axios.get(`event/${slug}`);
    const eventData = event.data.data[0];

    return {
      props: {
        event: eventData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        event: null,
      },
    };
  }
}

function DetailEvent({ event }) {
  return (
    <SecondaryLayout>
      {event ? (
        <>
          <ToTop />
          <section>
            <div className="bg-hero h-72 w-full hidden lg:flex justify-center items-center bg-top bg-no-repeat bg-cover">
              <h1 className="head-2 mx-auto text-center text-white">
                More <strong className="text-secondary-200">Events</strong> To
                Improve Your Quality
              </h1>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="flex flex-col lg:flex-row items-center gap-10 border-b">
                <div className="hidden lg:flex justify-center items-center bg-gray-200 w-full max-w-xs h-72 rounded-lg relative lg:-translate-y-10 overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    src={event.thumb}
                    alt={event.title}
                    width={320}
                    height={288}
                  />
                </div>
                <div className="my-4">
                  <Badge content={event.category} />
                  <h1 className="font-bold text-3xl capitalize">
                    {event.title}
                  </h1>
                  <span className="text-gray-500">{event.subtitle}</span>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container py-10 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                <div className="lg:col-span-8 order-2 lg:order-1">
                  <div className="bg-slate-100 rounded-lg h-auto w-full flex justify-center items-center overflow-hidden">
                    <Image
                      className="object-cover w-full h-full"
                      src={event.image}
                      alt={event.title}
                      width={714}
                      height={700}
                    />
                  </div>
                  <div
                    className="event-content mt-10 text-gray-500 overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: event.content }}
                  />
                </div>
                <div className="lg:col-span-4 order-1 lg:order-2">
                  <div className="border rounded-lg p-5 ">
                    <span className="text-gray-500 text-sm">
                      Terbuka hingga
                    </span>
                    <h2 className="head-5 mt-2 text-gray-700 ">
                      {event.deadline}
                    </h2>
                    <Link
                      target="_blank"
                      href={event.url_register}
                      className={
                        "btn btn-primary  py-2 px-10 rounded-md hover:bg-secondary-200 transition-all bg-primary-100 text-white inline-block mt-5"
                      }
                      title={"Join Now"}
                    >
                      Join Now
                    </Link>
                  </div>

                  <Button
                    className={
                      "bg-primary-100 text-white inline-block mt-5 w-full text-center"
                    }
                    title={"Back"}
                    path="/event"
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <LoadingError />
      )}
    </SecondaryLayout>
  );
}

export default DetailEvent;
