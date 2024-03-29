import React from "react";
import { connect } from "react-redux";
import "./styles.css";
import { useState } from "react";
import { setSearchSettings } from "../../../lib/redux/actions";
import { useEffect } from "react";
import { HandIndexFill } from "react-bootstrap-icons";





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
const InstructionHolograms = (props) => {
  const [arrowsState,setArrowsState] = useState("d-none")
  const [circleState,setCircleState] = useState("d-none")
  const [clickingFinger,setClickingFinger] = useState("d-none")
  useEffect(()=>{
    if(props.searchSettings.activeAsset)
    {localStorage.setItem("seenBoxClick", true);
    setArrowsState("d-none");    
    if(!sessionStorage.getItem("seenModelClick")){
        setClickingFinger("clicking-finger");
        setCircleState("circle-container");
        sessionStorage.setItem("seenModelClick", true);
    }}
  },[props.searchSettings.activeAsset])
  useEffect(()=>{
    setTimeout(()=>{!localStorage.getItem("seenBoxClick") && setArrowsState("arrows-container")},3000);
  },[])
  return (<>      
        <div className={arrowsState}>
            <div className="color-arrowL"></div>
            <div className="color-arrowR"></div>
            <div className="color-arrowL2"></div>
            <div className="color-arrowR2"></div>
            <div className="arrow-text">CLICK</div>
        </div>
        <div className={circleState}>
            <div className="inner-circle"></div>
            <div className="fill-circle"></div>
            <div className="outer-circle"></div>
        </div>
        <HandIndexFill className={clickingFinger}/>
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructionHolograms);
