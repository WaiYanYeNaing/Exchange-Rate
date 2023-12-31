## Getting Started

First, run the development server:

```bash
npm run dev 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
Features
1. Currency Conversion: Users can convert an amount from one currency to another, specifying the source and target currencies.

2. Live Exchange Rates: The component displays live exchange rates for various currencies, allowing users to see real-time conversion rates.

3. Historical Exchange Rates: Users can view historical exchange rates by selecting a specific date. The component provides a chart showing the historical data.

4. Interactive Charts: The historical exchange rate data is visualized in an interactive area chart, making it easier for users to analyze trends.

5. Exchange Rate Comparison: Users can easily compare exchange rates for different values by clicking on predefined exchange values.

6. Reverse Currency Conversion: Users can also convert from the target currency back to the source currency using predefined exchange values.

7. Select Date: Users can select a specific date to view historical exchange rates for that day.
```

```bash
Component Props
The CurrencyExchange component does not accept any props as it manages its state internally and fetches data from an external API.

Component Structure
1. The CurrencyExchange component is divided into several sections for clarity and user interface organization:

2. Currency Converter Section: This section allows users to perform currency conversion. Users can select source and target currencies, enter an amount to convert, and choose a date for historical rates. It also includes a loading spinner while fetching currency data.

3. Currency History Chart: This section displays a historical exchange rate chart based on the selected date. The chart provides an interactive visualization of currency exchange trends over time.

4. Exchange Rate Section: This section displays the current exchange rate for the selected source and target currencies. Users can also quickly convert between currencies using predefined exchange values.

5. Reverse Exchange Rate Section: Similar to the Exchange Rate section, but it allows users to convert from the target currency back to the source currency.

6. Live Exchange Rates: This section provides real-time exchange rate data for various currencies. Users can click on a currency to set it as the target currency for conversion.
```

```bash
Dependencies
The CurrencyExchange component relies on the following external libraries:

React: A JavaScript library for building user interfaces.
react-spinners: A library for adding loading spinners to components.
react-datepicker: A date picker component for selecting dates.
flowbite: Tailwind UI for better user interface.
react-apexcharts: A library for Currency History Chart
```