import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex fixed items-center h-[100vh] md:justify-center  justify-start w-full bg-black/80  z-[1001] top-0 left-0 text-white">
      <Bars
        height="80"
        width="80"
        color="#FFF"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
