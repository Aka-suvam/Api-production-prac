import { Rest_img } from "./ulits/Contants";


const Resturent=({resName})=>{
    const {name,avgRating,cloudinaryImageId}=resName.info;
//const [data]  =resName; 
    return(<section className="resturent">
           <div className="img-cont"> 
            <img src={Rest_img+cloudinaryImageId} alt='img'/>
           </div>
           <p className="hotel-name">{name}</p>
           <p className="rating">{avgRating}</p>

    </section>)
}


export default Resturent;

