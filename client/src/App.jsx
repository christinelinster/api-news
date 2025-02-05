import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [latestNews, setLatestNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const categories = [
    "regional",
    "technology",
    "lifestyle",
    "business",
    "general",
    "programming",
    "science",
    "entertainment",
    "world",
    "sports",
    "finance",
    "academia",
    "politics",
    "health",
    "opinion",
    "food",
    "game",
  ];

  const countries = {
    "Canada": "CA",
    "China": "CN",
    "South Korea": "SK",
    "Taiwan": "TW",
    "United States": "US",
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

  async function fetchLatestNews(category, country) {
    try {
      const response = await fetch(`/api/latest-news?category=${category}&country=${country}`);
      if (!response.ok) {
        throw new Error("Failed to fetch latest news");
      }
      const data = await response.json();
      setLatestNews(data);
    } catch (err) {
      console.error("Error fetching latest news:", err);
    }
  }

  useEffect(() => {
    fetchLatestNews(selectedCategory, selectedCountry);
  }, [selectedCategory, selectedCountry]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  }

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  }

  return (
    <>
      <div>
        <h1>The Latest News</h1>
        <form>
          <label htmlFor="category">Select Category</label>
          <select name="category" id="category" onChange={handleCategoryChange}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <label htmlFor="country">Select Country</label>
          <select name="countries" id="countries" onChange={handleCountryChange}>
            <option value="">All</option>
            {Object.entries(countries).map(([country, code]) => (
              <option key={code} value={code}>
                {country}
              </option>
            ))}
          </select>
        </form>

        {latestNews.map((news) => (
          <div key={news.id}>
            <h2>{news.title}</h2>
            <img className="news-image" src={news.image} alt="news-img" />
            <p>{news.description}</p>
            <p>{news.category.join(", ")}</p>
            <p>{news.published}</p>
            <a href={news.url}>View the Full Story</a>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
