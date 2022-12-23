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
import FiltersBar from "./FiltersBar";
const mapStateToProps = state => {
  return {
  user: state.userInfo,
  showFilters: state.showFilters
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    logOut: ()=> {
      dispatch(logOutWithThunk());
    }     
  };  
}; 
const GeneralNavBar = (props) => {
  return (<>
    <Navbar expand="lg" className="search-navbar" fixed="top">
      <Container className="nav-container">
        <div className="nav-left">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <SearchBar/>
        </div>
        <div className="hamburger-zone">
          <UserDropdown/>
        </div>
      </Container>
    </Navbar>
    {props.showFilters && <FiltersBar/>}
  </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralNavBar);
