import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Image from "next/image";
import TeamModal from "@/components/modals/TeamModal";
import { axiosPrivate } from "@/pages/api/axios";
import DataNotFound from "@/components/DataNotFound";
import { useAppContext } from "@/context/AppContext";
import Alert from "@/components/Alert";
import ButtonEdit from "@/components/button/ButtonEdit";
import ButtonDelete from "@/components/button/ButtonDelete";
import TeamEditModal from "@/components/modals/TeamEditModal";

function Team() {
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (!state.isModal || !state.isEdit) {
      getTeamData();
    }
  }, [state.isModal, state.isEdit]);

  const getTeamData = async () => {
    try {
      const response = await axiosPrivate.get("team");

      const data = response.data.data;

      setTeamData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setTeamData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Teams</h1>

      <TeamModal />
      <TeamEditModal />

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
            {teamData && teamData.length > 0 ? (
              teamData.map((data, i) => (
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
                      alt="Jese image"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold capitalize">
                        {data.name}
                      </div>
                    </div>
                  </th>
                  <td className="px-4 py-4 italic">{data.position}</td>
                  <td className="px-4 py-4 flex gap-2">
                    <ButtonEdit
                      onClick={() => {
                        dispatch({ type: "SET_IS_EDIT", payload: true });
                        dispatch({ type: "SET_ID", payload: data.uuid });
                      }}
                    />
                    <ButtonDelete
                      name="team"
                      callAPI={`team/${data.uuid}`}
                      refetchData={getTeamData}
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

export default Team;
