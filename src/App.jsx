import { useState, useEffect } from 'react'
import Resturent from './Resturent.jsx';
import Carsoulcont from './Carsoulcont.jsx';
import { Swiggy_RestApi } from './ulits/Contants.js';
const App = () => {
  const [resturentlist, setResturentList] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => { fetchData() }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/restaurants/list/v5?lat=22.5743545&lng=88.3628734&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      setResturentList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      const info = json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;
      setCarouselItems(info);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = (direction) => {
    const slide = document.getElementById('carsoul');
    slide.scrollLeft += direction * 150;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h1>Food Delivery App</h1>
      
      <section className='resturent-list'>
        {resturentlist.map((res) => (
          <Resturent resName={res} key={res.info.id} />
        ))}
      </section>

      <div className='carsoul-container' id='carsoul'>
        {carouselItems.map((res) => (
          <Carsoulcont Hotel={res} key={res.id} />
        ))}
      </div>

      <button className='left' onClick={() => handleScroll(-1)}>Left</button>
      <button className='right' onClick={() => handleScroll(1)}>Right</button>
    </>
  )
}

export default App