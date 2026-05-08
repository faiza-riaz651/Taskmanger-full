import { useState, useEffect } from "react";
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
  const [img, setImg] = useState(user?.image || null);
  const [updateUser] = useUpdateUserMutation();
  const navigateTo = useNavigate();

  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phoneNo", phoneNo);
      formData.append("image", img);
      const user = await updateUser(formData).unwrap();
      console.log(user);
      dispatch(saveUserInfo(user));
      toast.success("Your Profile has been updated!");
      navigateTo("/userInfo");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.error ||
          error?.message ||
          error?.error ||
          "Something went wrong while updating your profile!",
      );
    }
  };

  useEffect(() => {
    console.log(img?.name);
  }, [img]);

  return (
    <div
      className="flex fixed items-center h-[100vh] md:justify-center  justify-start w-full bg-black/80  z-[1001] top-0 left-0 "
      onClick={() => {
        navigateTo("/userInfo");
      }}
    >
      <div
        className="w-[80%]  ml-4 bg-white rounded-md flex flex-col "
        onClick={(e) => e.stopPropagation()}
      >
        <form
          action=""
          className="flex flex-col "
          onSubmit={(e) => handleClick(e)}
          encType="multipart/form-data"
        >
          <h1 className="font-bold text-lg ml-7">Update Account Info!</h1>
          <div className="flex flex-wrap ">
            <div className="flex flex-col w-[65%] flex-wrap">
              <div className=" ml-14 mt-3">
                <h1 className="font-bold my-1 ">Username:</h1>
                <input
                  className="border-2 border-gray-500 rounded-md py-3 w-[100%] pl-6 "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className=" ml-14 mt-3">
                <h1 className="font-bold my-1 ">Email:</h1>
                <input
                  className="border-2 border-gray-500 rounded-md py-3 w-[100%] pl-6 "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className=" ml-14 mt-3 flex flex-col">
                <h1 className="font-bold my-1 ">Contact Number:</h1>
                <input
                  className="border-2 border-gray-500 rounded-md py-3 w-[100%] pl-6 "
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
                {String(phoneNo).length < 11 && (
                  <span className="text-red-600 text-sm ml-1">
                    Phone Number has to a 11 digit number
                  </span>
                )}
              </div>
            </div>
            <div className="font-bold my-1 md:ml-14 ml-0  ">
              {user?.image && (
                <img
                  src={`${user?.image ? `http://localhost:5000/${user.image}` : ""}`}
                  alt="Profile"
                  className="w-8 hidden  h-8 md:w-32 md:h-32 object-cover rounded-full mb-2 "
                />
              )}

              <label className="md:block ml-2  md:font-bold hidden">
                Upload an image:
              </label>

              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                className="border-2 border-gray-500 text-gray-400 h-12 ml-2 md:ml-2 w-38 md:h-24 md:w-56 pl-2 rounded-md mt-1 md:mt-3"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
              />
            </div>
          </div>

          <div>
            <button
              className="bg-[#FF5C5C] text-white ml-14 p-3 border-none rounded-md mt-3  mb-2"
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
