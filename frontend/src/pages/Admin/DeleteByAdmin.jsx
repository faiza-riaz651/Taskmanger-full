import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteUserByAdminMutation } from "../../redux/api/userApiSlice";
import { toast } from "react-toastify";
const DeleteByAdmin = ({ id }) => {
  const [deleteUserByAdmin] = useDeleteUserByAdminMutation();

  const handleClick = async () => {
    try {
      const deleted = await deleteUserByAdmin(id).unwrap();
      toast.success("Deletion Successful");
    } catch (error) {
      console.log(error.message);
      toast.error(
        error?.data?.error ||
          error?.data?.message ||
          error.message ||
          "Something went wrong while deleting this user",
      );
    }
  };
  return (
    <div>
      <FaTrashAlt
        onClick={() => handleClick()}
        size={30}
        className="bg-[#FF5C5C] text-white p-1 border-none rounded-sm"
      />
    </div>
  );
};

export default DeleteByAdmin;
