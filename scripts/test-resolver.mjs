async function resolveGoogleUrl(googleUrl) {
  try {
    const res = await fetch(googleUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      redirect: 'follow',
    });
    
    // In many cases, Google returns a page with c-wiz or data-n-au or a meta refresh
    const text = await res.text();
    const match = text.match(/href="([^"]+)"/);
    const dataMatch = text.match(/data-n-au="([^"]+)"/);
    const urlMatch = text.match(/url=(https?:\/\/[^"'>\s]+)/i);

    console.log('Resolved url response URL:', res.url);
    if (res.url && !res.url.includes('news.google.com')) {
      return res.url;
    }
    if (dataMatch && dataMatch[1]) {
      return dataMatch[1];
    }
    if (urlMatch && urlMatch[1]) {
      return urlMatch[1];
    }
    return res.url;
  } catch (e) {
    console.error('Error resolving URL:', e);
    return googleUrl;
  }
}

async function test() {
  const url = "https://news.google.com/rss/articles/CBMijwFBVV95cUxNVGZLNzRzTDlzM0g3eDJOQ2VwYkhwQ0l3Y0cyUDNlWmdaNWpaT0pyMm5fSG1zWGtKT1F5NjFsQ00zX3g4T1YyU2k2NXdRX0lhcVhLamxTOFlkczk3SUJ0OC1XazZfcWVfVlZYaVRockpyNU41a25JRFZ6ejFlQmJheElnd3FPcm9sazhzSThrVQ?oc=5";
  console.log('Testing resolution for CBC article...');
  const res = await resolveGoogleUrl(url);
  console.log('Result:', res);
}

test();
