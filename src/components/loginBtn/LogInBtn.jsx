import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"


const LogInBtn = (props)=>{
    const navigate = useNavigate();
    const handleNavigate = () => navigate('/LogIn');
return(<>
    <Button variant="outline-secondary" className="log-in-btn"
    onClick={handleNavigate}>
        Log In/Register
    </Button>
</>)
}
export default LogInBtn;