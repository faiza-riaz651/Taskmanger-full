import React from "react";
import { useGetTasksByCatQuery } from "../../redux/api/taskApiSlice";

const TasksByCat = () => {
  return (
    <div className="ml-64 flex flex-col border-2 border-gray-500 rounded-lg w-[63rem] mr-2">
      task by cat
    </div>
  );
};

export default TasksByCat;
