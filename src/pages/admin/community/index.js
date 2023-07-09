import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ImageAvatar from "../../../images/avatar-1.jpg";
import Image from "next/image";
// import Button from "@/components/Button";
import { BsFillPencilFill, BsFillTrashFill, BsThreeDots } from "react-icons/bs";
import CommunityModal from "@/components/modals/CommunityModal";
import { axiosPrivate } from "@/pages/api/axios";
import DataNotFound from "@/components/DataNotFound";
import ButtonDelete from "@/components/button/ButtonDelete";
import Alert from "@/components/Alert";
import { useAppContext } from "@/context/AppContext";
import ButtonEdit from "@/components/button/ButtonEdit";
import CommunityEditModal from "@/components/modals/CommunityEditModal";

function Community() {
  const [state, dispatch] = useAppContext();
  const [communityData, setCommunityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!state.isModal || !state.isEdit) {
      getCommunityData();
    }
  }, [state.isModal, state.isEdit]);

  const getCommunityData = async () => {
    try {
      const response = await axiosPrivate.get("community");
      const data = response.data.data;
      setCommunityData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setCommunityData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Communyties</h1>

      <CommunityModal />
      <CommunityEditModal />

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
                Logo
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Position
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {communityData && communityData.length > 0 ? (
              communityData.map((data, i) => (
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
                  <td className="px-4 py-4">{data.name}</td>
                  <td className="px-4 py-4">{data.position}</td>
                  <td className="px-4 py-4 flex gap-2">
                    <ButtonEdit
                      onClick={() => {
                        dispatch({ type: "SET_IS_EDIT", payload: true });
                        dispatch({ type: "SET_ID", payload: data.uuid });
                      }}
                    />
                    <ButtonDelete
                      name={"community"}
                      callAPI={`community/${data.uuid}`}
                      refetchData={getCommunityData}
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

export default Community;
