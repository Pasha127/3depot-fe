import React from "react";
import { Button} from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../../../../lib/redux/actions";
import { ChevronDoubleLeft, InfoCircle, InfoCircleFill, X} from 'react-bootstrap-icons';
import { useState } from "react";
import useDragEffect from "../../../../../lib/hooks/useDragEffect";
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
const FriendsTab = (props) => {
 
  const handleToggle= ()=>{
    if(props.showHide === "Show"){
      props.setShowHide("Hide")
    }else{
      props.setShowHide("Show")
    }
  }
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          handleToggle();
          console.log("click");}} className="friends-tab" variant="outline-secondary">
              <div className={`friends-label-${props.showHide}`}>{props.showHide}</div>
              </Button>
        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsTab);
