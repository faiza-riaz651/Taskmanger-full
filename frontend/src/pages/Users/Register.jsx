import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdLocalPhone } from "react-icons/md";
import { useRegisterUserMutation } from "../../redux/api/userApiSlice";
import { saveUserInfo } from "../../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Register = () => {
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [phoneNoErr, setphoneNoErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [cPassErr, setCPassErr] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async (data) => {
    try {
      const user = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNo: parseInt(data.phoneNo),
      }).unwrap();
      toast.success("User created!");
      // saving authenticated user info in the local storage and gloabal state....
      dispatch(saveUserInfo(user.data));
      navigateTo("/");
    } catch (error) {
      toast.error(error.message || error.data?.error || "Something Went Wrong");
    }
  };
  return (
    <div className="bg-[#FF5C5C] h-[40rem] w-[77rem] fixed  z-999 flex top-0  justify-start  md:justify-center">
      <form
        className={`flex flex-col h-[31rem]  md:w-[50%] w-[30%] bg-[#FFFBF7] absolute shadow-lg border-none rounded-lg  gap-y-1 md:gap-y-3 mt-10 ml-6 ${errors.name && "md:gap-y-1"}  `}
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="font-bold text-xl md:ml-15 ml-5 mt-3 md:mt-8 ">
          Sign Up
        </h1>

        <div className="flex items-center flex-wrap pr-2 ">
          <div className="flex md:ml-15 ml-5 w-[25rem] border-2 rounded-lg items-center p-2">
            <MdOutlinePersonAddAlt
              className="border-none mr-2 ml-2 "
              size={30}
            />
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border-none ml-2 outline-none focus:outline-none focus:ring-0"
              {...register("name", {
                required: { value: true, message: "Name is required field" },
              })}
            />
          </div>

          {errors.name && (
            <span className="text-sm ml-15 my-0 text-red-700">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="flex items-center flex-wrap pr-2">
          <div className="flex md:ml-15 ml-5 w-[25rem] border-2 rounded-lg items-center p-2">
            <MdEmail className="border-none mr-2 ml-2" size={30} />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-none ml-2 outline-none focus:outline-none focus:ring-0"
              {...register("email", {
                required: { value: true, message: "Email is required field" },
              })}
            />
          </div>
          {errors.email && (
            <span className="text-sm ml-15 text-red-700">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex items-center flex-wrap pr-2">
          <div className="flex md:ml-15 ml-5 w-[25rem] border-2 rounded-lg items-center p-2">
            <MdLocalPhone className="border-none mr-2 ml-2" size={30} />
            <input
              type="number"
              placeholder="Enter your phone number"
              className="w-full border-none ml-2 outline-none focus:outline-none focus:ring-0"
              {...register("phoneNo", {
                required: "Phone Number is required field",
                minLength: {
                  value: 11,
                  message: "Phone Number must be 11 digit long",
                },
              })}
            />
          </div>
          {errors.phoneNo && (
            <span className="text-sm ml-15 text-red-700">
              {errors.phoneNo.message}
            </span>
          )}
        </div>
        <div className="flex items-center flex-wrap pr-2">
          <div className="flex md:ml-15 ml-5 w-[25rem] border-2 rounded-lg items-center p-2">
            <MdOutlinePassword className="border-none mr-2 ml-2" size={30} />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-none ml-2 outline-none focus:outline-none focus:ring-0"
              {...register("password", {
                required: "Password is required field",
                minLength: {
                  value: 4,
                  message: "Password lengh must be at leat 4.",
                },
              })}
            />
          </div>
          {errors.password && (
            <span className="text-sm ml-15 text-red-700">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center flex-wrap pr-2">
          <div className="flex md:ml-15 ml-5 w-[25rem] border-2 rounded-lg items-center p-2">
            <RiLockPasswordFill className="border-none mr-2 ml-2" size={30} />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border-none ml-2 outline-none focus:outline-none focus:ring-0"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Password Confirmation is required field",
                },
              })}
            />
          </div>

          {errors.confirmPassword && (
            <span className="text-sm ml-15 text-red-700">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <div className="md:ml-15 ml-5 flex flex-wrap items-end mb-3">
          <button
            className="  bg-[#FF5C5C] h-12 w-24 text-white rounded-md mb-4 mt-1 md:mt-0 "
            type="submit"
          >
            Register
          </button>

          <span className=" ml-2 mb-5">
            Already have an account?{" "}
            <Link className="text-[#FF5C5C] hover:underline" to="/login">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
