import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutWithThunk, setGarage } from "../../../redux/actions";
import "./styles.css"



const mapStateToProps = state => {
  return {
  user: state.userInfo,
  isGarage: state.isGarage
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setGarage: (data)=> {
      dispatch(setGarage(data));
    },     
    logOut: ()=> {
      dispatch(logOutWithThunk());
    }     
  };  
}; 


const UserDropdown = (props)=>{
    const navigate = useNavigate();
    const goToGarage = () => navigate('/Garage');
    const goToLogin = () => navigate('/LogIn');
    const goToSearch = () => navigate('/');

    const handleGarageButton = ()=>{
      props.setGarage(true);
       goToGarage()
    }
    const handlelogOut = ()=>{
      props.logOut();
       goToLogin()
    }


return(<>
    <DropdownButton
    className="dropdown-control"
key={"secondaryGroup"}
id={`dropdown-variants-light`}
drop={'left'}
as={ButtonGroup}
variant={"light"}
title={<div className="drop-container">
  {props.user?._id && <img src={props.user.avatar} onError={(e)=>{e.target.src = "./3DepotLogoMedium.png"}} alt={"UserAvatar"} className="avatar"></img>}
  {!props.user?._id && <h2><List/></h2>}
  </div>}
>
  <Dropdown.Item className="responsive" eventKey="5" onClick={goToSearch}>Home</Dropdown.Item> 
  <Dropdown.Divider className="responsive" />
{props.user?._id && <Dropdown.Item eventKey="1" onClick={handlelogOut}>Log Out</Dropdown.Item>}
{!props.user?._id && <Dropdown.Item eventKey="1" onClick={goToLogin}>Log In</Dropdown.Item>}
{props.user?._id &&<Dropdown.Item eventKey="2"onClick={handleGarageButton}>My Garage</Dropdown.Item>}
{props.user?.role === "Admin" &&<Dropdown.Divider />}
{props.user?.role === "Admin" &&<Dropdown.Item eventKey="4">Back Office</Dropdown.Item> }
</DropdownButton>

</>)
}
export default  connect(mapStateToProps, mapDispatchToProps)(UserDropdown);