import { useAppContext } from "@/context/AppContext";
import { axiosPrivate } from "@/pages/api/axios";
import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

function TaglineModelEdit() {
  const [state, dispatch] = useAppContext();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    getTaglineDataById(state.isId);
  }, [state.isId]);

  const getTaglineDataById = async (uuid) => {
    try {
      const response = await axiosPrivate.get(`content/tagline/${uuid}`);
      const data = response.data.data[0];

      setTitle(data.title);
      setSubtitle(data.subtitle);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  };

  const handleEditTagline = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("token");

      const response = await axiosPrivate.put(
        `content/tagline/${state.isId}`,
        {
          title,
          subtitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLoading(false);
        dispatch({
          type: "SET_MESSAGE",
          payload: {
            status: "success",
            message: `Berhasil memperbarui data ${state.isId}`,
          },
        });
        dispatch({
          type: "SET_IS_MODAL",
          payload: false,
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(true);
      alert("Maaf terjadi kesalahan");
    }
  };

  return (
    <>
      <div
        id="authentication-modal"
        tabIndex={-1}
        aria-hidden="true"
        className={`fixed ${
          state.isModal ? "flex" : "hidden"
        } justify-center items-center top-0 left-0 right-0 bottom-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-black/50`}
      >
        <div className="relative w-full max-w-lg max-h-full">
          {/* Modal content */}
          <OutsideClickHandler
            onOutsideClick={() => {
              dispatch({
                type: "SET_IS_MODAL",
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
                    type: "SET_IS_MODAL",
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
                  Edit tagline into our platform
                </h3>
                <form className="space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                    >
                      Tagline Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter tagline title"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subtitle"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                    >
                      Tagline Subtitle
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      id="subtitle"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter tagline subtitle"
                      required
                      value={subtitle}
                      onChange={(e) => setSubtitle(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleEditTagline}
                  >
                    Edit Tagline Now
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

export default TaglineModelEdit;
