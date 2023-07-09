import Aos from "aos";
import Link from "next/link";
import { useEffect } from "react";

const { default: Image } = require("next/image");

function CardProduct({ title, desc, image, index, slug }) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <Link
      data-aos="fade-up"
      data-aos-delay={`${index * 100}`}
      href={`/product/${slug}`}
    >
      <div className="text-center rounded-lg w-full p-6 hover:bg-slate-50 transition-all cursor-pointer border hover:border hover:border-slate-100 h-full">
        <Image className="mx-auto" src={image} alt="product" />
        <h3 className="head-5 mt-6 mb-2 capitalize text-gray-700">{title}</h3>
        <span className="text-gray-600">Total of Product {desc}</span>
      </div>
    </Link>
  );
}

export default CardProduct;
