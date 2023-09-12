"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Datepicker } from "flowbite-react";
import Chart from "react-apexcharts";
import CurrencyConverter from "./CurrencyConverter";
import CurrencyHistory from "./CurrencyHistory";
import ExchangeRate from "./ExchangeRate";
import ExchangeRateReverse from "./ExchangeRateReverse";
import LiveRates from "./LiveRates";

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

  return (
    <main className="flex flex-col p-4 sm:px-20">
      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4">
        <CurrencyConverter
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          currencies={currencies}
          fromCurrencyAmount={fromCurrencyAmount}
          toCurrencyAmount={toCurrencyAmount} 
          handleFromCurrencyAmountChange={handleFromCurrencyAmountChange}
          handleToCurrencyChange={handleToCurrencyChange}
          handleToCurrencyAmountChange={handleToCurrencyAmountChange}
          handleSelectedDateChange={handleSelectedDateChange}
        />
        <CurrencyHistory chartData={chartData} />
      </div>

      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4 sm:mt-[-2.7rem] mt-[1rem]">
        <ExchangeRate
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
          exchangeValues={exchangeValues}
        />
        <ExchangeRateReverse
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
          exchangeValues={exchangeValues}
        />
        <LiveRates liveRates={liveRates} />
      </div>
    </main>
  );
};

export default CurrencyExchange;
