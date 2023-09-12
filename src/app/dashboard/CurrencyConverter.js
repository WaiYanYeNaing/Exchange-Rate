// CurrencyConverter.js
import React from "react";
import Image from "next/image";
import { Datepicker } from "flowbite-react";

const CurrencyConverter = ({
  fromCurrency,
  toCurrency,
  currencies,
  fromCurrencyAmount,
  toCurrencyAmount,
  handleFromCurrencyChange,
  handleFromCurrencyAmountChange,
  handleToCurrencyChange,
  handleToCurrencyAmountChange,
  handleSelectedDateChange,
}) => {
  return (
    <div className="w-full sm:w-7/12">
      <div className="flex justify-center items-center max-w-full h-[380px] p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
        <div className="flex flex-col space-y-3 lg:space-y-10">
          <h5 className="text-2xl mb-2 font-bold tracking-tight text-white">
            {fromCurrency} {currencies[fromCurrency]} to {toCurrency}{" "}
            {currencies[toCurrency]}
          </h5>
          <div className="flex flex-wrap">
            <div className="grow space-y-3 pt-3 w-full lg:w-[160px] xl:w-52">
              <select
                id="fromCurrency"
                value={fromCurrency}
                onChange={(e) => handleFromCurrencyChange(e)}
                className="order text-sm rounded-md block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.keys(currencies).map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>

              <input
                type="text"
                id="fromCurrencyAmount"
                value={fromCurrencyAmount}
                onChange={(e) => handleFromCurrencyAmountChange(e)}
                className="border text-sm rounded-md block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="items-center px-6 hidden lg:flex">
              <Image
                src="/swap.png"
                alt="Vercel Logo"
                width={15}
                height={20}
                priority
              />
            </div>

            <div className="grow space-y-3 pt-3 w-full lg:w-[160px] xl:w-52">
              <select
                id="toCurrency"
                value={toCurrency}
                onChange={(e) => handleToCurrencyChange(e)}
                className="order text-sm rounded-md block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.keys(currencies).map((currencyCode) => (
                  <option key={currencyCode} value={currencyCode}>
                    {currencyCode}
                  </option>
                ))}
              </select>

              <input
                type="text"
                id="toCurrencyAmount"
                value={toCurrencyAmount}
                onChange={(e) => handleToCurrencyAmountChange(e)}
                className="border text-sm rounded-md block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <Datepicker
              className="w-52"
              onChange={(date) => handleSelectedDateChange(date)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
