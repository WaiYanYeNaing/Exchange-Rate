// LiveRates.js
import React from "react";

const LiveRates = ({ liveRates }) => {
  return (
    <div className="w-full sm:w-4/12">
      <div className="max-w-full h-[380px] border rounded-lg shadow p-6 sm:p-8 bg-gray-800 border-gray-700">
        <p className="mb-2 text-md font-bold tracking-tight text-white">
          Live Rates
        </p>
        <div className="flex">
          <span className="w-1/2">Name</span>
          <span className="w-1/2">Rate</span>
        </div>

        {Object.keys(liveRates).map((currencyCode) => (
          <div key={currencyCode} className="flex text-sm text-gray-400">
            <span className="w-1/2">{currencyCode}</span>
            <span className="w-1/2">{liveRates[currencyCode].toFixed(3)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveRates;
