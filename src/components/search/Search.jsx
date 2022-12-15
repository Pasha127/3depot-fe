import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import "./styles.css"
import {BsFillImageFill,BsPersonBoundingBox } from "react-icons/bs";
import { connect } from "react-redux";
import { getMeWithThunk } from "../../redux/actions";
import SearchOptions from "../SearchOptions/SearchOptions";
import LogInBtn from "../loginBtn/LogInBtn";
import GarageBtn from "../GarageBtn/GarageBtn";
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
   <LogInBtn/>
   <GarageBtn/>
   <div className="splash-logo-container">
    <div className="splash-logo-image">3Depot</div>
   </div>
   <div className="search-form-container">
    <Form>
      <Form.Group className="mb-3 search-bar-size" controlId="SearchForm">
        <Form.Control placeholder="What are you looking for?" />
      </Form.Group>
    </Form>
   </div>
   <SearchOptions/>
   
</div>
</>)
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);