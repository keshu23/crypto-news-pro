import React, { useState, useEffect } from 'react';
import './NewsFeed.css';
import { fetchCryptoNews } from '../services/dataAggregator';

function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    setLoading(true);
    const newsData = await fetchCryptoNews();
    setNews(newsData);
    setLoading(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading crypto news...</p>
      </div>
    );
  }

  return (
    <div className="news-feed">
      <h2 className="section-title">📰 Latest Crypto News</h2>
      
      <div className="news-grid">
        {news.map((article, index) => (
          <a 
            key={index} 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="news-card"
          >
            {article.imageurl && (
              <div className="news-image">
                <img src={article.imageurl} alt={article.title} />
                <div className="news-source-badge">{article.source}</div>
              </div>
            )}
            <div className="news-content">
              <div className="news-meta">
                <span className="news-api">{article.source_api}</span>
                <span className="news-time">{formatTime(article.published_on)}</span>
              </div>
              <h3 className="news-title">{article.title}</h3>
              <p className="news-body">{article.body?.substring(0, 150)}...</p>
              <div className="news-tags">
                {article.tags && article.tags.split('|').slice(0, 3).map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;