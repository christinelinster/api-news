import dotenv from "dotenv";
import corsMiddleware from "./cors";

dotenv.config();

const API_URL = "https://api.currentsapi.services/v1";

export default async function handler(req, res) {
  corsMiddleware(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
      const { category, country } = req.query;
      const apiKey = process.env.API_KEY;
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
      res.status(200).json(data.news);
    } catch (err) {
      console.error("Error fetching latest news:", err);
      res.status(500).json({ error: "Failed to fetch latest news" });
    }
  });
}
