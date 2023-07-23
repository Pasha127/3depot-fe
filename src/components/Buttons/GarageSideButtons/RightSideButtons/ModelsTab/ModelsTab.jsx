import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles.css";
import { logOutWithThunk } from "../../../../../lib/redux/actions";
import { Boxes, X } from "react-bootstrap-icons";
import { useState } from "react";
import useDragEffect from "../../../../../lib/hooks/useDragEffect";
import UploadedItem from "../../../../GarageContainer/UploadedItem/UploadedItem";
const mapStateToProps = (state) => {
  return {
    user: state.userInfo,
    showGarage: state.isGarage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: () => {
      dispatch(logOutWithThunk());
    },
  };
};
const ModelsTab = (props) => {
  useDragEffect("model-tray");
  const [trayState, setTrayState] = useState("model-tray-closed");
  const handleToggle = () => {
    if (trayState === "model-tray-closed") {
      setTrayState("model-tray");
    } else {
      setTrayState("model-tray-closed");
    }
  };
  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
          console.log("click");
        }}
        className="model-tab"
        variant="outline-secondary"
      >
        <div className="model-icon-container">
          <Boxes />
          <div className="model-label">My Models</div>
        </div>
      </Button>
      <div className="drag-container">
        <div id="model-tray" className={trayState}>
          <div
            className="model-tray-details"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {props.user?.uploads ? (
              props.user.uploads.map((asset) => {
                let link = asset?.file.link;
                let fileId = link.split("/").pop();
                const assetImage = ` https://res.cloudinary.com/dirwjcohx/image/upload/e_camera:up_20;right_-35;zoom_1;env_pillars;exposure_1.4/v1670880755/3DepotProducts/${
                  fileId.split(".")[0]
                }.png`;
                return (
                  <UploadedItem
                    key={`Model_Tab_${asset._id}`}
                    _id={asset._id}
                    modelName={asset.name}
                    pic={assetImage}
                  />
                );
              })
            ) : (
              <div>
                Once you register and upload some 3D models, you'll see them
                listed here.
              </div>
            )}
          </div>
          <X
            className="model-tray-close-icon"
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
              console.log("click");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelsTab);
