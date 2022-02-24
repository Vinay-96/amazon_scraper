const express = require("express");
const request = require("request-promise");

const app = express();
const PORT = process.env.PORT || 5000;

// const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to amazon scraper api");
});

// GET PRODUCTS DETAILS
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_Key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET PRODUCT REVIEWS
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_Key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET PRODUCT OFFERS
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_Key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET SEARCH PRODUCTS
app.get("/search/:searchQuery", async (req, res) => {
  const { serachQuery } = req.params;
  const { api_Key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_Key
      )}&url=https://www.amazon.com/s?k=${serachQuery}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
