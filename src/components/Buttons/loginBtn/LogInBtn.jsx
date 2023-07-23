import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LogInBtn = (props) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/LogIn");
  return (
    <>
      <Button variant="outline-secondary end-button" onClick={handleNavigate}>
        Log In
      </Button>
    </>
  );
};
export default LogInBtn;
