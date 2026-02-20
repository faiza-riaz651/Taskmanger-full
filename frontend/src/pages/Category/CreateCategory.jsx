import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateCategoryMutation } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import { IoEye } from "react-icons/io5";
import { TbPlayerTrackNext } from "react-icons/tb";
import { Outlet } from "react-router-dom";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const CreateCategory = () => {
  const path = useSelector((state) => state.prevPathInfo);
  const [createCategory, { isLoading, isError, error }] =
    useCreateCategoryMutation();
  const [catName, setCatName] = useState("");
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cat = await createCategory({ name: catName }).unwrap();
      setCatName("");
      toast.success("Category Created");
    } catch (error) {
      toast.error(error.message || error?.data?.message || "Operation failed");
    }
  };
  if (isLoading) return <Loader />;

  if (isError) return <Error error={error} />;
  return (
    <div className="ml-4 md:ml-75 w-[48rem] h-[28rem] border-2 border-gray-500 rounded-lg flex flex-col ">
      <div className="flex justify-between mx-2 my-2 font-semibold">
        <h1 className="text-lg underline decoration-2 decoration-red-500 underline-offset-3 ">
          Create Category
        </h1>
        <Link
          to={`${path.prevPath}`}
          className="underline underline-offset-3 decoration-gray-500"
        >
          Go Back
        </Link>
      </div>
      <form
        action=""
        className="flex flex-col"
        onSubmit={(e) => handleSubmit(e)}
      >
        <label htmlFor="" className="font-semibold ml-2 my-2">
          Category Name
        </label>
        <input
          type="text"
          placeholder="Enter your category name"
          className="ml-2 p-3 w-[70%] border-2 rounded-lg border-gray-400"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
        />
        <div className="flex ml-2 mt-8">
          <button
            type="submit"
            className="bg-[#FF5C5C] text-white py-3 px-8 border-none rounded-lg hover:outline-2 font-semibold hover:outline-[#FF5C5C] hover:outline-offset-2 mr-4"
          >
            Create
          </button>
          <button
            type="button"
            className="bg-[#FF5C5C] text-white py-3 px-8 border-none rounded-lg hover:outline-2 hover:outline-[#FF5C5C] hover:outline-offset-2 ml-4 font-semibold"
            onClick={() => setCatName("")}
          >
            Cancel
          </button>
        </div>
      </form>
      <div className="flex justify-center items-center mt-8">
        <div className="h-[1px] w-[95%] bg-gray-400"></div>
      </div>

      <div className="flex ml-4 mt-4 items-center">
        <IoEye className="text-[#FF5C5C] mr-2" size={30} />
        <Link
          className=" text-[#FF5C5C] text-lg font-semibold hover:underline hover:decoration-2 hover:underline-offset-3 hover:decoration-[#FF5C5C]"
          to="/category-list"
        >
          View All Categories
        </Link>
        <TbPlayerTrackNext
          className="text-[#FF5C5C] ml-2"
          size={30}
          onClick={() => navigateTo("/category-list")}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default CreateCategory;
