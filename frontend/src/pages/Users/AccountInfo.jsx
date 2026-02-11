import React from "react";
import { Link, Outlet } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useDeleteUserMutation } from "../../redux/api/userApiSlice";
import { removeUserInfo } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AccountInfo = () => {
  const user = useSelector((state) => state.userInfo.user);
  const path = useSelector((state) => state.prevPathInfo);
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleDelete = async () => {
    try {
      const deleted = await deleteUser(user.id).unwrap();
      dispatch(removeUserInfo());
      navigateTo("/");
      toast.success("Your Profile has been deleted permanently");
    } catch (error) {
      toast.error(
        error?.data?.error ||
          error?.message ||
          error?.error ||
          "Something went wrong while deleting your account!",
      );
    }
  };

  return (
    <div className=" md:ml-65 ml-4 border-2 border-gray-500 rounded-md md:w-[55rem] h-[28.5rem] w-[23rem]">
      <Outlet />
      <div className="flex flex-col ">
        <div className="flex justify-between items-center mt-3 mb-5 ml-1">
          <h1 className="ml-4 font-semibold text-lg  underline underline-offset-3 decoration-red-500 ">
            Account Information
          </h1>
          <Link
            className="mr-2 font-semibold text-md  underline underline-offset-3 decoration-gray-500 "
            to={`${path.prevPath}`}
          >
            Go Back
          </Link>
        </div>
        <div className="flex mb-3  justify-start items-end gap-x-2 ml-4">
          <img
            src="/public/julius-drost-dS-q7-zkD9c-unsplash.jpg"
            alt=""
            className="w-28 h-28 rounded-full outline outline-offset-2"
          />
          <div className="flex flex-col ml-2 mb-5">
            <span className="font-semibold">{`${user?.name.at(0).toUpperCase()}${user?.name.slice(1)}`}</span>
            <span className="text-sm">{user?.email}</span>
          </div>
        </div>
        <div className="flex flex-col ml-4 border-2 border-gray-500 mr-4 rounded-md md:w-[75%] w-[90%] ">
          <div className=" ml-4 ">
            <h1 className="font-semibold my-1">Username</h1>
            <p className="border-2 border-gray-500 rounded-md py-1 w-[80%] pl-1 ">
              {`${user?.name.at(0).toUpperCase()}${user?.name.slice(1)}`}
            </p>
          </div>
          <div className=" ml-4 ">
            <h1 className="font-semibold my-1 ">Email</h1>
            <p className="border-2 border-gray-500 rounded-md py-1 w-[80%] pl-1 my-1">
              {user?.email}
            </p>
          </div>
          <div className="ml-4 ">
            <h1 className="font-semibold my-1 ">Contact No</h1>
            <p className="border-2 border-gray-500 rounded-md py-1 w-[80%] pl-1 my-1">
              {user?.phoneNo}
            </p>
          </div>

          <div className="flex items-center ml-4 my-1 text-white">
            <Link
              className="bg-[#FF5C5C] md:p-2 rounded-md"
              to={`${user ? "update-user" : "/login"}`}
            >
              Update Info
            </Link>
            <Link
              className="bg-[#FF5C5C] md:p-2 rounded-md ml-4"
              onClick={() => handleDelete()}
            >
              Delete Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
