import React from "react";
import IconProduct from "../images/product-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Aos from "aos";

function Product({ title, desc, image, index, path }) {
  useEffect(() => {
    Aos.init({
      offset: 200,
    });
  }, []);

  return (
    <Link href={path}>
      <div
        data-aos="fade-up"
        data-aos-delay={`${index * 100}`}
        className="text-center rounded-lg max-w-xs p-6 hover:bg-slate-50 transition-all cursor-pointer border border-white hover:border-slate-100 mx-auto"
      >
        <Image className="mx-auto" src={image} alt="product" />
        <h3 className="head-4 mt-6 mb-2 capitalize">{title}</h3>
        <span className="text-gray-600">{desc}</span>
      </div>
    </Link>
  );
}

function Products({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-center mt-20">
      {data.length > 0
        ? data.map((data, i) => (
            <Product
              key={i}
              title={data.category_name}
              desc={`Total of Product ${data.total_products}`}
              image={IconProduct}
              index={i}
              path={`product/${data.category_slug}`}
            />
          ))
        : "Loading ..."}
    </div>
  );
}

export default Products;
