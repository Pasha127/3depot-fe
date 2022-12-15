import logo from './logo.svg';
import React, { useEffect, useState, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Loader3D from './components/loader/Loader3D';
import Loader2D from './components/loader/Loader2D';
import LogIn from './components/log-in/logIn';
import { Suspense } from 'react';
import { getMeWithThunk } from "../src/redux/actions";
import Search from './components/search/Search';
import NavBar from './components/navbar/GeneralNavbar'
const mapStateToProps = state => {
  return {
  user: state.userInfo
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    getMe: ()=> {
      dispatch(getMeWithThunk());
    }     
  };  
}; 



/* import NavBar from "./components/navbar/GeneralNavbar"
import Home from "./components/" */

function App(props) {
  useEffect(()=>{
    console.log(props.user)
  },[props.user])
  return (<>
      <Router>
      {props.user?._id && <NavBar/>} 
      <Routes>
      <Route path='/' exact element={<Search/>}/>
       {/* {props.user?._id && <Route path="/" exact element={<Search/>} />}
       {!props.user?._id &&<Route path="/" exact element={<LogIn />} /> } */}

      </Routes>
      {/* <Footer /> */}
    </Router>
    {/* <Loader3D></Loader3D>
      <Loader2D></Loader2D>  */}
      
     </>);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
