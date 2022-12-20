import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import "./styles.css"
import {BsFillImageFill,BsPersonBoundingBox } from "react-icons/bs";
import { connect } from "react-redux";
import { getMeWithThunk } from "../../redux/actions";
import GarageFooter from "../Buttons/GarageFooter/GarageFooter";
import SearchNavBar from "../navbar/SearchNavBar";
import CookieModal from "../CookieModal/CookieModal";
import SearchCardContainer from "../SearchCardContainer/SearchCardContainer";
import { useEffect } from "react";

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
  useEffect(()=>{
  props.getMe();
  },[])

return(<>
<div className="search-container">
  <SearchNavBar/>
  <SearchCardContainer/>
</div>
<CookieModal/>
</>)
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);