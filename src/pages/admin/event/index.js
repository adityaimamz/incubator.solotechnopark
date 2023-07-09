import React, { useEffect, useState } from "react";
import DashboardLayout from "@/pages/layouts/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import DataNotFound from "@/components/DataNotFound";
import { axiosPrivate } from "@/pages/api/axios";
import Alert from "@/components/Alert";
import { useAppContext } from "@/context/AppContext";
import ButtonDelete from "@/components/button/ButtonDelete";
import ButtonEdit from "@/components/button/ButtonEdit";
import { useRouter } from "next/router";

function Event() {
  const router = useRouter();
  const [state, dispatch] = useAppContext();
  const [eventData, setEventData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEventData();
  }, []);

  const getEventData = async () => {
    try {
      const response = await axiosPrivate.get("event/all");

      setEventData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setEventData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Events</h1>

      <div className="mb-5">
        <Link
          href={"/admin/event/add"}
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add Event
        </Link>
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
                Image
              </th>
              <th scope="col" className="px-4 py-3">
                Title
              </th>
              <th scope="col" className="px-4 py-3 w-1/4">
                Date
              </th>
              <th scope="col" className="px-4 py-3 w-1/4">
                Deadline
              </th>
              <th scope="col" className="px-4 py-3">
                Url Register
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {eventData && eventData.length > 0 ? (
              eventData.map((data, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      className="w-10 h-10 rounded-md"
                      src={data.image}
                      width={40}
                      height={40}
                      alt={data.title}
                    />
                  </td>
                  <td className="px-4 py-4 font-medium  capitalize">
                    {data.title}
                  </td>
                  <td className="px-4 py-4 capitalize italic">{data.date}</td>
                  <td className="px-4 py-4 capitalize italic">
                    {data.deadline}
                  </td>
                  <td className="px-4 py-4 capitalize">{data.url_register}</td>
                  <td className="px-4 py-4 capitalize flex gap-2">
                    <ButtonEdit
                      onClick={() => router.push(`event/edit/${data.uuid}`)}
                    />
                    <ButtonDelete
                      uuid={data.uuid}
                      name={"event"}
                      callAPI={`event/${data.uuid}`}
                      refetchData={getEventData}
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

export default Event;
