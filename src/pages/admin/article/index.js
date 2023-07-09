import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BsFillPencilFill, BsFillTrashFill, BsThreeDots } from "react-icons/bs";
import DataNotFound from "@/components/DataNotFound";
import Link from "next/link";
import DashboardLayout from "@/pages/layouts/DashboardLayout";
import { axiosPrivate } from "@/pages/api/axios";
import ButtonDelete from "@/components/button/ButtonDelete";
import Alert from "@/components/Alert";
import { useAppContext } from "@/context/AppContext";
import ButtonEdit from "@/components/button/ButtonEdit";
import { useRouter } from "next/router";

function Article() {
  const router = useRouter();
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    try {
      const response = await axiosPrivate.get("news/all");
      const data = response.data.data;
      setNewsData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setNewsData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Articles</h1>

      <div className="mb-5 flex justify-between items-center">
        <Link
          href={"/admin/article/add"}
          className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add News
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
                Image
              </th>
              <th scope="col" className="px-4 py-3">
                Title
              </th>
              <th scope="col" className="px-4 py-3">
                Author
              </th>
              <th scope="col" className="px-4 py-3">
                Slug
              </th>
              <th scope="col" className="px-4 py-3">
                Created At
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {newsData && newsData.length > 0 ? (
              newsData.map((data, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-4 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <Image
                      className="w-10 h-10 rounded-md border border-primary-100"
                      src={data.image}
                      width={40}
                      height={40}
                      alt={data.title}
                    />
                  </th>
                  <td className="px-4 py-4 capitalize font-medium">
                    {data.title}
                  </td>
                  <td className="px-4 py-4">{data.author}</td>
                  <td className="px-4 py-4 italic">{data.slug}</td>
                  <td className="px-4 py-4">{data.date}</td>
                  <td className="px-4 py-4 flex gap-2">
                    <ButtonEdit
                      onClick={() => router.push(`article/edit/${data.uuid}`)}
                    />
                    <ButtonDelete
                      name={"news"}
                      callAPI={`news/${data.uuid}`}
                      refetchData={getNewsData}
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

export default Article;
