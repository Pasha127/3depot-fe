import React from "react";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"


const GarageBtn = (props)=>{
    const navigate = useNavigate();
    const handleNavigate = () => navigate('/Garage');
return(<>
    <Button variant="outline-secondary border-override" 
    onClick={handleNavigate}>
        Garage
    </Button>
</>)
}
export default GarageBtn;