import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Papa from "papaparse";
import EnergyChart from "./components/charts/EnergyChart";
import MarketChart from "./components/charts/MarketChart";
import InfoButton from "./components/ui/InfoButton";
import { interpolateMarketData } from "./components/helpers/interpolateMarketData";

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

  const [showInfo, setShowInfo] = useState(false);
  const [marketLoading, setMarketLoading] = useState(false);

  // Available market options
  const marketOptions = [
    { value: "oil", label: "Oil" },
    { value: "ttf", label: "TTF" },
    { value: "coal", label: "Coal" },
    { value: "carbon", label: "Carbon Credit" },
    { value: "uranium", label: "Uranium" },
  ];

  const instrumentDescriptions = {
    oil: <>(Brent) Oil prices are a key indicator of global energy markets.<br/>
      They affect energy costs, inflation, and economic growth.</>,
    ttf: <>Title Transfer Facility (TTF) is a virtual trading point for natural gas<br />
      in the Netherlands and has become Europe's leading natural gas marketplace.<br />
      Serving as the benchmark for natural gas pricing across Europe and for LNG imports</>,
    coal: <>Coal is still an important factor in the Energy economy.<br/>
      After oil and gas, coal could be the most important element to electricity produce.</>,
    carbon: <>Generators pass the cost of carbon allowances onto consumers,<br/>
      influencing the wholesale electricity price and incentivizing the shift toward renewables.</>,
    uranium: <>Since 2023 has Germany officially phased out its nuclear power plants<br/>
      However Nuclear Energy looks like a great candidate again for the next years<br/>
      developing new science and new technologies.</>,
  };


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
            console.log(formatted[0].MarketPrice);
      },
    });
  }, [selectedMarket]);

  // ------------------------------
  // Merge & Filter
  // ------------------------------
  useEffect(() => {
    if (!data.length || !marketData.length) return;

    const start = startDate ? new Date(startDate) : new Date(-8640000000000000);
    const end = endDate ? new Date(endDate) : new Date(8640000000000000);

    const merged = data
      .filter((d) => d.Start >= start && d.Start <= end)
      .map((d) => {
        const market = marketData.find(
          (m) =>
            Math.abs(m.Date.getTime() - d.Start.getTime()) <
            24 * 60 * 60 * 1000
        );
        return { ...d, MarketPrice: market ? market.MarketPrice : null };
      });

    setFiltered(merged);
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
        Energy Consumption vs Market Prices Dashboard
      </h2>

      {/* Filter Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          padding: "16px 24px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          marginBottom: "24px",
        }}
      >
        {/* Start Date */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "0.2s",
              fontSize: "0.9rem",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2ca02c")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        {/* End Date */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "0.2s",
              fontSize: "0.9rem",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#2ca02c")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>


        {/* Market Selector + Info button */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", position: "relative" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#333" }}>
            Market Source
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#fff",
                fontSize: "0.9rem",
                cursor: "pointer",
                outline: "none",
                transition: "0.2s",
                minWidth: 140,
              }}
              onFocus={(e) => (e.target.style.borderColor = "#2ca02c")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            >
              {marketOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {/* round info button */}
            <div
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#2ca02c",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                cursor: "default",
                boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
              }}
            >
              i
            </div>

            {/* loading indicator (simple) */}
            {marketLoading && (
              <div style={{ fontSize: 12, color: "#666" }}>Loading...</div>
            )}
          </div>

          {/* tooltip bubble (React-controlled) */}
          <div
            style={{
              position: "absolute",
              top: 50,
              left: 0,
              transform: "translateX(0)",
              background: "#111827",
              color: "white",
              padding: "10px 12px",
              borderRadius: 8,
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
              fontSize: "0.85rem",
              whiteSpace: "nowrap",
              opacity: showInfo ? 1 : 0,
              pointerEvents: showInfo ? "auto" : "none",
              transition: "opacity 180ms ease, transform 180ms ease",
              transformOrigin: "top left",
              zIndex: 40,
            }}
          >
            {instrumentDescriptions[selectedMarket] ?? "No description available."}
          </div>
        </div>


        {/* Reset Button */}
        <button
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#2ca02c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s, transform 0.1s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#249024")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2ca02c")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          Reset
        </button>
      </div>

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
