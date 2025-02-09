import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Dynamically import Recharts components to avoid SSR issues
const BusinessPremiumChart = dynamic(() => import('@/components/BusinessPremiumChart'), { ssr: false });
const CancellationReasonChart = dynamic(() => import('@/components/CancellationReasonChart'), { ssr: false });
const Logger = dynamic(() => import('@/components/Logger'), { ssr: false });

function Dashboard() {
  const [logs, setLogs] = useState([]); // Store logs at the dashboard level

  return (
    <>

      <div className="p-4">
        {/* 3-Panel Horizontal Layout */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          
          {/* First Panel: New Business Premium */}
          <div className=" text-white rounded-lg p-4">
            <BusinessPremiumChart />
          </div>

          {/* Second Panel: Cancellation Reason */}
          <div className=" text-white rounded-lg p-4">
            <CancellationReasonChart setLogs={setLogs} logs={logs} /> {/* Pass logs to component */}
          </div>

          {/* Third Panel: Logger Panel */}
          <div className=" text-white rounded-lg p-4 flex flex-col">
            <h3 className="text-lg font-semibold">Leak Detection Log</h3>
            <div className="mt-2 flex-grow overflow-y-auto max-h-64"> {/* Scrollable section */}
              <Logger logs={logs} />
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Dashboard;
