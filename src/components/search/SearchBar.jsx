import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { setFilters } from "../../redux/actions";
import "./styles.css"
const mapStateToProps = state => {
  return {
  filterState: state.showFilters
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setFilters: (filterState)=> {
      dispatch(setFilters(filterState));
    }     
  };  
}; 

const SearchBar = (props) =>{

    return(
        <Form className="search-form-container">
        <Form.Group className="mb-3" controlId="SearchForm">
          <InputGroup className="search-custom">
          <Form.Control   placeholder="What are you looking for?" />
          <Button className="search-btn" variant="outline-secondary">Search</Button>
          <Button className="filters-btn" variant="outline-secondary" 
          onClick={()=>props.setFilters(!props.filterState)}
          >Filters</Button>
          </InputGroup>
        </Form.Group>
      </Form>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);