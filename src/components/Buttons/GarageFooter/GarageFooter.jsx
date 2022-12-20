import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image,Modal } from "react-bootstrap";
import "./styles.css"
import {BsFillImageFill,BsPersonBoundingBox } from "react-icons/bs";
import { connect } from "react-redux";
import { getMeWithThunk } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

const GarageFooter = ()=>{
   
    const navigate = useNavigate();
    const handleNavigate = () => navigate('/Garage');
  
return(<>

<Button variant="light" className="options-container" onClick={handleNavigate}>
<div className="mt-0">GARAGE</div>
      </Button>


</>)
}
export default GarageFooter;