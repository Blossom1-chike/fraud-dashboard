"use client";

import { Area, AreaChart, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fraud_data } from "../../constants/dashboard";

const FraudTrendChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={fraud_data}>
        <XAxis dataKey="day" axisLine={false} tickLine={false} />
        <Tooltip />

        <Area
          dataKey="fraud"
          stroke="#0E6E5C"
          fill="#E4F1EC"
          strokeWidth={2}
          fillOpacity={0.6}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default FraudTrendChart;
