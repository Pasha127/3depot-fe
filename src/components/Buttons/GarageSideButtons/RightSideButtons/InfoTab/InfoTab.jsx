import React from "react";
import { Button} from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../../../../lib/redux/actions";
import { InfoCircle, InfoCircleFill, X} from 'react-bootstrap-icons';
import { useState } from "react";
import useDragEffect from "../../../../../lib/hooks/useDragEffect";
const mapStateToProps = state => {
  return {
  user: state.userInfo,
  showGarage: state.isGarage,
  activeAsset: state.activeAsset
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    logOut: ()=> {
      dispatch(logOutWithThunk());
    }     
  };  
}; 
const InfoTab = (props) => {
  useDragEffect("info-tray");
  const [trayState,setTrayState] = useState("info-tray-closed")
  const handleToggle= ()=>{
    if(trayState === "info-tray-closed"){
      setTrayState("info-tray")
    }else{
      setTrayState("info-tray-closed")
    }
  }
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          handleToggle();
          console.log("click");}} className="info-tab" variant="outline-secondary">
            <div className="info-icon-container">
              <InfoCircle/>
              </div>
              <div className="info-label">Model Info</div>
              </Button>
        <div className="drag-container">
         <div id="info-tray" className={trayState}>
          <div className="info-tray-details"
          onClick={(e)=>{e.stopPropagation()}}
          >
            {props.activeAsset.description && <div>{props.activeAsset.description}</div> }
            {!props.activeAsset.description && <div>{"Welcome to the 3Depot Garage! If you choose a model from the search page or from the list of your models (in the tab below this) the model will appear in the 3D viewer. The 3D model's description will be shown here."}</div>}
          </div>
          <X className="info-tray-close-icon" 
          onClick={(e)=>{
            e.stopPropagation();
            handleToggle();
            console.log("click");}}
          />

        </div> 
        </div>
        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoTab);
