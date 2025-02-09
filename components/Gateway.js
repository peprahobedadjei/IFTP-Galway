import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import dynamic from "next/dynamic";

// Dynamically import Recharts components to prevent hydration errors
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), { ssr: false });

const memoryData = [
  { name: "Free", value: 25, color: "#28a745" },
  { name: "Buffers", value: 15, color: "#007bff" },
  { name: "Cached", value: 35, color: "#ffc107" },
  { name: "Active", value: 25, color: "#dc3545" }
];

const GatewayStatus = () => {
  const [cpuUsage, setCpuUsage] = useState(50);
  const [temperature, setTemperature] = useState(45);
  const [storageUsed, setStorageUsed] = useState(5000); // 5GB used out of 30GB
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Prevents hydration errors by only rendering on the client
  }, []);

  // CPU updates every 20 seconds
  useEffect(() => {
    const cpuInterval = setInterval(() => {
      setCpuUsage(Math.random() * 100);
    }, 20000);

    return () => clearInterval(cpuInterval);
  }, []);

  // Temperature updates every 10 seconds
  useEffect(() => {
    const tempInterval = setInterval(() => {
      setTemperature(30 + Math.random() * 55);
    }, 10000);

    return () => clearInterval(tempInterval);
  }, []);

  // Storage updates every 50 seconds
  useEffect(() => {
    const storageInterval = setInterval(() => {
      setStorageUsed(1000 + Math.random() * 20000);
    }, 50000);

    return () => clearInterval(storageInterval);
  }, []);

  // Function to determine colors based on thresholds
  const getColor = (value, type) => {
    if (type === "cpu") return value > 80 ? "red" : value > 50 ? "yellow" : "green";
    if (type === "temp") return value > 70 ? "red" : value > 50 ? "yellow" : "green";
    if (type === "storage") return value > 20000 ? "red" : value > 10000 ? "yellow" : "green";
  };

  return (
    <div className=" text-white p-2 w-48 rounded-lg overflow-auto mx-auto flex flex-col items-center">

      {/* CPU Usage */}
      <div className="mt-4 flex flex-col items-center border rounded-md px-2 py-1">
        <h3 className="text-xs font-semibold text-center">CPU</h3>
        <div className="w-28 h-28">
          <CircularProgressbar
            value={cpuUsage}
            text={`${Math.round(cpuUsage)}%`}
            styles={buildStyles({
              textColor: "white",
              pathColor: getColor(cpuUsage, "cpu"),
              trailColor: "#333",
            })}
          />
        </div>
      </div>

      {/* CPU Temperature */}
      <div className="mt-4 flex flex-col items-center border rounded-md px-2 py-1">
        <h3 className="text-xs font-semibold text-center">Temp</h3>
        <div className="w-28 h-28">
          <CircularProgressbar
            value={temperature}
            minValue={30}
            maxValue={85}
            text={`${Math.round(temperature)}°C`}
            styles={buildStyles({
              textColor: "white",
              pathColor: getColor(temperature, "temp"),
              trailColor: "#333",
            })}
          />
        </div>
      </div>

      {/* Memory Usage */}
      <div className="mt-4 flex flex-col items-center border rounded-md px-2 py-1">
        <h3 className="text-xs font-semibold text-center">Memory</h3>
        {isClient && (
          <PieChart width={100} height={100}>
            <Pie data={memoryData} dataKey="value" cx="50%" cy="50%" outerRadius={40} fill="#8884d8">
              {memoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        )}
      </div>

      {/* Data Storage */}
      <div className="mt-4 flex flex-col items-center border rounded-md px-2 py-1">
        <h3 className="text-xs font-semibold text-center">Storage</h3>
        <div className="w-28 h-28">
          <CircularProgressbar
            value={storageUsed}
            maxValue={30385}
            text={`${(storageUsed / 1024).toFixed(1)}GB`}
            styles={buildStyles({
              textColor: "white",
              pathColor: getColor(storageUsed, "storage"),
              trailColor: "#333",
            })}
          />
        </div>
      </div>

      {/* Total Memory */}
      <div className="mt-4 text-center text-xs border rounded-md px-2 py-1">
        <p>Total: <span className="font-bold">30GB</span></p>
      </div>
    </div>
  );
};

export default GatewayStatus;
