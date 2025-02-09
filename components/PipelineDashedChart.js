import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, ReferenceLine
} from "recharts";

// Prevents SSR issues in Next.js
const DynamicLineChart = dynamic(() => Promise.resolve(LineChart), { ssr: false });

const PipelineDashedChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const newData = Array.from({ length: 30 }, (_, index) => ({
        time: new Date(Date.now() - (30 - index) * 2000).toLocaleTimeString(), // Time series (last 30 points)
        sensor1: (Math.random() * 2 - 1).toFixed(2), // Sensor 1 variation (-1 to 1)
        sensor2: (Math.random() * 2 - 1).toFixed(2), // Sensor 2 variation (-1 to 1)
        sensor3: (Math.random() * 2 - 1).toFixed(2), // Sensor 3 variation (-1 to 1)
      }));
      setData(newData);
    };

    generateData();
    const interval = setInterval(generateData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" p-4 rounded-lg text-white">
      <h2 className="text-center text-lg font-semibold mb-2">Pipeline Sensor Positions</h2>
      <ResponsiveContainer width="100%" height={250}>
        <DynamicLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />
          
          {/* Dashed lines indicating where each sensor is positioned */}
          <ReferenceLine y={0.5} stroke="white" strokeDasharray="5 5" label="Sensor 1" />
          <ReferenceLine y={-0.5} stroke="yellow" strokeDasharray="5 5" label="Sensor 2" />
          <ReferenceLine y={1} stroke="red" strokeDasharray="5 5" label="Sensor 3" />

          <XAxis dataKey="time" stroke="white" interval={5} />
          <YAxis stroke="white" domain={[-1.5, 1.5]} />
          <Tooltip />
          <Legend />
          
          {/* Sensor Data with Dashed Lines */}
          <Line type="monotone" dataKey="sensor1" stroke="lime" strokeWidth={2} name="Sensor 1" strokeDasharray="5 5" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="sensor2" stroke="yellow" strokeWidth={2} name="Sensor 2" strokeDasharray="5 5" dot={{ r: 4 }} />
          <Line type="monotone" dataKey="sensor3" stroke="red" strokeWidth={2} name="Sensor 3" strokeDasharray="5 5" dot={{ r: 4 }} />
        </DynamicLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PipelineDashedChart;
