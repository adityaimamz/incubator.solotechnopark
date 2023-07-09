import React from "react";
import { BsFillPencilFill } from "react-icons/bs";

function ButtonEdit({ onClick }) {
  return (
    <button
      type="button"
      data-modal-target="editUserModal"
      data-modal-show="editUserModal"
      className="font-medium text-blue-600 dark:text-blue-500 hover:underline bg-slate-100 p-3 rounded-full"
      onClick={onClick}
    >
      <BsFillPencilFill />
    </button>
  );
}

export default ButtonEdit;
