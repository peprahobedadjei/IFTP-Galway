import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, ReferenceArea
} from "recharts";

// Prevents Next.js SSR issues by dynamically importing Recharts
const DynamicLineChart = dynamic(() => Promise.resolve(LineChart), { ssr: false });

const PipelineGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const generateData = () => {
      const newEntry = {
        time: new Date().toLocaleTimeString(), // Append new timestamp
        pipeline1: Math.max(-1.5, Math.min(1.5, (Math.random() * 3 - 1.5).toFixed(2))),
        pipeline2: Math.max(0.5, Math.min(1.5, (Math.random() + 0.5).toFixed(2))),
        pipeline3: Math.max(-1.2, Math.min(1.2, (Math.random() * 2.4 - 1.2).toFixed(2))),
        pipeline4: Math.max(-1, Math.min(1, (Math.random() * 2 - 1).toFixed(2))),
        pipeline5: Math.max(0.3, Math.min(1.7, (Math.random() * 1.4 + 0.3).toFixed(2))),
      };

      setData((prevData) => {
        // Keep last 60 data points, sliding effect
        const updatedData = [...prevData, newEntry];
        return updatedData.length > 60 ? updatedData.slice(1) : updatedData;
      });
    };

    const interval = setInterval(generateData, 1000); // Update every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded-lg text-white">
      <h2 className="text-center text-lg font-semibold mb-2">Pipeline Vibration Sensors</h2>
      <ResponsiveContainer width="100%" height={250}>
        <DynamicLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />

          {/* Add background reference band (Safe Zone) */}
          <ReferenceArea y1={-0.5} y2={0.5} fill="green" opacity={0.3} />

          {/* X-Axis for Time, Showing Only Recent Points */}
          <XAxis dataKey="time" stroke="white" interval={10} />

          {/* Clamped Y-Axis */}
          <YAxis stroke="white" domain={[-1.5, 1.5]} />

          <Tooltip />
          <Legend />

          {/* Sensor Lines */}
          <Line type="monotone" dataKey="pipeline1" stroke="red" strokeWidth={2} name="Pipeline 1 Variation" dot={false} />
          <Line type="monotone" dataKey="pipeline2" stroke="blue" strokeWidth={2} name="Pipeline 2 Readings" dot={false} />
          <Line type="monotone" dataKey="pipeline3" stroke="limegreen" strokeWidth={2} name="Pipeline 3 Variation" dot={false} />
          <Line type="monotone" dataKey="pipeline4" stroke="pink" strokeWidth={2} name="Pipeline 4 Readings" dot={false} />
          <Line type="monotone" dataKey="pipeline5" stroke="yellow" strokeWidth={2} name="Pipeline 5 Variation" dot={false} />
        </DynamicLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PipelineGraph;
