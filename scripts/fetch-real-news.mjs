import fs from 'fs';

async function fetchGoogleNewsRSS() {
  const url = 'https://news.google.com/rss/search?q=Canada+immigration&hl=en-CA&gl=CA&ceid=CA:en';
  const res = await fetch(url);
  const xml = await res.text();

  const items = [];
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  for (const itemXml of itemMatches.slice(0, 15)) {
    const titleMatch = itemXml.match(/<title>(.*?)<\/title>/);
    const linkMatch = itemXml.match(/<link>(.*?)<\/link>/) || itemXml.match(/<link\/>(.*?)<\//);
    const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
    const sourceMatch = itemXml.match(/<source[^>]*>(.*?)<\/source>/);

    let rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '';
    let link = linkMatch ? linkMatch[1] : '';
    let pubDate = pubDateMatch ? pubDateMatch[1] : new Date().toISOString();
    let source = sourceMatch ? sourceMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '';

    if (!source && rawTitle.includes(' - ')) {
      const parts = rawTitle.split(' - ');
      source = parts.pop();
      rawTitle = parts.join(' - ');
    } else if (rawTitle.includes(' - ')) {
      const parts = rawTitle.split(' - ');
      parts.pop();
      rawTitle = parts.join(' - ');
    }

    rawTitle = rawTitle
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();

    source = source
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();

    items.push({
      title: rawTitle,
      googleLink: link,
      pubDate,
      source: source || 'Canada News',
    });
  }

  console.log(`Fetched ${items.length} items from Google News RSS.`);
  console.log(JSON.stringify(items.slice(0, 8), null, 2));
}

fetchGoogleNewsRSS().catch(console.error);
