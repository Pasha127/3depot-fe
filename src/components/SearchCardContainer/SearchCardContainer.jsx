import React, { useCallback, useState } from "react";
import { Suspense } from "react";
import { useEffect } from "react";
import { Button, Container, Form, Row,Image, Modal, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader2D from "../loader/Loader2D";
import SearchCard from "../SearchCard/SearchCard";
import "./styles.css"


const SearchCardContainer = (props)=>{


return(<>
 <div className="card-container">
   
     <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/>
    <SearchCard/> 
 </div>
</>)
}
export default SearchCardContainer;