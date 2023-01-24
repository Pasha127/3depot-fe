import React from "react";
import { Controller, EnvelopeFill, FileEarmarkPersonFill, Github, Linkedin } from "react-bootstrap-icons";
import "./styles.css"

const FieldPageFooter = (props) => {
  return (<>
     <div className="field-footer">
     <a href="https://drive.google.com/file/d/1ly4P8wFBSYvCIKboo-cqG25c9uPrcZ50/view?usp=share_link"  target="_blank"><div>{`${new Date().getFullYear()} - © Paul Levitsky`}</div></a>
        <div className="contact-icons">
        <a href="https://github.com/Pasha127"  target="_blank"><Github/></a> 
        <a href="https://drive.google.com/file/d/1ly4P8wFBSYvCIKboo-cqG25c9uPrcZ50/view?usp=share_link"  target="_blank"><FileEarmarkPersonFill/></a> 
        <a href="https://www.linkedin.com/in/paul-levitsky-55a202208/"  target="_blank"><Linkedin/></a> 
        <a href="mailto:pasha.account@gmail.com"  target="_blank"><EnvelopeFill/></a> 
        <a href="https://pashspice.itch.io"  target="_blank"><Controller/></a> 
        </div>
    </div>
  </>);
};

export default FieldPageFooter;
