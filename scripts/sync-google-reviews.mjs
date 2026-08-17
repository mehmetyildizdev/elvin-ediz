import puppeteer from 'puppeteer';
import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// Load .env.local if exists
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'hn097odi';
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production';
const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_EDITOR_TOKEN ||
  process.env.SANITY_API_TOKEN;

console.log('🚀 Starting Google Reviews Sync...');
console.log(`📌 Project ID: ${projectId}, Dataset: ${dataset}`);

const GOOGLE_MAPS_REVIEWS_URL =
  'https://www.google.com/maps/place/Elvin+Ediz+Immigration+Services/@43.846367,-79.383731,17z/data=!4m8!3m7!1s0x42609be984f53c27:0x8157fbe4a4cd3191!8m2!3d43.846367!4d-79.383731!9m1!1b1!16s%2Fg%2F11qb5x2mcv?hl=en';

const GOOGLE_MAPS_MAIN_URL =
  'https://www.google.com/maps/place/Elvin+Ediz+Immigration+Services/@43.846367,-79.383731,17z/data=!4m6!3m5!1s0x42609be984f53c27:0x8157fbe4a4cd3191!8m2!3d43.846367!4d-79.383731!16s%2Fg%2F11qb5x2mcv';

const WRITE_REVIEW_URL =
  'https://search.google.com/local/writereview?placeid=ChIJNzT1hOmbYEERkTHNpOT7V4E';

async function scrapeGoogleReviews() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--lang=en-US,en',
      '--disable-blink-features=AutomationControlled',
    ],
  });

  try {
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    );
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-US,en;q=0.9' });
    await page.setViewport({ width: 1280, height: 900 });

    console.log('🌐 Loading Google Maps listing...');
    await page.goto(GOOGLE_MAPS_REVIEWS_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Accept cookies / consent if presented
    try {
      const consentBtn = await page.$(
        'button[aria-label*="Accept all"], form[action*="consent"] button'
      );
      if (consentBtn) {
        console.log('👉 Accepted cookie consent banner.');
        await consentBtn.click();
        await new Promise((r) => setTimeout(r, 2000));
      }
    } catch {
      // Ignore
    }

    // Wait for reviews container or review elements
    console.log('⏳ Waiting for reviews list to render...');
    await page
      .waitForSelector('div.jftiEf, div[data-review-id]', { timeout: 12000 })
      .catch(() => {
        console.log('⚠️ Direct review card selector timeout, parsing rendered DOM...');
      });

    // Scroll reviews container to load more reviews
    try {
      await page.evaluate(async () => {
        const scrollable =
          document.querySelector('div.m6QErb.DxyBCb.kA9KIf.dS8AEf') ||
          document.querySelector('div[aria-label*="Reviews"]') ||
          document.querySelector('.m6QErb');
        if (scrollable) {
          for (let i = 0; i < 4; i++) {
            scrollable.scrollBy(0, 800);
            await new Promise((resolve) => setTimeout(resolve, 800));
          }
        }
      });
    } catch {
      // Ignore scroll errors
    }

    // Expand "See more" on truncated reviews
    try {
      const moreButtons = await page.$$(
        'button[aria-label="See more"], button.w8nwRe, button[jsaction*="more"]'
      );
      for (const btn of moreButtons.slice(0, 15)) {
        try {
          await btn.click();
        } catch {}
      }
    } catch {
      // Ignore
    }

    // Extract review data
    const extractedData = await page.evaluate(() => {
      let rating = 4.9;
      let totalReviews = 73;

      // Rating
      const ratingEl = document.querySelector(
        'div.F7nice span[aria-hidden="true"], div.fontDisplayLarge, span.ceNzKf'
      );
      if (ratingEl) {
        const num = parseFloat(ratingEl.textContent.trim().replace(',', '.'));
        if (!isNaN(num) && num > 0) rating = num;
      }

      // Total count
      const countEl = document.querySelector(
        'div.F7nice span span[aria-label*="reviews"], span[aria-label*="reviews"], .HHrUdb'
      );
      if (countEl) {
        const match = countEl.textContent.match(/([0-9,]+)/);
        if (match) {
          const parsed = parseInt(match[1].replace(/,/g, ''), 10);
          if (!isNaN(parsed) && parsed > 0) totalReviews = parsed;
        }
      }

      const reviewCards = Array.from(
        document.querySelectorAll('div.jftiEf, div[data-review-id]')
      );
      const seenAuthors = new Set();
      const reviews = [];

      reviewCards.forEach((card, idx) => {
        // Find clean author element first
        let rawAuthor =
          card.querySelector('div.d4r55')?.textContent?.trim() ||
          card.querySelector('.d4r55')?.textContent?.trim() ||
          card.querySelector('button.al6Kxe')?.textContent?.trim() ||
          'Google Reviewer';

        // Clean out metadata like "Local Guide", review/photo counts
        let cleanAuthor = rawAuthor
          .replace(/Local Guide.*$/i, '')
          .replace(/[0-9]+\s*reviews?.*$/i, '')
          .replace(/[0-9]+\s*photos?.*$/i, '')
          .replace(/·.*$/, '')
          .trim();

        if (!cleanAuthor) cleanAuthor = 'Google Reviewer';

        const avatarUrl =
          card.querySelector('img.NBa7we, img[src*="googleusercontent"]')?.getAttribute('src') ||
          '';

        let stars = 5;
        const starEl = card.querySelector(
          'span.kvMYJc, span[aria-label*="star"], span.fsw7Cb'
        );
        if (starEl) {
          const aria = starEl.getAttribute('aria-label') || starEl.textContent || '';
          const m = aria.match(/([1-5])/);
          if (m) stars = parseInt(m[1], 10);
        }

        const date =
          card.querySelector('.rsqaWe, .xRkPPb')?.textContent?.trim() || 'Recent';
        const quote =
          card.querySelector('.wiI7Zc, div.MyEned')?.textContent?.trim() || '';

        // Deduplicate by normalized author name and ensure review text exists
        const authorKey = cleanAuthor.toLowerCase();
        if (quote && quote.trim().length > 0 && !seenAuthors.has(authorKey)) {
          seenAuthors.add(authorKey);
          reviews.push({
            _key: `review-${idx + 1}-${Date.now()}`,
            author: cleanAuthor,
            avatarUrl,
            rating: stars,
            date,
            quote,
            highlight: true,
          });
        }
      });

      // Cap to latest 12 distinct reviews
      return { rating, totalReviews, reviews: reviews.slice(0, 12) };
    });

    await browser.close();
    return extractedData;
  } catch (err) {
    await browser.close();
    throw err;
  }
}

