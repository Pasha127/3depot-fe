import { connect } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'


const mapStateToProps = state => {
    return {
    user: state.userInfo
    };
  };
  
   const mapDispatchToProps = dispatch => {
    return {
        
    };  
}; 
const PrivateRoutes = (props) => {
    return(
        props.user._id ? <Outlet/> : <Navigate to="/LogIn"/>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoutes);