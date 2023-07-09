import DashboardLayout from "@/pages/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "@/pages/api/axios";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import quilModules from "@/config/react-quil";
import { formatDate } from "@/utils/convertDate";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // pastikan ReactQuill hanya dijalankan pada sisi klien
});

function EditEvent() {
  const router = useRouter();
  const { uuid } = router.query;

  const [state, dispatch] = useAppContext();
  const [fileName, setFileName] = useState("");

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [date, setDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [destination, setDestination] = useState("");

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategory();
  }, []);

  useEffect(() => {
    if (uuid) {
      getEventDataById();
    }
  }, [uuid]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setImage(file);
    setImageUrl(URL.createObjectURL(file)); // Membuaft URL objek sementara
  };

  const getCategory = async () => {
    try {
      const response = await axiosPrivate.get("category/all?status=content");

      setCategoryList(response.data.data);
    } catch (err) {
      console.log(err);
      setCategoryList([]);
    }
  };

  const getEventDataById = async () => {
    try {
      const response = await axiosPrivate.get(`event/detail/${uuid}`);
      const data = response.data.data[0];

      setTitle(data.title);
      setSubtitle(data.subtitle);
      setDate(formatDate(data.date));
      setDeadline(formatDate(data.deadline));
      setImage(data.thumb);
      setDestination(data.url_register);
      setText(data.content);
      setCategory(data.category);
    } catch (err) {
      console.log(err);
      window.alert("Maaf ! terjadi kesalahan");
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("date", date);
    formData.append("deadline", deadline);
    formData.append("image-event", image);
    formData.append("content", text);
    formData.append("destination", destination);
    formData.append("category", category);

    try {
      const token = Cookies.get("token");

      await axiosPrivate.put(`event/${uuid}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: {
          status: "success",
          message: `Berhasil mengubah data ${uuid}`,
        },
      });

      setLoading(false);
      router.push("/admin/event");
    } catch (err) {
      console.log(err);
      setLoading(true);
      window.alert("Maaf terjadi kesalahan");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Edit Data Tenant</h1>

      <div className="bg-white rounded-lg shadow dark:bg-gray-700">
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
            Add event into our platform
          </h3>
          <form className="space-y-6" action="#">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter event title"
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
                  Event Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter event subtitle"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Event Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter event date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="deadline"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Event Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter event deadline"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
              >
                Event Content
              </label>

              <ReactQuill
                value={text}
                onChange={setText}
                modules={quilModules.modules}
                formats={quilModules.formats}
                style={{ height: "400px", marginBottom: "4.5rem" }}
                theme="snow"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="destination"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Event Destination
                </label>
                <input
                  type="text"
                  name="destination"
                  id="destination"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter event destination"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Event Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option defaultValue={""}>Choose a category</option>
                  {categoryList.map((data, i) => (
                    <option key={i} value={data.slug} className="capitalize">
                      {data.category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
              >
                Event Image
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="w-full h-[256px] bg-gray-50 overflow-hidden rounded-lg flex justify-center items-start">
                  <Image
                    className="object-contain w-full"
                    src={imageUrl ? imageUrl : image}
                    alt="Image Viewer"
                    width={440}
                    height={250}
                  />
                </div>
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
                      {fileName ? null : (
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
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
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      name="imageLogo"
                      onChange={handleFileChange}
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
              {loading ? "Loading ..." : "Edit Event Now"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditEvent;
