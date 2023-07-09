import Image from "next/image";
import React from "react";
import Button from "../Button";

function ProgramRight() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-20">
      <div className="mx-5">
        <Image
          className="pb-2 border-b"
          src={ImageSolocorn}
          alt={ImageSolocorn}
          width={180}
        />
        <div className="text-gray-700">
          <p className="my-5">
            Melalui program Sebelas Maret Startup Academy (SEMESTA) Bright,
            Universitas Sebelas Maret berupaya mengembangkan ekosistem inovasi
            dan hilirisasi hasil-hasil riset dan kreasi inovasi Warga Kampus
            agar memiliki kebermanfaatan bagi masyarakat yang lebih luas.
            Program SEMESTA Bright merupakan rangkaian program dari mulai pra
            inkubasi berupa pengembangan ekosistem startup dan pelaksanaan skema
            pengembangan produk inovasi, sampai dengan proses inkubasi
            dilakukan.
          </p>
          <p className="my-5">
            Melalui program Sebelas Maret Startup Academy (SEMESTA) Bright,
            Universitas Sebelas Maret berupaya mengembangkan ekosistem inovasi
            dan hilirisasi hasil-hasil riset dan kreasi inovasi Warga Kampus
            agar memiliki kebermanfaatan bagi masyarakat yang lebih luas.
            Program SEMESTA Bright merupakan rangkaian program dari mulai pra
            inkubasi berupa pengembangan ekosistem startup dan pelaksanaan skema
            pengembangan produk inovasi, sampai dengan proses inkubasi
            dilakukan.
          </p>
          <div className="flex items-center mt-20">
            <Button
              className={"bg-primary-100 text-white inline-block"}
              title={"Pendaftaran"}
              path="/"
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-100 mx-5 lg:mx-0 rounded-lg overflow-hidden lg:rounded-r-xl">
        <Image
          className="object-cover w-full h-full"
          src={ImageFacilities}
          alt="facilites image"
        />
      </div>
    </div>
  );
}

export default ProgramRight;
