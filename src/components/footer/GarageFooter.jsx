import React from "react";
import { Container } from "react-bootstrap";
import { Controller, Envelope, EnvelopeFill, FileEarmarkPersonFill, Github, Linkedin } from "react-bootstrap-icons";
import "./styles.css"

const GarageFooter = (props) => {
  return (<>
     <div className="garage-footer">
        <a rel="noreferrer" className="name-link" href="https://drive.google.com/file/d/1ly4P8wFBSYvCIKboo-cqG25c9uPrcZ50/view?usp=share_link"  target="_blank"><div>{`${new Date().getFullYear()} - © Paul Levitsky`}</div></a>
        <div className="contact-icons">
        <a rel="noreferrer" href="https://github.com/Pasha127"  target="_blank"><Github/></a> 
        <a rel="noreferrer" href="https://drive.google.com/file/d/1ly4P8wFBSYvCIKboo-cqG25c9uPrcZ50/view?usp=share_link"  target="_blank"><FileEarmarkPersonFill/></a> 
        <a rel="noreferrer" href="https://www.linkedin.com/in/paul-levitsky-55a202208/"  target="_blank"><Linkedin/></a> 
        <a rel="noreferrer" href="mailto:pasha.account@gmail.com"  target="_blank"><EnvelopeFill/></a> 
        <a rel="noreferrer" href="https://pashspice.itch.io"  target="_blank"><Controller/></a> 
        </div>
    </div>
  </>);
};

export default GarageFooter;
