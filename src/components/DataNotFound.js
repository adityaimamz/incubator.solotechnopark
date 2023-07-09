import React, { useEffect, useState } from "react";

function DataNotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="text-center  inline-block w-full">
      {loading ? (
        <h1 className="head-2 text-gray-300 text-center mx-auto animate-pulse transition-all">
          Loading Getting Data ...
        </h1>
      ) : (
        <h1 className="head-2 text-gray-300 text-center mx-auto transition-all">
          Data Not Found
        </h1>
      )}
    </div>
  );
}

export default DataNotFound;
