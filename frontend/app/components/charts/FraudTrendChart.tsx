"use client";

import { Area, AreaChart, XAxis, Tooltip } from "recharts";
import { fraud_data } from "../../constants/dashboard";

const FraudTrendChart = () => {
  return (
    <AreaChart
      data={fraud_data}
      style={{ width: "100%", minHeight: "220px" }}
      responsive
    >
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
  );
};

export default FraudTrendChart;
