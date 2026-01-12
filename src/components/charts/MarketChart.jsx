import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const MarketChart = ({ data, visibleLines, selectedMarket, marketOptions }) => (
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
        domain={["dataMin", "dataMax"]}
        label={{
          value: `${marketOptions.find((m) => m.value === selectedMarket)?.label} Price`,
          angle: -90,
          position: "insideLeft",
        }}
      />
        {/* Match the vertical alignment */}
      <YAxis
        yAxisId="left"
        orientation="right"
        label={{
          value: "",
          angle: 90,
          position: "insideRight",
        }}
      />
      <Tooltip
        labelFormatter={(val) =>
          new Date(val).toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" })
        }
      />
      <Line
        type="monotone"
        dataKey="MarketPrice"
        stroke="#d62728"
        dot={false}
        connectNulls
        strokeOpacity={visibleLines["MarketPrice"] ? 1 : 0}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default MarketChart;
