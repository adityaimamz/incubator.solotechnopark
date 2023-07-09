import React from "react";

function Title({ title, subtitle, className, textColor }) {
  return (
    <div className={`text-center ${className}`}>
      <h2
        className="head-3 mx-auto text-center capitalize"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p className={`max-w-2xl mx-auto my-5 px-5 lg:px-0 ${textColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default Title;
