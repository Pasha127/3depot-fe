import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/3DepotLogoSmall.png";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk, setFilters } from "../../lib/redux/actions";
import UserDropdown from "../Buttons/UserDropdown/UserDropdown";
import FiltersBar from "./FiltersBar";
const mapStateToProps = (state) => {
  return {
    user: state.userInfo,
    showFilters: state.showFilters,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOutWithThunk());
    },
    setFilters: (filterState) => {
      dispatch(setFilters(filterState));
    },
  };
};
const GeneralNavBar = (props) => {
  const navigate = useNavigate();
  const goToChat = () => navigate("/Chat");
  const goToGarage = () => navigate("/Garage");
  const goToRequests = () => navigate("/Requests");

  return (
    <>
      <Navbar expand="lg" className="search-navbar" fixed="top">
        <div className="nav-container">
          <div className="nav-left">
            <Navbar.Brand as={Link} to="/">
              <img className="blog-navbar-brand" alt="logo" src={logo} />
            </Navbar.Brand>
          </div>
          <div className="page-nav">
            <Button
              className="filters-btn holo-nav-btn"
              variant="primary"
              onClick={() => props.setFilters(!props.showFilters)}
            ></Button>
            {props.user?._id && (
              <div className="user-only-nav">
                <Button
                  className="garage-btn holo-nav-btn"
                  variant="primary"
                  onClick={goToGarage}
                >
                  Garage
                </Button>
                <Button
                  className="chat-btn holo-nav-btn"
                  variant="primary"
                  onClick={goToChat}
                >
                  Chat
                </Button>
                {/* <Button className="request-btn holo-nav-btn" variant="primary" 
          onClick={goToRequests}
          >Requests</Button> */}
              </div>
            )}
          </div>
          <div className="hamburger-zone">
            <UserDropdown />
          </div>
        </div>
      </Navbar>
      <FiltersBar />
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GeneralNavBar);
