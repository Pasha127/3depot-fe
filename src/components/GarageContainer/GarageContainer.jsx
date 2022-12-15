import React, { useCallback, useState } from "react";
import { lazy } from "react";
import { Suspense } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader2D from "../loader/Loader2D";
import Search from "../search/Search";
import "./styles.css"
import Garage from "../Garage/Garage";
import GeneralNavbar from "../navbar/GeneralNavbar";

const GarageContainer = (props)=>{
return(<>

<Suspense fallback={<Loader2D/>}>
    <GeneralNavbar></GeneralNavbar>
    <Garage/>
</Suspense>
</>)
}
export default GarageContainer;