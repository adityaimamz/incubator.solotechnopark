import React from "react";
import { axiosPrivate } from "@/pages/api/axios";
import { BsFillTrashFill } from "react-icons/bs";
import Cookies from "js-cookie";
import { useAppContext } from "@/context/AppContext";

function ButtonDelete({ name, callAPI, refetchData }) {
  const [state, dispatch] = useAppContext();

  const handleDelete = async () => {
    const dialog = window.confirm("Anda yakin ingin menghapus ?");
    const token = Cookies.get("token");

    if (dialog) {
      try {
        const response = await axiosPrivate.delete(callAPI, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          dispatch({
            type: "SET_MESSAGE",
            payload: {
              status: "success",
              message: `Berhasil menghapus data ${name}`,
            },
          });
          refetchData();
        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: "SET_MESSAGE",
          payload: {
            status: "danger",
            message: `Gagal menghapus data ${name}`,
          },
        });
      }
    }
  };
  return (
    <button
      type="button"
      data-modal-target="editUserModal"
      data-modal-show="editUserModal"
      className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
      onClick={handleDelete}
    >
      <BsFillTrashFill />
    </button>
  );
}

export default ButtonDelete;
