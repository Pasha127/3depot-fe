import { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { getMeWithThunk } from "../redux/actions";

const mapStateToProps = (state) => {
  return {
    user: state.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMe: () => {
      dispatch(getMeWithThunk());
    },
  };
};
const PrivateRoutes = (props) => {
  useEffect(() => {
    props.getMe();
  }, []);
  return (props.user && props.user._id) || localStorage.getItem("loggedIn") ? (
    <Outlet />
  ) : (
    <Navigate to="/LogIn" />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);
