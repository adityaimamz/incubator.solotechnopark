import Link from "next/link";
import React from "react";
import { useEffect } from "react";
import Aos from "aos";

function Button({ title, path, className, target }) {
  useEffect(() => {
    Aos.init({
      offset: -100,
    });
  }, []);

  return (
    <div data-aos="fade-up">
      <Link
        href={path}
        className={`px-8 py-2 rounded-md hover:bg-secondary-200 transition-all ${className}`}
        target={target ? target : ""}
      >
        {title}
      </Link>
    </div>
  );
}

export default Button;
