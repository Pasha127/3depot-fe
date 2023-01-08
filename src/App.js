import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LogIn from './components/log-in/logIn';
import { getMeWithThunk } from "../src/lib/redux/actions";
import GarageContainer from './components/GarageContainer/GarageContainer';
import Search3D from "./components/search/Search3D";
import ChatHome from "./components/chat/ChatHome";
import PrivateRoutes from "./lib/tools/PrivateRoutes";
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
    props.getMe()
  },[])
  return (<>
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />}>
                <Route element={<ChatHome/>} path="/Chat"/>
        </Route>
        <Route path='/' exact element={<Search3D/>}/>
        <Route path="/LogIn" exact element={<LogIn />} /> 
        <Route path="/Garage" exact element={<GarageContainer/>} />
      </Routes>
    </Router>
     </>);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
