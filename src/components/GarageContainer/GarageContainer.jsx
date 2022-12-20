import React, { useCallback, useState } from "react";
import { lazy } from "react";
import { Suspense } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Search from "../search/Search";
import "./styles.css"
import Garage from "../Garage/Garage";
import GeneralNavbar from "../navbar/GeneralNavbar";
import AxesBtn from "../Buttons/AxesBtn/AxesBtn";
import CookieModal from "../CookieModal/CookieModal";
import GarageInstructions from "./GarageInstructions/GarageInstructions";

const GarageContainer = (props)=>{
const [showAxes, setShowAxes] = useState(false);
const [axesSize, setAxesSize] = useState(1);




return(<>
<Suspense >
    <GeneralNavbar></GeneralNavbar>
    <AxesBtn showAxes={showAxes} setShowAxes={setShowAxes} axesSize={axesSize} setAxesSize={setAxesSize} />
    <Garage showAxes={showAxes} axesSize={axesSize}/>
    <GarageInstructions/>
</Suspense>
<CookieModal/>
</>)
}
export default GarageContainer;