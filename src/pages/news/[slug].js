import React from "react";
import Image from "next/image";
import Badge from "@/components/Badge";
import { MdDateRange } from "react-icons/md";
import Button from "@/components/Button";
import SecondaryLayout from "../layouts/SecondaryLayout";
import axios from "../api/axios";
import LoadingError from "@/components/LoadingError";
import Head from "next/head";

export async function getServerSideProps(context) {
  try {
    const { params } = context;
    const { slug } = params;

    const news = await axios.get(`news/${slug}`);
    const newsData = news.data.data[0];

    return {
      props: {
        news: newsData,
        tags: newsData.tags,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        news: null,
        tags: null,
      },
    };
  }
}

function NewsDetail({ news, tags }) {
  return (
    <SecondaryLayout>
      <Head>
        <title>{news && news.title} | solotechnopark</title>
        <meta name="description" content={news && news.content} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={tags} />
        <link rel="icon" type="image/png" href="/icon-ibt.png/" />
      </Head>

      {news ? (
        <section>
          <div className="container py-24">
            <div className="grid grid-cols-1  lg:grid-cols-12 gap-10">
              <div className="w-full h-auto lg:col-span-7 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  className="w-full h-full object-cover"
                  src={news && news.image}
                  alt="news image"
                  width={536}
                  height={536}
                />
              </div>
              <div className="news-header lg:col-span-5">
                <div className="flex flex-wrap gap-2 items-center">
                  <Badge content={news && news.category} />
                </div>

                <h1 className="head-2 capitalize">{news && news.title}</h1>

                <div className="flex items-center gap-4 my-4">
                  <MdDateRange className="text-gray-500" size={20} />
                  <span className="text-gray-500">{news && news.date}</span>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-gray-600 ">Author:</span>
                  <Badge content={news && news.author} />
                </div>
              </div>
            </div>

            <div
              className="news-content mt-20"
              dangerouslySetInnerHTML={{ __html: news && news.content }}
            />

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-600 ">Tags: </span>
              {news.tags.split(",") &&
                news.tags
                  .split(",")
                  .map((data, i) => <Badge key={i} content={data} />)}
            </div>

            <div className="flex justify-center items-center mt-10">
              <Button
                className={"bg-primary-100 text-white inline-block "}
                title={"Back to News"}
                path={"/news"}
              />
            </div>
          </div>
        </section>
      ) : (
        <LoadingError />
      )}
    </SecondaryLayout>
  );
}

export default NewsDetail;
