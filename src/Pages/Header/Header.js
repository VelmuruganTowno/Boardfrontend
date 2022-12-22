import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import PersonIcon from "@material-ui/icons/Person";
import Board from "../../assets/logo/Board-logo.png";
import StoreIcon from "@material-ui/icons/Store";
// import HomeIcon from "@material-ui/icons/HomeIcon";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";
import { Booking, Admin, Agent, Property, Profile, Clients, Vendors, AgentBookings } from "./MoreT";
import AssessmentIcon from "@material-ui/icons/Assessment";
import HomeIcon1 from "../../assets/Icons/HomeIcon1.svg";
import DashboardIcon from "../../assets/Icons/DashboardIcon.svg"
import ProfileIcon from "../../assets/Icons/ProfileIcon.svg"
import ReportIcon from "../../assets/Icons/ReportIcon.svg"
import VendorIcon from "../../assets/Icons/VendorIcon.svg"
import BookingIcon from "../../assets/Icons/BookingIcon.svg"
import ClientIcon from "../../assets/Icons/ClientIcon.svg"
import { Tooltip } from "@mui/material";

const Header = () => {
  let hasAdmin = localStorage.getItem("role");
  let checkAgent = localStorage.getItem("agent");

  return (
    <div className="navbars" style={{ height: '8%' }}>
      <div className="logo">
        <img src={Board} alt="logo" style={{ width: '60%' }} />
      </div>
      <div className="subHeader">
        {hasAdmin === "Agent Admin" || checkAgent === "Agent"? (
          <div className="rightMenu">
            <Link to="/agent" className="more">
              {/* <div className="item">
              <img src={HomeIcon1} width="20px" height="20px"/>
                <span className="caption">Home</span>
              </div> */}
              <Tooltip title="Home" >
                <img src={HomeIcon1} width="20px" height="20px" />
              </Tooltip>
            </Link>
          </div>
        ) : (
          <div className="rightMenu">
            <Link to="/dashboard" className="more">
              <div className="item">
                {/* <HomeIcon /> */}
                <img src={HomeIcon1} width="20px" height="20px" />
                <span className="caption">Home</span>
              </div>
            </Link>
          </div>
        )}

        {hasAdmin === "Agent Admin" || checkAgent === "Agent" ?
          <Link to="/agentDashboard" className="more">
            {/* <div className="item">
              <img src={DashboardIcon} width="20px" height="20px" />
              <span className="caption">Dashboard</span>
            </div> */}
            <Tooltip title="Dashboard" >
              <img src={DashboardIcon} width="20px" height="20px" />
            </Tooltip>
          </Link> : null
        }

        {hasAdmin === "Admin" ||
          hasAdmin === "Super Admin" ||
          hasAdmin === "Agent Admin"
          ? (
            <div className="rightMenu">
              <Tippy
                className="admin"
                theme="light"
                content={<Admin />}
                interactive={true}
                trigger="click"
              >
                <div className="more">
                  <div className="item">
                    {/* <BusinessCenterIcon /> */}
                    <img src={HomeIcon1} width="20px" height="20px" />
                    <span className="caption">Admin</span>
                  </div>
                </div>
              </Tippy>
            </div>
          ) :
          null
        }

        {hasAdmin === "Agent Admin" || checkAgent === "Agent" ? (
          <div className="rightMenu">
            <Tippy
              className="admin"
              theme="light"
              content={<Clients />}
              interactive={true}
              trigger="click"
            >
              <div className="more">
                <div className="item">
                  <img src={ClientIcon} width="20px" height="20px" />
                  <span className="caption">Clients</span>
                </div>
              </div>
            </Tippy>
          </div>
        ) :
          null
        }

        {hasAdmin === "Admin" ||
          hasAdmin === "Super Admin"
          ? (
            <div className="rightMenu">
              <Tippy
                className="admin"
                theme="light"
                content={<Agent />}
                interactive={true}
                trigger="click"
              >
                <div className="more">
                  <div className="item">
                    <LocalLibraryIcon />
                    <span className="caption">Agency</span>
                  </div>
                </div>
              </Tippy>
            </div>
          ) :
          null
        }

        {hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" || checkAgent === "Agent" ?
          <div className="rightMenu">
            <Tippy
              className="admin"
              theme="light"
              content={<AgentBookings />}
              interactive={true}
              trigger="click"
            >
              {/* <Link to="#" className="more"> */}
              <div className="more">
                <div className="item">
                  <img src={BookingIcon} width="20px" height="20px" />
                  <span className="caption">Booking</span>
                </div>
                </div>
              {/* </Link> */}
            </Tippy>
          </div>
          : (
            <div className="rightMenu">
              <Tippy
                className="admin"
                theme="light"
                content={<Booking />}
                interactive={true}
                trigger="click"
              >
                <div className="more">
                  <div className="item">
                    <LocalOfferIcon />
                    <span className="caption">Booking</span>
                  </div>
                </div>
              </Tippy>
            </div>
          )}

        {hasAdmin === "Finance Team" ? (
          <div className="rightMenu">
            <Link to="/bookinglist" className="more">
              <div className="item">
                <AssessmentIcon />
                <span className="caption">Booking</span>
              </div>
            </Link>
          </div>
        ) : null}

        {hasAdmin === "Agent Admin" || checkAgent === "Agent" ? (
          <div className="rightMenu">
            <Tippy
              className="admin"
              theme="light"
              content={<Vendors />}
              interactive={true}
              trigger="click"
            >
              <div className="more">
                <div className="item">
                  <img src={VendorIcon} width="20px" height="20px" />
                  <span className="caption">Vendors</span>
                </div>
              </div>
            </Tippy>
          </div>
        ) :
          null
        }

        {hasAdmin === "Admin" ||
          hasAdmin === "Super Admin"
          ? (
            <div className="rightMenu">
              <Tippy
                className="admin"
                theme="light"
                content={<Property />}
                interactive={true}
                trigger="click"
              >
                <div className="more">
                  <div className="item">
                    <StoreIcon />
                    <span className="caption">Property</span>
                  </div>
                </div>
              </Tippy>
            </div>) : null}

        {/* {hasAdmin === "Admin" ||
          hasAdmin === "Super Admin" ||
          hasAdmin === "Finance Team" ? ( */}
        <div className="rightMenu">
          <Link to="/report" className="more">
            <div className="item">
              <img src={ReportIcon} width="20px" height="20px" />
              <span className="caption">Report</span>
            </div>
          </Link>
        </div>
        {/* ) :
          null
        } */}

        <div className="rightMenu">
          <Tippy
            className="admin"
            theme="light"
            content={<Profile />}
            interactive={true}
            trigger="click"
          >
            <div className="more">
              <div className="item">
                <img src={ProfileIcon} width="20px" height="20px" />
                <span className="caption">Profile</span>
              </div>
            </div>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default Header;
