import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbUrgent } from "react-icons/tb";
import { MdOutlineCategory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { IoMdStats } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { SiGnuprivacyguard } from "react-icons/si";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../redux/api/userApiSlice";
import { removeUserInfo } from "../redux/features/userSlice.js";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import { prevPath } from "../redux/features/pathSlice.js";

const Sidebar = () => {
  const user = useSelector((state) => state.userInfo.user);
  const dispatch = useDispatch();
  const currPath = useSelector((state) => state.prevPathInfo.currPath);
  const [logout] = useLogoutMutation();
  const [openHam, setOpenHam] = useState(false);
  const navigateTo = useNavigate();

  const toggleHam = () => {
    setOpenHam(!openHam);
  };
  const closeHam = () => {
    setOpenHam(false);
  };

  useEffect(() => {
    console.log(openHam);
  }, [openHam]);
  const logoutUser = async () => {
    try {
      await logout().unwrap();

      toast.success("You are now logged out!");
    } catch (error) {
      toast.error(
        error.message ||
          error?.data?.message ||
          "Somethingwent wrong while logging you out",
      );
    }
  };
  return (
    <>
      <div
        className={`${openHam ? "hidden" : "fixed top-4"}  md:hidden ml-0.5`}
      >
        <GiHamburgerMenu
          onClick={() => {
            toggleHam();
          }}
          size={30}
          className="text-[#FF5C5C] "
        />
      </div>
      <div
        className={` ${openHam ? "fixed w-[15rem] bg-[#FF5C5C] top-24   h-[calc(100vh-6rem)] border-none rounded-br-md rounded-tr-md flex flex-col z-[999]" : "hidden z-0"}
           md:fixed md:w-[15rem] md:bg-[#FF5C5C] md:top-24    md:h-[calc(100vh-6rem)] md:border-none md:rounded-br-md md:rounded-tr-md md:flex md:flex-col  `}
      >
        <div
          className={`${openHam ? "fixed" : "hidden"} md:hidden left-54 top-24 z-[1000]`}
        >
          <MdOutlineCancel
            size={26}
            className="text-white cursor-pointer"
            onClick={() => {
              closeHam();
            }}
          />
        </div>
        {user && (
          <div className="flex flex-col relative items-center pt-26">
            <div className="absolute   top-[-2rem]">
              <img
                src={`${user?.image ? `http://localhost:5000/${user.image}` : ""}`}
                alt=""
                className="rounded-full w-32 h-32 outline-2 bg-white outline-offset-2 outline-white  object-cover"
              />
            </div>
            <div className="flex flex-col mt-0">
              <span className="text-white font-semibold text-center">{`${user?.name?.at(0)?.toUpperCase()}${user?.name?.slice(1)}`}</span>
              <span className="text-white text-sm ">{user.email}</span>
            </div>
          </div>
        )}

        <div
          className={`flex flex-col ${user ? "mt-2" : "mt-9 gap-y-9"} ml-7 gap-y-5`}
        >
          <div className="flex">
            <MdDashboard className="text-white" size={32} />
            <Link className="text-white ml-4">Dashboard</Link>
          </div>
          <div className="flex">
            <CgProfile className="text-white" size={29} />
            <Link
              className="text-white ml-4"
              to={`${user ? "/userInfo" : "/login"}`}
            >
              Profile
            </Link>
          </div>
          <div className="flex">
            <TbUrgent className="text-white" size={32} />
            <Link
              className="text-white ml-4"
              to={`${user ? "/vital-task" : "/login"}`}
            >
              Vital Tasks
            </Link>
          </div>
          <div className="flex">
            <FaTasks className="text-white" size={32} />
            <Link
              className="text-white ml-4"
              to={`${user ? "/tasks" : "/login"}`}
            >
              My Tasks
            </Link>
          </div>
          <div className="flex">
            <MdOutlineCategory className="text-white" size={32} />
            <Link
              className="text-white ml-4"
              to={`${user ? "/category" : "/login"}`}
            >
              Categories
            </Link>
          </div>
          <div className="flex">
            <IoMdStats className="text-white" size={31} />
            <Link
              className="text-white ml-4"
              to={`${user ? "/task-summary" : "/login"}`}
            >
              Task Summary
            </Link>
          </div>
        </div>
        <div className="mt-auto  flex justify-between items-center mt-8 ">
          {user ? (
            user.isAdmin ? (
              <>
                <div className="flex ml-4">
                  <CiLogout className="text-white" size={31} />
                  <button
                    className="text-white ml-2 mb-2"
                    to="/login"
                    onClick={() => {
                      dispatch(removeUserInfo());
                      navigateTo("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
                <div className="w-0.5 bg-white h-7 ml-2"></div>
                <div className="flex mr-4">
                  <Link className="text-white ml-3 mb-2" to="/admin-menu">
                    Admin Menu
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex ml-6">
                  <CiLogout className="text-white" size={31} />
                  <button
                    className="text-white ml-4 mb-2"
                    onClick={() => {
                      dispatch(removeUserInfo());
                      navigateTo("/");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </>
            )
          ) : (
            <>
              <div className="flex ml-4">
                <IoIosLogIn className="text-white " size={31} />
                <Link className="text-white ml-1 mb-2" to="/login">
                  Login
                </Link>
              </div>
              <div className="w-0.5 bg-white h-7 ml-4"></div>
              <div className="flex mr-4">
                <SiGnuprivacyguard className="text-white ml-6" size={31} />
                <Link className="text-white ml-1 mb-2" to="/register">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
