import React from "react";
import Title from "@/components/Title";
import axios from "../api/axios";
import Image from "next/image";
import LoadingError from "@/components/LoadingError";
import SecondaryLayout from "../layouts/SecondaryLayout";
import { AiOutlineMail, AiTwotoneStar } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import Button from "@/components/Button";

export async function getServerSideProps({ params }) {
  const { slug } = params;

  try {
    const product = await axios.get(`product/${slug}`);
    const productData = product.data.data;

    const tenant = await axios.get(`tenant/${slug}`);
    const tenantData = tenant.data.data;

    return {
      props: {
        productData,
        tenantData,
      },
    };
  } catch (error) {
    console.error("ini error gaes");
    return {
      props: {
        productData: null,
        tenantData: null,
      },
    };
  }
}

function Tenant({ productData, tenantData }) {
  return (
    <SecondaryLayout>
      {productData.length > 0 ? (
        <>
          <section>
            <div className="container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20 my-20">
                <div className="bg-gray-100 w-full h-72 rounded-md flex justify-center items-center overflow-hidden">
                  <Image
                    className="w-full h-full object-contain p-2 rounded-md"
                    src={tenantData[0].tenant_image}
                    alt={tenantData[0].tenant_image}
                    width={300}
                    height={300}
                  />
                </div>
                <aside className="col-span-2">
                  <section>
                    <h1 className="head-3 capitalize">
                      {tenantData[0].tenant_name}
                    </h1>

                    <h2 className="text-xl text-gray-500 mb-5 capitalize">
                      Founder - {tenantData[0].tenant_founder}
                    </h2>

                    <div className="my-5">
                      <p className="flex items-center gap-5">
                        <AiOutlineMail />
                        {tenantData[0].tenant_email}
                      </p>
                      <p className="flex items-center gap-5">
                        <BsFillTelephoneFill />
                        {tenantData[0].tenant_contact}
                      </p>
                      <p className="flex items-center gap-5">
                        <MdLocationOn />
                        {tenantData[0].tenant_address}
                      </p>
                      <p className="flex items-center gap-5">
                        <AiTwotoneStar />
                        {productData[0].tenant_level}
                      </p>
                    </div>

                    <div
                      className="text-gray-600 news-content"
                      dangerouslySetInnerHTML={{
                        __html: tenantData[0].tenant_description,
                      }}
                    />
                  </section>

                  <section>
                    <h2 className="head-5 mt-10 mb-5">Testimoni</h2>
                    <div className="p-4 rounded-md border bg-gray-50">
                      <blockquote>
                        <span className="text-3xl font-extrabold">&quot;</span>{" "}
                        lorem20 &quot;{" "}
                      </blockquote>
                    </div>
                  </section>

                  <section>
                    <h2 className="head-5 mt-10 mb-5">Foto Produk </h2>

                    <div className="">
                      <div className="flex flex-wrap items-start gap-5">
                        {Array.isArray(productData[0].product_image) ? (
                          productData[0].product_image.map((data, i) => (
                            <Image
                              key={i}
                              className="w-52 h-auto rounded-md"
                              src={data}
                              alt={"gambar produk"}
                              width={200}
                              height={200}
                            />
                          ))
                        ) : (
                          <Image
                            className="w-52 h-auto rounded-md"
                            src={productData[0].product_image}
                            alt={"gambar produk"}
                            width={200}
                            height={200}
                          />
                        )}
                      </div>
                    </div>

                    <Button
                      className={"bg-primary-100 text-white inline-block mt-10"}
                      title={"Back to Tenant"}
                      path="/tenant"
                    />
                  </section>
                </aside>
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

function loopImageProduct(data) {
  let content = [];
  for (let i = 0; i < 4; i++) {
    content.push(
      <div
        key={i}
        className="bg-primary-200 rounded-md overflow-hidden flex justify-center items-center"
      >
        <Image
          src={data[0].product_image}
          alt={"image produk"}
          width={350}
          height={350}
        />
      </div>
    );
  }

  return content;
}

export default Tenant;
