"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Datepicker } from "flowbite-react";
import Chart from "react-apexcharts";

const CurrencyExchange = () => {
  const [currencies, setCurrencies] = useState({});
  const [liveRates, setLiveRates] = useState({});
  const [exchangeRate, setExchangeRate] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("MMK");
  const [fromCurrencyAmount, setFromCurrencyAmount] = useState(1);
  const [toCurrencyAmount, setToCurrencyAmount] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const dates = [
    { x: new Date("2023-09-01"), y: 1000000 },
    { x: new Date("2023-09-02"), y: 1200000 },
    { x: new Date("2023-09-03"), y: 12870000 },
    { x: new Date("2023-09-04"), y: 13870808 },
  ];
  const [chartData, setChartData] = useState({
    series: [{ name: "", data: dates }],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => (val / 1000000).toFixed(5),
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        x: {
          formatter: (val) =>
            new Date(val).toISOString().split("T00:00:00.000Z"),
        },
        y: {
          formatter: (val) => (val / 1000000).toFixed(4),
        },
      },
    },
  });

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
          console.error("Failed to fetch currency list from API");
        }
      } catch (error) {
        console.error("An error occurred while fetching currency list:", error);
      }
    };

    const fetchLiveRates = async () => {
      try {
        const response = await fetch(
          "http://apilayer.net/live?access_key=9090e947b8f4f1cb464c441036e62085"
        );

        if (response.status === 200) {
          const data = await response.json();
          setLiveRates(data.quotes);
        } else {
          console.error("Failed to fetch live exchange rates from API");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching live exchange rates:",
          error
        );
      }
    };

    fetchCurrencyList();
    setTimeout(() => {
      fetchLiveRates();
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setTimeout(async () => {
        try {
          const response = await fetch(
            `http://apilayer.net/live?access_key=9090e947b8f4f1cb464c441036e62085&date=2023-09-12&currencies=${toCurrency}&source=${fromCurrency}&format=1`
          );

          if (response.status === 200) {
            const data = await response.json();
            const [currency, rate] = Object.entries(data.quotes)[0];
            setExchangeRate(rate);
            setToCurrencyAmount((fromCurrencyAmount * rate).toFixed(5));
          } else {
            console.error("Failed to fetch exchange rate from API");
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
  }, [fromCurrency, toCurrency]);

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleFromCurrencyAmountChange = (e) => {
    setToCurrencyAmount((e.target.value * exchangeRate).toFixed(5));
    setFromCurrencyAmount(e.target.value);
  };

  const handleToCurrencyAmountChange = (e) => {
    setFromCurrencyAmount((e.target.value / exchangeRate).toFixed(5));
    setToCurrencyAmount(e.target.value);
  };

  const handleSelectedDateChange = (date) => {
    setSelectedDate(date);
  };

  const getCountry = (currencyCode) => {
    const lowercaseCode = currencyCode.toLowerCase();
    return lowercaseCode.slice(0, -1);
  };

  return (
    <main className="flex flex-col p-4 sm:px-20">
      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4">
        {/* Currency Converter */}
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

        {/* Currency History */}
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
      </div>

      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4 sm:mt-[-2.7rem] mt-[1rem]">
        {/* Exchange Rate */}
        <div className="w-full sm:w-4/12">
          <div className="max-w-full h-[380px] p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
            <p className="mb-2 text-md font-bold tracking-tight text-white">
              Exchange Rate from {toCurrency} to {fromCurrency}
            </p>

            <div className="flex justify-between mb-2">
              <div className="w-5/12 flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${getCountry(
                    fromCurrency
                  )}.png`}
                  className="w-6 h-4 inline-block align-middle mr-2"
                />
                <div>{fromCurrency}</div>
              </div>
              <div className="w-5/12 flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${getCountry(toCurrency)}.png`}
                  className="w-6 h-4 inline-block align-middle mr-2"
                />
                <div>{toCurrency}</div>
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
                    {(value * exchangeRate).toFixed(3)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exchange Rate Reverse */}
        <div className="w-full sm:w-4/12">
          <div className="max-w-full h-[380px] p-6 border rounded-lg shadow bg-gray-800 border-gray-700">
            <p className="mb-2 text-md font-bold tracking-tight text-white">
              Exchange Rate from {fromCurrency} to {toCurrency}
            </p>

            <div className="flex justify-between mb-2">
              <div className="w-5/12 flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${getCountry(toCurrency)}.png`}
                  className="w-6 h-4 inline-block align-middle mr-2"
                />
                <div>{toCurrency}</div>
              </div>
              <div className="w-5/12 flex items-center">
                <img
                  src={`https://flagcdn.com/w40/${getCountry(
                    fromCurrency
                  )}.png`}
                  className="w-6 h-4 inline-block align-middle mr-2"
                />
                <div>{fromCurrency}</div>
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
                    {(value / exchangeRate).toFixed(5)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Rate */}
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
              <div className="flex text-sm text-gray-400">
                <span className="w-1/2">{currencyCode}</span>
                <span className="w-1/2">
                  {liveRates[currencyCode].toFixed(3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CurrencyExchange;
