import React from "react";
import SecondaryLayout from "@/pages/layouts/SecondaryLayout";
import Title from "@/components/Title";
import { FaUserCircle } from "react-icons/fa";
import axios from "../api/axios";
import Image from "next/image";
import Link from "next/link";
import { MdAlternateEmail } from "react-icons/md";

export async function getServerSideProps() {
  try {
    const [tenant] = await Promise.all([axios.get(`tenant/all`)]);

    return {
      props: {
        tenantData: tenant.data.data,
      },
    };
  } catch (err) {
    return {
      props: {
        tenantData: null,
      },
    };
  }
}

function TenantPage({ tenantData }) {

  console.log(tenantData)

  return (
    <SecondaryLayout>
      <section>
        <div className="container py-24">
          <Title
            title={
              "This is The Best <strong class='text-primary-100'>Tenant</strong> We Have"
            }
            subtitle={
              "Kami adalah lembaga intermediasi yang melakukan proses inkubasi terhadap peserta inkubasi (tenant)."
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-20">
            {tenantData &&
              tenantData.map((data, i) => (
                <Link
                  href={`/tenant/${data.slug}`}
                  key={i}
                  className="border rounded-md p-5 flex gap-5 hover:bg-gray-50 transition-all"
                >
                  <div className="w-32 h-28 p-2 rounded-md flex justify-center items-center overflow-hidden bg-gray-100">
                    <Image
                      className="rounded-md object-contain"
                      src={data.image}
                      alt={data.slug}
                      width={112}
                      height={100}
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between items-center gap-2 w-full">
                      <h2 className="head-4 my-1 capitalize">{data.name}</h2>
                      {/* <Badge content={data.level} /> */}
                      <small className="italic text-gray-400">
                        {data.level}
                      </small>
                    </div>
                    <p className="italic text-gray-500 mb-4 capitalize">Founder - {data.founder}</p>
                    <p className="text-gray-500 flex items-center gap-2">
                      <MdAlternateEmail className="inline-block" size={22} />{" "}
                      {data.email}
                    </p>
                    <p className="text-gray-500 flex items-center gap-2 ml-1 mr-2">
                      <FaUserCircle className="inline-block" size={18} />
                      {data.contact}
                    </p>
                  </div>
                </Link>
              ))}
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

export default TenantPage;
