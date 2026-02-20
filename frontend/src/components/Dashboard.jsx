import React from "react";
import UrgentTask from "../pages/Tasks/UrgentTask";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DonutChart from "./DonutChart";
import { MdOutlinePendingActions } from "react-icons/md";
import { useGetTaskSummaryQuery } from "../redux/api/taskApiSlice";
import TaskDetail1 from "../pages/Tasks/TaskDetail1";
import Loader from "./Loader";
import Error from "./Error";

const Dashboard = () => {
  const user = useSelector((state) => state.userInfo.user);
  const path = useSelector((state) => state.prevPathInfo);
  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useGetTaskSummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter((task) => task.status === "Completed");
  const inProgressTasks = tasks?.filter(
    (task) => task.status === "In Progress",
  ).length;
  const notStartedTasks = tasks?.filter(
    (task) => task.status === "Not Started",
  ).length;
  const completedPercentage =
    totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;
  const inProgressPercentage =
    totalTasks > 0 ? (inProgressTasks / totalTasks) * 100 : 0;
  const notStartedPercentage =
    totalTasks > 0 ? (notStartedTasks / totalTasks) * 100 : 0;

  return (
    <>
      {user ? (
        <div className="flex flex-col ">
          <div className=" md:ml-64 ml-6 mt-2  border-gray-500 mr-3 text-xl font-bold  w-[56rem]  ">
            {path?.prevPath === "/register"
              ? `Welcome ${user?.name}`
              : `Welcome Back, ${user?.name}`}
          </div>
          <div
            className="md:ml-64 ml-6 mr-7  w-[30rem] 
          md:w-[58rem]  rounded-lg shadow-2xl  "
          >
            <div className="text-[#FF5C5C] ml-5 flex items-center">
              <span className="font-semibold">To-Do</span>
              <MdOutlinePendingActions
                className="text-gray-800"
                size={30}
                text-lg
              />
            </div>
            <div className="flex flex-wrap  ">
              <UrgentTask />
              <div className="flex flex-col flex-wrap md:flex md:flex-col md:pt-14 bg-white border-none rounded-lg">
                <div className="flex ml-4 border-none rounded-lg shadow-xl pb-2  py-6">
                  <DonutChart
                    value={Number(completedPercentage.toFixed(2))}
                    color="green"
                    label="Completed"
                  />
                  <DonutChart
                    value={Number(inProgressPercentage.toFixed(2))}
                    color="yellow"
                    label="In Progress"
                  />
                  <DonutChart
                    value={Number(notStartedPercentage.toFixed(2))}
                    color="red"
                    label="Not Started"
                  />
                </div>

                <div className="mt-5 p-1 rounded-lg flex flex-col  pr-3">
                  <span className="text-lg m-2 text-green-600">
                    Completed Task:
                  </span>
                  {completedTasks && completedTasks.length > 0 ? (
                    <TaskDetail1 task={completedTasks[0]} />
                  ) : (
                    <span className="text-gray-500 ml-2">
                      No completed tasks yet
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" ml-5 md:ml-64 fixed ">
          <img
            src="/pexels-goumbik-669615.jpg"
            className="object-cover w-[98%]  "
          />
          <div className="absolute bottom-10 left-0 w-full h-full flex items-center justify-center">
            <div className="bg-white w-[60%] h-64 z-50 rounded-lg  flex flex-col items-center justify-center gap-y-6 mt-18">
              <div className="text-lg font-semibold">
                Want To Manage Yourself More Effectively and Efficiently? Then:
              </div>
              <div className=" font-semibold">
                Dont Have An Account?
                <Link
                  className="text-[#FF5C5C] font-semibold ml-2 underline decoration decoration-[#FF5C5C]"
                  to="/register"
                >
                  Register
                </Link>
              </div>
              <div className=" font-semibold">
                Already Have An Account?
                <Link
                  className="text-[#FF5C5C] ml-2 underline decoration decoration-[#FF5C5C] "
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
