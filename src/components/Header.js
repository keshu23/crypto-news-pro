import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🚀 CryptoNews Pro</h1>
        <p className="tagline">Multi-source crypto intelligence</p>
        <div className="data-sources">
          <span className="source-badge">CoinGecko</span>
          <span className="source-badge">CryptoCompare</span>
          <span className="source-badge">Live Data</span>
        </div>
      </div>
    </header>
  );
}

export default Header;