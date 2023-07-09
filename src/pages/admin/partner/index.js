import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Image from "next/image";
import PartnerModal from "@/components/modals/PartnerModal";
import { axiosPrivate } from "@/pages/api/axios";
import DataNotFound from "@/components/DataNotFound";
import { useAppContext } from "@/context/AppContext";
import Alert from "@/components/Alert";
import Cookies from "js-cookie";
import ButtonEdit from "@/components/button/ButtonEdit";
import ButtonDelete from "@/components/button/ButtonDelete";
import PartnerEditModal from "@/components/modals/PartnerEditModal";

function Partner() {
  const [partnerData, setPartnerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (!state.isModal || !state.isEdit) {
      getPartnerData();
    }
  }, [state.isModal, state.isEdit]);

  const getPartnerData = async () => {
    try {
      const response = await axiosPrivate.get("partner");
      const data = response.data.data;
      setPartnerData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setPartnerData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Partners</h1>

      <div className="flex justify-between items-center">
        <PartnerModal />
        <PartnerEditModal />

        <span className="text-gray-500">
          Total Partner : {partnerData.length} Partner
        </span>
      </div>

      {state.isMessage.status && (
        <Alert
          status={state.isMessage.status}
          message={state.isMessage.message}
        />
      )}

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Image URL
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {partnerData && partnerData.length > 0 ? (
              partnerData.map((data, i) => (
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
                      src={data.logo}
                      width={40}
                      height={40}
                      alt={data.name}
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold capitalize">
                        {data.name}
                      </div>
                    </div>
                  </th>
                  <td className="px-4 py-4">{data.logo}</td>
                  <td className="px-4 py-4 flex gap-2">
                    <ButtonEdit
                      onClick={() => {
                        dispatch({ type: "SET_IS_EDIT", payload: true });
                        dispatch({ type: "SET_ID", payload: data.uuid });
                      }}
                    />
                    <ButtonDelete
                      name="team"
                      callAPI={`partner/${data.uuid}`}
                      refetchData={getPartnerData}
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

export default Partner;
