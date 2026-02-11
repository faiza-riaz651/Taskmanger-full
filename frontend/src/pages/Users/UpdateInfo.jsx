import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../redux/api/userApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveUserInfo } from "../../redux/features/userSlice.js";

const UpdateInfo = () => {
  const user = useSelector((state) => state.userInfo.user);
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phoneNo, setPhoneNo] = useState(user?.phoneNo);
  const [updateUser, isLoading] = useUpdateUserMutation();
  const navigateTo = useNavigate();
  const id = user.id;
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const user = await updateUser({
        id,
        updateData: {
          name: name,
          email: email,
          phoneNo: phoneNo,
        },
      }).unwrap();
      dispatch(saveUserInfo(user));
      if (!user) {
        console.log(user);
      }
      toast.success("Your Profile has been updated!");
      navigateTo("/userInfo");
    } catch (error) {
      console.log(error.message);
      toast.error(
        error?.data?.error ||
          error?.message ||
          error?.error ||
          "Something went wrong while updating your profile!",
      );
    }
  };

  return (
    <div className="flex fixed items-center h-[100vh] justify-center w-full bg-black/80  z-[1001] top-0 left-0 ">
      <div className="w-[55%] h-[70%] bg-white rounded-md flex flex-col">
        <h1></h1>
        <form
          action=""
          className="flex flex-col"
          onSubmit={(e) => handleClick(e)}
        >
          <div className=" ml-14 mt-3">
            <h1 className="font-bold my-1 ">Username:</h1>
            <input
              className="border-2 border-gray-500 rounded-md py-3 w-[65%] pl-2 "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className=" ml-14 mt-3">
            <h1 className="font-bold my-1 ">Email:</h1>
            <input
              className="border-2 border-gray-500 rounded-md py-3 w-[65%] pl-2 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className=" ml-14 mt-3 flex flex-col">
            <h1 className="font-bold my-1 ">Contact Number:</h1>
            <input
              className="border-2 border-gray-500 rounded-md py-3 w-[65%] pl-2 "
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            {String(phoneNo).length < 11 && (
              <span className="text-red-600 text-sm ml-1">
                Phone Number has to a 11 digit number
              </span>
            )}
          </div>

          <div>
            <button
              className="bg-[#FF5C5C] text-white ml-14 p-3 border-none rounded-md mt-3"
              type="submit"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateInfo;
