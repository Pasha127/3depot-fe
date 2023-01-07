import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGarage } from "../../lib/redux/actions";
import "./styles.css"

const mapStateToProps = state => {
  return {
  user: state.userInfo,
  isGarage: state.isGarage
  };
};
 const mapDispatchToProps = dispatch => {
  return {
    setGarage: (data)=> {
      dispatch(setGarage(data));
    }     
  };  
}; 



const SearchCard = (props)=>{
  const assetSourceName= "Sci-fi_Rifle_2_uykpuo"
  const assetURL=`https://res.cloudinary.com/dirwjcohx/image/upload/e_camera:up_20;right_-35;zoom_1;env_pillars;exposure_1.4/b_transparent/v1670880755/3DepotProducts/${assetSourceName}.png`
  let assetName= assetURL.split("/").pop().split(".").shift().split("_")
  assetName.pop()
  assetName= assetName.join(" ")


    const [infoClass, setInfoClass] = useState("d-none")
    const [buttonClass, setButtonClass] = useState("d-none")
    const navigate = useNavigate();
    const goToGarage = () => navigate('/Garage');

  const handleButton = () =>{
    props.setGarage(false);
    goToGarage()
  }

return(<>
  <Card className="search-card" style={{ width: '18rem' }} onMouseOver={()=>{
        setInfoClass("info-show");
        setButtonClass("button-show");
      }}
      onMouseLeave={()=>{
        setInfoClass("d-none");
        setButtonClass("d-none");
      }}>
      <Card.Img variant="top" src={assetURL} />
      <Card.Body className={`${infoClass}`} >
        <Card.Title>{`${assetName}`}</Card.Title>
        <Card.Text>
          Description of Asset
        </Card.Text>
        <Button className={`${buttonClass}`} variant="dark"
        onClick={()=>{handleButton()}}
        ><h4 className="mt-n1">View in 3D</h4></Button>
      </Card.Body>
    </Card>
</>)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchCard);