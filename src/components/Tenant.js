import React from "react";
import ImageCircle from "./ImageCircle";

function Tenant({ image }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <ImageCircle
        src={"/images/partner"}
        alt="myTenant"
        className={"text-white"}
      />
    </div>
  );
}

export default Tenant;
