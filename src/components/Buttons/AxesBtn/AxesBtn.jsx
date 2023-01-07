import React, { useState } from "react";
import { DashLg, Plus, PlusLg } from "react-bootstrap-icons";
import { connect } from "react-redux";
import axesWhiteSVG from "../../../assets/axesWhite.svg"
import { setSettings } from "../../../lib/redux/actions";
import "./styles.css"

const mapStateToProps = state => {
    return {
    settings: state.garageSettings
    };
  };
   const mapDispatchToProps = dispatch => {
    return {
      setSettings: (settings)=> {
        dispatch(setSettings(settings));
      }     
    };  
  }; 
const AxesBtn = (props)=>{
    const [toggleState,setToggleState] = useState("axes-toggle-off")
    const [whiteAxes,setWhiteAxes] = useState("svg-image")
    const [blackAxes,setBlackAxes] = useState("d-none")
    const handleToggle = () =>{
        if(toggleState === "axes-toggle"){
            setToggleState("axes-toggle-off")
            setWhiteAxes("svg-image")
            setBlackAxes("d-none")
            props.setSettings({axes: false})
        }else{
            setToggleState("axes-toggle")
            setBlackAxes("svg-image")
            setWhiteAxes("d-none")
            props.setSettings({axes: true})
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
            <img className={blackAxes} src={axesWhiteSVG} alt="axes"/>
            <img className={whiteAxes} src={axesWhiteSVG} alt="axes"/>
        </div>
    </button>
    <button className="axes-plus" 
    onClick={(e)=>{        
        e.stopPropagation();
        console.log("click+");
        props.setSettings({axesSize: (props.settings.axesSize+1)})
    }}><PlusLg/>
    </button>
    <button className="axes-minus" 
    onClick={(e)=>{
        e.stopPropagation();
        console.log("click-");
        props.setSettings({axesSize: (props.settings.axesSize-1)})
    }}><DashLg/>
    </button>
    </div>        
</>)
}
export default connect(mapStateToProps, mapDispatchToProps)(AxesBtn);