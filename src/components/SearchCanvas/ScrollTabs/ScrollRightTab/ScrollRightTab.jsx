import React from "react";
import { Button} from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { CaretRightFill} from 'react-bootstrap-icons';
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
const ScrollRightTab = (props) => {
  const [visibility,setVisibility] = useState("right-tab")
  useEffect(()=>{
    console.log(props.searchSettings.cameraPos, props.listLength)
    if((props.searchSettings.cameraPos > ((props.listLength*2)-2.05)))
    {
      setVisibility("d-none")
    }else 
    {
      setVisibility("right-tab")
    }
  },[props.searchSettings.cameraPos])
  
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          const currentCamPos = props.searchSettings.cameraPos
          props.setSearchSettings({cameraPos: currentCamPos + 2})
          console.log("clickR");}} className={visibility} variant="outline-secondary">
            <div className="right-icon-container">
              <CaretRightFill/>
              </div>
              <div className="right-tab-label">Scroll Right</div>
              </Button>
        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(ScrollRightTab);
