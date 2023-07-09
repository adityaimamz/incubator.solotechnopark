import Alert from "@/components/Alert";
import DataNotFound from "@/components/DataNotFound";
import ProgramDetailModal from "@/components/modals/ProgramDetailModal";
import { useAppContext } from "@/context/AppContext";
import { axiosPrivate } from "@/pages/api/axios";
import DashboardLayout from "@/pages/layouts/DashboardLayout";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function ProgramDetail() {
  const router = useRouter();
  const { programId } = router.query;

  const [state, dispatch] = useAppContext();
  const [programData, setProgramData] = useState([]);
  const [loading, setLoading] = useState();
  const [programDetailData, setProgramDetailData] = useState([]);

  useEffect(() => {
    if (!state.isModal) {
      getProgramData();
    }
  }, [state.isModal, programId]);

  const getProgramData = async () => {
    try {
      const responseProgram = await axiosPrivate.get(
        `program/detail/${programId}`
      );
      const responseProgramDetail = await axiosPrivate.get(
        `program/detail/all?id=${programId}`
      );

      setProgramData(responseProgram.data.data);
      setProgramDetailData(responseProgramDetail.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setProgramData([]);
      setLoading(true);
    }
  };

  const handleDelete = async (uuid) => {
    const dialog = window.confirm("Anda yakin ingin menghapus ?");
    const token = Cookies.get("token");

    if (dialog) {
      try {
        const response = await axiosPrivate.delete(`program/detail/${uuid}`, {
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
          getProgramData();
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
      <section className="mb-5">
        {state.isMessage.status ? (
          <Alert
            status={state.isMessage.status}
            message={state.isMessage.message}
          />
        ) : null}
        <div className="overflow-x-auto shadow-md">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            {programData && programData.length > 0 ? (
              programData.map((data, i) => (
                <tbody key={i}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-4 py-4 capitalize font-medium">
                      Logo Image
                    </td>
                    <td
                      scope="row"
                      className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      :{" "}
                      <Image
                        className="rounded-md"
                        src={data.logo || ""}
                        width={60}
                        height={40}
                        alt={data.name}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 capitalize font-medium">
                      Nama Program
                    </td>
                    <td className="px-4 py-4 capitalize font-medium">
                      : {data.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 capitalize font-medium">
                      Alamat Pendaftaran Program
                    </td>
                    <td className="px-4 py-4">: {data.url_register}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 capitalize font-medium">
                      Deskripsi Singkat Program
                    </td>
                    <td className="px-4 py-4">: {data.description}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td>
                    <DataNotFound />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </section>

      <section>
        <ProgramDetailModal />

        {programDetailData && programDetailData.length > 0 ? (
          programDetailData.map((data, i) => (
            <div key={i} className="overflow-x-auto shadow-md mt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  onClick={(e) => handleDelete(data.uuid)}
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
              </div>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-600">
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-4 py-4 capitalize font-medium">
                      Logo Image
                    </td>
                    <td
                      scope="row"
                      className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <Image
                        className="rounded-md"
                        src={data.logo}
                        width={120}
                        height={40}
                        alt={data.title}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 capitalize font-medium">Image</td>
                    <td className="px-4 py-4">
                      <Image
                        className="rounded-md"
                        src={data.image}
                        width={120}
                        height={40}
                        alt={data.title}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 capitalize font-medium">
                      Nama Program
                    </td>
                    <td className="px-4 py-4 capitalize font-medium">
                      : {data.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 capitalize font-medium">
                      Alamat Pendaftaran Program
                    </td>
                    <td className="px-4 py-4">: {data.url_pendaftaran}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 capitalize font-medium">
                      Deskripsi Detail Program
                    </td>
                    <td
                      className="px-4 py-4 news-content"
                      dangerouslySetInnerHTML={{ __html: data.content }}
                    ></td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <DataNotFound />
        )}
      </section>
    </DashboardLayout>
  );
}

export default ProgramDetail;
