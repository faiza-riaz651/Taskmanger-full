import React, { useEffect } from "react";
import { useGetTaskSummaryQuery } from "../../redux/api/taskApiSlice";
import TaskSummaryChart from "./TaskSummaryChart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
const TaskSmmary = () => {
  const path = useSelector((state) => state.prevPathInfo);
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useGetTaskSummaryQuery();
  const completedTasks = tasks?.filter((task) => task.status === "Completed");
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "In Progress",
  );
  const notStartedTasks = tasks?.filter(
    (task) => task.status === "Not Started",
  );
  const highTasks = tasks?.filter((task) => task.priority === "Extreme");
  const lowTasks = tasks?.filter((task) => task.priority === "Low");
  const moderateTasks = tasks?.filter((task) => task.priority === "Moderate");

  if (isLoading) return <Loader />;

  if (isError) return <Error error={error} />;

  return (
    <div className="ml-4 md:ml-65 w-[64rem] mr-3 border-2 border-gray-400 rounded-lg flex flex-col  ">
      <div className="flex justify-between items-center mt-3 mb-5 ml-1">
        <h1 className="ml-4 font-bold text-lg  underline underline-offset-3 decoration-red-500 ">
          Tasks Summary
        </h1>
        <Link
          className="mr-2 font-semibold text-md  underline underline-offset-3 decoration-gray-500 "
          to={`${path.prevPath}`}
        >
          Go Back
        </Link>
      </div>
      <TaskSummaryChart
        action="Status"
        actionValue={["Completed", "In Progress", "Not Started"]}
        countVal={[
          completedTasks.length,
          inProgressTasks.length,
          notStartedTasks.length,
        ]}
      />
      <TaskSummaryChart
        action="Priority"
        actionValue={["Extreme", "Moderate", "Low"]}
        countVal={[highTasks.length, moderateTasks.length, lowTasks.length]}
      />
    </div>
  );
};

export default TaskSmmary;
