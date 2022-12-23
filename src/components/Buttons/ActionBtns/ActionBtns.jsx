import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import "./styles.css"


const ActionBtns = (props)=>{
    const [actionClass, setActionClass] = useState("action-toggle")

    const handleToggle = () =>{
        if (actionClass === "action-toggle"){
            setActionClass("action-toggle-clicked")
        }
        if (actionClass === "action-toggle-clicked"){
            setActionClass("action-toggle")
        }
    }

return(<>
    <div className="action-toggle-container">
    <button className={`${actionClass}`}
    onClick={(e)=>{
        e.stopPropagation();
        handleToggle();
        console.log("click");
    }}>
    </button>
    <button className="action-1" 
    onClick={(e)=>{        
        e.stopPropagation();
        console.log("click1");
        
    }}>
       
    </button>
    
    </div>        
</>)
}
export default ActionBtns;