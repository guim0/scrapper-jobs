const express = require('express');
const cors = require('cors');
const { chromium } = require('playwright');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/vagas', async (req, res) => {
  const { keyword = 'fullstack', recency = '5' } = req.query;

  // Código nativo do LinkedIn para recência em segundos
  const timeParam = recency === '1' ? 'r86400' : recency === '5' ? 'r432000' : '';
  const searchUrl = `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(keyword)}&location=São%20Paulo%2C%20Brasil${timeParam ? '&f_TPR=' + timeParam : ''}`;

  let browser = null;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await context.newPage();

    // Navega até a busca de vagas pública do LinkedIn
    await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Aguarda o carregamento dos cards de vaga
    await page.waitForSelector('.job-search-card', { timeout: 10000 }).catch(() => null);

    // Extrai o DOM estruturado
    const vagas = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('.job-search-card'));
      return cards.slice(0, 10).map((card, index) => {
        const tituloEl = card.querySelector('.base-search-card__title');
        const empresaEl = card.querySelector('.base-search-card__subtitle');
        const localEl = card.querySelector('.job-search-card__location');
        const linkEl = card.querySelector('a.base-card__full-link');
        const dataEl = card.querySelector('time');

        return {
          id: `vaga-real-${index}`,
          titulo: tituloEl ? tituloEl.innerText.trim() : 'Cargo não informado',
          empresa: empresaEl ? empresaEl.innerText.trim() : 'Empresa não informada',
          local: localEl ? localEl.innerText.trim() : 'São Paulo / Remoto',
          publicado: dataEl ? dataEl.innerText.trim() : 'Recente',
          link: linkEl ? linkEl.href : '#'
        };
      });
    });

    await browser.close();
    res.json({ success: true, count: vagas.length, vagas });

  } catch (error) {
    if (browser) await browser.close();
    console.error('Erro na raspagem:', error);
    res.status(500).json({ success: false, message: 'Erro ao extrair vagas.', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server Playwright rodando na porta ${PORT}`);
});