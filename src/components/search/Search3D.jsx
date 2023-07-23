import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import {
  getMeWithThunk,
  getSearchResultsWithThunk,
  setSearchSettings,
} from "../../lib/redux/actions";
import CookieModal from "../CookieModal/CookieModal";
import { useEffect } from "react";
import GeneralNavbar from "../navbar/GeneralNavbar";
import SearchCanvas from "../SearchCanvas/SearchCanvas";
import TransparentFooter from "../footer/TransparentFooter";

const mapStateToProps = (state) => {
  return {
    user: state.userInfo,
    query: state.query,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => {
      dispatch(getMeWithThunk());
    },
    search: (query) => {
      dispatch(getSearchResultsWithThunk(query));
    },
    setSearchSettings: (settings) => {
      dispatch(setSearchSettings(settings));
    },
  };
};

const Search = (props) => {
  useEffect(() => {
    props.getMe();
  }, []);

  useEffect(() => {
    !props.query && props.search("fbx");
    !props.query && props.setSearchSettings({ page: 0 });
  }, [props.query]);

  return (
    <>
      <div className="search-container">
        <GeneralNavbar />
        <SearchCanvas searchResults={""} />
      </div>
      <TransparentFooter />
      <CookieModal />
    </>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
