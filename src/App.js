import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* import NavBar from "./components/navbar/GeneralNavbar"
import Home from "./components/" */

function App() {
  return (
    <aiCube></aiCube>
  //  <Router>
  //  {/* {props.user?._id &&} */} <NavBar/>
  //  {/* {!props.user?._id && <SplashNavBar/>} */}
  //  <Routes>
  //    {/* {props.user?._id &&  */}<Route path="/" exact element={<Home/>} />
  //    {/* {!props.user?._id && <Route path="/" exact element={<LogIn />} />} */}
  //  </Routes>
  //  {/* <Footer /> */}
  //</Router>
  );
}

export default App;
