import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DataNotFound from "@/components/DataNotFound";
import { axiosPrivate } from "@/pages/api/axios";
import TaglineModalEdit from "@/components/modals/TaglineModalEdit";
import { useAppContext } from "@/context/AppContext";
import ButtonEdit from "@/components/button/ButtonEdit";
import Alert from "@/components/Alert";

function Tagline() {
  const [taglineData, setTaglineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (!state.isModal) {
      getTaglineData();
    }
  }, [state.isModal]);

  const getTaglineData = async () => {
    try {
      const response = await axiosPrivate.get("content/tagline");

      const data = response.data.data;

      const keys = Object.keys(data);
      let result = [];
      keys.map((val) => {
        result.push({ ...data[val], page: val });
      });

      setTaglineData(result);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setTaglineData([]);
      setIsLoading(true);
    }
  };

  const handlerEditTagline = async (uuid) => {
    dispatch({ type: "SET_IS_MODAL", payload: true });
    dispatch({ type: "SET_ID", payload: uuid });
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Taglines</h1>

      <TaglineModalEdit />

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
                For Page
              </th>
              <th scope="col" className="px-4 py-3">
                Title
              </th>
              <th scope="col" className="px-4 py-3">
                Subtitle
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taglineData && taglineData.length > 0 ? (
              taglineData.map((data, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 capitalize font-medium">
                    {data.page}
                  </td>
                  <td
                    className="px-4 py-4 capitalize"
                    dangerouslySetInnerHTML={{ __html: data.title }}
                  />
                  <td className="px-4 py-4 capitalize">{data.subtitle}</td>
                  <td className="px-4 py-4 flex gap-2">
                    <ButtonEdit onClick={() => handlerEditTagline(data.uuid)} />
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

export default Tagline;
