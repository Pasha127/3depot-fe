import React from "react";
import { Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../lib/redux/actions";
import SearchBar from "../search/SearchBar";
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
  };
};
const FiltersBar = (props) => {
  return (
    <>
      {props.showFilters ? (
        <Navbar expand="lg" className="filter-navbar-show" fixed="top">
          <div className="filter-nav-container">
            <SearchBar />
          </div>
        </Navbar>
      ) : (
        <Navbar expand="lg" className="filter-navbar" fixed="top"></Navbar>
      )}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FiltersBar);
