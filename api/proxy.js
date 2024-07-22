import fetch from 'node-fetch';

export default async (req, res) => {
  const swiggyUrl = 'https://www.swiggy.com/dapi/restaurants/list/v5';
  const { lat, lng, page_type } = req.query;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (!lat || !lng) {
    res.status(400).json({ error: 'Missing required parameters: lat and lng' });
    return;
  }

  try {
    const response = await fetch(`${swiggyUrl}?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=${page_type || 'DESKTOP_WEB_LISTING'}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Swiggy:', error);
    res.status(500).json({ error: 'Error fetching data from Swiggy', message: error.message });
  }
};