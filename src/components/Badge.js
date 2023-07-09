import React from "react";

function Badge({ content, className }) {
  return (
    <span
      className={`inline-block my-2 bg-primary-200 px-5 py-1 text-sm italic rounded-md text-primary-100 font-medium ${className}`}
    >
      {content}
    </span>
  );
}

export default Badge;
