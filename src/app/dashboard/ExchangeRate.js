// ExchangeRate.js
import React from "react";

const ExchangeRate = ({
  fromCurrency,
  toCurrency,
  exchangeRate,
  exchangeValues,
}) => {
  const getCountry = (currencyCode) => {
    const lowercaseCode = currencyCode.toLowerCase();
    return lowercaseCode.slice(0, -1);
  };

  return (
    <div className="w-full sm:w-4/12">
      <div className="max-w-full h-[380px] p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
        <p className="mb-2 text-md font-bold tracking-tight text-white">
          Exchange Rate from {toCurrency} to {fromCurrency}
        </p>

        <div className="flex justify-between mb-2">
          <div className="w-5/12 flex items-center">
            {/* Display the flag icon and currency code for 'fromCurrency' */}
            <img
              src={`https://flagcdn.com/w40/${getCountry(fromCurrency)}.png`}
              className="w-6 h-4 inline-block align-middle mr-2"
            />
            <div>{fromCurrency}</div>
          </div>
          <div className="w-5/12 flex items-center">
            {/* Display the flag icon and currency code for 'toCurrency' */}
            <img
              src={`https://flagcdn.com/w40/${getCountry(toCurrency)}.png`}
              className="w-6 h-4 inline-block align-middle mr-2"
            />
            <div>{toCurrency}</div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-5/12">
            {/* Display exchange values */}
            {exchangeValues.map((value) => (
              <div key={value} className="font-normal text-gray-400">
                {value}
              </div>
            ))}
          </div>
          <div className="w-5/12">
            {/* Display converted exchange values */}
            {exchangeValues.map((value) => (
              <div key={value} className="font-normal text-gray-400">
                {(value * exchangeRate).toFixed(3)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRate;
