import Image from "next/image";
import React, { useEffect, useState } from "react";
import logoIBT from "@/images/logo IBT.png";
import {
  Link as ScrollLink,
  animateScroll as scroll,
  scroller,
  Scroll,
} from "react-scroll";
import Link from "next/link";
import { useRouter } from "next/router";

const navlinks = [
  {
    title: "Home",
    path: "Home",
  },
  {
    title: "About",
    path: "About",
  },
  {
    title: "Program",
    path: "Program",
  },
  {
    title: "Event",
    path: "Event",
  },
  {
    title: "Mentor",
    path: "Mentor",
  },
  {
    title: "Partner & Tenant",
    path: "Partner",
  },
  {
    title: "Product",
    path: "Product",
  },
  {
    title: "Community",
    path: "Community",
  },
  {
    title: "Article",
    path: "Article",
  },
  {
    title: "Contact",
    path: "Contact",
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);

  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  const onClickHamburger = (e) => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`z-50 py-5 bg-white shadow-md transition-all ${
        isSticky ? "navbar" : ""
      } ${isOpen ? "bottom-0 lg:bottom-auto" : ""}`}
    >
      <div className="container-fluid flex items-center justify-between">
        <a href={"/"} className="cursor-pointer z-[99]">
          <Image
            src={logoIBT}
            alt="Logo IBT"
            width={120}
            height={26}
            priority={true}
          />
        </a>

        <div
          className="p-3 rounded-full bg-primary-100 lg:hover:bg-slate-50 cursor-pointer transition-all lg:hidden right-5 fixed"
          onClick={onClickHamburger}
          style={{ zIndex: 99 }}
        >
          <div className="w-6 h-6 flex flex-col items-center justify-between">
            <span
              className={`bg-white h-1 w-full rounded-sm transition-all ${
                isOpen ? "rotate-45 translate-y-3" : ""
              }`}
            ></span>
            <span
              className={`bg-white h-1 w-full rounded-sm transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`bg-white h-1 w-full rounded-sm transition-all ${
                isOpen ? " -rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </div>
        <div
          className={`text-md bg-white lg:bg-transparent fixed lg:relative lg:left-0 left-0 right-0 top-0 bottom-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5 lg:gap-5 transition-all z-50  ${
            isOpen ? "translate-x-[0%]" : "translate-x-[100%] lg:translate-x-0"
          }`}
        >
          {navlinks.map((data, i) => (
            <ScrollLink
              key={i}
              className={`px-2 hover:text-primary-100 transition-all cursor-pointer`}
              to={data.path}
              smooth={true}
              duration={100}
              // onClick={() => handleScroll(data.path)}
              href="/"
            >
              {data.title}
            </ScrollLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
