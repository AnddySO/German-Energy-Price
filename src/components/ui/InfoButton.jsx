import React, { useState } from "react";

const InfoButton = ({ selectedMarket, setSelectedMarket }) => {

  const [showInfo, setShowInfo] = useState(false);
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

  

  const marketOptions = [
  { value: "oil", label: "Oil" },
  { value: "ttf", label: "TTF" },
  { value: "coal", label: "Coal" },
  { value: "carbon", label: "Carbon Credit" },
  { value: "uranium", label: "Uranium" },
  ];
  
  return (
    
    
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
  );
};

export default InfoButton;
