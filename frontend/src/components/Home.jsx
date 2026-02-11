import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Nav from "../pages/Users/Nav";
import AllOfHome from "./AllOfHome";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { prevPath } from "../redux/features/pathSlice";
const Home = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(prevPath(pathname));
  }, [pathname]);
  return (
    <div>
      {/* <div className="relative">
        <Outlet />
      </div> */}
      {pathname === "/register" || pathname === "/login" ? null : <Nav />}

      {/* <Sidebar /> */}
      <AllOfHome>
        <Outlet />
      </AllOfHome>
      <ToastContainer />
    </div>
  );
};

export default Home;
