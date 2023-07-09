import React from "react";

function CardCount({ count, title }) {
  return (
    <div>
      <div
        href="#"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
          {count}
        </h5>

        <p className="font-normal text-gray-700 dark:text-gray-400 capitalize">
          Jumlah data {title} pada saat ini
        </p>
      </div>
    </div>
  );
}

export default CardCount;
