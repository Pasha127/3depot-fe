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
import SocketManager from "./components/SocketManager/SocketManager";
import Loader2D from "./components/loader/Loader2D";
const mapStateToProps = state => {
  return {
  user: state.userInfo,
  isLoading: state.isLoading
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
/*   useEffect(()=>{
    console.log("App.js getMe")
    props.getMe()
  },[]) */
  return (<>
    <Router>
    <SocketManager/>
      <Routes>
        <Route element={<PrivateRoutes />}>
                <Route element={<ChatHome/>} path="/Chat"/>
        </Route>
        <Route path='/' exact element={<Search3D/>}/>
        <Route path="/LogIn" exact element={<LogIn />} /> 
        <Route path="/Garage" exact element={<GarageContainer/>} />
      </Routes>
    </Router>
    {props.isLoading && <Loader2D/>}
     </>);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
