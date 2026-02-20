import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllTasksQuery } from "../../redux/api/taskApiSlice";
import { Outlet } from "react-router-dom";
import TaskDetail1 from "./TaskDetail1";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { FaBackward } from "react-icons/fa";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
const TaskDetail = () => {
  const path = useSelector((state) => state.prevPathInfo.prevPath);

  const [pageNo, setPageNo] = useState(0);
  const {
    data: allTasks = [],
    isLoading,
    isError,
    error,
  } = useGetAllTasksQuery(pageNo);
  console.log(allTasks);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (allTasks.length > 0) {
      setId(allTasks[0]._id);
    } else {
      setId(null);
    }
  }, [allTasks, pageNo]);

  console.log(error);

  if (isLoading) return <Loader />;

  if (isError) return <Error error={error} />;

  return (
    <div className="flex ml-2 md:ml-64 w-[27rem]  md:w-[60rem] ">
      <div className="border-1 border-gray-500 rounded-md flex flex-col w-[23rem] md:w-[30rem] ">
        <p className="font-bold ml-1 underline decoration-2 decoration-red-500 underline-offset-2">
          My Tasks
        </p>

        <div>
          {allTasks?.length > 0 ? (
            allTasks.map((task) => (
              <div key={task._id} onClick={() => setId(task?._id)}>
                <TaskDetail1 task={task} selectedId={id} />
              </div>
            ))
          ) : (
            <div>No More Tasks...</div>
          )}
        </div>
        <div
          className={` self-end flex items-center border-2 border-[#FF5C5C] rounded-md mb-2 mr-2`}
        >
          {pageNo !== 0 && (
            <span className="   px-4">
              <FaBackward
                size={30}
                onClick={() => setPageNo(pageNo - 1)}
                disabled={pageNo === 0}
                className=" text-[#FF5C5C]"
              />
            </span>
          )}

          <span className="font-bold border-2 border-[#FF5C5C]  text-xl py-2 px-4 text-[#FF5C5C]  ">
            {pageNo + 1}
          </span>
          {allTasks?.length !== 0 && (
            <button className=" text-[#FF5C5C] px-4">
              <TbPlayerTrackNextFilled
                size={30}
                disabled={allTasks.length === 0}
                onClick={() => setPageNo(pageNo + 1)}
              />
            </button>
          )}
        </div>
      </div>

      {allTasks.length > 0 && id && (
        <div className="hidden md:block">
          <Outlet context={{ id }} />
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
