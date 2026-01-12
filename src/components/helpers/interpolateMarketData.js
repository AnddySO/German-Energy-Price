export function interpolateMarketData(marketData) {
  const filled = [];
  for (let i = 0; i < marketData.length - 1; i++) {
    const curr = marketData[i];
    const next = marketData[i + 1];
    filled.push(curr);
    const diffDays = (next.Date - curr.Date) / (1000 * 60 * 60 * 24);
    if (diffDays > 1 && diffDays < 5) {
      for (let j = 1; j < diffDays; j++) {
        const interp =
          curr.MarketPrice + ((next.MarketPrice - curr.MarketPrice) * j) / diffDays;
        const newDate = new Date(curr.Date);
        newDate.setDate(newDate.getDate() + j);
        filled.push({ Date: newDate, MarketPrice: interp });
      }
    }
  }
  filled.push(marketData[marketData.length - 1]);
  return filled;
}
