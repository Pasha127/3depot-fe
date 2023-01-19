import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { setFilters } from "../../lib/redux/actions";
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
        <Form.Group className="search-bar-group" controlId="SearchForm">
          <InputGroup className="search-custom">
          <Form.Control className="search-field-placeholder"  placeholder="🔍" />
          <Button className="search-btn" variant="primary">Search</Button>
          </InputGroup>
        </Form.Group>
      </Form>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);