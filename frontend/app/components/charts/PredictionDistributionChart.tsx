"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "High Risk", value: 5 },
  { name: "Medium Risk", value: 20 },
  { name: "Low Risk", value: 75 },
];

const COLORS = ["#DC4F35", "#F59E0B", "#0D9488"]; // matched to data order above

export default function RiskDistribution() {
  return (
    <div className="flex justify-center">
      <ResponsiveContainer width="70%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="30%"
            innerRadius={50}
            outerRadius={72}
            paddingAngle={2}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #E5E5E5",
              fontSize: 12,
            }}
          />

          <Legend
            layout="vertical"
            verticalAlign="middle"
            position="right"
            iconType="circle"
            iconSize={12}
            wrapperStyle={{ fontSize: 11.5, color: "#666", paddingBottom: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
