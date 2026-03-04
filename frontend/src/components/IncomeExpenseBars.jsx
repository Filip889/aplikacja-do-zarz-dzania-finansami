import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

function IncomeExpenseBars({ income, expense }) {
  const data = [
    { name: "Przychody", value: income, fill: "#16a34a" },
    { name: "Wydatki", value: expense, fill: "#dc2626" }
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
}

export default IncomeExpenseBars;
