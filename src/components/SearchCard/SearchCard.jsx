import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Button, Container, Form, Row,Image, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"


const SearchCard = (props)=>{
    const [infoClass, setInfoClass] = useState("d-none")
    const [buttonClass, setButtonClass] = useState("d-none")
    const navigate = useNavigate();
    const goToGarage = () => navigate('/Garage');


return(<>
  <Card style={{ width: '18rem' }} onMouseOver={()=>{
        setInfoClass("info-show");
        setButtonClass("button-show");
      }}
      onMouseLeave={()=>{
        setInfoClass("d-none");
        setButtonClass("d-none");
      }}>
      <Card.Img variant="top" src="http://placekitten.com/400/400" />
      <Card.Body className={`${infoClass}`} >
        <Card.Title>Asset</Card.Title>
        <Card.Text>
          Description of Asset
        </Card.Text>
        <Button className={`${buttonClass}`} variant="dark"
        onClick={goToGarage}
        >View in 3D</Button>
      </Card.Body>
    </Card>
</>)
}
export default SearchCard;