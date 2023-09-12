// CurrencyHistory.js
import React from "react";
import Chart from "react-apexcharts";

const CurrencyHistory = ({ chartData }) => {
  return (
    <div className="w-full sm:w-5/12">
      <div className="max-w-full h-[380px] border rounded-lg shadow p-6 sm:p-8 bg-gray-800 border-gray-700">
        <div id="chart">
          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyHistory;
