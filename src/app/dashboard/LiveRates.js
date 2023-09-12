// LiveRates.js
import React from "react";

const LiveRates = ({ liveRates }) => {
  return (
    <div className="w-full sm:w-4/12">
      <div className="max-w-full h-[380px] border rounded-lg shadow p-6 sm:p-8 bg-gray-800 border-gray-700">
        <p className="mb-2 text-md font-bold tracking-tight text-white mt-[-0.5rem]">
          Live Rates
        </p>
        <div className="flex">
          <span className="w-1/2">Name</span>
          <span className="w-1/2">Rate</span>
        </div>
        <div className="h-[250px] overflow-y-auto mt-3">
          <table className="w-full">
            <tbody>
              {Object.keys(liveRates).map((currencyCode) => (
                <tr key={currencyCode} className="text-[13px] text-gray-400">
                  <td className="w-1/2">{currencyCode}</td>
                  <td className="w-1/2">
                    {parseFloat(liveRates[currencyCode].toFixed(3))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveRates;
