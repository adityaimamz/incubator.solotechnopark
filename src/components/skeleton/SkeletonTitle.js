import React from "react";

function SkeletonTitle() {
  return (
    <div role="status" className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mb-4" />
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
      <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeletonTitle;
