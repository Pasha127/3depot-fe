import React from "react";
import { Container } from "react-bootstrap";
import "./styles.css"

const TransparentFooter = (props) => {
  return (<>
     <div className="transparent-footer">
      <Container className="d-flex justify-content-between" >
        <div>{`${new Date().getFullYear()} - © Paul Levitsky`}</div>
        </Container>
    </div>
  </>);
};

export default TransparentFooter;
