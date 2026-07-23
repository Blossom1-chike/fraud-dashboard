"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#DC4F35", "#F59E0B", "#0D9488"]; // matched to data order above
const data = [
  { name: "High Risk", value: 5 },
  { name: "Medium Risk", value: 20 },
  { name: "Low Risk", value: 75 },
];

const RiskDistributionChart = () => {
  return (
    <div>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={[
              { name: "High Risk", value: 5 },
              { name: "Medium Risk", value: 20 },
              { name: "Low Risk", value: 75 },
            ]}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={62}
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
              border: "1px solid var(--color-border)",
              fontSize: 12,
            }}
          />

          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontSize: 11.5,
              color: "var(--color-ink-muted)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskDistributionChart;
