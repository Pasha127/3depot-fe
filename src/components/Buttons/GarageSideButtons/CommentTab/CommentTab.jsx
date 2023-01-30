import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import {ChatRightText, X} from 'react-bootstrap-icons';
import { useState } from "react";
import SingleComment from "./SingleComment/SingleComment";
import useDragEffect from "../../../../lib/hooks/useDragEffect";
import { getAssetByIdWithThunk, sendCommentWithThunk } from "../../../../lib/redux/actions";
import { useEffect } from "react";
const mapStateToProps = state => {
  return {
  user: state.userInfo,
  showGarage: state.isGarage,
  activeAsset: state.activeAsset,
  comments: state
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    sendComment: (comment,id)=> {
      dispatch(sendCommentWithThunk(comment,id));
    },     
    getAsset: (id)=> {
      dispatch(getAssetByIdWithThunk(id));
    }     
  };  
}; 
const CommentTab = (props) => {
  const [commentValue, setCommentValue] = useState("")
  const [sentComment, setSentComment] = useState("")
  const [commentEntries, setCommentEntries] = useState([])
  const commentSectionRef = useRef(null);

  useEffect(()=>{
    let commentArray = []
     if(props.activeAsset.comments)props.activeAsset.comments.map((comment, i)=>{      
        commentArray.push(<SingleComment key={`SingleComment${i}`} sender={comment.sender} content={comment.content}/>)
      });
      setCommentEntries(commentArray);
  },[props.activeAsset.comments])

/*   useEffect(()=>{
    props.activeAsset._id && props.getAsset(props.activeAsset._id)
  },[props.activeAsset._id, sentComment]) */


  useDragEffect("comment-tray"); 
  const [trayState,setTrayState] = useState("comment-tray-closed")
  const handleToggle= ()=>{
    if(trayState === "comment-tray-closed"){  
      setTrayState("comment-tray")
    }else{
      setTrayState("comment-tray-closed")
    }
  }
  
  const handleAddedComment = (newComment) =>{
    let commentArray = []
    if(props.activeAsset.comments)props.activeAsset.comments.map((comment, i)=>{      
      commentArray.push(<SingleComment key={`SingleComment${i}`} sender={comment.sender} content={comment.content}/>)
    });
    commentArray.push(<SingleComment key={new Date()} sender={props.user} content={newComment}/>)
    setCommentEntries(commentArray);
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

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
            {props.activeAsset._id ? commentEntries : <div>Load up a model from the search or from your device and you can join the community conversation here!</div>}
            <div ref={commentSectionRef}>{commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}</div>
          </div>
            {props.user?._id && <Form 
            onSubmit={(e)=>{
              e.preventDefault();
              props.sendComment({text:commentValue, media: ""}, props.activeAsset._id);
              handleAddedComment({text:commentValue, media: ""});
            }}>
            <Form.Group >
          <Form.Control className="comment-form" value={commentValue} placeholder="Comment" onChange={(e)=>{
            setCommentValue(e.target.value);
          }}>

          </Form.Control>
        </Form.Group>
        </Form>}
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
