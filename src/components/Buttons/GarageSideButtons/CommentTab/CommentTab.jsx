import React from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import {Boxes, ChatRightText, X} from 'react-bootstrap-icons';
import { useState } from "react";
import SingleComment from "./SingleComment/SingleComment";
import useDragEffect from "../../../../lib/hooks/useDragEffect";
import { sendCommentWithThunk } from "../../../../lib/redux/actions";
import { useEffect } from "react";
const mapStateToProps = state => {
  return {
  user: state.userInfo,
  showGarage: state.isGarage,
  activeAsset: state.activeAsset
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    sendComment: (comment,id)=> {
      dispatch(sendCommentWithThunk(comment,id));
    }     
  };  
}; 
const CommentTab = (props) => {
  const [commentValue, setCommentValue] = useState("")
  const [sentComment, setSentComment] = useState("")
  const [commentEntries, setCommentEntries] = useState([])

/* useEffect(()=>{
  appendNewComment(commentValue)
},[sentComment])
 */
  useEffect(()=>{
    let commentArray = []
    props.activeAsset.comments?.map((comment, i)=>{      
        commentArray.push(<SingleComment key={`SingleComment${i}`} sender={comment.sender} content={comment.content}/>)
      setCommentEntries(commentArray);
})
  },[props.activeAsset.comments])


  useDragEffect("comment-tray"); 
  const [trayState,setTrayState] = useState("comment-tray-closed")
  const handleToggle= ()=>{
    if(trayState === "comment-tray-closed"){  
      setTrayState("comment-tray")
    }else{
      setTrayState("comment-tray-closed")
    }
  }


/*   const appendNewComment = (newComment) =>{
      setCommentEntries(commentEntries => [...commentEntries, 
        {sender: props.user._id,
        content: {
          text: newComment,
          media: ""
  }}])
  } */


  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          handleToggle();
          console.log("click");}} className="comment-tab" variant="outline-secondary">
            <div className="comment-icon-container">
              <ChatRightText/>
              <div className="comment-label">Comments</div>
              </div>
              </Button>
        <div className="drag-container">
        <div id="comment-tray" className={trayState}>
        <div className="comment-tray-details"
          onClick={(e)=>{e.stopPropagation()}}
          >
            {props.activeAsset && commentEntries}
            <Form onSubmit={(e)=>{
              e.preventDefault();
              /* setSentComment(commentValue); */
              props.sendComment({text:commentValue, media: ""}, props.activeAsset._id);
            }}>
            <Form.Group >
          <Form.Control className="comment-form" value={commentValue} placeholder="Comment" onChange={(e)=>{
            setCommentValue(e.target.value);
          }}>

          </Form.Control>
        </Form.Group>
        </Form>
          </div>
          <X className="comment-tray-close-icon" 
          onClick={(e)=>{
            e.stopPropagation();
            handleToggle();
            console.log("click");}}
          />
        
        </div>
        </div>

        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentTab);
