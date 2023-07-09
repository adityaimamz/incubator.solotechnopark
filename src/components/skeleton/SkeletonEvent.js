import React from "react";
import SkeletonImage from "./SkeletonImage";
import SkeletonTitle from "./SkeletonTitle";

function SkeletonEvent() {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 gap-10 p-5 rounded-lg bg-white border">
      <div className="col-span-5">
        <SkeletonImage />
      </div>
      <div className="col-span-7">
        <SkeletonTitle />
      </div>
    </div>
  );
}

export default SkeletonEvent;
