import React, { useEffect, useState } from "react";
import Title from "@/components/Title";
import CardProduct from "@/components/cards/CardProduct";
import IconProduct from "@/images/product-icon.svg";
import axios from "../api/axios";
import SecondaryLayout from "../layouts/SecondaryLayout";
import DataNotFound from "@/components/DataNotFound";

export async function getServerSideProps() {
  try {
    const [category] = await Promise.all([
      axios.get(`category/all?status=product`),
    ]);

    return {
      props: {
        categoryData: category.data.data,
      },
    };
  } catch (err) {
    return {
      props: {
        categoryData: null,
      },
    };
  }
}

function Product({ categoryData }) {
  return (
    <SecondaryLayout>
      <section>
        <div className="container py-24">
          <Title
            title={
              "This is The Best <strong class='text-primary-100'>Product</strong> We Have"
            }
            subtitle={
              "Kami adalah lembaga intermediasi yang melakukan proses inkubasi terhadap peserta inkubasi (tenant)."
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-20 gap-10">
            {categoryData && categoryData.length > 0 ? (
              categoryData.map((data, i) => (
                <CardProduct
                  key={i}
                  slug={data.slug}
                  title={data.category}
                  image={IconProduct}
                  index={i}
                  desc={data.total_products}
                />
              ))
            ) : (
              <div className="md:col-span-2 lg:col-span-4 mx-auto">
                <DataNotFound />
              </div>
            )}
          </div>

          <div className="flex justify-center items-center mt-20">
            <a
              href="https://inkubator.solotechnopark.id"
              className="py-2 px-5  rounded-md hover:bg-primary-100 hover:text-white border-primary-100 border text-primary-100 inline-block"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </SecondaryLayout>
  );
}

export default Product;
