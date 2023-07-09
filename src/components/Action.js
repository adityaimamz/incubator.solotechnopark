import { useAppContext } from "@/context/AppContext";
import React from "react";
import { BsFillPencilFill, BsFillTrashFill, BsThreeDots } from "react-icons/bs";

function Action({ uuid }) {
  const [state, dispatch] = useAppContext();

  return (
    <>
      <button
        type="button"
        data-modal-target="editUserModal"
        data-modal-show="editUserModal"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
      >
        <BsThreeDots />
      </button>
      <button
        type="button"
        data-modal-target="editUserModal"
        data-modal-show="editUserModal"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
        onClick={() => {
          dispatch({
            type: "SET_IS_MODAL",
            payload: true,
          });
        }}
      >
        <BsFillPencilFill />
      </button>
      <button
        type="button"
        data-modal-target="editUserModal"
        data-modal-show="editUserModal"
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
      >
        <BsFillTrashFill />
      </button>
    </>
  );
}

export default Action;
