import Alert from "@/components/Alert";
import Badge from "@/components/Badge";
import DataNotFound from "@/components/DataNotFound";
import ProductModal from "@/components/modals/ProductModal";
import { useAppContext } from "@/context/AppContext";
import { axiosPrivate } from "@/pages/api/axios";
import DashboardLayout from "@/pages/layouts/DashboardLayout";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";

function DetailTenant() {
  const router = useRouter();
  const { uuid } = router.query;

  const [state, dispatch] = useAppContext();
  const [tenantData, setTenantData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (uuid) {
      getTenantData();
      if (!state.isModal) {
        getProductData();
      }
    }
  }, [uuid, state.isModal]);

  const getTenantData = async () => {
    try {
      const response = await axiosPrivate.get(`tenant/all?id=${uuid}`);

      setTenantData(response.data.data[0]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setTenantData([]);
      setIsLoading(true);
    }
  };

  const getProductData = async () => {
    try {
      const response = await axiosPrivate.get(`product/detail/${uuid}`);

      setProductData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setProductData([]);
      setIsLoading(true);
    }
  };

  const handleDelete = async (uuid) => {
    const dialog = window.confirm("Anda yakin ingin menghapus ?");
    const token = Cookies.get("token");

    if (dialog) {
      try {
        const response = await axiosPrivate.delete(`product/${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          dispatch({
            type: "SET_MESSAGE",
            payload: {
              status: "success",
              message: `Berhasil menghapus data ${uuid}`,
            },
          });
          getProductData();
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: "SET_MESSAGE",
          payload: {
            status: "danger",
            message: `Gagal menghapus data ${uuid}`,
          },
        });
      }
    }
  };

  return (
    <DashboardLayout>
      {tenantData && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">
          <div className="lg:col-span-2 border my-5 p-5 rounded-lg bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="flex flex-col justify-start items-center ">
                <div className="bg-gray-100 w-40 h-40 rounded-xl border-primary-100 border-2 mx-auto flex justify-center items-center overflow-hidden">
                  {tenantData && (
                    <Image
                      src={tenantData.image && tenantData.image}
                      alt={"image tenant"}
                      className="w-full h-full object-contain"
                      width={150}
                      height={150}
                    />
                  )}
                </div>
              </div>
              <div className="col-span-2">
                <h2 className="head-4 capitalize">{tenantData.name}</h2>
                <h2 className="head-5 text-gray-400 mt-2 mb-4">
                  Founder - {tenantData.founder}
                </h2>
                <span className="text-gray-600 flex items-center gap-2 italic">
                  <MdLocationOn size={24} />
                  {tenantData.address}
                </span>
                <div
                  className="event-content"
                  dangerouslySetInnerHTML={{ __html: tenantData.description }}
                />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 border my-5 p-5 rounded-lg bg-gray-50 overflow-x-auto">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="capitalize">Founder</td>
                  <td className="capitalize">:</td>
                  <td className="capitalize font-medium text-gray-700">
                    {tenantData.founder}
                  </td>
                </tr>
                <tr>
                  <td className="capitalize">email</td>
                  <td className="capitalize">:</td>
                  <td className="capitalize font-medium text-gray-700">
                    {tenantData.email}
                  </td>
                </tr>
                <tr>
                  <td className="capitalize">contact</td>
                  <td className="capitalize">:</td>
                  <td className="capitalize font-medium text-gray-700">
                    {tenantData.contact}
                  </td>
                </tr>
                <tr>
                  <td className="capitalize">level program</td>
                  <td className="capitalize">:</td>
                  <td className="capitalize font-medium text-gray-700">
                    {tenantData.level}
                  </td>
                </tr>
                <tr>
                  <td className="capitalize">created at</td>
                  <td className="capitalize">:</td>
                  <td className="capitalize font-medium text-gray-700">
                    {tenantData.createdAt}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      <section>
        {state.isMessage.status && (
          <Alert
            status={state.isMessage.status}
            message={state.isMessage.message}
          />
        )}

        <ProductModal />
      </section>

      {productData && productData.length > 0 ? (
        productData.map((data) => (
          <section key={data.uuid}>
            <div className="relative bg-white rounded-lg dark:bg-gray-700 mt-5">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="auClosethentication-modal"
                onClick={() => handleDelete(data.uuid)}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5 items-start">
                  <div className="lg:col-span-1 border p-5 rounded-lg bg-gray-50">
                    {data && (
                      <Image
                        src={data.image}
                        alt={"image"}
                        className="w-full rounded-md mb-5"
                        width={300}
                        height={300}
                      />
                    )}

                    <Badge content={data.category} />
                    <div className="mb-5">
                      <strong className="text-gray-700">License</strong>
                      <p>{data.license}</p>
                    </div>
                    <div className="mb-5">
                      <strong className="text-gray-700">Social Media</strong>
                      <p>{data.social_media}</p>
                    </div>
                    <div className="mb-5">
                      <strong className="text-gray-700">Store</strong>
                      <p>{data.store}</p>
                    </div>
                  </div>
                  <div className="lg:col-span-2 ">
                    <div className="border p-5 rounded-lg bg-gray-50">
                      <div className="mb-5">
                        <h2 className="head-5 text-gray-800 capitalize">
                          {data.name}
                        </h2>
                        <div className="event-content">
                          <p>{data.short_description}</p>

                          <div
                            className="event-content text-gray-700"
                            dangerouslySetInnerHTML={{
                              __html: data.description,
                            }}
                          />

                          <strong className="mt-8 inline-block text-gray-700">
                            Advantage
                          </strong>
                          <p>{data.advantage}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-5 items-start">
                      {Array.isArray(data.product_images) &&
                        data.product_images.map((val, i) => (
                          <Image
                            key={i}
                            className="w-40 h-auto rounded-md"
                            src={val}
                            alt={"gambar produk"}
                            width={200}
                            height={200}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <DataNotFound />
      )}
    </DashboardLayout>
  );
}

export default DetailTenant;
