export function mergeEnergyAndMarketData(energyData, marketData, startDate, endDate) {
  if (!energyData.length || !marketData.length) return [];

  const start = startDate ? new Date(startDate) : new Date(-8640000000000000);
  const end = endDate ? new Date(endDate) : new Date(8640000000000000);

  return energyData
    .filter((d) => d.Start >= start && d.Start <= end)
    .map((d) => {
      const market = marketData.find(
        (m) => Math.abs(m.Date.getTime() - d.Start.getTime()) < 24 * 60 * 60 * 1000
      );
      return { ...d, MarketPrice: market ? market.MarketPrice : null };
    });
}