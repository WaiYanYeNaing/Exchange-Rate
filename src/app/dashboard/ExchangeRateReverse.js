// ExchangeRateReverse.js
import Image from "next/image";
import React from "react";

const ExchangeRateReverse = ({
  fromCurrency,
  toCurrency,
  exchangeRate,
  exchangeValues,
  handleReverseExchangeValueClick,
}) => {
  const getCountry = (currencyCode) => {
    const lowercaseCode = currencyCode.toLowerCase();
    return lowercaseCode.slice(0, -1);
  };

  return (
    <div className="w-full md:w-1/2 lg:w-4/12 pl-0 md:pl-2 lg:px-2 mb-4">
      <div className="max-w-full h-[380px] p-6 border rounded-lg shadow bg-gray-800 border-gray-700 pl-10">
        <p className="mb-2 text-md font-bold tracking-tight text-white">
          Exchange Rate from {fromCurrency} to {toCurrency}
        </p>

        <div className="flex justify-between mb-2">
          <div className="w-5/12 flex items-center">
            {/* Display the flag icon and currency code for 'toCurrency' */}
            <img
              src={`https://flagcdn.com/w40/${getCountry(toCurrency)}.png`}
              className="w-6 h-4 inline-block align-middle mr-2"
            />
            <div>{toCurrency}</div>
          </div>
          <div className="w-5/12 flex items-center">
            {/* Display the flag icon and currency code for 'fromCurrency' */}
            <img
              src={`https://flagcdn.com/w40/${getCountry(fromCurrency)}.png`}
              className="w-6 h-4 inline-block align-middle mr-2"
            />
            <div>{fromCurrency}</div>
          </div>
        </div>

        <div className="flex justify-between text-[13px]">
          <div className="w-5/12">
            {/* Display exchange values */}
            {exchangeValues.map((value) => (
              <div
                key={value}
                className="font-normal flex items-center w-fit text-gray-400 cursor-pointer my-1 hover:scale-105 transform transition duration-200 active:opacity-60"
                onClick={() => handleReverseExchangeValueClick(value)}
              >
                {value}
                <Image
                  src="/right.png"
                  alt="Vercel Logo"
                  width={15}
                  height={20}
                  className="ml-2"
                  priority
                />
              </div>
            ))}
          </div>
          <div className="w-5/12">
            {/* Display converted exchange values */}
            {exchangeValues.map((value) => (
              <div key={value} className="font-normal text-gray-400 my-1">
                {parseFloat((value / exchangeRate).toFixed(5))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRateReverse;
