import React, { useEffect, useState } from "react";
import "../Style/home-page.css";
import "./mygroup.css";
import Button from "@mui/material/Button";
import { MdGroups } from "react-icons/md";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
const Mygroup = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupname, setGroupname] = useState("");
  const [grouptagline, setGrouptagline] = useState("");
  const [mygroups, setMygroups] = useState([]);
  const [groupreq, setGroupreq] = useState([]);
  const [reqcount, setReqcount] = useState([]);

  const [infoopen, setInfoOpen] = React.useState(false);
  const handleInfoOpen = () => setInfoOpen(true);
  const handleInfoClose = () => setInfoOpen(false);

  const [reqopen, setReqOpen] = React.useState(false);
  const handlereqOpen = () => setReqOpen(true);
  const handlereqClose = () => setReqOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  const styles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 3,
  };
  const db = getDatabase();
  const user = useSelector((users) => users.login.loggedin);

  const handleCreate = () => {
    set(push(ref(db, "Groups/")), {
      groupname: groupname,
      grouptagline: grouptagline,
      adminName: user.displayName,
      adminid: user.uid,
    });
    setOpen(false);
  };

  useEffect(() => {
    const starCountRef = ref(db, "Groups/");
    onValue(starCountRef, (snapshot) => {
      let mygroupsarr = [];
      snapshot.forEach((item) => {
        if (item.val().adminid == user.uid) {
          mygroupsarr.push({ ...item.val(), id: item.key });
        }
      });
      setMygroups(mygroupsarr);
    });
  }, []);

  const handlereq = (ritem) => {
    setReqOpen(true);
    const starCountRef = ref(db, "GroupJoinReq/");
    onValue(starCountRef, (snapshot) => {
      let mygroupsreqarr = [];

      snapshot.forEach((item) => {
        if (item.val().adminid == user.uid && item.val().groupid == ritem.id) {
          mygroupsreqarr.push({ ...item.val(), ids: item.key });
        }
      });

      setGroupreq(mygroupsreqarr);
    });
  };
  const handlereqaccept = (item) => {
    set(push(ref(db, "GroupsMembers/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "GroupJoinReq/" + item.ids));
    });
  };

  const handlereqreject = (item) => {
    remove(ref(db, "GroupJoinReq/" + item.ids));
  };
  return (
    <>
      <div className="grouplist home-item">
        <div className="home-header">
          <div className="my-group-header">
            <h4>My Groups</h4>
            <Button size="small" onClick={handleOpen} color="secondary">
              Create Group
            </Button>
          </div>
        </div>
        <div className="scroll my-group-scrool">
          {mygroups.map((item, i) => {
            return (
              <div className="home-items-wrapper" key={i}>
                <div className="home-items-img friend-img friend-req-color"></div>
                <div className="home-items-title friend-req-title friend-title">
                  <h4>{item.groupname}</h4>
                  <p>{item.grouptagline}</p>
                </div>
                <div className="home-items-btn friend-req-btn friend-btn">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handlereq(item)}
                  >
                    request
                  </Button>

                  <Button
                    className="friend-req-btn-2 friend-btn-2 group-info"
                    variant="contained"
                    size="small"
                    onClick={() => handleInfoOpen()}
                  >
                    Info
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        open={reqopen}
        onClose={handlereqClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="group-req-scroll">
            {groupreq.map((item, i) => (
              <div className="home-items-wrapper" key={i}>
                <div>
                  <picture>
                    <img
                      className="home-items-img friend-req-color my-group-popup-img"
                      src={item.photo || "./img/avatar-login.webp"}
                      alt=""
                    />
                  </picture>
                </div>
                <div className="home-items-title friend-req-title friend-title my-group-popup-title">
                  <h4>{item.username}</h4>
                </div>
                <div className="home-items-btn friend-req-btn friend-btn">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handlereqaccept(item)}
                  >
                    accept
                  </Button>
                  <Button
                    onClick={() => handlereqreject(item)}
                    className="friend-req-btn-2 "
                    variant="contained"
                    size="small"
                  >
                    reject
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>
      <Modal
        open={infoopen}
        onClose={handleInfoClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="group-modal">
          <h3 className="group-modal">Create Your Group</h3>
          <TextField
            fullWidth
            label="Group Name"
            id="fullWidth"
            margin="normal"
            onChange={(e) => {
              setGroupname(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Group Tagline"
            id="fullWidth"
            margin="normal"
            onChange={(e) => {
              setGrouptagline(e.target.value);
            }}
          />
          <div className="group-modal-btn-wrapper">
            <Button
              variant="contained"
              className="group-modal-btn"
              onClick={handleCreate}
            >
              Create Group
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Mygroup;
