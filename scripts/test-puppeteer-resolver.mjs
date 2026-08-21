import puppeteer from 'puppeteer';

async function resolveWithPuppeteer() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const testUrls = [
    {
      title: 'Demand for Canadian Citizenship Certificates soaring, fuelled by Americans',
      url: 'https://news.google.com/rss/articles/CBMijwFBVV95cUxNVGZLNzRzTDlzM0g3eDJOQ2VwYkhwQ0l3Y0cyUDNlWmdaNWpaT0pyMm5fSG1zWGtKT1F5NjFsQ00zX3g4T1YyU2k2NXdRX0lhcVhLamxTOFlkczk3SUJ0OC1XazZfcWVfVlZYaVRockpyNU41a25JRFZ6ejFlQmJheElnd3FPcm9sazhzSThrVQ?oc=5',
    },
    {
      title:
        'Canada publishes revised distribution of candidate scores within the Express Entry pool',
      url: 'https://news.google.com/rss/articles/CBMizAFBVV95cUxQa1Z3U1VrVjNieC1BTkVyRTFfd3l1UE81c3d5dkF4TTVyQnhzbVpyS1dNSmdLS0V6WUFMNWllbjJBS3BUU1oyWTVyYmNhbDU3cmM1dkVxcTUwTUZ1bDJZb0pGX2Y2YmVBVzJnY2dKcE5WUEdmeW1hU0Zpc09Yb3BpZEtieXVERnA1VTJKenc1MW9PRXNjUFFMT2NTZDZ1VTJjREc1RGhqZGZVZFc5M2pGTjhyc3lGTnRHRjd5dW0wd205SmpRdlZ6am9IY0nSAdIBQVVfeXFMTlNKQ0pHaDgzbGNXeW8zS2E2YVFYaHh4R3c4Ri16R0h1TWpHcml6WENTNnVvLXA2aGphVk52VkM4LUNjV1ZIUnZIMTNfaVUwdmJLMElmQXNRZGJaWElfMHhpSENxRlpzVV9rV2ZLOGhmWnY0UnF3TG85dDl5dDFxLVoxdFNsU0txZ25vTWt4aFlXQ3NER3h0VXlCRkVJVnVZYzFMd0x0MVAyeEhFQnA3ZVJrRWlKX25QWnVxOVdXa0RZTlptMm91T2oxMXl3MDVVN1RB?oc=5',
    },
    {
      title: 'Canada invites provincial nominees to apply for permanent residence',
      url: 'https://news.google.com/rss/articles/CBMisgFBVV95cUxPNFVUMFp1cVpuN0ZOa2hId3pPT3JyVUhvZERFUl9ZakFKd0V0T2tleEtyeU1FY1hsWExqdnRQZGpLMU1ZenFPdEZaMC1vSktFOEFrekY2YTR1MW9hdExnX2dablc0WlVVZ3JrSGZ5NndmQVNoYkg1MVUyMzdVOU5xbXhJd01nbHkxeURWRjZnTE1mOG85YlpnZXZBQjFISWZHY1JlZzdPcTJDeUdzWHE0X0V30gG3AUFVX3lxTFBoeGZ3eXJGazlRTi1QZXYwSTREbzdpZXVEa3FDVmU1X3UyR2NCVVZLU2Roc0dJSXlJMHgxdTFQWXNtenE2RWEwc3NrVUl4OW1pWVgwTlZqOWRIT2d0TThFT0hKNDFfZXpGalRoM1BoUmVHNmhQbGVZd0VRamFRWVp0S0x5VU5uaC1ITFc0VG4wUktiRTlvbGFra2l6RHpuM3FmdzZrNHVqU2JkamRETENlT2kxQTlHcw?oc=5',
    },
    {
      title:
        'Processing times have been increasing for proof-of-citizenship applications. Here’s why',
      url: 'https://news.google.com/rss/articles/CBMixAFBVV95cUxQd3pzRVJ4YXdvZ3ZZWGpPQzVOZTIwUnJnLXR2ZkRzb2RiN1U2NVczZ0JtV3BYb0pqSEdxdGw5VmhCR2xmc1FRbmo5SW83SmxQWnNraG5lN2EzNjRKcnV0dWVjU3doNjIzeWhTRGh2MncxTVlfUW50Q0M1UHFLdllzc2RjMnJHVTg5RWNMQjRiTUxGSkZZcU9wbHBjMUo1Sk90aXY4TGU3TE9Pc3dFWC1YYVh6RlFsWF9lUW9qeHFsbGViVDNi?oc=5',
    },
    {
      title: 'Newfoundland and Labrador invites 208 candidates in provincial immigration draw',
      url: 'https://news.google.com/rss/articles/CBMiwgFBVV95cUxNQWhOejFTT214WXJLZ3F5VDAwUC0zTUpYbXBra2lWdDc3QVZTck9GN18zMWhId0N2YTJ1QWp3eExUS3dtR01hSXpFbkhXb1QyX0NGblBjV2ljQU1aaXJDeGpfb0dsMmEyU2l3VDNrZVlFaHdDR0F1NThyTXFZYVB3bmttSzRVdEJkeV9YV1ROaEtCRG9STW4xclBKVGtQN1ZSM0padXQtZV92SnNfMXoxaTJVWVRjSnBQeGozY1pBUDF0d9IBxwFBVV95cUxNS3lkZThzMjNna0VBY3M0Q19YV0hPbUZ1X0Y5RlFGaGtRY1AyTEVTb3lEQW15OUxtcmFGT29aYUNRLUUzcVBRVzZIbnJyT3lwdlJ4NDFiYk9nM2ktT3J6QVJsOWJLQXhTYTQ1eVlqRFc5U0ZPS1NLaW1hTlE2T1JBeXN2cDN2TW1lV2RDLWx4YkpmY0MteDdGTzNfUDNtZG5tRkY5TW1BNWVqUlg3NWRXTW9naUc4UDFXRGpYU1VzQ1NOOWZrNkt3?oc=5',
    },
  ];

  for (const item of testUrls) {
    try {
      await page.goto(item.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      // wait a moment for redirect
      await new Promise((r) => setTimeout(r, 2000));
      const finalUrl = page.url();
      console.log(`[${item.title}]\n-> Final URL: ${finalUrl}\n`);
    } catch (e) {
      console.error(`Error loading ${item.title}:`, e.message);
    }
  }

  await browser.close();
}

resolveWithPuppeteer();
