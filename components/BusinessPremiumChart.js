import React from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, ReferenceLine
} from "recharts";

const data = [
  { date: "1 Jan", detected: 0, baseline: 0 },
  { date: "6 Jan", detected: 20000, baseline: 10000 },
  { date: "11 Jan", detected: 50000, baseline: 40000 },
  { date: "16 Jan", detected: 100000, baseline: 75000 },
  { date: "21 Jan", detected: 180000, baseline: 140000 },
  { date: "26 Jan", detected: 290000, baseline: 200000 },
  { date: "31 Dec", detected: 350000, baseline: 250000 },
];

const LeakedDataChart = () => {
  return (
    <div className=" text-white">
      <h3 className="text-base font-semibold text-white">Leaked Data Detected</h3>
      <p className="text-base font-bold text-red-400">⚠ 350,000 Records</p>
      <p className="text-sm text-gray-400">Detected Anomalies in Data Flow</p>
      
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />
          <XAxis dataKey="date" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip />
          <Legend />

          {/* Reference Line for Alert Threshold */}
          <ReferenceLine y={250000} stroke="red" strokeDasharray="3 3" label="Alert Threshold" />

          {/* Leaked Data (Detected Anomaly) */}
          <Line type="monotone" dataKey="detected" stroke="red" strokeWidth={3} name="Detected Leak" />

          {/* Historical Baseline (Expected Flow) */}
          <Line type="monotone" dataKey="baseline" stroke="white" strokeDasharray="4 4" strokeWidth={2} name="Baseline Expected" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeakedDataChart;
