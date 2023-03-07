import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import "./popup.css";
import { BsCloudUpload } from "react-icons/bs";
import { CirclesWithBar } from "react-loader-spinner";
import { useRef } from "react";
export default function Popup({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const chooseFile = useRef(null);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box>
            <div className="popup">
              <div className="popup-wrapper">
                <div className="upload">
                  <div className="img-wrapper">
                    <div className="upload-img">
                      <BsCloudUpload />
                    </div>
                    <input type="file" hidden ref={chooseFile} />
                  </div>
                  <div
                    className="spinner"
                    onClick={(e) => chooseFile.current.click(console.log(e))}
                  >
                    <CirclesWithBar
                      height="100"
                      width="100"
                      color="#5f35f5"
                      wrapperClass=""
                      visible={true}
                      outerCircleColor=""
                      innerCircleColor=""
                      barColor="#f0f0f000"
                      ariaLabel="circles-with-bar-loading"
                    />
                  </div>
                  <div className="upload-title">
                    <h3>Upload Photo</h3>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
