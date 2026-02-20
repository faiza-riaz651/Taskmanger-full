import React from "react";

const Error = ({ error }) => {
  let color = "";
  console.log(error.status);
  if (error?.status >= 400) {
    color = "red";
  } else if (error?.status >= 500) color = "gray";
  else color = "yellow";

  console.log(color);
  return (
    <div
      className={`ml-3 md:ml-65 border w-[62rem] md:mr-3 mr-1  ${color === "red" ? "border-red-900 bg-red-50 text-red-900" : "border-gray-900 bg-gray-50 text-gray-900"} h-16 rounded-md text-xl flex items-center font-semibold `}
    >
      <span className="ml-2 "> {error?.status}.</span>
      <span className="ml-2">{error?.data?.error}</span>
    </div>
  );
};

export default Error;
