import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image, Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"


const UserDropdown = (props)=>{
    const navigate = useNavigate();
    const goToGarage = () => navigate('/Garage');
    const goToLogin = () => navigate('/LogIn');
return(<>
    <DropdownButton
    className="dropdown-control"
key={"secondaryGroup"}
id={`dropdown-variants-light`}
drop={'left'}
as={ButtonGroup}
variant={"light"}
title={<div className="drop-container">
  {props.user?._id && <img src={props.user.avatar} alt={"UserAvatar"} className="avatar"></img>}
  {!props.user?._id && <p className="m-0">Menu</p>}
  </div>}
>
{props.user?._id && <Dropdown.Item eventKey="1" onClick={()=>{props.logOut()}}>Log Out</Dropdown.Item>}
{!props.user?._id && <Dropdown.Item eventKey="1" onClick={goToLogin}>Log In</Dropdown.Item>}
{props.user?._id &&<Dropdown.Item eventKey="2"onClick={goToGarage}>My Garage</Dropdown.Item>}
{props.user?.role === "Admin" &&<Dropdown.Divider />}
{props.user?.role === "Admin" &&<Dropdown.Item eventKey="4">Back Office</Dropdown.Item> }
</DropdownButton>

</>)
}
export default UserDropdown;