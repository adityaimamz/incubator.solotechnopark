import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import Image from "next/image";
import { BsFillPencilFill, BsFillTrashFill, BsThreeDots } from "react-icons/bs";
import { axiosPrivate } from "@/pages/api/axios";
import DataNotFound from "@/components/DataNotFound";
import MentorModal from "@/components/modals/MentorModal";
import { useAppContext } from "@/context/AppContext";
import Alert from "@/components/Alert";
import Cookies from "js-cookie";
import ButtonEdit from "@/components/button/ButtonEdit";
import MentorEditModal from "@/components/modals/MentorEditModal";

function Mentor() {
  const [mentorData, setMentorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (!state.isModal || !state.isEdit) {
      getMentorData();
    }
  }, [state.isModal, state.isEdit]);

  const getMentorData = async () => {
    try {
      const response = await axiosPrivate.get("mentor");
      const data = response.data.data;

      setMentorData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setMentorData([]);
      setIsLoading(true);
    }
  };

  const deleteMentor = async (uuid) => {
    const dialog = window.confirm("Anda yakin ingin menghapus ?");
    const token = Cookies.get("token");

    if (dialog) {
      try {
        const response = await axiosPrivate.delete(`mentor/${uuid}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          getMentorData();
          dispatch({
            type: "SET_MESSAGE",
            payload: {
              status: "success",
              message: `Data ${uuid} berhasil dihapus`,
            },
          });
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
      <h1 className="font-medium text-xl">Mentors</h1>

      <div className="flex justify-between items-center">
        <MentorModal />
        <MentorEditModal />
        <span className="text-gray-500">
          Total Mentor : {mentorData.length} Mentor
        </span>
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
                No.
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
            {mentorData && mentorData.length > 0 ? (
              mentorData.map((data, i) => (
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
                      <div className="text-base font-semibold capitalize">
                        {data.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 italic">{data.position}</td>
                  <td className="px-4 py-4 flex gap-2">
                    <ButtonEdit
                      onClick={() => {
                        dispatch({ type: "SET_IS_EDIT", payload: true });
                        dispatch({ type: "SET_ID", payload: data.uuid });
                      }}
                    />
                    <button
                      type="button"
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
                      onClick={() => deleteMentor(data.uuid)}
                    >
                      <BsFillTrashFill />
                    </button>
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

export default Mentor;
