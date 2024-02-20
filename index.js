// urlShortener.js
const shortid = require('shortid');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const urlDatabase = new Map();

app.post('/shorten', (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Missing longUrl in the request body' });
  }

  const shortUrl = generateShortUrl();
  urlDatabase.set(shortUrl, longUrl);

  res.json({ shortUrl });
});

app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const longUrl = urlDatabase.get(shortUrl);

  if (!longUrl) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(301, longUrl);
});

function generateShortUrl() {
  return shortid.generate();
}

app.listen(PORT, () => {
  console.log(`URL shortening service is running on port ${PORT}`);
});
