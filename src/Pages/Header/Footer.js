import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import StoreIcon from "@material-ui/icons/Store";
import "./Footer.scss";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { Booking, Property, Lead } from "./MoreT";
import GroupIcon from '@material-ui/icons/Group';

const Footer = () => {

  let hasAdmin = localStorage.getItem("role");
  let hasDesignation = localStorage.getItem("designation");

  return (
    <div className="footer">
      <div className="subHeader">
        <div className="rightMenu">
          <Link to="/dashboard" className="more">
            <div className="item">
              <HomeIcon />
              <span className="caption">Home</span>
            </div>
          </Link>
        </div>
        <div className="rightMenu">
          <Tippy
            className="admin"
            theme="light"
            content={<Booking />}
            interactive={true}
          >
            <Link to="#" className="more">
              <div className="item">
                <LocalOfferIcon />
                <span className="caption">Booking</span>
              </div>
            </Link>
          </Tippy>
        </div>

        {hasAdmin === "Admin" || hasAdmin === "Super Admin" || hasAdmin === "Sales" || hasDesignation === "Lead Manager" ?
          (
            <div className="rightMenu">
              <Link to="/lead" className="more">
                <div className="item">
                  <GroupIcon />
                  <span className="caption">Leads</span>
                </div>
              </Link>
            </div>
          ) :
          (
            null
          )
        }

        {hasAdmin === "Admin" || hasAdmin === "Super Admin" ? (
          <div className="rightMenu">
            <Tippy
              className="admin"
              theme="light"
              content={<Property />}
              interactive={true}
            >
              <Link to="#" className="more">
                <div className="item">
                  <StoreIcon />
                  <span className="caption">Property</span>
                </div>
              </Link>
            </Tippy>
          </div>
        ) : (
          <div className="rightMenu">
            <Tippy
              className="admin"
              theme="light"
              content={<Property />}
              interactive={true}
            >
              <Link to="#" className="more">
                <div className="item">
                  <StoreIcon />
                  <span className="caption">Property</span>
                </div>
              </Link>
            </Tippy>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
