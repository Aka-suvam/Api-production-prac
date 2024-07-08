export default async function handler(req, res) {
    try {
      const { lat, lng, ...otherParams } = req.query;
      
      const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=${otherParams['is-seo-homepage-enabled']}&page_type=${otherParams.page_type}`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0',
          // Add any other headers required by Swiggy API
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching from Swiggy:', error);
      res.status(500).json({ error: 'Failed to fetch data from Swiggy' });
    }
  }