import puppeteer from 'puppeteer';

async function getMoreArticles() {
  const url = 'https://news.google.com/rss/search?q=Canada+immigration+when:14d&hl=en-CA&gl=CA&ceid=CA:en';
  const res = await fetch(url);
  const xml = await res.text();

  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];
  const candidates = [];

  for (const itemXml of itemMatches) {
    const titleMatch = itemXml.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
    const sourceMatch = itemXml.match(/<source[^>]*>(.*?)<\/source>/);

    let rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '';
    let link = linkMatch ? linkMatch[1] : '';
    let pubDate = pubDateMatch ? pubDateMatch[1] : new Date().toISOString();
    let source = sourceMatch ? sourceMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '';

    if (rawTitle.includes(' - ')) {
      const parts = rawTitle.split(' - ');
      source = parts.pop();
      rawTitle = parts.join(' - ');
    }

    candidates.push({
      title: rawTitle.trim(),
      link,
      pubDate,
      source: source.trim(),
    });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const resolved = [];

  for (const item of candidates.slice(0, 15)) {
    try {
      await page.goto(item.link, { waitUntil: 'domcontentloaded', timeout: 12000 });
      await new Promise((r) => setTimeout(r, 2000));
      const finalUrl = page.url();
      if (
        finalUrl &&
        !finalUrl.includes('google.com') &&
        !finalUrl.includes('chrome-error') &&
        (finalUrl.startsWith('http://') || finalUrl.startsWith('https://'))
      ) {
        resolved.push({
          title: item.title,
          source: item.source,
          sourceURL: finalUrl,
          pubDate: item.pubDate,
        });
        console.log(`✓ [${item.source}] ${item.title}\n  ${finalUrl}`);
      }
    } catch (e) {
      // skip
    }
  }

  await browser.close();
  console.log('\n--- TOTAL RESOLVED ---', resolved.length);
  console.log(JSON.stringify(resolved, null, 2));
}

getMoreArticles();
