import React from "react";
import { Button} from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { ChevronRight, InfoCircle, X} from 'react-bootstrap-icons';
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
const ScrollRightTab = (props) => {

  
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          const currentCamPos = props.searchSettings.cameraPos
          props.setSearchSettings({cameraPos: currentCamPos + 2})
          console.log("click");}} className="info-tab" variant="outline-secondary">
            <div className="icon-container">
              <ChevronRight/>
              </div>
              <div className="info-label">Scroll Right</div>
              </Button>
        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollRightTab);
