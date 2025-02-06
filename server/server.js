import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://api.currentsapi.services/v1";

app.use(express.json());
app.use(cors());

app.get("/api/latest-news", async (req, res) => {
  const { category, country } = req.query;
  const apiKey = process.env.API_KEY;
  try {
    let url = `${API_URL}/latest-news?apiKey=${apiKey}`;
    if (category) url += `&category=${category}`;
    console.log(`The category is: ${category}`);

    if (country) url += `&country=${country}`;
    console.log(`The country is: ${country}`);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch latest news");
    }
    const data = await response.json();
    res.status(200).json({news:data.news})
  } catch (err) {
    console.error("Error fetching latest news:", err);
    res.status(500).json({ error: "Failed to fetch latest news" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
