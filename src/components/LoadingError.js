import Image from "next/image";
import React from "react";
import logoIBT from "@/images/logo IBT.png";

function LoadingError() {
  return (
    <>
      <div className="bg-slate-50 h-[100vh] w-full flex justify-center items-center">
        <Image src={logoIBT} alt="loading ..." />
        <span className="px-5"> | </span>
        <h1>Maaf Terjadi Kesalahan ...</h1>
      </div>
      {/* <span>Periksa koneksi internet anda dan hubungkan ulang kepada kami</span> */}
    </>
  );
}

export default LoadingError;
