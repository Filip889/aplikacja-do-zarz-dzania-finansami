import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";

function ExpenseByCategoryPie({ data }) {
  const COLORS = [
    "#dc2626",
    "#ea580c",
    "#f59e0b",
    "#16a34a",
    "#0d9488",
    "#2563eb",
    "#7c3aed",
    "#db2777"
  ];

  if (!data || data.length === 0) {
    return (
      <p className="text-gray-500">
        Brak wydatków do wyświetlenia
      </p>
    );
  }

  return (
    <div style={{ width: "100%", height: 300 }}>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseByCategoryPie;
