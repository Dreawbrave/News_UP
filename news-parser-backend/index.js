const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/parse', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'No url provided' });

  try {
    // Загружаем HTML страницы
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);

    // Пример для большинства новостных сайтов: ищем <article> или <main>
    let text = $('article').text() || $('main').text() || $('body').text();

    // Обрезаем слишком длинный текст
    if (text.length > 5000) text = text.slice(0, 5000) + '...';

    res.json({ text });
  } catch (e) {
    res.status(500).json({ error: 'Failed to parse', details: e.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Parser backend running on http://localhost:${PORT}`);
}); 