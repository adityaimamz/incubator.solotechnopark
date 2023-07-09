import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";
import { axiosPrivate } from "@/pages/api/axios";
import DataNotFound from "@/components/DataNotFound";
import ButtonDelete from "@/components/button/ButtonDelete";
import ButtonEdit from "@/components/button/ButtonEdit";
import { useRouter } from "next/router";
import Alert from "@/components/Alert";
import { useAppContext } from "@/context/AppContext";

function Tenant() {
  const router = useRouter();
  const [state, dispatch] = useAppContext();
  const [tenantData, setTenantData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTenantData();
  }, []);

  const getTenantData = async () => {
    try {
      const response = await axiosPrivate.get("tenant/all");

      setTenantData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setTenantData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Tenants</h1>
      {/* <TenantModal /> */}

      <div className="mb-5 flex justify-between items-center">
        <Link
          href={"/admin/tenant/add"}
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Tenant
        </Link>

        {state.isMessage.status && (
          <Alert
            status={state.isMessage.status}
            message={state.isMessage.message}
          />
        )}

        <span className="text-gray-500">
          Total Rows : {tenantData.length} Row
        </span>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                No.
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Founder
              </th>
              <th scope="col" className="px-4 py-3">
                Product
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>

              <th scope="col" className="px-4 py-3">
                Program Level
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {tenantData.length > 0 ? (
              tenantData.map((data, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4">{i + 1}.</td>
                  <td
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
                    <div className="pl-3">
                      <div className="text-base font-medium capitalize">
                        {data.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 capitalize">{data.founder}</td>
                  <td className="px-4 py-4 capitalize">{data.product}</td>
                  <td className="px-4 py-4 capitalize">{data.email}</td>
                  <td className="px-4 py-4 capitalize">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                      {data.level}
                    </div>
                  </td>
                  <td className="px-4 py-4 flex gap-2 ">
                    <Link
                      href={`tenant/${data.uuid}`}
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
                    >
                      <BsThreeDots />
                    </Link>

                    <ButtonEdit
                      onClick={() => router.push(`tenant/edit/${data.uuid}`)}
                    />

                    <ButtonDelete
                      name="tenant"
                      callAPI={`tenant/${data.uuid}`}
                      refetchData={getTenantData}
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

export default Tenant;
