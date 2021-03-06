import React, { useState, useEffect } from 'react';
import './index.scss';

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('react');
  const [url, setUrl] = useState(
    `https://hn.algolia.com/api/v1/search?query=react`
  );
  const [loading, setLoading] = useState(false);

  const fetchNews = () => {
    setLoading(true);
    fetch(url)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    fetchNews();
    document.title = `Search HN: ${searchQuery}`;
  }, [url]);

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };
  return (
    <div className="container">
      {loading ? <h1>... Loading!</h1> : <h1>Hacker News</h1>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleChange} />
        <button>Search</button>
      </form>
      {news.map((news, index) => (
        <p key={index}>{news.title}</p>
      ))}
    </div>
  );
};

export default App;
