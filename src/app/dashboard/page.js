"use client";

import React, { useEffect, useState } from "react"; 
import CurrencyConverter from "./CurrencyConverter";
import CurrencyHistory from "./CurrencyHistory";
import ExchangeRate from "./ExchangeRate";
import ExchangeRateReverse from "./ExchangeRateReverse";
import LiveRates from "./LiveRates";
import { BounceLoader } from "react-spinners";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CurrencyExchange = () => {
  const [currencies, setCurrencies] = useState({});

  const [liveRates, setLiveRates] = useState({});

  const [exchangeRate, setExchangeRate] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("MMK");

  const [fromCurrencyAmount, setFromCurrencyAmount] = useState(1);
  const [toCurrencyAmount, setToCurrencyAmount] = useState(1);
  
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Loading
  const [currenciesLoading, setCurrenciesLoading] = useState(true);
  const [exchangeRateLoading, setExchangeRateLoading] = useState(true);
  const [liveRatesLoading, setLiveRatesLoading] = useState(true);

  // History Chart , currently using default data because Current API plan doesnt support to get range history 
  const [history, setHistory] = useState([
    { x: new Date("2020-09-12"), y: 1000000 },
    { x: new Date("2021-09-12"), y: 1200000 },
    { x: new Date("2022-09-12"), y: 12870000 },
    { x: new Date("2023-09-12"), y: 13870808 },
  ]);
  const [chartData, setChartData] = useState({
    series: [{ name: "", data: history }],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        foreColor: "#fff",
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
          formatter: (val) => parseFloat((val / 1000000).toFixed(5)),
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        theme: "dark",
        shared: false,
        x: {
          formatter: (val) =>
            new Date(val).toISOString().split("T00:00:00.000Z"),
        },
        y: {
          formatter: (val) => parseFloat((val / 1000000).toFixed(4)),
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
          setCurrenciesLoading(false)
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
          setLiveRatesLoading(false);
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
      try {
        const response = await fetch(
          `http://apilayer.net/historical?access_key=9090e947b8f4f1cb464c441036e62085&date=${
            new Date(selectedDate).toISOString().split("T")[0]
          }&currencies=${toCurrency}&source=${fromCurrency}&format=1`
        );

        if (response.status === 200) {
          const data = await response.json();
          const [currency, rate] = Object.entries(data.quotes)[0];
          setExchangeRate(rate);
          setToCurrencyAmount((fromCurrencyAmount * rate).toFixed(5));
          setExchangeRateLoading(false);
        } else {
          console.error("Failed to fetch exchange rate from API");
        }
      } catch (error) {
        console.error("An error occurred while fetching exchange rate:", error);
      }
    };

    setTimeout(async () => {
      fetchExchangeRate();
    }, 1000);
  }, [fromCurrency, toCurrency, selectedDate]);

  const handleFromCurrencyChange = (e) => {
    alert(
      "Access Restricted - Your current Subscription Plan does not support this API Function."
    );
    // setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleFromCurrencyAmountChange = (e) => {
    setToCurrencyAmount(parseFloat((e.target.value * exchangeRate).toFixed(5)));
    setFromCurrencyAmount(e.target.value);
  };

  const handleToCurrencyAmountChange = (e) => {
    setFromCurrencyAmount(
      parseFloat((e.target.value / exchangeRate).toFixed(5))
    );
    setToCurrencyAmount(e.target.value);
  };

  const handleSelectedDateChange = (date) => {
    console.log(date)
    setSelectedDate(date);
  };

  const handleExchangeValueClick = (value) => {
    // Update the fromCurrencyAmount when an exchange value is clicked
    setToCurrencyAmount(parseFloat((value * exchangeRate).toFixed(5)));
    setFromCurrencyAmount(value);
  };

  const handleReverseExchangeValueClick = (value) => {
    setFromCurrencyAmount(parseFloat((value / exchangeRate).toFixed(5)));
    setToCurrencyAmount(value);
  };

  const handleLiveRateClick = (value) => {
    setToCurrency(value);
  };

  return (
    <main className="flex flex-col p-4 md:px-10 lg:px-20">
      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4">
        {currenciesLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
            }}
            className="w-full sm:w-6/12 md:w-7/12"
          >
            <BounceLoader color={"#fff"} loading={true} size={60} />
          </div>
        ) : (
          <CurrencyConverter
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            currencies={currencies}
            fromCurrencyAmount={fromCurrencyAmount}
            toCurrencyAmount={toCurrencyAmount}
            handleFromCurrencyChange={handleFromCurrencyChange}
            handleFromCurrencyAmountChange={handleFromCurrencyAmountChange}
            handleToCurrencyChange={handleToCurrencyChange}
            handleToCurrencyAmountChange={handleToCurrencyAmountChange}
            handleSelectedDateChange={handleSelectedDateChange}
            selectedDate={selectedDate}
          />
        )}

        <CurrencyHistory chartData={chartData} />
      </div>

      <div className="flex flex-wrap flex-col sm:flex-row sm:p-8 sm:mt-[-2.7rem] mt-[1rem] min-h-[500px]">
        {exchangeRateLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
            }}
            className="w-full md:w-1/2 lg:w-4/12 md:pr-2 mb-4"
          >
            <BounceLoader color={"#fff"} loading={true} size={60} />
          </div>
        ) : (
          <ExchangeRate
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            exchangeRate={exchangeRate}
            exchangeValues={exchangeValues}
            handleExchangeValueClick={handleExchangeValueClick}
          />
        )}

        {exchangeRateLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
            }}
            className="w-full md:w-1/2 lg:w-4/12 pl-0 md:pl-2 lg:px-2 mb-4"
          >
            <BounceLoader color={"#fff"} loading={true} size={60} />
          </div>
        ) : (
          <ExchangeRateReverse
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            exchangeRate={exchangeRate}
            exchangeValues={exchangeValues}
            handleReverseExchangeValueClick={handleReverseExchangeValueClick}
          />
        )}

        {liveRatesLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto",
            }}
            className="w-full lg:w-4/12 pl-0 lg:pl-2 mb-4"
          >
            <BounceLoader color={"#fff"} loading={true} size={60} />
          </div>
        ) : (
          <LiveRates
            liveRates={liveRates}
            handleLiveRateClick={handleLiveRateClick}
          />
        )}
      </div>
    </main>
  );
};

export default CurrencyExchange;
