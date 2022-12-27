import React, { useState } from "react";

import {  ArrowCounterclockwise, Lightbulb, LightbulbFill, LightbulbOffFill, Sliders } from "react-bootstrap-icons";
import ReactSlider from "react-slider";
import "./styles.css"


const LightBtn = (props)=>{
        const [red,setRed] = useState(255)
        const [green,setGreen] = useState(255)
        const [blue,setBlue] = useState(255)
        const [rotation,setRotation] = useState(360)
        const [lightOnState,setLightOnState] = useState('light-show')
        const [lightOffState,setLightOffState] = useState('light-hide')
        const [toggleState,setToggleState] = useState('lights-toggle')
        const handleToggle = () =>{
            if(toggleState === "lights-toggle"){
                setToggleState("lights-toggle-off")
                setLightOffState("light-show")
                setLightOnState("light-hide")
            }else{
                setToggleState("lights-toggle")
                setLightOffState("light-hide")
                setLightOnState("light-show")
                
            }
        }


    return(<>
    <div className="lights-toggle-container">
    <button className={toggleState}
    onClick={(e)=>{
        e.stopPropagation();
        handleToggle();
        console.log("click");
    }}>
        <div className="lightbulb-container">
            <Lightbulb className={`lightbulb-outline ${lightOnState}`}/>
            <LightbulbFill  className={`lightbulb-color ${lightOnState}`}  style={{color: `rgb(${red},${green},${blue})`}}/>
            <LightbulbOffFill className={`lightbulb-off ${lightOffState}`}/>
        </div>
    </button>

    <button className="lights-settings" 
    /* onClick={(e)=>{}} */>
        <div className="slider-icon-container"><Sliders/></div>        
        <div className="sliders-container">
        <div className="color-label label-position1" style={{color:`rgb(${red},0,0)`,borderColor:`rgb(${red},0,0)`}}>
            <div>R</div>
        </div>
        <div className="color-label label-position2" style={{color:`rgb(0,${green},0)`,borderColor:`rgb(0,${green},0)`}}>
            <div>G</div>
        </div>
        <div className="color-label label-position3" style={{color:`rgb(0,0,${blue})`,borderColor:`rgb(0,0,${blue})`}}>
            <div>B</div>
        </div>
        <div className="rotation-label label-position4" style={{rotate:`${rotation}deg`}}>
            <ArrowCounterclockwise className="arrow-position" />
        </div>
        <ReactSlider
         orientation="vertical"
         invert
         max={255}
         value={red}
        className="vertical-slider-red"
        thumbClassName="slider-thumb"
        trackClassName="red-slider-track"
        onAfterChange={(value, index) =>{setRed(value);console.log("Red",value)}}/>

        
        <ReactSlider
         orientation="vertical"
         invert
         max={255}
         value={green}
        className="vertical-slider-green"
        thumbClassName="slider-thumb"
        trackClassName="red-slider-track"
        onAfterChange={(value, index) =>{setGreen(value);console.log("Green",value)}}
        />
        
        <ReactSlider
         orientation="vertical"s
         invert
         max={255}
         value={blue}
        className="vertical-slider-blue"
        thumbClassName="slider-thumb"
        trackClassName="red-slider-track"
        onAfterChange={(value, index) =>{setBlue(value);console.log("Blue",value)}}
        />
        
        <ReactSlider
         orientation="vertical"
         invert
         max={360}
         value={rotation}
        className="vertical-slider-black"
        thumbClassName="slider-thumb"
        trackClassName="red-slider-track"
        onAfterChange={(value, index) =>{setRotation(value);console.log("Rotation",value)}}
        />
        </div>        
    </button>
    </div>        
</>)
}
export default LightBtn;