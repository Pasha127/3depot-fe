import React, { useCallback, useState } from "react";
import { Suspense } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"
import Garage from "../Garage/Garage";
import AxesBtn from "../Buttons/AxesBtn/AxesBtn";
import CookieModal from "../CookieModal/CookieModal";
import GarageInstructions from "./GarageInstructions/GarageInstructions";
import GarageNavBar from "../navbar/GarageNavBar";

const GarageContainer = (props)=>{
const [showAxes, setShowAxes] = useState(false);
const [axesSize, setAxesSize] = useState(1);




return(<>
<Suspense >
    <GarageNavBar/>
    <AxesBtn showAxes={showAxes} setShowAxes={setShowAxes} axesSize={axesSize} setAxesSize={setAxesSize} />
    <Garage showAxes={showAxes} axesSize={axesSize}/>
    <GarageInstructions/>
</Suspense>
<CookieModal/>
</>)
}
export default GarageContainer;