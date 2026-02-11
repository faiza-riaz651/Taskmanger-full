import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { saveUserInfo } from "../../redux/features/userSlice";
import { useSelector, useDispatch } from "react-redux";
const Login = () => {
  const navigateTo = useNavigate();

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const submitHandler = async (data) => {
    try {
      const user = await login(data).unwrap();
      if (!user) {
        console.log(user);
      }

      // user data saving

      dispatch(saveUserInfo(user.user));
      toast.success("You are now logged in !");
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error.message || "Something went wrong",
      );
    }
  };
  return (
    <div className="bg-[#FF5C5C] h-[40rem] w-[77rem] fixed top-0 z-999 flex  justify-start md:justify-center">
      <form
        className="flex flex-col  h-[60%] md:w-[50%] w-[30%]  bg-[#FFFBF7] absolute shadow-lg border-none rounded-lg md:gap-y-5 gap-y-3 mt-18 ml-6 "
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="font-bold text-xl ml-15 mt-6 pr-6 ">Sign In!</h1>

        <div className="flex items-center pr-6 flex-wrap">
          <div className="flex ml-15 w-[25rem] border-2 rounded-lg items-center p-2">
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

        <div className="flex items-center pr-6 flex-wrap">
          <div className="flex ml-15 w-[25rem] border-2 rounded-lg items-center p-2">
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

        <div className="flex items-end flex-wrap">
          <button
            className=" ml-15 bg-[#FF5C5C] h-12 w-24 text-white rounded-md  mt-2"
            type="submit"
          >
            Login
          </button>

          <span className="md:ml-2 mb-1 ml-15">
            Dont have an account?{" "}
            <Link className="text-[#FF5C5C] hover:underline" to="/register">
              Register Now
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
