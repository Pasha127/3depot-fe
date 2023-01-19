import React from "react";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSearchResultsWithThunk, setFilters } from "../../lib/redux/actions";
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
    },
    search: (query) =>{
      dispatch(getSearchResultsWithThunk(query)) 
    }   
  };  
}; 

const SearchBar = (props) =>{
  const [formQuery, setFormQuery] = useState("");
  const navigate = useNavigate();
  const goToSearch = () => navigate("/")

    return(
        <Form className="search-form-container" onSubmit={(e)=>{
          e.preventDefault();
          formQuery && props.search(formQuery);
          goToSearch()
        }
        }>
        <Form.Group className="search-bar-group" controlId="SearchForm" >
          <InputGroup className="search-custom">
          <Form.Control className="search-field-placeholder" value={formQuery} placeholder="🔍" onChange={(e)=>{setFormQuery(e.target.value)}} />
          <Button className="search-btn" variant="primary"
          onClick={(e)=>{
            e.preventDefault();
            formQuery && props.search(formQuery)
            goToSearch()
          }
          }
          >Search</Button>
          </InputGroup>
        </Form.Group>
      </Form>
   )
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);