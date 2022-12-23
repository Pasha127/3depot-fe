import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import "./styles.css"


const AxesBtn = (props)=>{

return(<>
    <div className="axes-toggle-container">
    <button className="axes-toggle" 
    onClick={(e)=>{
        e.stopPropagation();
        props.setShowAxes(!props.showAxes);
        console.log("click");
    }}>
    </button>
    <button className="axes-plus" 
    onClick={(e)=>{        
        e.stopPropagation();
        console.log("click+");
        props.setAxesSize(props.axesSize+1)
    }}>+
    </button>
    <button className="axes-minus" 
    onClick={(e)=>{
        e.stopPropagation();
        console.log("click-");
        props.setAxesSize(props.axesSize-1)
    }}>-
    </button>
    </div>        
</>)
}
export default AxesBtn;