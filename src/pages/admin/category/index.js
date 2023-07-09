import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { BsFillPencilFill, BsFillTrashFill, BsThreeDots } from "react-icons/bs";
import { axiosPrivate } from "@/pages/api/axios";
import DataNotFound from "@/components/DataNotFound";
import CategoryModal from "@/components/modals/CategoryModal";
import { useAppContext } from "@/context/AppContext";
import Cookies from "js-cookie";
import Alert from "@/components/Alert";
import ButtonEdit from "@/components/button/ButtonEdit";
import ButtonDelete from "@/components/button/ButtonDelete";
import CategoryEditModal from "@/components/modals/CategoryEditModal";

function Category() {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    if (!state.isModal || !state.isEdit) {
      getCategoryData();
    }
  }, [state.isModal, state.isEdit]);

  // useEffect(() => {
  //   const statusCount = categoryData.reduce((acc, obj) => {
  //     if (obj.status in acc) {
  //       acc[obj.status]++;
  //     } else {
  //       acc[obj.status] = 1;
  //     }
  //     return acc;
  //   }, {});

  //   const statusArray = Object.keys(statusCount).map((status) => {
  //     return { status: status, count: statusCount[status] };
  //   });

  //   // console.log(statusArray);
  //   statusArray.map((status) => {
  //     console.log(categoryData.filter((obj) => obj.status === status));
  //   });
  // }, [categoryData]);

  const getCategoryData = async () => {
    try {
      const response = await axiosPrivate.get("category/all");
      const data = response.data.data;
      setCategoryData(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setCategoryData([]);
      setIsLoading(true);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Categories</h1>

      <CategoryModal />
      <CategoryEditModal />

      {state.isMessage.status && (
        <Alert
          status={state.isMessage.status}
          message={state.isMessage.message}
        />
      )}

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-3">
                Category Name
              </th>
              <th scope="col" className="px-4 py-3">
                Category Slug
              </th>
              <th scope="col" className="px-4 py-3">
                Category For
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryData && categoryData.length > 0 ? (
              categoryData.map((data, i) => (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-4 py-4 font-bold capitalize">
                    {data.category}
                  </td>
                  <td className="px-4 py-4 italic">{data.slug}</td>
                  <td className="px-4 py-4 italic">{data.status}</td>
                  <td className="px-4 py-4 flex gap-2">
                    <ButtonEdit
                      onClick={() => {
                        dispatch({ type: "SET_IS_EDIT", payload: true });
                        dispatch({ type: "SET_ID", payload: data.id });
                      }}
                    />
                    <ButtonDelete
                      name="category"
                      callAPI={`category/${data.id}`}
                      refetchData={getCategoryData}
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

export default Category;
