import React, { useCallback, useEffect, useState } from "react";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import CardCategory from "@/components/cards/CardCategory";
import Button from "@/components/Button";
import DataNotFound from "@/components/DataNotFound";
import axios from "@/pages/api/axios";
import SecondaryLayout from "../layouts/SecondaryLayout";

export async function getServerSideProps(context) {
  const { slug } = context.query;
  let productData = [];

  try {
    const response = await axios.get(`product/all?category=${slug}`);
    productData = response.data.data;
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      productData,
    },
  };
}

function DetailProduct({ productData }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <SecondaryLayout>
      <section>
        <div className="container py-24">
          <Title
            title={`This is The Best Product Category <strong style="color: #2E62CC" >${
              slug && slug.replace(/-/g, " ")
            }</strong>`}
            subtitle={
              "Kami adalah lembaga intermediasi yang melakukan proses inkubasi terhadap peserta inkubasi (tenant)."
            }
            textColor={"text-gray-500"}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
            {productData.length > 0 ? (
              productData.map((data, i) => (
                <CardCategory
                  key={i}
                  slug={data.slug}
                  title={data.name}
                  desc={data.description}
                  image={data.image}
                  index={i}
                />
              ))
            ) : (
              <div className="lg:col-span-2">
                <DataNotFound />
              </div>
            )}
          </div>

          <div className="flex justify-center items-center mt-20 gap-5">
            <Button
              className={"bg-primary-100 text-white inline-block"}
              title={"Back to Product"}
              path="/product"
            />
            <a
              href="https://inkubator.solotechnopark.id"
              className={
                "py-2 px-5  rounded-md hover:bg-primary-100 hover:text-white border-primary-100 border text-primary-100 inline-block"
              }
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </SecondaryLayout>
  );
}

export default DetailProduct;
