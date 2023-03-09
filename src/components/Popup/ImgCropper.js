import React from "react";
import "./popup.css";
import "./imgCropper.css";
import { AiOutlineClose } from "react-icons/ai";
import Button from "@mui/material/Button";
import Cropper from "react-cropper";
import "react-image-crop/dist/ReactCrop.css";
const ImgCropper = ({ img, setImg, cropData, setCropper, getCropData }) => {
  return (
    <>
      <div className="cropper">
        <div className="cropper-wrapper">
          <div className="cropper-top">
            <h3>Upload Profile Picture</h3>
            <div
              className="close-icon"
              onClick={() => {
                setImg();
              }}
            >
              <AiOutlineClose />
            </div>
          </div>
          <div className="crop-preview">
            <div className="preview">
              <div className="img-preview"></div>
            </div>
          </div>
          <div className="crop">
            <Cropper
              className="crops"
              style={{ height: 300, width: "100%" }}
              zoomTo={0}
              initialAspectRatio={1}
              preview=".img-preview"
              src={img}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
          </div>
          <div className="button">
            <Button variant="contained" onClick={getCropData}>
              Upload
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImgCropper;
