import React from "react";
import CardMitra from "./cards/CardMitra";

function Mitra({ data: mitraData }) {
  return (
    <div className="flex justify-center items-center flex-wrap mt-24 gap-5">
      {mitraData &&
        mitraData.map((data, i) => (
          <CardMitra key={i} title={data.name} image={data.logo} index={i} />
        ))}
    </div>
  );
}

export default Mitra;
