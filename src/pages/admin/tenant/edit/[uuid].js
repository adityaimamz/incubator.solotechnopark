import DashboardLayout from "@/pages/layouts/DashboardLayout";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import quilModules from "@/config/react-quil";
import axios, { axiosPrivate } from "@/pages/api/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // pastikan ReactQuill hanya dijalankan pada sisi klien
});

function EditTenant() {
  const router = useRouter();
  const { uuid } = router.query;

  const [state, dispatch] = useAppContext();
  const [fileName, setFileName] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantFounder, setTenantFounder] = useState("");
  const [tenantEmail, setTenantEmail] = useState("");
  const [tenantAddress, setTenantAddress] = useState("");
  const [tenantContact, setTenantContact] = useState("");
  const [tenantLevel, setTenantLevel] = useState("");
  const [tenantDesc, setTenantDesc] = useState("");
  const [tenantLogo, setTenantLogo] = useState({});
  const [level, setLevel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tenantLogoUrl, setTenantLogoUrl] = useState({});
  const [tenantFile, setTenantFile] = useState("");
  const [tenantFileUrl, setTenantFileUrl] = useState("");

  useEffect(() => {
    getLevelData();
  }, []);

  useEffect(() => {
    if (uuid) {
      getTenantDataById();
    }
  }, [uuid]);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];

  //   setFileName(file.name);
  //   setTenantLogo(file);
  //   setTenantLogoUrl(URL.createObjectURL(file)); // Membuaft URL objek sementara
  // };

  const getLevelData = async () => {
    try {
      const response = await axios.get("level");

      setLevel(response.data.data);
    } catch (err) {
      setLevel(245780);
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", tenantName);
    formData.append("image", tenantLogo && tenantLogo);
    formData.append("address", tenantAddress);
    formData.append("description", tenantDesc);
    formData.append("contact", tenantContact);
    formData.append("email", tenantEmail);
    formData.append("founder", tenantFounder);
    formData.append("level_tenant", tenantLevel);
    formData.append("katalog", tenantFile ? tenantFile : "");

    try {
      const token = Cookies.get("token");

      await axiosPrivate.put(`tenant/${uuid}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch({
        type: "SET_MESSAGE",
        payload: {
          status: "success",
          message: `Berhasil mengedit data ${uuid}`,
        },
      });

      router.push("/admin/tenant");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Maaf terjadi kesalahan");
    }
  };

  const getTenantDataById = async () => {
    try {
      const response = await axiosPrivate.get(`tenant/all?id=${uuid}`);

      const data = response.data.data[0];

      setTenantName(data.name);
      setTenantFounder(data.founder);
      setTenantEmail(data.email);
      setTenantAddress(data.address);
      setTenantContact(data.contact);
      setTenantLevel(data.level);
      setTenantDesc(data.description);
      setTenantLogoUrl(data.image);
      setTenantFileUrl(data.file);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="font-medium text-xl">Edit Data Tenant</h1>

      <div className="bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="px-6 py-6 lg:px-8">
          <form className="space-y-6" method="POST">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Tenant Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter tenant name"
                  required
                  value={tenantName}
                  onChange={(e) => setTenantName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="founder"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Tenant founder
                </label>
                <input
                  type="text"
                  name="founder"
                  id="founder"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter tenant founder"
                  required
                  value={tenantFounder}
                  onChange={(e) => setTenantFounder(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Tenant email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter tenant email"
                  required
                  value={tenantEmail}
                  onChange={(e) => setTenantEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Tenant Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter tenant address"
                  required
                  value={tenantAddress}
                  onChange={(e) => setTenantAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Tenant contact
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter tenant contact"
                  required
                  value={tenantContact}
                  onChange={(e) => setTenantContact(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="level"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Program level
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={tenantLevel}
                  onChange={(e) => setTenantLevel(e.target.value)}
                >
                  <option value={""}>Pilih Level Program</option>
                  {level.length > 0 &&
                    level.map((data, i) => (
                      <option key={i} value={data.name}>
                        {data.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* upload katalog */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload file
              </label>
              <input
                className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="file_input_help"
                id="file_input"
                type="file"
                name="katalog"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setTenantFile(file);
                }}
              />
              <Link
                href={tenantFileUrl && tenantFileUrl}
                target="_blank"
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                {tenantFileUrl ? tenantFileUrl : "PDF, DOC (MAX. 800x400px)."}
              </Link>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
              >
                Tenant description
              </label>

              <ReactQuill
                value={tenantDesc}
                onChange={setTenantDesc}
                modules={quilModules.modules}
                formats={quilModules.formats}
                theme="snow"
                style={{ height: "200px", marginBottom: "4.5rem" }}
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
              >
                Tenant Image (Logo)
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="w-full h-[256px] bg-gray-50 overflow-hidden rounded-lg flex justify-center items-start">
                  {tenantLogoUrl && (
                    <Image
                      className="object-contain w-full"
                      src={tenantLogoUrl && tenantLogoUrl}
                      alt="Image Viewer"
                      width={440}
                      height={250}
                    />
                  )}
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
                      onChange={(e) => {
                        const file = e.target.files[0];

                        setFileName(file.name);
                        setTenantLogo(file);
                        setTenantLogoUrl(URL.createObjectURL(file)); // Membuaft URL objek sementara
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
              {loading ? "Loading ..." : "Edit Tenant Now"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditTenant;
