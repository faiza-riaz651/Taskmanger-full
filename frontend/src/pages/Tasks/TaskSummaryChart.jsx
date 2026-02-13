import React from "react";

const TaskSummaryChart = ({ action, actionValue, countVal }) => {
  return (
    <div className="mt-15 mb-4 ml-15 w-[75%]">
      <table className="w-[85%] rounded-lg border-collapse">
        <caption className="font-bold text-2xl bg-[#FF5C5C] text-white mb-3 border-none rounded-md">
          By {action}
        </caption>
        <tr className="text-white bg-[#FF5C5C]">
          <td className="border border-gray-400 p-4 font-bold ">SN</td>
          <td className="border border-gray-400 p-4 font-bold ">{action}</td>
          <td className="border border-gray-400 p-4 font-bold ">Task Count</td>
        </tr>

        {actionValue &&
          countVal &&
          [0, 1, 2].map((i) => (
            <tr>
              <td className="border-1 border-gray-400 p-3">{i + 1}</td>
              <td className="border-1 border-gray-400 p-3">{actionValue[i]}</td>
              <td className="border-1 border-gray-400 p-3">{countVal[i]}</td>
            </tr>
          ))}
      </table>
    </div>
  );
};

export default TaskSummaryChart;
