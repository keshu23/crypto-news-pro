import React, { useState, useEffect } from 'react';
import './App.css';
import NewsFeed from './components/NewsFeed';
import PriceTracker from './components/PriceTracker';
import TrendingCoins from './components/TrendingCoins';
import GlobalStats from './components/GlobalStats';
import Header from './components/Header';
import { fetchMultiSourceData } from './services/dataAggregator';

function App() {
  const [activeTab, setActiveTab] = useState('news');
  const [cryptoData, setCryptoData] = useState({
    prices: [],
    trending: [],
    global: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 120000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchMultiSourceData();
      setCryptoData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      
      {cryptoData.global && <GlobalStats data={cryptoData.global} />}
      
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          📰 News
        </button>
        <button 
          className={`tab-btn ${activeTab === 'prices' ? 'active' : ''}`}
          onClick={() => setActiveTab('prices')}
        >
          💰 Prices
        </button>
        <button 
          className={`tab-btn ${activeTab === 'trending' ? 'active' : ''}`}
          onClick={() => setActiveTab('trending')}
        >
          🔥 Trending
        </button>
      </div>

      <div className="content">
        {activeTab === 'news' && <NewsFeed />}
        {activeTab === 'prices' && <PriceTracker prices={cryptoData.prices} loading={loading} />}
        {activeTab === 'trending' && <TrendingCoins trending={cryptoData.trending} loading={loading} />}
      </div>
    </div>
  );
}

export default App;