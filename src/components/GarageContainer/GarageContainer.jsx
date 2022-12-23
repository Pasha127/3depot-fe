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
import GeneralNavbar from "../navbar/GeneralNavbar";
import ActionBtns from "../Buttons/ActionBtns/ActionBtns";

const GarageContainer = (props)=>{
const [showAxes, setShowAxes] = useState(false);
const [axesSize, setAxesSize] = useState(1);




return(<>
<Suspense >
    <GeneralNavbar/>
    <GarageNavBar/>
    <AxesBtn showAxes={showAxes} setShowAxes={setShowAxes} axesSize={axesSize} setAxesSize={setAxesSize} />
    <Garage showAxes={showAxes} axesSize={axesSize}/>
    <GarageInstructions/>
    <ActionBtns/>
</Suspense>
<CookieModal/>
</>)
}
export default GarageContainer;