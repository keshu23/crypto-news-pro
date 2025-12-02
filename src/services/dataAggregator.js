export const fetchMultiSourceData = async () => {
  try {
    const [coingeckoData, globalData, trendingData] = await Promise.all([
      fetchCoinGeckoMarkets(),
      fetchGlobalStats(),
      fetchTrendingCoins()
    ]);

    return {
      prices: coingeckoData,
      global: globalData,
      trending: trendingData
    };
  } catch (error) {
    console.error('Error aggregating data:', error);
    return {
      prices: [],
      global: null,
      trending: []
    };
  }
};

const fetchCoinGeckoMarkets = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h,24h,7d'
    );
    return await response.json();
  } catch (error) {
    console.error('CoinGecko markets error:', error);
    return [];
  }
};

const fetchGlobalStats = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/global');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Global stats error:', error);
    return null;
  }
};

const fetchTrendingCoins = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
    const data = await response.json();
    return data.coins;
  } catch (error) {
    console.error('Trending coins error:', error);
    return [];
  }
};

export const fetchCryptoNews = async (sources = ['all']) => {
  try {
    const newsPromises = [];
    
    newsPromises.push(
      fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
        .then(res => res.json())
        .then(data => data.Data.map(item => ({
          ...item,
          source_api: 'CryptoCompare'
        })))
    );

    const results = await Promise.allSettled(newsPromises);
    const allNews = results
      .filter(result => result.status === 'fulfilled')
      .flatMap(result => result.value);

    return allNews.sort((a, b) => b.published_on - a.published_on).slice(0, 30);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};