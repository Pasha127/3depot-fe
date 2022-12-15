import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import "./styles.css"
import {BsFillImageFill,BsPersonBoundingBox } from "react-icons/bs";
import { connect } from "react-redux";
import { getMeWithThunk } from "../../redux/actions";
const mapStateToProps = state => {
  return {
  user: state.userInfo
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    getMe: ()=> {
      dispatch(getMeWithThunk());
    }     
  };  
}; 

const Search = (props)=>{
return(<>
<div className="search-container">
   
</div>
</>)
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);