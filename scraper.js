const axios = require('axios');
const xml2js = require('xml2js');
const puppeteer = require('puppeteer');

(async () => {
  try {
    // Fetch RSS feed
    const feedUrl = 'https://techcrunch.com/category/artificial-intelligence/feed/';
    const { data: xml } = await axios.get(feedUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const feed = await xml2js.parseStringPromise(xml);
    const items = feed.rss.channel[0].item || [];
    // Filter items to only those published today
    const today = new Date();
    const todayItems = items.filter(item => {
      const pubDate = new Date(item.pubDate[0]);
      return (
        pubDate.getFullYear() === today.getFullYear() &&
        pubDate.getMonth() === today.getMonth() &&
        pubDate.getDate() === today.getDate()
      );
    });
    const articleUrls = todayItems.map(item => item.link[0].trim());

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    const articles = [];
    for (const url of articleUrls) {
      console.log(`Scraping ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2' });
      const article = await page.evaluate(() => {
        const titleNode = document.querySelector('h1.article-hero__title') || document.querySelector('h1.wp-block-post-title') || document.querySelector('h1.article__title') || document.querySelector('h1.article-header__title');
        const title = titleNode ? titleNode.innerText.trim() : '';
        const bodySel = document.querySelector('div.entry-content') || document.querySelector('div.article-content') || document.querySelector('div.l-article__body');
        const paragraphs = bodySel ? bodySel.querySelectorAll('p') : [];
        const content = Array.from(paragraphs).map(p => p.innerText.trim()).join('\n\n');
        return { title, content };
      });
      articles.push({ url, ...article });
    }

    console.log(JSON.stringify(articles, null, 2));
    await browser.close();
  } catch (err) {
    console.error('Error during scrape:', err);
  }
})();
