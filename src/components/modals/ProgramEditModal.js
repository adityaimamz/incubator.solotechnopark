import { useAppContext } from "@/context/AppContext";
import { axiosPrivate } from "@/pages/api/axios";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

function ProgramEditModal() {
  const [state, dispatch] = useAppContext();

  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [programName, setProgramName] = useState("");
  const [programLink, setProgramLink] = useState("");
  const [programDesc, setProgramDesc] = useState("");
  const [programLogo, setProgramLogo] = useState("");
  const [programLogoUrl, setProgramLogoUrl] = useState("");

  useEffect(() => {
    if (state.isId) {
      getProgramById(state.isId);
    }
  }, [state.isId, state.isEdit]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setProgramLogo(file);
    setFileName(file.name);
    setProgramLogoUrl(URL.createObjectURL(file)); // Membuat URL objek sementara

    console.log("oke jalan");
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", programName);
    formData.append("desc", programDesc);
    formData.append("link_register", programLink);
    formData.append("logo", programLogo);

    try {
      const token = Cookies.get("token");

      const response = await axiosPrivate.put(
        `program/${state.isId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch({
        type: "SET_MESSAGE",
        payload: { status: "success", message: "Data berhasil disimpan" },
      });
      dispatch({
        type: "SET_IS_EDIT",
        payload: false,
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
      dispatch({
        type: "SET_MESSAGE",
        payload: { status: "danger", message: "Maaf ! terjadi kesalahan" },
      });
    }
  };

  const getProgramById = async (uuid) => {
    try {
      const response = await axiosPrivate.get(`program/detail/${uuid}`);
      const data = response.data.data[0];

      setProgramName(data.name);
      setProgramLink(data.url_register);
      setProgramDesc(data.description);
      setProgramLogo(data.logo);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(true);
    }
  };

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
                  Edit Program into our platform
                </h3>
                <form className="space-y-6" action="#">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                      >
                        Program Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter program name"
                        required
                        value={programName}
                        onChange={(e) => setProgramName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="link"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                      >
                        Link Register
                      </label>
                      <input
                        type="text"
                        name="link"
                        id="link"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter link register"
                        required
                        value={programLink}
                        onChange={(e) => setProgramLink(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                    >
                      Program description
                    </label>
                    <input
                      type="text"
                      name="description"
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter program description"
                      required
                      value={programDesc}
                      onChange={(e) => setProgramDesc(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="image"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                    >
                      Mentor Image
                    </label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center w-full gap-5 text-center">
                      <div className="w-full h-[256px] bg-gray-50 overflow-hidden rounded-lg flex justify-center items-start">
                        <Image
                          className="object-contain w-full"
                          src={programLogoUrl ? programLogoUrl : programLogo}
                          alt="Image Viewer"
                          width={440}
                          height={250}
                        />
                      </div>
                      <label
                        htmlFor="dropzone-file-1"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 p-4">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          {fileName ? null : (
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                          )}

                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {fileName
                              ? fileName
                              : "SVG, PNG, JPG or GIF (MAX. 800x400px)"}
                          </p>
                        </div>
                        <input
                          id="dropzone-file-1"
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                  >
                    {loading ? "Loading ..." : "Edit Program Now"}
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

export default ProgramEditModal;
