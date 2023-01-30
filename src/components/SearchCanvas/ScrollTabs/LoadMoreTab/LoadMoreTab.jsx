import React from "react";
import { Button} from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { PlusCircleFill} from 'react-bootstrap-icons';
import { useState } from "react";
import { getSearchResultsWithThunk, setSearchSettings } from "../../../../lib/redux/actions";
import { useEffect } from "react";
const mapStateToProps = state => {
  return {
    searchSettings: state.searchSettings,
    query: state.query
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setSearchSettings: (settings)=> {
      dispatch(setSearchSettings(settings));
    },
    search: (query,options) =>{
      dispatch(getSearchResultsWithThunk(query,options))
    }    
  };  
};
const LoadMoreTab = (props) => {
  const [visibility,setVisibility] = useState("right-tab")
  useEffect(()=>{
    if((props.searchSettings.cameraPos > ((props.listLength*2)-2.05) && props.searchSettings.cameraPos > 13))
    {
      setVisibility("right-tab")
    }else 
    {
       setVisibility("d-none")
    }
  },[props.searchSettings.cameraPos, props.listLength])
 
  
  return (<>      
        <Button onClick={(e)=>{
          e.stopPropagation();
          const currentCamPos = props.searchSettings.cameraPos;
          const currentPage = props.searchSettings.page;
          props.setSearchSettings({cameraPos: .5, page: currentPage + 1})
          props.search(props.query, `limit=5&skip=${(currentPage+1)*5}`)
          }} 
          className={visibility} variant="outline-secondary">
            <div className="right-icon-container">
              <PlusCircleFill/>
              </div>
              <div className="right-tab-label">Load More</div>
              </Button>
        
        </>);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreTab);
