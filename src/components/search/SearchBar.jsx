import React, { useCallback, useState } from "react";
import { Button, Container, Form, Row,Image } from "react-bootstrap";
import "./styles.css"


const SearchBar = (props) =>{

    return(
        <Form className="w-100 search-form-container">
        <Form.Group className="mb-3" controlId="SearchForm">
          <Form.Control className="border-custom"  placeholder="What are you looking for?" />
        </Form.Group>
      </Form>
   )
}

export default SearchBar;