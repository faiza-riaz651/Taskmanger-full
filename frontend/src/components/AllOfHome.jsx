import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
const AllOfHome = ({ children }) => {
  const { pathname } = useLocation();
  // console.log(pathname);
  return (
    <>
      <div className="flex pt-25  ">
        {pathname === "/register" || pathname === "/login" ? null : <Sidebar />}

        {children}
      </div>
    </>
  );
};

export default AllOfHome;
