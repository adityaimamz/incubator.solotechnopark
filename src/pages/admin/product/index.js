import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { axiosPrivate } from "@/pages/api/axios";
import DataNotFound from "@/components/DataNotFound";
import Link from "next/link";
import ButtonDelete from "@/components/button/ButtonDelete";
import ButtonEdit from "@/components/button/ButtonEdit";
import { useRouter } from "next/router";
import Alert from "@/components/Alert";
import { useAppContext } from "@/context/AppContext";

function ProductPage() {
  const [state, dispatch] = useAppContext();
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getProductData();
  }, []);

  const getProductData = async () => {
    try {
      const response = await axiosPrivate.get("product/all");
      const data = response.data.data;
      setProductData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setProductData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Products</h1>
      <div className="mb-5 flex justify-between items-center">
        <Link
          href={"/admin/tenant"}
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Product
        </Link>

        <span className="text-gray-500">Total Rows : 12 Row</span>
      </div>
      {state.isMessage.status && (
        <Alert
          status={state.isMessage.status}
          message={state.isMessage.message}
        />
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Image{" "}
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Slug
              </th>
              <th scope="col" className="px-4 py-3">
                Category
              </th>
              <th scope="col" className="px-4 py-3">
                Description
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productData && productData.length > 0 ? (
              productData.map((data, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      className="w-10 h-10 rounded-full"
                      src={data.image}
                      width={40}
                      height={40}
                      alt={data.name}
                    />
                  </th>
                  <td className="px-4 py-4">
                    <div className="text-base font-semibold capitalize">
                      {data.name}
                    </div>
                  </td>
                  <td className="px-4 py-4">{data.slug}</td>
                  <td className="px-4 py-4 italic capitalize">
                    {data.category}
                  </td>
                  <td className="px-4 py-4">{data.description}</td>
                  <td className="px-4 py-4 flex gap-2">
                    {/* Modal toggle */}
                    <Link
                      href={`tenant/${data.tenant_uuid}`}
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
                    >
                      <BsThreeDots />
                    </Link>
                    <ButtonEdit
                      onClick={() =>
                        router.push(`product/edit/${data.product_uuid}`)
                      }
                    />
                    <ButtonDelete
                      name={"product"}
                      callAPI={`product/${data.product_uuid}`}
                      refetchData={getProductData}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>
                  <DataNotFound />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default ProductPage;
