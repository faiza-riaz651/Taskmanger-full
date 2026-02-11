import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDeleteCategoryMutation } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
const DeleteCategory = ({ id }) => {
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async () => {
    const ok = window.confirm(
      "Deleting this category will delete alll the tasks of this category as well.Are you sure?",
    );
    if (ok) {
      try {
        await deleteCategory(id).unwrap();
        toast.success("Category and its tasks deleted!");
      } catch (error) {
        toast.error(error?.data?.message || "Operation failed");
      }
    }
  };
  return (
    <div>
      <FaTrashAlt
        size={40}
        className="text-white border-none rounded-md py-1 bg-[#FF5C5C]"
        onClick={() => {
          handleDelete();
        }}
      />
    </div>
  );
};

export default DeleteCategory;
