import React, { useState } from "react";
import axesSVG from "../../../assets/axes.svg"
import axesWhiteSVG from "../../../assets/axesWhite.svg"
import "./styles.css"


const AxesBtn = (props)=>{
    const [toggleState,setToggleState] = useState("axes-toggle-off")
    const [whiteAxes,setWhiteAxes] = useState("svg-image")
    const [blackAxes,setBlackAxes] = useState("d-none")
    const handleToggle = () =>{
        if(toggleState === "axes-toggle"){
            setToggleState("axes-toggle-off")
            setWhiteAxes("svg-image")
            setBlackAxes("d-none")
        }else{
            setToggleState("axes-toggle")
            setBlackAxes("svg-image")
            setWhiteAxes("d-none")
        }
    }

return(<>
    <div className="axes-toggle-container">
    <button className={toggleState} 
    onClick={(e)=>{
        handleToggle();
        e.stopPropagation();
        props.setShowAxes(!props.showAxes);
        console.log("click");
    }}>
        <div className="svg-container">
            <img className={blackAxes} src={axesSVG} alt="axes"/>
            <img className={whiteAxes} src={axesWhiteSVG} alt="axes"/>
        </div>
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