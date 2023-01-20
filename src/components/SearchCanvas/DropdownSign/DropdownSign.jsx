import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { setSearchSettings } from "../../../lib/redux/actions";
import { useEffect } from "react";
import signboard from "../../../assets/signboard.png"

const mapStateToProps = state => {
  return {
    searchSettings: state.searchSettings,
    activeAsset: state.activeAsset
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
    if(props.searchSettings?.activeAsset){setSignboardState("sign-container-down")}
    else(setSignboardState("sign-container-up"))
  },[props.searchSettings.activeAsset])
  return (<>      
    <div className={signboardState} >
       <img src={signboard} className="signboard" alt="signboard"/>
       <div className="sign-text-box">
       <div className="signboard-text">{props.searchSettings.activeAsset}</div>
       </div>
    </div>        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownSign);
