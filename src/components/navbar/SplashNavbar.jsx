import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../../assets/3DepotLogoSmall.png"
import "./styles.css";
const SplashNavBar = (props) => {
  return (
    <Navbar expand="lg" className="blog-navbar-splash" fixed="top">
      <Container className="justify-content-center">
        <Navbar.Brand className="p-0">
          <div className="logoContainer">
            <div className="logo"></div>
          </div>
        </Navbar.Brand>       
      </Container>
    </Navbar>
  );
};

export default SplashNavBar;
