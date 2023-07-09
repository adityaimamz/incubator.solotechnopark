import React, { useEffect } from "react";
import Image from "next/image";
import Badge from "../Badge";
import Link from "next/link";
import Aos from "aos";
import { useRouter } from "next/router";

function CardCategory({ title, desc, category, image, index, slug }) {
  const router = useRouter();
  const { slug: categorySlug } = router.query;

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Link
      data-aos="fade-up"
      data-aos-delay={`${index * 100}`}
      href={`/product/${categorySlug}/${slug}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3  shadow-lg border bg-white rounded-lg hover:shadow-none transition-all py-5 pr-5">
        <div className="lg:border-r overflow-hidden flex flex-col justify-center items-center">
          <div className="bg-gray-500 w-[60%] h-[100px] rounded-lg flex justify-center items-center overflow-hidden border-2 border-primary-100 mb-2">
            <Image
              className="w-full h-full object-cover"
              src={image}
              alt={title}
              width={100}
              height={100}
            />
          </div>
          <Badge content={"product"} />
        </div>
        <div className="col-span-2 ml-5">
          <h2 className="head-4">{title}</h2>
          <p className="mt-4 text-gray-600">{desc}</p>
        </div>
      </div>
    </Link>
  );
}

export default CardCategory;
