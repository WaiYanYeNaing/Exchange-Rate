"use client"; 

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Datepicker } from "flowbite-react";

const CurrencyExchange = () => {
  // Define state variables with default values
  const [currencies, setCurrencies] = useState({});
  const [rate, setRate] = useState(1);
  const [fromCurrencyType, setFromCurrencyType] = useState("USD"); // Default currency type is set to "US"
  const [toCurrencyType, setToCurrencyType] = useState("MMK"); // Default currency type is set to "FR"
  const [fromCurrencyValue, setFromCurrencyValue] = useState(1); // Default currency value is set to "1"
  const [toCurrencyValue, setToCurrencyValue] = useState(1); // Default currency value is set to "1"
  const [selectedDate, setSelectedDate] = useState(null); // Default selected date is null

  // Define an array of exchange values
  const exchangeValues = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 50000];

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const response = await fetch(
          "http://apilayer.net/list?access_key=9090e947b8f4f1cb464c441036e62085"
        );

        if (response.status === 200) {
          const data = await response.json();
          setCurrencies(data.currencies);
        } else {
          console.error("API request for currency list failed");
        }
      } catch (error) {
        console.error("An error occurred while fetching currency list:", error);
      }
    };

    fetchCurrencyList();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setTimeout(async () => {
        try {
          const response = await fetch(
            `http://apilayer.net/live?access_key=9090e947b8f4f1cb464c441036e62085&currencies=${toCurrencyType}&source=${fromCurrencyType}&format=1`
          );

          if (response.status === 200) {
            const data = await response.json();
            const [currency, rate] = Object.entries(data.quotes)[0];
            setRate(rate);
            setToCurrencyValue((fromCurrencyValue * rate).toFixed(5));
          } else {
            console.error("API request for exchange rate failed");
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching exchange rate:",
            error
          );
        }
      }, 1000);
    };

    fetchExchangeRate();
  }, [fromCurrencyType, toCurrencyType]);



  // Event handlers for changing state
  const handleFromCurrencyType = (e) => {
    alert("Access Restricted - Your current Subscription Plan does not support Source Currency Switching.")
    // setFromCurrencyType(e.target.value);
  };
  const handleToCurrencyType = (e) => {
    setToCurrencyType(e.target.value);
  };
  const handleFromCurrencyValue = (e) => { 
    setToCurrencyValue((e.target.value * rate).toFixed(5)); 
    setFromCurrencyValue(e.target.value);
  };
  const handleToCurrencyValue = (e) => {
    setFromCurrencyValue((e.target.value / rate).toFixed(5)); 
    setToCurrencyValue(e.target.value);
  };
  const handleSelectedDate = (date) => {
    console.log(date);
    setSelectedDate(date);
  };
  const getCountry = (inputString) => {
    // Convert the string to lowercase
    const lowercaseString = inputString.toLowerCase();

    // Remove the last letter
    const modifiedString = lowercaseString.slice(0, -1);

    return modifiedString;
  };

  return (
    <main className="flex flex-col p-4 sm:px-32">
      {/* Header */}
      {/* <h5 className="text-2xl mb-2 font-bold ml-8 tracking-tighttext-white">
        {fromCurrencyType} {currencies[fromCurrencyType]} to {toCurrencyType}{" "}
        {currencies[toCurrencyType]}
      </h5> */}

      {/* First row */}
      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4">
        {/* Exchange rate */}
        <div className="w-full sm:w-8/12">
          <div className="flex justify-center items-center max-w-full h-[380px] p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
            <div className="flex flex-col space-y-3 lg:space-y-10">
              <h5 className="text-2xl mb-2 font-bold tracking-tighttext-white">
                {fromCurrencyType} {currencies[fromCurrencyType]} to{" "}
                {toCurrencyType} {currencies[toCurrencyType]}
              </h5>
              <div className="flex flex-wrap">
                <div className="grow space-y-3 pt-3 w-full lg:w-[160px] xl:w-52">
                  <select
                    id="countries"
                    value={fromCurrencyType}
                    onChange={handleFromCurrencyType}
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
                    id="first_name"
                    value={fromCurrencyValue}
                    onChange={handleFromCurrencyValue}
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
                    id="countries"
                    value={toCurrencyType}
                    onChange={handleToCurrencyType}
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
                    id="first_name"
                    value={toCurrencyValue}
                    onChange={handleToCurrencyValue}
                    className="border text-sm rounded-md block w-full p-2.5 bg-gray-900 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <Datepicker
                  className="w-52"
                  onChange={() => handleSelectedDate} // Call the handler when date changes
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live rate */}
        <div className="w-full sm:w-4/12">
          <div className="max-w-full h-[380px] border rounded-lg shadow p-6 sm:p-8 bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-white">
                Latest Customers
              </h5>
              <a
                href="#"
                className="text-sm font-medium hover:underline text-blue-500"
              >
                View all
              </a>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-700">
                {/* Repeat list items as needed */}
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">
                        Neil Sims
                      </p>
                      <p className="text-sm truncate text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white">
                      $320
                    </div>
                  </div>
                </li>
                {/* Repeat other list items */}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4 sm:mt-[-2.7rem] mt-[1rem]">
        {/* Exchange rate list */}
        <div className="w-full sm:w-4/12">
          <div className="max-w-full h-[380px] p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
            <p className="mb-2 text-md font-bold tracking-tight text-white">
              Exchange Rate from {toCurrencyType} to {fromCurrencyType}
            </p>

            <div className="flex justify-between mb-2">
              <div className="w-5/12 flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${getCountry(
                    fromCurrencyType
                  )}.png`}
                  className="w-6 h-4 inline-block align-middle mr-2"
                />
                <div>{fromCurrencyType}</div>
              </div>
              <div className="w-5/12 flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${getCountry(
                    toCurrencyType
                  )}.png`}
                  className="w-6 h-4 inline-block align-middle mr-2"
                />
                <div>{toCurrencyType}</div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-5/12">
                {exchangeValues.map((value) => (
                  <div key={value} className="font-normal text-gray-400">
                    {value}
                  </div>
                ))}
              </div>
              <div className="w-5/12">
                {exchangeValues.map((value) => (
                  <div key={value} className="font-normal text-gray-400">
                    {(value * rate).toFixed(3)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:w-4/12">
          <div className="max-w-full h-[380px] p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
            <p className="mb-2 text-md font-bold tracking-tight text-white">
              Exchange Rate from {fromCurrencyType} to {toCurrencyType}
            </p>

            <div className="flex justify-between mb-2">
              <div className="w-5/12 flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${getCountry(
                    toCurrencyType
                  )}.png`}
                  className="w-6 h-4 inline-block align-middle mr-2"
                />
                <div>{toCurrencyType}</div>
              </div>
              <div className="w-5/12 flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${getCountry(
                    fromCurrencyType
                  )}.png`}
                  className="w-6 h-4 inline-block align-middle mr-2"
                />
                <div>{fromCurrencyType}</div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-5/12">
                {exchangeValues.map((value) => (
                  <div key={value} className="font-normal text-gray-400">
                    {value}
                  </div>
                ))}
              </div>
              <div className="w-5/12">
                {exchangeValues.map((value) => (
                  <div key={value} className="font-normal text-gray-400">
                    {(value / rate).toFixed(5)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="w-full sm:w-4/12">
          <div className="max-w-full h-[380px] border rounded-lg shadow p-6 sm:p-8 bg-gray-800 border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-white">
                Latest Customers
              </h5>
              <a
                href="#"
                className="text-sm font-medium hover:underline text-blue-500"
              >
                View all
              </a>
            </div>
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-700">
                {/* Repeat list items as needed */}
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">
                        Neil Sims
                      </p>
                      <p className="text-sm truncate text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-white">
                      $320
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CurrencyExchange;
