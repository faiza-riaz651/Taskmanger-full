import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DonutChart = ({ value, color, label }) => {
  const data = [
    { name: "value", value: value },
    { name: "remaining", value: 100 - value },
  ];

  return (
    <div className="flex flex-col items-center w-[150px]">
      <div className="w-[140px] h-[140px] relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={45}
              outerRadius={60}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              <Cell fill={color} />
              <Cell fill="#e5e5e5" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
          {value}%
        </div>
      </div>

      <span className="mt-2 text-sm">{label}</span>
    </div>
  );
};

export default DonutChart;
