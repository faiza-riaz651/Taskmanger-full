import React, { useState, useRef } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import Sidebar from "../../components/Sidebar";
import { MdAddTask } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoIosLogIn } from "react-icons/io";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link } from "react-router-dom";
const Nav = () => {
  const [calender, setCalender] = useState(false);
  const user = useSelector((state) => state.userInfo.user);
  const date = new Date();
  console.log(date.getDay() % 6);
  const dayName = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const calenderRef = useRef(null);

  return (
    <div>
      <div className="flex justify-between items-center bg-[#FFF6EC] h-[3.5rem] shadow-lg fixed w-full ">
        <div className="ml-10 flex items-center ">
          <MdAddTask size={35} className="text-[#FF5C5C]" />
          <div className=" font-extrabold text-3xl ml-2">
            <span className="text-black ">To</span>
            <span className="text-[#FF5C5C] ">-Do</span>
          </div>
        </div>

        <div className=" hidden md:flex w-[28rem] items-center bg-white border-none rounded-md">
          <input
            type="text"
            placeholder="Search Your Task Here..."
            className="p-1 w-full focus:outline-none focus:ring-0"
          />
          <div className="h-full ">
            <IoIosSearch
              className="text-white bg-[#FF5C5C] border-none rounded-md "
              size={38}
            />
          </div>
        </div>
        <div className="border-none  rounded-md p-1  flex items-center md:mr-15 ">
          {user ? (
            <>
              <div className="flex ml-6 p-1 border-none rounded-md bg-[#FF5C5C]">
                <SlCalender className="text-white" size={27} />
              </div>
            </>
          ) : (
            <>
              <div className="flex ml-4 bg-[#FF5C5C] border-none rounded-md  p-1">
                <IoIosLogIn className="text-white " size={31} />
                <Link className="text-white ml-1 mb-2" to="/login">
                  Login
                </Link>
              </div>

              <div className="flex mr-4 bg-[#FF5C5C] border-none rounded-md ml-2 p-1">
                <SiGnuprivacyguard className="text-white " size={31} />
                <Link className="text-white ml-1 mb-2" to="/register">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
        <div className=" hidden md:mr-34 md:flex flex-col text-sm ">
          <span className="font-bold">{`${dayName[date.getDay() % 6]}`}</span>
          <span className=" text-sm text-blue-500">
            {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
