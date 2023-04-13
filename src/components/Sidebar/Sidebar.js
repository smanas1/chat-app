import { React, useState } from "react";
import Icons from "../Icons";
import "./sidebar.css";
import { TbLogout } from "react-icons/tb";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Loginuser } from "../../Redux/Slice/LoginSlice";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import "cropperjs/dist/cropper.css";
import "../Popup/popup.css";
import { BsCloudUpload } from "react-icons/bs";
import { CirclesWithBar } from "react-loader-spinner";
import { useRef } from "react";
import ImgCropper from "../Popup/ImgCropper";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

const Sidebar = () => {
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [img, setImg] = useState();
  const dispatch = useDispatch();
  const auth = getAuth();
  const storage = getStorage();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("users");
        dispatch(Loginuser(null));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleClose = () => setOpen(false);
  const chooseFile = useRef(null);
  const user = useSelector((users) => users.login.loggedin);
  const storageRef = ref(storage, user.uid);

  const handleUpload = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImg(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };
  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      // Data URL string
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              setOpen(false);
              dispatch(Loginuser({ ...user, photoURL: downloadURL }));
              localStorage.setItem(
                "users",
                JSON.stringify({ ...user, photoURL: downloadURL })
              );
            })
            .catch((err) => {
              err.message;
            });
        });
      });
    }
  };

  return (
    <>
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
                      <input
                        type="file"
                        hidden
                        ref={chooseFile}
                        onChange={handleUpload}
                      />
                    </div>
                    <div
                      className="spinner"
                      onClick={() => chooseFile.current.click()}
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
                    {img && (
                      <div className="img-cropper">
                        <ImgCropper
                          img={img}
                          setImg={setImg}
                          cropData={cropData}
                          setCropper={setCropper}
                          getCropData={getCropData}
                        />
                      </div>
                    )}
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
      {/* /////////////////////////////////////////////// */}
      <div className="sidebar">
        <div className="all-wrapper">
          <div className="sidebar-wrapper">
            <div
              className="logo"
              style={{
                backgroundImage: 'url("./img/avatar-login.webp")',
                width: "90px",
                height: "90px",
                backgroundSize: "cover",
              }}
              onClick={handleOpen}
            >
              <picture>
                {/* <img
                  className="sidebar-logo-img"
                  src="./img/avatar-login.webp"
                  alt=""
                /> */}
                <img src={user.photoURL} alt="" />
                {/* {user.photoURL ? (
                  <img src={user.photoURL} alt="" />
                ) : (
                  <img src="./img/avatar-login.webp" alt="" />
                )} */}
              </picture>
              <div className="overlay">
                <AiOutlineCloudUpload />
              </div>
            </div>
            <div>
              <h4>{user.displayName}</h4>
            </div>
          </div>
          <div className="icons">
            <Icons />
          </div>
          <div className="log-out">
            <TbLogout onClick={handleLogOut} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
