import React from "react";

function Alert({ status, message }) {
  const color =
    status === "success"
      ? "text-green-800 bg-green-50"
      : status === "warning"
      ? "text-yellow-800 bg-yellow-50"
      : status === "info"
      ? "text-blue-800 bg-blue-50"
      : "text-red-800 bg-red-50";

  return (
    <div
      className={`p-4 mb-4 text-sm rounded-lg dark:bg-gray-800 dark:text-blue-400 capitalize ${color}`}
      role="alert"
    >
      {message}
    </div>
  );
}

export default Alert;
