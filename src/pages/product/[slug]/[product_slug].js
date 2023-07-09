import React from "react";
import Title from "@/components/Title";
import Button from "@/components/Button";
import { BsFillTelephoneFill, BsTwitter } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import Link from "next/link";
import CardTenant from "@/components/cards/CardTenant";
import axios from "@/pages/api/axios";
import Image from "next/image";
import LoadingError from "@/components/LoadingError";
import SecondaryLayout from "@/pages/layouts/SecondaryLayout";

export async function getServerSideProps({ params }) {
  const { product_slug: slug } = params;

  try {
    const product = await axios.get(`product/${slug}`);
    const productData = product.data.data;

    const tenant = await axios.get(`tenant/all?limit=3`);
    const tenantData = tenant.data.data;

    return {
      props: {
        productData,
        tenantData,
      },
    };
  } catch (error) {
    return {
      props: {
        productData: null,
        tenantData: null,
      },
    };
  }
}

function Tenant({ productData, tenantData }) {
  console.log(productData);

  return (
    <SecondaryLayout>
      {productData.length > 0 ? (
        <>
          <section>
            <div className="container py-24">
              <Title
                title={"This Is The Best Product We Have"}
                subtitle={
                  "We provide access to the latest technology and infrastructure resources, helping incubators to develop their products more efficiently and effectively"
                }
                textColor={"text-gray-500"}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-20 my-20">
                <div>
                  <div className="bg-primary-100 w-full h-72 rounded-l-lg rounded-br-[10rem] overflow-hidden pr-5">
                    <div className="bg-gray-100 w-full h-72 rounded-br-[10rem] flex justify-center items-center overflow-hidden">
                      {Array.isArray(productData[0].product_image) ? (
                        <Image
                          className="w-full h-full object-cover "
                          src={productData[0].product_image[0]}
                          alt={productData[0].product_name}
                          width={300}
                          height={300}
                        />
                      ) : (
                        <Image
                          className="w-full h-full object-cover "
                          src={productData[0].product_image}
                          alt={productData[0].product_name}
                          width={300}
                          height={300}
                        />
                      )}
                    </div>
                  </div>
                  <div className="mt-5">
                    <Button
                      className={"bg-primary-100 text-white inline-block"}
                      title={"More Detail"}
                      path={
                        productData[0].tenant_file !== ""
                          ? productData[0].tenant_file
                          : "/"
                      }
                      target={"_blank"}
                    />
                  </div>
                </div>
                <div className="col-span-2">
                  <h1 className="text-2xl font-bold capitalize">
                    {productData[0].product_name}
                  </h1>

                  <p className="my-5 text-gray-600">
                    {productData[0].product_short_description}
                  </p>

                  <div
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: productData[0].product_description,
                    }}
                  />

                  <div className="mt-5">
                    <h2 className="head-5 mt-10">Keunggulan : </h2>
                    <p>{productData[0].product_advantage}</p>

                    <h2 className="head-5 mt-10">Lisensi : </h2>
                    <p>{productData[0].product_license}</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div>
                        <h2 className="head-5 mt-10">Sosial Media : </h2>
                        <p>{productData[0].product_social_media}</p>
                      </div>
                      <div>
                        <h2 className="head-5 mt-10">Toko : </h2>
                        <p>{productData[0].product_store}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border my-20 p-10 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  <div className="flex flex-col justify-start items-center ">
                    <div className="bg-gray-100 w-40 h-40 rounded-xl border-primary-100 border-2 mx-auto flex justify-center items-center overflow-hidden">
                      <Image
                        className="w-full h-full object-contain"
                        src={productData[0].tenant_image}
                        alt={productData[0].tenant_name}
                        width={300}
                        height={300}
                      />{" "}
                    </div>
                    <ul className="flex items-center gap-5 mt-5 cursor-pointer">
                      <li>
                        <Link
                          href={"/"}
                          className="bg-primary-100 hover:bg-secondary-200 w-10 h-10 rounded-full flex justify-center items-center"
                        >
                          <FaFacebookF className="text-white" size={24} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/"}
                          className="bg-primary-100 hover:bg-secondary-200 w-10 h-10 rounded-full flex justify-center items-center"
                        >
                          <BsTwitter className="text-white" size={24} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={"/"}
                          className="bg-primary-100 hover:bg-secondary-200 w-10 h-10 rounded-full flex justify-center items-center"
                        >
                          <RiInstagramFill className="text-white" size={24} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-2">
                    <h2 className="text-2xl font-bold mb-5">
                      {productData[0].tenant_name}
                    </h2>
                    {/* <h2 className="text-lg text-gray-500 mt-2 mb-4 font-medium">
                      Founder - {productData[0].tenant_founder}
                    </h2> */}
                    <p className="text-lg text-gray-600 mt-2 mb-4 flex items-center gap-4">
                      <BsFillTelephoneFill />
                      {productData[0].tenant_contact}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 italic">
                      <MdLocationOn size={24} />
                      {productData[0].tenant_address}
                    </p>
                    <div
                      className="mt-5"
                      dangerouslySetInnerHTML={{
                        __html: productData[0].tenant_description,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container pb-24">
              <h2 className="head-4">More Tenants</h2>

              <div className="my-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-5  gap-10">
                  {tenantData &&
                    tenantData.map((data, i) => (
                      <CardTenant
                        key={i}
                        title={data.name}
                        subtitle={data.description}
                        image={data.image}
                      />
                    ))}
                </div>

                <div className="flex justify-center items-center mt-10">
                  <Button
                    className={"bg-primary-100 text-white inline-block"}
                    title={"Read More"}
                    path="/product"
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

export default Tenant;
