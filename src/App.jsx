import { useState,useEffect } from 'react'
import Resturent from './Resturent.jsx';
import { Swiggy_RestApi } from './ulits/Contants.js';
import Carsoulcont from './Carsoulcont.jsx';

const App=()=> {
  const [resturentlist, setResturentList] = useState([]);
  const [mind,setMind]=useState([]);
  

  useEffect(()=>{fetchData()},[]);


const fetchData= async ()=>{
    const data = await fetch(Swiggy_RestApi);

     const json = await data.json();
  
   //console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   setResturentList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   const info=json?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;
   setMind(info);
   //console.log(mind);
  };
 //
const handleLeft=()=>{
  let slide=document.getElementById('carsoul');
  slide.scrollLeft=slide.scrollLeft-150;
  
}
const handleRight=()=>{
  let slide=document.getElementById('carsoul');
  slide.scrollLeft=slide.scrollLeft+150;
  
}
 
 


  return (
    <>
    <h1 >Food Delevery App</h1>
     
      <section className='resturent-list' >
      {resturentlist.map((res)=>(<Resturent resName={res} key={res.info.id}/>))}
      </section>
     <div className='carsoul-container' id='carsoul'>
     
     

     {mind.map( (res)=>(<Carsoulcont  Hotel={res} key={res.id} />)



     )}

     </div>
     <button className='left' onClick={handleLeft}>Left</button>
     <button className='right' onClick={handleRight}>Right</button>
     
    </>
  )
}

export default App
