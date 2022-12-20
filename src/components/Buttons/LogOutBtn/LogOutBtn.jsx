import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"


const LogOutBtn = (props)=>{
    
return(<>
    <Button variant="outline-secondary end-button"
    onClick={()=>{props.logOut()}}>
        Log Out
    </Button>
</>)
}
export default LogOutBtn;