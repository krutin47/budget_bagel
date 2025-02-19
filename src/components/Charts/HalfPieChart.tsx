import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

// Half Pie Chart Component
const HalfPieChart = ({ percentage, color }: { percentage: number; color: string }) => {
  const data = [
    { name: "Filled", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];
  return (
    <ResponsiveContainer width={90} height={90}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="100%"
          startAngle={180}
          endAngle={0}
          innerRadius={30}
          outerRadius={40}
          paddingAngle={3}
          dataKey="value"
        >
          <Cell key="filled" fill={color} />
          <Cell key="remaining" fill="#2c3e50" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HalfPieChart