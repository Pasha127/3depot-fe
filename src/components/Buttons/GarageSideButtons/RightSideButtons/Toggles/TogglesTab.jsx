import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../../../../redux/actions";
import {Gear} from 'react-bootstrap-icons';
import AxesBtn from "../../../AxesBtn/AxesBtn";
import LightBtn from "../../../LightBtn/LightBtn";
import { useState } from "react";
const mapStateToProps = state => {
  return {
  user: state.userInfo,
  showGarage: state.isGarage
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    logOut: ()=> {
      dispatch(logOutWithThunk());
    }     
  };  
}; 
const TogglesTab = (props) => {
  const [trayState,setTrayState] = useState("toggle-tray-closed")
  const handleToggle= ()=>{
    if(trayState === "toggle-tray-closed"){
      setTrayState("toggle-tray")
    }else{
      setTrayState("toggle-tray-closed")
    }
  }
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          handleToggle();
          console.log("click");}} className="toggle-tab" variant="outline-secondary">
            <div className="toggle-icon-container">
              <Gear/>
              <div className="toggle-label">Settings</div>
          </div>
          </Button>
        <div className={trayState}>
        <AxesBtn showAxes={props.showAxes} setShowAxes={props.setShowAxes} axesSize={props.axesSize} setAxesSize={props.setAxesSize} />
        <LightBtn/>
        </div>
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(TogglesTab);
