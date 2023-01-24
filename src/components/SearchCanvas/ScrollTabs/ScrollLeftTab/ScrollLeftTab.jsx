import React from "react";
import { Button} from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { CaretLeftFill} from 'react-bootstrap-icons';
import { useState } from "react";
import { setSearchSettings } from "../../../../lib/redux/actions";
import { useEffect } from "react";
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
  const [visibility,setVisibility] = useState("d-none")
  useEffect(()=>{
    if(props.searchSettings.cameraPos < 2){
      setVisibility("d-none")
    }else{
      setVisibility("left-tab")
    }
  },[props.searchSettings.cameraPos])
  
  
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          const currentCamPos = props.searchSettings.cameraPos
          props.setSearchSettings({cameraPos: currentCamPos - 2})
          console.log("click");}} className={visibility}  variant="outline-secondary">
            <div className="left-icon-container">
              <CaretLeftFill/>
              </div>
              <div className="left-tab-label">Scroll Left</div>
              </Button>
        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollLeftTab);
