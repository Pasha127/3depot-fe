import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { Button, Container, Form, Row,Image, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"


const SearchCard = (props)=>{
  const assetSourceName= "Sci-fi_Rifle_2_uykpuo"
  /* const assetSourceName= "FullBody_w27qve" */
  /* const assetSourceName= "Baloon_axtbve" */
  const assetURL=`https://res.cloudinary.com/dirwjcohx/image/upload/e_camera:up_20;right_-35;zoom_1;env_pillars;exposure_1.4/v1670880755/3DepotProducts/${assetSourceName}.jpg`
  let assetName= assetURL.split("/").pop().split(".").shift().split("_")
  assetName.pop()
  assetName= assetName.join(" ")


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
      <Card.Img variant="top" src={assetURL} />
      <Card.Body className={`${infoClass}`} >
        <Card.Title>{`${assetName}`}</Card.Title>
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