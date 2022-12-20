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
import GarageContainer from './components/GarageContainer/GarageContainer';
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




function App(props) {
  useEffect(()=>{
    console.log(props.user)
  },[props.user])
  return (<>
    <Router>
      <Routes>
        <Route path='/' exact element={<Search/>}/>
        <Route path="/LogIn" exact element={<LogIn />} /> 
        <Route path="/Garage" exact element={<GarageContainer/>} /> 
      </Routes>
    </Router>      
     </>);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
