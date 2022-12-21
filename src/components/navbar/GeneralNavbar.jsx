import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/3DepotLogoSmall.png";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../redux/actions";
const mapStateToProps = state => {
  return {
  user: state.userInfo
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    logOut: ()=> {
      dispatch(logOutWithThunk());
    },        
  };  
}; 
const NavBar = (props) => {
  return (
    <Navbar expand="lg" className="search-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <div className="d-flex flex-row">
        <Button
          onClick={()=>{
           
          }}
          variant="outline-dark"
          className="blog-navbar-add-button"
          size="lg"
        >
          Statistics
        </Button>
        <Button
          onClick={()=>{
           
          }}
          variant="outline-dark"
          className="blog-navbar-add-button"
          size="lg"
        >
          Upload
        </Button>
        <Button
          onClick={()=>{
           
          }}
          variant="outline-dark"
          className="blog-navbar-add-button"
          size="lg"
        >
          Download
        </Button>
        <Button
          onClick={()=>{
           
          }}
          variant="outline-dark"
          className="blog-navbar-add-button"
          size="lg"
        >
          For Sale
        </Button>
        <Button
          onClick={()=>{
           
          }}
          variant="outline-dark"
          className="blog-navbar-add-button"
          size="lg"
        >
          Purchased
        </Button>
        <Button
          onClick={()=>{
            props.logOut()
          }}
          variant="outline-dark"
          className="blog-navbar-add-button"
          size="lg"
        >
          Log Out
        </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
