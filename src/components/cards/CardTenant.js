import React from "react";
import { useEffect } from "react";
import Aos from "aos";
import Link from "next/link";
import generateSlug from "@/utils/generateSlug";
import Image from "next/image";

function CardTenant({ title, subtitle, image }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Link href={`/tenant/${generateSlug(title)}`}>
      <div className="w-full border rounded-lg bg-white p-5 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex justify-center items-center overflow-hidden mx-auto border-primary-100 border">
          {image && (
            <Image
              className="w-full h-full object-cover"
              src={image}
              alt={title}
              width={80}
              height={80}
            />
          )}
        </div>
        <div className="mt-5">
          <h2 className="head-4">{title}</h2>
          <span className="text-gray-500 my-1">{subtitle}</span>
        </div>
      </div>
    </Link>
  );
}

export default CardTenant;
