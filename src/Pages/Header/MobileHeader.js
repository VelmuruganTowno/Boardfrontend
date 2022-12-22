import React from "react";
import "./MobileHeader.scss";
import Board from "../../assets/logo/Board-logo.png";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { Profile } from "./MoreT";
import Avatar from "@material-ui/core/Avatar";

const MobileHeader = () => {
  const name = localStorage.getItem("auth");
  return (
    <div className="navbars">
      <div className="logo">
        <img src={Board} alt="logo" />
      </div>

      <div className="rightMenu">
        <Tippy
          className="admin"
          theme="light"
          content={<Profile />}
          interactive={true}
        >
          <div className="more">
            <div className="item">
              <Avatar style={{ textTransform: "capitalize" }}>
                {" "}
                {name.slice(0, 1)}
              </Avatar>
            </div>
          </div>
        </Tippy>
      </div>
    </div>
  );
};

export default MobileHeader;
