import { useAppContext } from "@/context/AppContext";
import { axiosPrivate } from "@/pages/api/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

function CategoryEditModal() {
  const [state, dispatch] = useAppContext();
  const [loading, setLoading] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const response = await axiosPrivate.put(
        `category/${state.isId}`,
        { category: categoryName, status: categoryStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      dispatch({
        type: "SET_MESSAGE",
        payload: { status: "success", message: "Data berhasil disimpan" },
      });
      dispatch({
        type: "SET_IS_EDIT",
        payload: false,
      });
    } catch (err) {
      console.log(err);
      setLoading(true);
      dispatch({
        type: "SET_MESSAGE",
        payload: { status: "danger", message: "Maaf ! Terjadi kesalahan" },
      });

      if (err.response.data.message) {
        window.alert(err.response.data.message);
      } else {
        window.alert("Maaf terjadi kesalahan");
      }
    }
  };

  const getCategoryDataById = async (uuid) => {
    try {
      const response = await axiosPrivate.get(`category/${uuid}`);
      const data = response.data.data[0];

      setCategoryName(data.category);
      setCategoryStatus(data.status);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  };

  useEffect(() => {
    if (state.isId) {
      getCategoryDataById(state.isId);
    }
  }, [state.isId]);

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed ${
          state.isEdit ? "flex" : "hidden"
        } justify-center items-center top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-black/50`}
      >
        <div className="relative w-full max-w-lg max-h-full">
          {/* Modal content */}
          <OutsideClickHandler
            onOutsideClick={() => {
              dispatch({
                type: "SET_IS_EDIT",
                payload: false,
              });
            }}
          >
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 -translate-y-2">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="authentication-modal"
                onClick={() => {
                  dispatch({
                    type: "SET_IS_EDIT",
                    payload: false,
                  });
                }}
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
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Add category into our platform
                </h3>
                <form className="space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                    >
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Category Name"
                      required
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                    >
                      Category Status (ex. product or content)
                    </label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={categoryStatus}
                      onChange={(e) => setCategoryStatus(e.target.value)}
                    >
                      <option value={""}>Pilih Kategori untuk ?</option>
                      <option value={"product"}>
                        Produk (untuk halaman produk dan tenan)
                      </option>
                      <option value={"content"}>
                        Konten (termasuk untuk halaman event dan news)
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading ..." : "Edit Category Now"}
                  </button>
                </form>
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      </div>
    </>
  );
}

export default CategoryEditModal;
