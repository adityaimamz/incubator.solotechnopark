import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import { axiosPrivate } from "@/pages/api/axios";
import Link from "next/link";
import DataNotFound from "@/components/DataNotFound";
import { useAppContext } from "@/context/AppContext";
import Alert from "@/components/Alert";
import ProgramModal from "@/components/modals/ProgramModal";
import ButtonDelete from "@/components/button/ButtonDelete";
import ButtonEdit from "@/components/button/ButtonEdit";
import ProgramEditModal from "@/components/modals/ProgramEditModal";

function Program() {
  const [programData, setProgramData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (!state.isModal || !state.isEdit) {
      getProgramData();
    }
  }, [state.isModal, state.isEdit]);

  const getProgramData = async () => {
    try {
      const responseProgram = await axiosPrivate.get("program/all");

      setProgramData(responseProgram.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setProgramData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Programs Information</h1>

      <section className="mb-5">
        <ProgramModal />
        <ProgramEditModal />

        {state.isMessage.status ? (
          <Alert
            status={state.isMessage.status}
            message={state.isMessage.message}
          />
        ) : null}

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
                  Link
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
              {programData && programData.length > 0 ? (
                programData.map((data, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Image
                        className="rounded-md"
                        src={data.logo}
                        width={60}
                        height={40}
                        alt={data.name}
                      />
                    </th>
                    <td className="px-4 py-4 capitalize font-medium">
                      {data.name}
                    </td>
                    <td className="px-4 py-4">{data.url_register}</td>
                    <td className="px-4 py-4">{data.description}</td>
                    <td className="px-4 py-4 flex gap-2">
                      <Link
                        href={`program/${data.uuid}`}
                        type="button"
                        data-modal-target="detail"
                        data-modal-show="detail"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
                      >
                        <BsThreeDots />
                      </Link>
                      <ButtonEdit
                        onClick={() => {
                          dispatch({ type: "SET_IS_EDIT", payload: true });
                          dispatch({ type: "SET_ID", payload: data.uuid });
                        }}
                      />
                      <ButtonDelete
                        name="program"
                        callAPI={`program/${data.uuid}`}
                        refetchData={getProgramData}
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
      </section>
    </DashboardLayout>
  );
}

export default Program;
