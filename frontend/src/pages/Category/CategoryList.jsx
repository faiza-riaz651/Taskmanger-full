import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGetAllCategorysQuery } from "../../redux/api/categoryApiSlice";
import DeleteCategory from "./DeleteCategory";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import TasksByCat from "./TasksByCat";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaBackward } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const CategoryList = () => {
  const [pageNo, setPageNo] = useState(0);
  const {
    data: allCategorys = [],
    isLoading,
    isError,
    error,
  } = useGetAllCategorysQuery(pageNo);
  const navigateTo = useNavigate();
  console.log(allCategorys);
  const path = useSelector((state) => state.prevPathInfo);
  if (isLoading) return <Loader />;

  if (isError) return <Error error={error} />;
  return (
    <div className="ml-4 md:ml-64 flex flex-col border-2 border-gray-500 rounded-lg w-[25rem] md:w-[63rem] mr-2 ">
      <div className="flex justify-between mx-2 my-2 font-semibold">
        <h1 className="text-lg underline decoration-2 decoration-red-500 underline-offset-3 ">
          Category List
        </h1>
        <Link
          to={`${path.prevPath}`}
          className="underline underline-offset-3 decoration-gray-500"
        >
          Go Back
        </Link>
      </div>
      <div className="flex flex-col ml-7 ">
        {allCategorys.length > 0 ? (
          <>
            <ul className="list-disc text-[#FF5C5C]">
              {allCategorys.map((cat) => (
                <li key={cat._id}>
                  <div className="flex items-center h-18 ">
                    <Link className="text-black text-xl w-84 font-bold  hover:underline  break-words hover:underline-2 ">
                      {cat.name.substring(0, 10)}...
                    </Link>
                    <div className="flex ml-32 gap-x-2">
                      <DeleteCategory id={cat._id} />
                      <FaEye
                        size={40}
                        className="text-white border-none rounded-md py-1 bg-[#FF5C5C] ml-4"
                        onClick={() => navigateTo(`/task-by-cat/${cat._id}`)}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>No More Categories...</div>
        )}
      </div>
      <div
        className={`flex border-2 border-[#FF5C5C] rounded-md  w-[20%] mr-3 justify-between items-center text-[#FF5C5C] h-12 self-end`}
      >
        {pageNo !== 0 && (
          <span className="   px-4">
            <FaBackward
              size={30}
              onClick={() => setPageNo(pageNo - 1)}
              disabled={pageNo === 0}
            />
          </span>
        )}

        <span className="font-bold border-2 border-[#FF5C5] text-xl py-2 px-4">
          {pageNo + 1}
        </span>
        {allCategorys.length !== 0 && (
          <button className="  px-4">
            <TbPlayerTrackNextFilled
              size={30}
              disabled={allCategorys.length === 0}
              onClick={() => setPageNo(pageNo + 1)}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
