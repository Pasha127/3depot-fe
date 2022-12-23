import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/3DepotLogoSmall.png";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../redux/actions";
import LogInBtn from "../Buttons/loginBtn/LogInBtn";
import GarageBtn from "../Buttons/GarageBtn/GarageBtn";
import LogOutBtn from "../Buttons/LogOutBtn/LogOutBtn";
import SearchBar from "../search/SearchBar";
import UserDropdown from "../Buttons/UserDropdown/UserDropdown";
import {Boxes, InfoCircle} from 'react-bootstrap-icons';
const mapStateToProps = state => {
  return {
  user: state.userInfo,
  showGarage: state.isGarage
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    logOut: ()=> {
      dispatch(logOutWithThunk());
    }     
  };  
}; 
const GarageNavBar = (props) => {
  return (
      <div id="hanging-button-container" className="hanging-button-container">
      {props.showGarage && <div className="hanging-buttons">
      <Button className="col-3" variant="outline-secondary"><p><InfoCircle/></p><span>Model Info</span></Button>
      <Button className="col-3" variant="outline-secondary"><p><Boxes/></p><span>My Models</span></Button>

      </div>}
      {!props.showGarage && <div className="hanging-buttons">
      <Button variant="secondary">Shop</Button>
      </div>}
      </div>
 );
};

export default connect(mapStateToProps, mapDispatchToProps)(GarageNavBar);
