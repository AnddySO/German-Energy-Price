# Energy Price Dashboard

A **React-based interactive dashboard** that visualizes **German electricity consumption and prices (2025)** alongside global commodity prices such as oil, coal, carbon credits, and uranium. The project enables comparison of energy prices against market prices to understand correlations and trends in the energy sector.

![Price Energy Dashboard.](/img/source_1.png "Main Dashboard")

---

##  Project Purpose
Electricity prices in Germany are influenced by multiple factors including:

- Supply and demand fluctuations
- Renewable generation variability (wind, solar)
- Market trading and auctions
- Correlation with commodity markets (coal, oil, gas, uranium)
- Carbon credit prices affecting fossil fuel generation

This dashboard allows users to **explore electricity price behavior** in combination with **raw material market prices**, helping researchers, analysts, and energy enthusiasts visualize relationships between energy consumption and commodity pricing.


##  Features

- Load and display **German electricity consumption and price data** (from `data.csv`)
- Compare electricity prices with **market commodities**:
  - Oil
  - TTF (natural gas benchmark)
  - Coal
  - Carbon credits
  - Uranium
- **Interactive charts** with line toggling and legends
- **Date filtering** to analyze specific periods
- Automatic **interpolation of commodity prices** to match electricity time series


---


##  Price Types

| Type | Description |
|------|------------|
| **Electricity Price (EUR/MWh)** | Real-time German electricity market price |
| **Real Load / Load Forecast** | Energy consumption data (MW) |
| **Market Price** | Commodity prices (oil, coal, TTF gas, uranium, carbon credits) |

By comparing electricity prices with commodity prices, users can identify patterns, correlations, and market influence on energy costs.


---



The financial information to generate this dashboard and create the comparation was obtain using the  [Data - Basic Materials](https://github.com/AnddySO/Data---Basic-Materials). Click [here](https://github.com/AnddySO/Data---Basic-Materials?tab=readme-ov-file#data---basic-materials) to see the documentation.