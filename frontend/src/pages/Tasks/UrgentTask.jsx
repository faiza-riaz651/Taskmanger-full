import React, { useEffect, useState } from "react";
import { useGetUrgentTasksQuery } from "../../redux/api/taskApiSlice";
import TaskDetail1 from "./TaskDetail1";
import { Link } from "react-router-dom";
import { RiAddLargeLine } from "react-icons/ri";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

const UrgentTask = () => {
  const [id, setId] = useState(null);
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useGetUrgentTasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  console.log(tasks);
  return (
    <div className=" w-[20rem] md:w-[26rem] border-none rounded-lg m-3 bg-white shadow-lg ml-6 mt-2">
      {tasks?.length > 0 &&
        tasks?.map((task) => <TaskDetail1 task={task} selectedId={id} />)}

      <hr className="text-gray-300" />

      <div className="w-[80%] border-2 border-gray-300 rounded-lg shadow-lg flex items-center justify-start mt-10 ml-6 mb-6">
        <RiAddLargeLine
          className="text-[#FF5C5C] font-semibold text-2xl ml-6 mb-4 mt-5"
          size={34}
        />
        <Link
          to={`/create-task`}
          className="text-[#FF5C5C] font-semibold text-2xl ml-4 mb-4 mt-5 underline underline-3 decoration-2 decoration-[#FF5C5C] underline-offset-3"
        >
          Add Task
        </Link>
      </div>
    </div>
  );
};

export default UrgentTask;
