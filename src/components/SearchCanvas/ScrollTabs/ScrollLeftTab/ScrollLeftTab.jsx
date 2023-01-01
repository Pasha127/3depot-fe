import React from "react";
import { Button} from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { ChevronLeft} from 'react-bootstrap-icons';
import { useState } from "react";
import { setSearchSettings } from "../../../../redux/actions";
const mapStateToProps = state => {
  return {
    searchSettings: state.searchSettings
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSearchSettings: (settings)=> {
      dispatch(setSearchSettings(settings));
    }    
  };  
};
const ScrollLeftTab = (props) => {

  
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          const currentCamPos = props.searchSettings.cameraPos
          props.setSearchSettings({cameraPos: currentCamPos - 2})
          console.log("click");}} className="left-tab" variant="outline-secondary">
            <div className="left-icon-container">
              <ChevronLeft/>
              </div>
              <div className="left-tab-label">Scroll Left</div>
              </Button>
        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollLeftTab);
