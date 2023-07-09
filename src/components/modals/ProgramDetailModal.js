import { useAppContext } from "@/context/AppContext";
import { axiosPrivate } from "@/pages/api/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import quilModules from "@/config/react-quil";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // pastikan ReactQuill hanya dijalankan pada sisi klien
});

function AddProgram() {
  const router = useRouter();
  const { programId } = router.query;
  const [state, dispatch] = useAppContext();

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [fileNameImage, setFileNameImage] = useState("");
  const [fileNameLogo, setFileNameLogo] = useState("");
  const [programTitle, setProgramTitle] = useState("");
  const [programLogo, setProgramLogo] = useState("");
  const [programImage, setProgramImage] = useState("");
  const [programLink, setProgramLink] = useState("");
  const [programKey, setProgramKey] = useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", programTitle);
    formData.append("logo", programLogo);
    formData.append("image", programImage);
    formData.append("program_id", programId || "");
    formData.append("program_key", "");
    formData.append("content", text);
    formData.append("destination", programLink);

    if (fileNameImage === "" && fileNameLogo === "") {
      setLoading(false);
      return window.alert("Logo wajib di isi");
    }

    try {
      const token = Cookies.get("token");

      const response = await axiosPrivate.post("program/detail", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: { status: "success", message: "Data berhasil disimpan" },
      });

      setLoading(false);
      dispatch({
        type: "SET_IS_MODAL",
        payload: false,
      });
    } catch (err) {
      console.log(err);
      setLoading(true);
      dispatch({
        type: "SET_MESSAGE",
        payload: { status: "danger", message: "Maaf ! terjadi kesalahan" },
      });

      if (err.response.data.message) {
        window.alert(err.response.data.message);
      } else {
        window.alert("Maaf terjadi kesalahan");
      }
    }
  };

  return (
    <div className="my-6">
      <div className="my-5">
        <button
          data-modal-target="authentication-modal"
          data-modal-toggle="authentication-modal"
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => {
            dispatch({
              type: "SET_IS_MODAL",
              payload: true,
            });
          }}
        >
          Add Sub Program
        </button>
      </div>

      <div
        className={`${
          state.isModal ? "" : "hidden"
        } relative bg-white rounded-lg shadow dark:bg-gray-700`}
      >
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
            Add Program into our platform
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
                  value={programTitle}
                  onChange={(e) => setProgramTitle(e.target.value)}
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
              <ReactQuill
                value={text}
                onChange={setText}
                modules={quilModules.modules}
                formats={quilModules.formats}
                style={{ height: "300px", marginBottom: "4.5rem" }}
                theme="snow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Program Logo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                      {fileNameLogo ? null : (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {fileNameLogo
                          ? fileNameLogo
                          : "SVG, PNG, JPG or GIF (MAX. 800x400px)"}
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setProgramLogo(file);
                        setFileNameLogo(file.name);
                        // Lakukan proses upload file disini
                      }}
                    />
                  </label>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
                  Program Image (Gambar Dokumentasi)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file-2"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
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
                      {fileNameImage ? null : (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {fileNameImage
                          ? fileNameImage
                          : "SVG, PNG, JPG or GIF (MAX. 800x400px)"}
                      </p>
                    </div>
                    <input
                      id="dropzone-file-2"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setProgramImage(file);
                        setFileNameImage(file.name);
                      }}
                    />
                  </label>
                </div>
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
    </div>
  );
}

export default AddProgram;
