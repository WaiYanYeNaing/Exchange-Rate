// LiveRates.js
import React from "react";

const LiveRates = ({ liveRates, handleLiveRateClick }) => {
  return (
    <div className="w-full lg:w-4/12 pl-0 lg:pl-2 mb-4">
      <div className="max-w-full h-[380px] border rounded-lg shadow p-6 sm:p-8 bg-gray-800 border-gray-700">
        <p className="mb-2 text-md font-bold tracking-tight text-white mt-[-0.5rem] pl-2">
          Live Rates
        </p>
        <div className="flex pl-2">
          <span className="w-1/2">Name</span>
          <span className="w-1/2">Rate</span>
        </div>
        <div className="h-[250px] overflow-y-auto mt-3 overflow-x-hidden pl-2">
          <table className="w-full">
            <tbody>
              {Object.keys(liveRates).map((currencyCode) => (
                <tr
                  key={currencyCode}
                  className="text-[13px] text-gray-400 my-1 hover:scale-[1.03] transform transition duration-200 active:opacity-60 cursor-pointer"
                  onClick={() => handleLiveRateClick(currencyCode.slice(3, 6))}
                >
                  <td className="w-1/2">
                    {currencyCode.slice(3, 6)} / {currencyCode.slice(3, 6)}
                  </td>
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
