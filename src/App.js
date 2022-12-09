import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Loader3D from './components/loader/Loader3D';
import Loader2D from './components/loader/Loader2D';
import SplashNavBar from './components/navbar/SplashNavbar';
import LogIn from './components/log-in/logIn';


/* import NavBar from "./components/navbar/GeneralNavbar"
import Home from "./components/" */

function App() {
  return (<>
      
 
      <Router>
      {/* {props.user?._id &&}  <NavBar/>
      {/* {!props.user?._id && <SplashNavBar/>*/}
      <Routes>
        {/* {props.user?._id && <Route path="/" exact element={<Home/>} />
        {/* {!props.user?._id &&*/} <Route path="/" exact element={<LogIn />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
    {/* <Loader3D></Loader3D>
      <Loader2D></Loader2D>  */}
      <script src="https://ar-3d-viewer.cloudinary.com/main.js"></script>
      <div style={{width:"100%", height:"450px"}}>
    <ar-3d-viewer cloud="demo" models="test/racket001_a2otqo">
    </ar-3d-viewer>
  </div>
     </>);
}

export default App;
