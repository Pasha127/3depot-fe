import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { setSearchSettings } from "../../../redux/actions";
import { useEffect } from "react";
import signboard from "../../../assets/signboard.png"

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
const DropdownSign = (props) => {
  const [signboardState,setSignboardState] = useState("sign-container-up")
  useEffect(()=>{
    if(props.searchSettings.activeAsset){setSignboardState("sign-container-down")}
    else(setSignboardState("sign-container-up"))
  },[props.searchSettings.activeAsset])
  return (<>      
    <div className={signboardState} >
       <img src={signboard} className="signboard" />
       <div className="signboard-text">Example Rifle 001</div>
    </div>        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownSign);
