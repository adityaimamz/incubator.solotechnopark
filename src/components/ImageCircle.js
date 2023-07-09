import Image from "next/image";
import React from "react";

function ImageCircle({ src }) {
  return (
    <div
      className={`bg-slate-500 w-32 h-32 rounded-full overflow-hidden flex justify-center items-start shadow-lg`}
    >
      <Image
        className="w-full h-full object-top object-cover"
        src={src}
        alt="profil mentor"
        width={125}
        height={125}
      />
    </div>
  );
}

export default ImageCircle;
