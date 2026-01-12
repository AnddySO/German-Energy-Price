import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import EnergyChart from "./components/charts/EnergyChart";
import MarketChart from "./components/charts/MarketChart";
import FilterBar from "./components/ui/FilterBar";
import { interpolateMarketData } from "./components/helpers/interpolateMarketData";
import { mergeEnergyAndMarketData } from "./components/helpers/mergeData";

const Energy = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [marketData, setMarketData] = useState([]);

  // Which market CSV to load
  const [selectedMarket, setSelectedMarket] = useState("oil");

  // Track visibility
  const [visibleLines, setVisibleLines] = useState({
    "Real Load": true,
    "Load Forecast": false,
    "Price (EUR/Mwh)": true,
    MarketPrice: true,
  });

  // Available market options
  const marketOptions = [
    { value: "oil", label: "Oil" },
    { value: "ttf", label: "TTF" },
    { value: "coal", label: "Coal" },
    { value: "carbon", label: "Carbon Credit" },
    { value: "uranium", label: "Uranium" },
  ];


  // ------------------------------
  // Load energy data
  // ------------------------------
  useEffect(() => {
    Papa.parse("/data.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const formatted = results.data
          .map((row) => ({
            ...row,
            Start: new Date(row.Start),
            "Real Load": parseFloat(row["Real Load"]),
            "Load Forecast": parseFloat(row["Load Forecast"]),
            "Price (EUR/Mwh)": parseFloat(row["Price (EUR/Mwh)"]),
          }))
          .filter((r) => !isNaN(r.Start));
        setData(formatted);
      },
    });
  }, []);

  // ------------------------------
  // Load selected market CSV
  // ------------------------------
  useEffect(() => {    
    Papa.parse(`/${selectedMarket}.csv`, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const formatted = interpolateMarketData(
          results.data
            .map((row) => ({
              Date: new Date(row.Date),
              MarketPrice:  parseFloat(row.Open) !== 0 ? parseFloat(row.Open) : parseFloat(row.Close),
            }))
            .filter((r) => !isNaN(r.MarketPrice))
        );
        setMarketData(formatted);
      },
    });
  }, [selectedMarket]);

  // ------------------------------
  // Merge & Filter
  // ------------------------------
  useEffect(() => {
    setFiltered(mergeEnergyAndMarketData(data, marketData, startDate, endDate));
  }, [data, marketData, startDate, endDate]);

  // ------------------------------
  // Button Info/Help
  // ------------------------------
  useEffect(() => {
    const buttons = document.querySelectorAll(".tooltip-text");
    buttons.forEach((tooltip) => {
      const parent = tooltip.parentElement;
      parent.addEventListener("mouseenter", () => {
        tooltip.style.opacity = "1";
      });
      parent.addEventListener("mouseleave", () => {
        tooltip.style.opacity = "0";
      });
    });
  }, []);


  // ------------------------------
  // Legend toggle
  // ------------------------------
  const toggleLine = (key) => {
    setVisibleLines((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderLegend = ({ payload }) => (
    <div style={{ textAlign: "center", marginBottom: "10px" }}>
      {payload.map((entry) => {
        const isActive = visibleLines[entry.value];
        return (
          <span
            key={entry.value}
            onClick={() => toggleLine(entry.value)}
            style={{
              marginRight: 20,
              cursor: "pointer",
              color: isActive ? entry.color : "#bbb",
              fontWeight: isActive ? "bold" : "normal",
              userSelect: "none",
              transition: "color 0.2s",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 12,
                height: 12,
                backgroundColor: isActive ? entry.color : "#bbb",
                marginRight: 6,
                borderRadius: "50%",
                verticalAlign: "middle",
              }}
            />
            {entry.value}
          </span>
        );
      })}
    </div>
  );

  return (
    <div style={{ width: "100%", height: "900px", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>
        Energy Consumption vs Market Prices (2025)
      </h2>

      {/* Filter Bar */}
      <FilterBar 
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        selectedMarket={selectedMarket}
        setSelectedMarket={setSelectedMarket}
      />

      {/* CHART 1 ? Energy */}
      <EnergyChart
        data={filtered}
        visibleLines={visibleLines}
        renderLegend={renderLegend}
      />
      {/* CHART 2 ? Market */}
      <MarketChart
        data={filtered}
        visibleLines={visibleLines}
        selectedMarket={selectedMarket}
        marketOptions={marketOptions}
      />
    </div>
  );
};

export default Energy;
