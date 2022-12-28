import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../../../../redux/actions";
import {Boxes, X} from 'react-bootstrap-icons';
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
const ModelsTab = (props) => {
  const [trayState,setTrayState] = useState("model-tray-closed")
  const handleToggle= ()=>{
    if(trayState === "model-tray-closed"){
      setTrayState("model-tray")
    }else{
      setTrayState("model-tray-closed")
    }
  }
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          handleToggle();
          console.log("click");}} className="model-tab" variant="outline-secondary">
            <div className="icon-container">
              <Boxes/>
              <div className="model-label">My Models</div>
              </div>
              </Button>
        <div className={trayState}>
        <div className="model-tray-details"
          onClick={(e)=>{e.stopPropagation()}}
          >
            Text Goes Here
          </div>
          <X className="model-tray-close-icon" 
          onClick={(e)=>{
            e.stopPropagation();
            handleToggle();
            console.log("click");}}
          />

        </div>
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelsTab);
