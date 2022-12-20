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
key={"secondaryGroup"}
id={`dropdown-variants-secondary`}
as={ButtonGroup}
variant={"secondary"}
title={"secondary"}
>
{props.user?._id && <Dropdown.Item eventKey="1" onClick={()=>{props.logOut()}}>Log Out</Dropdown.Item>}
{!props.user?._id && <Dropdown.Item eventKey="1" onClick={goToLogin}>Log In</Dropdown.Item>}
{props.user?._id &&<Dropdown.Item eventKey="2"onClick={goToGarage}>My Garage</Dropdown.Item>}
{/* <Dropdown.Item eventKey="3" active>
  Active Item
</Dropdown.Item>
<Dropdown.Divider />
<Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
</DropdownButton>

</>)
}
export default UserDropdown;