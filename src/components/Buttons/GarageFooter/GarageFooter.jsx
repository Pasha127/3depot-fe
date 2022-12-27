import React from "react";
import { Button} from "react-bootstrap";
import "./styles.css"
import { useNavigate } from "react-router-dom";

const GarageFooter = ()=>{
   
    const navigate = useNavigate();
    const handleNavigate = () => navigate('/Garage');
  
return(<>

<Button variant="light" className="options-container" onClick={handleNavigate}>
<div className="mt-0">GARAGE</div>
      </Button>


</>)
}
export default GarageFooter;