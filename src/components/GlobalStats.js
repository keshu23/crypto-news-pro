import React from 'react';
import './GlobalStats.css';

function GlobalStats({ data }) {
  if (!data) return null;

  const formatLargeNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="global-stats">
      <div className="stat-card">
        <div className="stat-label">Market Cap</div>
        <div className="stat-value">{formatLargeNumber(data.total_market_cap.usd)}</div>
        <div className={`stat-change ${data.market_cap_change_percentage_24h_usd >= 0 ? 'positive' : 'negative'}`}>
          {data.market_cap_change_percentage_24h_usd >= 0 ? '▲' : '▼'} 
          {Math.abs(data.market_cap_change_percentage_24h_usd).toFixed(2)}%
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">24h Volume</div>
        <div className="stat-value">{formatLargeNumber(data.total_volume.usd)}</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">BTC Dominance</div>
        <div className="stat-value">{data.market_cap_percentage.btc.toFixed(1)}%</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-label">Active Coins</div>
        <div className="stat-value">{data.active_cryptocurrencies.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default GlobalStats;