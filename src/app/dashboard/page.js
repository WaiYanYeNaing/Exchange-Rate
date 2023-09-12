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
  const [currencies, setCurrencies] = useState({
    AED: "United Arab Emirates Dirham",
    AFN: "Afghan Afghani",
    ALL: "Albanian Lek",
    AMD: "Armenian Dram",
    ANG: "Netherlands Antillean Guilder",
    AOA: "Angolan Kwanza",
    ARS: "Argentine Peso",
    AUD: "Australian Dollar",
    AWG: "Aruban Florin",
    AZN: "Azerbaijani Manat",
    BAM: "Bosnia-Herzegovina Convertible Mark",
    BBD: "Barbadian Dollar",
    BDT: "Bangladeshi Taka",
    BGN: "Bulgarian Lev",
    BHD: "Bahraini Dinar",
    BIF: "Burundian Franc",
    BMD: "Bermudan Dollar",
    BND: "Brunei Dollar",
    BOB: "Bolivian Boliviano",
    BRL: "Brazilian Real",
    BSD: "Bahamian Dollar",
    BTC: "Bitcoin",
    BTN: "Bhutanese Ngultrum",
    BWP: "Botswanan Pula",
    BYN: "New Belarusian Ruble",
    BYR: "Belarusian Ruble",
    BZD: "Belize Dollar",
    CAD: "Canadian Dollar",
    CDF: "Congolese Franc",
    CHF: "Swiss Franc",
    CLF: "Chilean Unit of Account (UF)",
    CLP: "Chilean Peso",
    CNY: "Chinese Yuan",
    COP: "Colombian Peso",
    CRC: "Costa Rican Colón",
    CUC: "Cuban Convertible Peso",
    CUP: "Cuban Peso",
    CVE: "Cape Verdean Escudo",
    CZK: "Czech Republic Koruna",
    DJF: "Djiboutian Franc",
    DKK: "Danish Krone",
    DOP: "Dominican Peso",
    DZD: "Algerian Dinar",
    EGP: "Egyptian Pound",
    ERN: "Eritrean Nakfa",
    ETB: "Ethiopian Birr",
    EUR: "Euro",
    FJD: "Fijian Dollar",
    FKP: "Falkland Islands Pound",
    GBP: "British Pound Sterling",
    GEL: "Georgian Lari",
    GGP: "Guernsey Pound",
    GHS: "Ghanaian Cedi",
    GIP: "Gibraltar Pound",
    GMD: "Gambian Dalasi",
    GNF: "Guinean Franc",
    GTQ: "Guatemalan Quetzal",
    GYD: "Guyanaese Dollar",
    HKD: "Hong Kong Dollar",
    HNL: "Honduran Lempira",
    HRK: "Croatian Kuna",
    HTG: "Haitian Gourde",
    HUF: "Hungarian Forint",
    IDR: "Indonesian Rupiah",
    ILS: "Israeli New Sheqel",
    IMP: "Manx pound",
    INR: "Indian Rupee",
    IQD: "Iraqi Dinar",
    IRR: "Iranian Rial",
    ISK: "Icelandic Króna",
    JEP: "Jersey Pound",
    JMD: "Jamaican Dollar",
    JOD: "Jordanian Dinar",
    JPY: "Japanese Yen",
    KES: "Kenyan Shilling",
    KGS: "Kyrgystani Som",
    KHR: "Cambodian Riel",
    KMF: "Comorian Franc",
    KPW: "North Korean Won",
    KRW: "South Korean Won",
    KWD: "Kuwaiti Dinar",
    KYD: "Cayman Islands Dollar",
    KZT: "Kazakhstani Tenge",
    LAK: "Laotian Kip",
    LBP: "Lebanese Pound",
    LKR: "Sri Lankan Rupee",
    LRD: "Liberian Dollar",
    LSL: "Lesotho Loti",
    LTL: "Lithuanian Litas",
    LVL: "Latvian Lats",
    LYD: "Libyan Dinar",
    MAD: "Moroccan Dirham",
    MDL: "Moldovan Leu",
    MGA: "Malagasy Ariary",
    MKD: "Macedonian Denar",
    MMK: "Myanma Kyat",
    MNT: "Mongolian Tugrik",
    MOP: "Macanese Pataca",
    MRO: "Mauritanian Ouguiya",
    MUR: "Mauritian Rupee",
    MVR: "Maldivian Rufiyaa",
    MWK: "Malawian Kwacha",
    MXN: "Mexican Peso",
    MYR: "Malaysian Ringgit",
    MZN: "Mozambican Metical",
    NAD: "Namibian Dollar",
    NGN: "Nigerian Naira",
    NIO: "Nicaraguan Córdoba",
    NOK: "Norwegian Krone",
    NPR: "Nepalese Rupee",
    NZD: "New Zealand Dollar",
    OMR: "Omani Rial",
    PAB: "Panamanian Balboa",
    PEN: "Peruvian Nuevo Sol",
    PGK: "Papua New Guinean Kina",
    PHP: "Philippine Peso",
    PKR: "Pakistani Rupee",
    PLN: "Polish Zloty",
    PYG: "Paraguayan Guarani",
    QAR: "Qatari Rial",
    RON: "Romanian Leu",
    RSD: "Serbian Dinar",
    RUB: "Russian Ruble",
    RWF: "Rwandan Franc",
    SAR: "Saudi Riyal",
    SBD: "Solomon Islands Dollar",
    SCR: "Seychellois Rupee",
    SDG: "Sudanese Pound",
    SEK: "Swedish Krona",
    SGD: "Singapore Dollar",
    SHP: "Saint Helena Pound",
    SLE: "Sierra Leonean Leone",
    SLL: "Sierra Leonean Leone",
    SOS: "Somali Shilling",
    SRD: "Surinamese Dollar",
    SSP: "South Sudanese Pound",
    STD: "São Tomé and Príncipe Dobra",
    SVC: "Salvadoran Colón",
    SYP: "Syrian Pound",
    SZL: "Swazi Lilangeni",
    THB: "Thai Baht",
    TJS: "Tajikistani Somoni",
    TMT: "Turkmenistani Manat",
    TND: "Tunisian Dinar",
    TOP: "Tongan Paʻanga",
    TRY: "Turkish Lira",
    TTD: "Trinidad and Tobago Dollar",
    TWD: "New Taiwan Dollar",
    TZS: "Tanzanian Shilling",
    UAH: "Ukrainian Hryvnia",
    UGX: "Ugandan Shilling",
    USD: "United States Dollar",
    UYU: "Uruguayan Peso",
    UZS: "Uzbekistan Som",
    VEF: "Venezuelan Bolívar Fuerte",
    VES: "Sovereign Bolivar",
    VND: "Vietnamese Dong",
    VUV: "Vanuatu Vatu",
    WST: "Samoan Tala",
    XAF: "CFA Franc BEAC",
    XAG: "Silver (troy ounce)",
    XAU: "Gold (troy ounce)",
    XCD: "East Caribbean Dollar",
    XDR: "Special Drawing Rights",
    XOF: "CFA Franc BCEAO",
    XPF: "CFP Franc",
    YER: "Yemeni Rial",
    ZAR: "South African Rand",
    ZMK: "Zambian Kwacha (pre-2013)",
    ZMW: "Zambian Kwacha",
    ZWL: "Zimbabwean Dollar",
  });
  const [liveRates, setLiveRates] = useState({
    USDAED: 3.67304,
    USDAFN: 78.034252,
    USDALL: 99.591396,
    USDAMD: 384.774687,
    USDANG: 1.800277,
    USDAOA: 827.502799,
    USDARS: 349.976598,
    USDAUD: 1.554935,
    USDAWG: 1.8025,
    USDAZN: 1.699005,
    USDBAM: 1.820365,
    USDBBD: 2.016847,
    USDBDT: 109.633284,
    USDBGN: 1.82205,
    USDBHD: 0.376996,
    USDBIF: 2829.033099,
    USDBMD: 1,
    USDBND: 1.3596,
    USDBOB: 6.902489,
    USDBRL: 4.931097,
    USDBSD: 0.998892,
    USDBTC: 0.000038711934,
    USDBTN: 82.849604,
    USDBWP: 13.609583,
    USDBYN: 2.521314,
    USDBYR: 19600,
    USDBZD: 2.013496,
    USDCAD: 1.35816,
    USDCDF: 2495.999925,
    USDCHF: 0.890915,
    USDCLF: 0.032318,
    USDCLP: 891.749953,
    USDCNY: 7.294496,
    USDCOP: 3987.5,
    USDCRC: 535.927029,
    USDCUC: 1,
    USDCUP: 26.5,
    USDCVE: 102.629852,
    USDCZK: 22.954101,
    USDDJF: 177.857409,
    USDDKK: 6.956101,
    USDDOP: 56.738645,
    USDDZD: 137.062026,
    USDEGP: 30.898701,
    USDERN: 15,
    USDETB: 55.220402,
    USDEUR: 0.93267,
    USDFJD: 2.26665,
    USDFKP: 0.798337,
    USDGBP: 0.80098,
    USDGEL: 2.614985,
    USDGGP: 0.798337,
    USDGHS: 11.462265,
    USDGIP: 0.798337,
    USDGMD: 60.497914,
    USDGNF: 8575.337876,
    USDGTQ: 7.866753,
    USDGYD: 209.150266,
    USDHKD: 7.83025,
    USDHNL: 24.607223,
    USDHRK: 6.8828,
    USDHTG: 134.861685,
    USDHUF: 359.909834,
    USDIDR: 15351.1,
    USDILS: 3.80856,
    USDIMP: 0.798337,
    USDINR: 82.98325,
    USDIQD: 1308.172003,
    USDIRR: 42264.999853,
    USDISK: 134.029828,
    USDJEP: 0.798337,
    USDJMD: 154.188384,
    USDJOD: 0.708098,
    USDJPY: 146.833032,
    USDKES: 146.449751,
    USDKGS: 88.390349,
    USDKHR: 4129.900592,
    USDKMF: 458.249786,
    USDKPW: 899.96022,
    USDKRW: 1327.010108,
    USDKWD: 0.308602,
    USDKYD: 0.832465,
    USDKZT: 462.258004,
    USDLAK: 19813.84959,
    USDLBP: 15013.58898,
    USDLKR: 322.654505,
    USDLRD: 186.349735,
    USDLSL: 18.995022,
    USDLTL: 2.95274,
    USDLVL: 0.60489,
    USDLYD: 4.850194,
    USDMAD: 10.183592,
    USDMDL: 17.955138,
    USDMGA: 4510.466404,
    USDMKD: 57.471318,
    USDMMK: 2097.74849,
    USDMNT: 3474.806158,
    USDMOP: 8.059568,
    USDMRO: 356.999828,
    USDMUR: 45.131361,
    USDMVR: 15.459841,
    USDMWK: 1098.01841,
    USDMXN: 17.27782,
    USDMYR: 4.677498,
    USDMZN: 63.24995,
    USDNAD: 18.994969,
    USDNGN: 777.496279,
    USDNIO: 36.551994,
    USDNOK: 10.66884,
    USDNPR: 132.558637,
    USDNZD: 1.69225,
    USDOMR: 0.384993,
    USDPAB: 0.998888,
    USDPEN: 3.714911,
    USDPGK: 3.655994,
    USDPHP: 56.635506,
    USDPKR: 297.227357,
    USDPLN: 4.362503,
    USDPYG: 7255.212211,
    USDQAR: 3.640989,
    USDRON: 4.632803,
    USDRSD: 109.386031,
    USDRUB: 94.63998,
    USDRWF: 1202.997022,
    USDSAR: 3.750915,
    USDSBD: 8.404364,
    USDSCR: 13.620533,
    USDSDG: 600.88969,
    USDSEK: 11.087875,
    USDSGD: 1.361655,
    USDSHP: 1.21675,
    USDSLE: 22.151304,
    USDSLL: 19749.999913,
    USDSOS: 569.497124,
    USDSRD: 38.4695,
    USDSTD: 20697.981008,
    USDSSP: 601.502706,
    USDSYP: 13001.047928,
    USDSZL: 18.900958,
    USDTHB: 35.611497,
    USDTJS: 10.988044,
    USDTMT: 3.5,
    USDTND: 3.116984,
    USDTOP: 2.39165,
    USDTRY: 26.8894,
    USDTTD: 6.778667,
    USDTWD: 32.040994,
    USDTZS: 2502.234014,
    USDUAH: 36.885489,
    USDUGX: 3716.510222,
    USDUYU: 37.993475,
    USDUZS: 12150.03723,
    USDVEF: 3329609.298387,
    USDVES: 33.29845,
    USDVND: 24105,
    USDVUV: 122.259761,
    USDWST: 2.794395,
    USDXAF: 610.533321,
    USDXAG: 0.043468,
    USDXAU: 0.000521,
    USDXCD: 2.70255,
    USDXDR: 0.756802,
    USDXOF: 610.539004,
    USDXPF: 111.503741,
    USDYER: 250.349781,
    USDZAR: 18.905902,
    USDZMK: 9001.19996,
    USDZMW: 20.901899,
    USDZWL: 321.999592,
  });
  const [exchangeRate, setExchangeRate] = useState(2435);
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
          formatter: (val) => parseFloat((val / 1000000).toFixed(5)),
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
          formatter: (val) => parseFloat((val / 1000000).toFixed(4)),
        },
      },
    },
  });

  const exchangeValues = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 50000];

  useEffect(() => {
    // const fetchCurrencyList = async () => {
    //   try {
    //     const response = await fetch(
    //       "http://apilayer.net/list?access_key=9090e947b8f4f1cb464c441036e62085"
    //     );

    //     if (response.status === 200) {
    //       const data = await response.json();
    //       setCurrencies(data.currencies);
    //     } else {
    //       console.error("Failed to fetch currency list from API");
    //     }
    //   } catch (error) {
    //     console.error("An error occurred while fetching currency list:", error);
    //   }
    // };

    // const fetchLiveRates = async () => {
    //   try {
    //     const response = await fetch(
    //       "http://apilayer.net/live?access_key=9090e947b8f4f1cb464c441036e62085"
    //     );

    //     if (response.status === 200) {
    //       const data = await response.json();
    //       setLiveRates(data.quotes);
    //     } else {
    //       console.error("Failed to fetch live exchange rates from API");
    //     }
    //   } catch (error) {
    //     console.error(
    //       "An error occurred while fetching live exchange rates:",
    //       error
    //     );
    //   }
    // };

    // fetchCurrencyList();
    // setTimeout(() => {
    //   fetchLiveRates();
    // }, 2000);
  }, []);

  useEffect(() => {
    // const fetchExchangeRate = async () => {
    //   setTimeout(async () => {
    //     try {
    //       const response = await fetch(
    //         `http://apilayer.net/live?access_key=9090e947b8f4f1cb464c441036e62085&date=2023-09-12&currencies=${toCurrency}&source=${fromCurrency}&format=1`
    //       );

    //       if (response.status === 200) {
    //         const data = await response.json();
    //         const [currency, rate] = Object.entries(data.quotes)[0];
    //         setExchangeRate(rate);
    //         setToCurrencyAmount((fromCurrencyAmount * rate).toFixed(5));
    //       } else {
    //         console.error("Failed to fetch exchange rate from API");
    //       }
    //     } catch (error) {
    //       console.error(
    //         "An error occurred while fetching exchange rate:",
    //         error
    //       );
    //     }
    //   }, 1000);
    // };

    // fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const handleFromCurrencyChange = (e) => {
    alert('afw')
    setFromCurrency(e.target.value);
    setToCurrency(toCurrency * exchangeRate);
  };

  const handleToCurrencyChange = (e) => {
    alert("gg");
    setToCurrency(e.target.value);
    setFromCurrency(toCurrency / exchangeRate);
  };

  const handleFromCurrencyAmountChange = (e) => {
    setToCurrencyAmount(parseFloat((e.target.value * exchangeRate).toFixed(5)));
    setFromCurrencyAmount(e.target.value);
  };

  const handleToCurrencyAmountChange = (e) => {
    setFromCurrencyAmount(parseFloat((e.target.value / exchangeRate).toFixed(5)));
    setToCurrencyAmount(e.target.value);
  };

  const handleSelectedDateChange = (date) => {
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

  return (
    <main className="flex flex-col p-4 sm:px-20">
      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4">
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
        />
        <CurrencyHistory chartData={chartData} />
      </div>

      <div className="flex flex-col sm:flex-row sm:p-8 gap-4 sm:gap-4 sm:mt-[-2.7rem] mt-[1rem]">
        <ExchangeRate
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
          exchangeValues={exchangeValues}
          handleExchangeValueClick={handleExchangeValueClick}
        />
        <ExchangeRateReverse
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
          exchangeValues={exchangeValues}
          handleReverseExchangeValueClick={handleReverseExchangeValueClick}
        />
        <LiveRates liveRates={liveRates} />
      </div>
    </main>
  );
};

export default CurrencyExchange;
