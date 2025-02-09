import React from "react";

const Logger = ({ logs = [] }) => {  // Set a default empty array for logs
  return (
    <div className=" text-white p-4 rounded-lg mt-4 w-full">
      <h3 className="text-lg font-semibold">Leak Detection Log</h3>
      <div className="mt-2 h-40 overflow-y-auto">
        {logs?.length === 0 ? (  // Use optional chaining to prevent errors
          <p className="text-sm text-gray-400">No leaks detected.</p>
        ) : (
          <ul className="text-sm">
            {logs.map((log, index) => (
              <li key={index} className="border-b border-gray-700 py-1">
                {log}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Logger;
