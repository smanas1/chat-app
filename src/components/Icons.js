import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { MdOutlineNotifications } from "react-icons/md";
import { BsGear } from "react-icons/bs";

const Icons = () => {
  return (
    <>
      <div className="side-icons ">
        <div className="home cal">
          <AiOutlineHome />
        </div>
        <div className="message">
          <AiOutlineMessage />
        </div>
        <div className="notification">
          <MdOutlineNotifications />
        </div>
        <div className="setting">
          <BsGear />
        </div>
      </div>
    </>
  );
};

export default Icons;
