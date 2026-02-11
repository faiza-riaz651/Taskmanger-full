import React, { useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { useUpdateUserByAdminMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const UpdateByAdmin = ({ id, userEmail, userName, userPhoneNo }) => {
  const [updateUserByAdmin] = useUpdateUserByAdminMutation();
  const navigateTo = useNavigate();
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [phoneNo, setPhoneNo] = useState(userPhoneNo);
  const [clickFlag, setClickFlag] = useState(false);

  const updateHandler = async (e) => {
    e.preventDefault();
    console.log("hittingthe handler");
    try {
      const updated = await updateUserByAdmin({
        id,
        updateData: { name: name, email: email, phoneNo: phoneNo },
      }).unwrap();
      toast.success("User update complete!");
      setClickFlag(false);
    } catch (error) {
      console.log(error.message);
      toast.error(
        error?.data?.error ||
          error?.data?.message ||
          error.message ||
          "Something went wrong while updating the user",
      );
    }
  };

  return (
    <div>
      <LiaEdit
        size={30}
        className="text-white  bg-[#FF5C5C] border-none rounded-sm"
        onClick={() => setClickFlag(true)}
      />

      {clickFlag && (
        <div
          className="flex fixed items-center h-[100vh] justify-center w-full bg-black/80  z-[1001] top-0 left-0 "
          onClick={() => setClickFlag(false)}
        >
          <div
            className="w-[55%] h-[70%] bg-white rounded-md flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <h1></h1>
            <form
              action=""
              className="flex flex-col"
              onSubmit={(e) => updateHandler(e)}
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
      )}
    </div>
  );
};

export default UpdateByAdmin;
