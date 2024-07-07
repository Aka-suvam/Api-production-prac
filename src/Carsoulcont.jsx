import { Carsoulimg } from "./ulits/Contants";
const Carsoulcont = ({ Hotel }) => {
 //console.log("Hotel Data in Carsoulcont:", Hotel);

 
  const {imageId } = Hotel;

  return (
    <div className="carsoul-content">
      <img 
        src={Carsoulimg+imageId} 
        alt="Hotel Banner"
      />
    </div>
  );
};

export default Carsoulcont;