async function syncToSanity(data) {
  if (!token) {
    console.error(
      '❌ Error: SANITY_API_WRITE_TOKEN or SANITY_EDITOR_TOKEN is required to write to Sanity.'
    );
    console.log('Here is the scraped data:', JSON.stringify(data, null, 2));
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2026-07-14',
    useCdn: false,
    token,
  });

  const doc = {
    _id: 'googleReviews',
    _type: 'googleReviews',
    businessName: 'Elvin Ediz Immigration Services',
    rating: data.rating || 4.9,
    totalReviews: data.totalReviews || 73,
    googleMapsUrl: GOOGLE_MAPS_MAIN_URL,
    writeReviewUrl: WRITE_REVIEW_URL,
    lastSyncedAt: new Date().toISOString(),
    reviews: data.reviews.length > 0 ? data.reviews : [],
  };

  console.log(`💾 Writing to Sanity singleton 'googleReviews'...`);
  console.log(`⭐ Rating: ${doc.rating} ★`);
  console.log(`👥 Total Reviews: ${doc.totalReviews}`);
  console.log(`📝 Reviews Count Extracted: ${doc.reviews.length}`);

  const res = await client.createOrReplace(doc);
  console.log('✅ Successfully synced Google Reviews to Sanity:', res._id);
}

async function main() {
  try {
    const data = await scrapeGoogleReviews();
    console.log(`✨ Scraped ${data.reviews.length} reviews from Google.`);
    await syncToSanity(data);
    console.log('🎉 Done!');
  } catch (err) {
    console.error('❌ Failed to sync Google Reviews:', err);
    process.exit(1);
  }
}

main();
