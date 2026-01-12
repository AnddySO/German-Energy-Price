import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const EnergyChart = ({ data, visibleLines, renderLegend }) => (
  <ResponsiveContainer width="100%" height="40%">
    <LineChart data={data} syncId="energyMarketSync">
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="Start"
        tickFormatter={(timeStr) =>
          new Date(timeStr).toLocaleDateString([], { day: "2-digit", month: "short" })
        }
      />
      <YAxis
        yAxisId="left"
        domain={["auto", "auto"]}
        label={{ value: "Price (EUR/MWh)", angle: -90, position: "insideLeft" }}
      />
      <YAxis
        yAxisId="right"
        orientation="right"
        domain={["auto", "auto"]}
        label={{ value: "Load (MW)", angle: 90, position: "insideRight" }}
      />
      <Tooltip
        labelFormatter={(val) =>
          new Date(val).toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" })
        }
      />
      <Legend verticalAlign="top" content={renderLegend} />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="Real Load"
        stroke="#1f77b4"
        dot={false}
        strokeOpacity={visibleLines["Real Load"] ? 1 : 0}
      />
      <Line
        yAxisId="right"
        type="monotone"
        dataKey="Load Forecast"
        stroke="#ff7f0e"
        dot={false}
        strokeOpacity={visibleLines["Load Forecast"] ? 1 : 0}
      />
      <Line
        yAxisId="left"
        type="monotone"
        dataKey="Price (EUR/Mwh)"
        stroke="#2ca02c"
        dot={false}
        strokeOpacity={visibleLines["Price (EUR/Mwh)"] ? 1 : 0}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default EnergyChart;
