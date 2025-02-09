import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const CancellationReasonChart = ({ setLogs, logs }) => {
  const [alertColor, setAlertColor] = useState("bg-green-500");
  const [alertText, setAlertText] = useState("No Leak Detected");
  const [icon, setIcon] = useState(<FaCheckCircle className="text-white text-9xl mt-2" />);

  useEffect(() => {
    const sensorSimulation = () => {
      const sensors = [
        { name: "Sensor 1", value: Math.random() * 100 },
        { name: "Sensor 2", value: Math.random() * 100 },
        { name: "Sensor 3", value: Math.random() * 100 },
        { name: "Sensor 4", value: Math.random() * 100 },
        { name: "Sensor 5", value: Math.random() * 100 },
      ];

      const threshold = 70;
      const exceededSensors = sensors.filter(sensor => sensor.value > threshold);

      if (exceededSensors.length > 0) {
        setAlertColor("bg-yellow-500");
        setAlertText("⚠ Micro Leak Detected!");
        setIcon(<FaExclamationTriangle className="text-white text-9xl" />);

        // Log exceeded sensors
        const newLogs = exceededSensors.map(sensor => `${sensor.name} - ${sensor.value.toFixed(1)}`);
        setLogs(prevLogs => [...newLogs, ...prevLogs]); // Store logs in dashboard
      } else {
        setAlertColor("bg-green-500");
        setAlertText("No Leak Detected ✅");
        setIcon(<FaCheckCircle className="text-white text-9xl mt-2" />);
      }
    };

    const interval = setInterval(sensorSimulation, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`p-6 rounded-lg text-white ${alertColor} transition-colors duration-500 flex flex-col items-center justify-center`}>
      {icon}
      <h3 className="text-lg font-semibold mt-2">Leak Detection System</h3>
      <p className="text-2xl font-bold text-center mt-2">{alertText}</p>
      <p className="text-sm text-center text-gray-200 mt-1">
        {alertColor === "bg-green-500"
          ? "All sensors are active and working."
          : "Pipeline sensor has detected a micro leak."}
      </p>
    </div>
  );
};

export default CancellationReasonChart;
