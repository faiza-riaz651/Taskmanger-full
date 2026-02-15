import React from "react";
import moment from "moment";
import { LuCircle } from "react-icons/lu";
import { useSelector } from "react-redux";
const TaskDetail1 = ({ task, selectedId }) => {
  const path = useSelector((state) => state.prevPathInfo);
  if (!task) return null;
  return (
    <div
      className={` flex flex-col ${path?.currPath === "/" ? "border-none" : "border-2 border-gray-500"} rounded-lg w-[23rem]   ml-6 mt-2 mb-2 shadow-lg `}
    >
      <div className="flex items-start">
        <div className="mt-5 ml-2">
          <LuCircle
            className={`${selectedId === task._id ? "text-[#FF5C5C]" : "text-blue-700"}`}
            size={26}
          />
        </div>
        <div className="flex flex-col m-4 ">
          <span className="font-bold">{task.name}</span>

          <div className="flex justify-between w-[18rem] mt-2">
            <span>{task?.description}</span>
          </div>

          <div className="flex flex-col mt-9  gap-x-2">
            <div className="flex mb-2 items-center text-sm">
              <span className="font-semibold ">Added At:</span>
              <span className="text-blue-700 ml-2">
                {" "}
                {moment(task?.createdAt).format("MMMM Do YYYY")}
              </span>
            </div>
            <div className="flex text-sm">
              <span className="font-semibold ">Due At:</span>
              <span className="text-red-700 ml-2">
                {" "}
                {moment(task?.dueDate).format("MMMM Do YYYY, h:mm:ss a")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail1;
