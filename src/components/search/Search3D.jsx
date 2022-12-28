import React from "react";
import "./styles.css"
import { connect } from "react-redux";
import { getMeWithThunk } from "../../redux/actions";
import CookieModal from "../CookieModal/CookieModal";
import SearchCardContainer from "../SearchCardContainer/SearchCardContainer";
import { useEffect } from "react";
import GeneralNavbar from "../navbar/GeneralNavbar";
import SearchCanvas from "../SearchCanvas/SearchCanvas";

const mapStateToProps = state => {
  return {
  user: state.userInfo
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    getMe: ()=> {
      dispatch(getMeWithThunk());
    }     
  };  
}; 

const Search = (props)=>{
  useEffect(()=>{
  props.getMe();
  },[])

return(<>
<div className="search-container">
  <GeneralNavbar/>
  <SearchCanvas/>
</div>
<CookieModal/>
</>)
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);