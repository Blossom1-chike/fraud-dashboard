"use client";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TransactionTypesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart
        data={[
          { type: "TRANSFER", count: 42 },
          { type: "CASH_OUT", count: 31 },
          { type: "PAYMENT", count: 18 },
          { type: "DEBIT", count: 9 },
        ]}
        margin={{ top: 4, right: 8, left: -18, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--color-border)"
          vertical={false}
        />

        <XAxis
          dataKey="type"
          tick={{
            fontSize: 10.5,
            fill: "var(--color-ink-muted)",
          }}
          axisLine={{ stroke: "var(--color-border)" }}
          tickLine={false}
        />

        <YAxis
          tick={{
            fontSize: 10.5,
            fill: "var(--color-ink-muted)",
          }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            borderRadius: 8,
            border: "1px solid var(--color-border)",
            fontSize: 12,
          }}
          formatter={(v) => [`${v}%`, "Share"]}
        />

        <Bar dataKey="count" fill="var(--color-teal)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TransactionTypesChart;
