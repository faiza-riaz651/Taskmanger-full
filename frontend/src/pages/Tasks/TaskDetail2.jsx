import React from "react";
import {
  useGetTaskByIdQuery,
  useDeleteTaskMutation,
} from "../../redux/api/taskApiSlice";
import moment from "moment";
import { toast } from "react-toastify";
import { useOutletContext } from "react-router";
import { MdOutlineDeleteForever } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const TaskDetail2 = () => {
  const path = useSelector((state) => state.prevPathInfo.prevPath);
  const [deleteTask] = useDeleteTaskMutation();
  const { id } = useOutletContext();
  console.log(id);
  const { data: task, isError, error } = useGetTaskByIdQuery(id);
  const handleDelete = async (id) => {
    try {
      await deleteTask(id).unwrap();
      toast.success("Task Deleted!");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className=" ml-1 flex flex-col border-2 border-gray-500 rounded-lg w-[27rem] h-[calc(100vh-6rem)] mr-3">
      <div className="flex justify-between mx-2 my-5 font-semibold">
        <h1 className="text-lg underline decoration-2 decoration-red-500 underline-offset-3 ">
          {task?.name}
        </h1>
      </div>
      <div className="flex flex-col ml-2">
        <div className="flex ">
          <span className="font-bold">Status:</span>
          <span
            className={`${task?.status === "Completed" && "text-green-600"} ${task?.status === "In Progress" && "text-yellow-600"} ${task?.status === "Not Started" && "text-red-600"} ml-2`}
          >
            {task?.status}
          </span>
        </div>
        <div className="flex">
          <span className="font-bold">Priority:</span>
          <span
            className={`${task?.priority === "Low" && "text-green-600"} ${task?.priority === "Moderate" && "text-yellow-600"} ${task?.priority === "Extreme" && "text-red-600"} ml-2`}
          >
            {task?.priority}
          </span>
        </div>
        <div className="flex">
          <span className="font-semibold ">Added At:</span>
          <span className="text-blue-700 ml-2">
            {" "}
            {moment(task?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </div>
        <div className="flex ">
          <span className="font-semibold ">Due At:</span>
          <span className="text-red-700 ml-2">
            {" "}
            {moment(task?.dueDate).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </div>
      </div>

      <div className="flex  mt-5 ml-2">
        <span className="font-bold ">Description:</span>
        <span className="ml-2">{task?.description}</span>
      </div>

      <div className="flex mt-48 mr-4 self-end gap-x-2">
        <LiaEdit className="bg-[#FF5C5C] rounded-md text-white" size={34} />
        <MdOutlineDeleteForever
          className="bg-[#FF5C5C]  rounded-md text-white"
          size={34}
          onClick={() => handleDelete(task?._id)}
        />
      </div>
    </div>
  );
};

export default TaskDetail2;
