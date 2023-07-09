import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

function ToTop() {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 100) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    });
  }, []);

  return (
    <button
      onClick={() => {
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }}
      className={`fixed bottom-4 right-4 z-[9999] flex items-center h-12 w-12 justify-center rounded-full bg-secondary-200 pt-2 text-center font-bold text-primary-100 hover:animate-pulse cursor-pointer ${
        isSticky ? "flex" : "hidden"
      }`}
    >
      <FaArrowUp className="-translate-y-1 hover:-translate-y-2 transition-all" />
    </button>
  );
}

export default ToTop;
