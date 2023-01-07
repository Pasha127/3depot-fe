import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../lib/redux/actions";
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
const FiltersBar = (props) => {
  return (<>
    {props.showFilters? <Navbar expand="lg" className="filter-navbar-show" fixed="top">
      <Container className="nav-container">       
      </Container>
    </Navbar>
    :<Navbar expand="lg" className="filter-navbar" fixed="top">
    <Container className="nav-container">       
    </Container>
  </Navbar>}
  </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);
