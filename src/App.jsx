import { useState, useEffect } from 'react'
import Resturent from './Resturent.jsx';
//import { Swiggy_RestApi } from './ulits/Contants.js';
import Shimmer from './Shimmer.jsx';


const App = () => {
  const [resturentlist, setResturentList] = useState([]);

 

  useEffect(() => { fetchData() }, []);

  const fetchData = async () => {
    //setIsLoading(true);
    try {
      //const response = await fetch(`/api/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING'`);
      const response = await fetch(`/api/proxy?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING`);
        

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      setResturentList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
      const info = json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;
      setCarouselItems(info);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      
    } 
  };

 

  
   
  return resturentlist.length===0?(<Shimmer/>):
  (<>
      <h1>Food Delivery App</h1>
      
      <section className='resturent-list'>
        {resturentlist.map((res) => (
          <Resturent resName={res} key={res.info.id} />
        ))}
      </section>

      
    </>
  )
}

export default App