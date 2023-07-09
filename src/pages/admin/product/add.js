import { useAppContext } from "@/context/AppContext";
import DashboardLayout from "@/pages/layouts/DashboardLayout";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import quilModules from "@/config/react-quil";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // pastikan ReactQuill hanya dijalankan pada sisi klien
});

function AddProduct() {
  const [state, dispatch] = useAppContext();

  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [productName, setProductName] = useState("");
  const [shortDes, setShortDesc] = useState("");
  const [advantage, setAdvantage] = useState("");
  const [imageProduct, setImageProduct] = useState("");
  const [license, setLicense] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [store, setStore] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file.name);
    setImageProduct(file);
    // Lakukan proses upload file disini
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("short_description", shortDes);
    formData.append("description", text);
    formData.append("advantage", advantage);
    formData.append("image-product", imageProduct);
    formData.append("license", license);
    formData.append("social_media", socialMedia);
    formData.append("category", category);

    if (fileName === "") {
      setLoading(false);
      return window.alert("Image/banner wajib di isi");
    }

    try {
      const token = Cookies.get("token");

      const response = await axiosPrivate.post("event", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
            Add product into our platform
          </h3>
          <form className="space-y-6" action="#">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter product name"
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="advantage"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Product Advantage
                </label>
                <input
                  type="text"
                  name="advantage"
                  id="advantage"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter product advantage"
                  required
                  value={advantage}
                  onChange={(e) => setAdvantage(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="license"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Product License
                </label>
                <input
                  type="text"
                  name="license"
                  id="license"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter product license"
                  required
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="product"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Product Store
                </label>
                <input
                  type="text"
                  name="product"
                  id="product"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="ex. shopee.com/yourname, tokopedia.com/yourname etc"
                  required
                  value={store}
                  onChange={(e) => setStore(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="description1"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
              >
                short Product description
              </label>
              <input
                type="text"
                name="description1"
                id="description1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter short product description"
                required
                value={shortDes}
                onChange={(e) => setShortDesc(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="description2"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
              >
                Product description
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="socmed"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Product Social Media
                </label>
                <input
                  type="text"
                  name="socmed"
                  id="socmed"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="ex. facebook.com/yourname, instagram/yourname etc"
                  required
                  value={socialMedia}
                  onChange={(e) => setSocialMedia(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
                >
                  Product Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Choose a category</option>
                  <option value="">Pangan</option>
                  <option value="">Agrikultural</option>
                  <option value="">Transportasi</option>
                  <option value="">Teknologi</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
              >
                Product Image (Logo)
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
                    onChange={handleFileChange}
                    name="images[]"
                    multiple
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              {loading ? "Loading ..." : "Add Tenant Now"}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddProduct;
