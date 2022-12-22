/* eslint-disable eqeqeq */
import { React, useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Client from "../Clients/Client";
import "./MoreT.scss";

export function Admin() {
  let hasAdmin = localStorage.getItem("role");
  return (
    <>{hasAdmin === "Agent Admin" ?
      <div className="moret">
        <NavLink to="/designation" activeClassName="active-link">
          Designation
        </NavLink>
        <NavLink to="/roleList" activeClassName="active-link">
          Role
        </NavLink>
        <NavLink to="/staff" activeClassName="active-link">
          Staff
        </NavLink>
        <NavLink to="/Commonfeature" activeClassName="active-link">
          Add Common
        </NavLink>
      </div> :
      <div className="moret">
        <NavLink to="/branch" activeClassName="active-link">
          Branch
        </NavLink>
        <NavLink to="/designation" activeClassName="active-link">
          Designation
        </NavLink>
        <NavLink to="/role" activeClassName="active-link">
          Role
        </NavLink>
        <NavLink to="/staff" activeClassName="active-link">
          Staff
        </NavLink>
        <NavLink to="/dropdown" activeClassName="active-link">
          Add Feature
        </NavLink>
        <NavLink to="/Commonfeature" activeClassName="active-link">
          Add Common
        </NavLink>
      </div>}</>

  );
}

export function Clients() {
  return (
    <div className="moret">
      <NavLink to="/lead" activeClassName="active-link">
        Lead Dashboard
      </NavLink>
      <NavLink to="/client" activeClassName="active-link">
        Client
      </NavLink>
    </div>
  )
}

export function Agent() {
  return (
    <div className="moret">
      <NavLink to="/travelAgent" activeClassName="active-link">
        Add Travel Agent
      </NavLink>
      <NavLink to="/mostPopular" activeClassName="active-link">
        Most Popular
      </NavLink>
      <NavLink to="/lastMinuteDeals" activeClassName="active-link">
        Last Minute Deals
      </NavLink>
      <NavLink to="/DealoftheWeek" activeClassName="active-link">
        Deal of the Week
      </NavLink>
      <NavLink to="/bestSelling" activeClassName="active-link">
        Best Selling
      </NavLink>
    </div>
  );
}
export function Booking() {
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  if (width <= 768) {
    return (
      <div className="moret">
        <NavLink to="/client" activeClassName="active-link">
          Client
        </NavLink>
        <NavLink to="/newBooking" activeClassName="active-link">
          New Booking
        </NavLink>
        <NavLink to="/bookinglist" activeClassName="active-link">
          Booking List
        </NavLink>
      </div>
    );
  }
  else {
    return (
      <div className="moret">
        <NavLink to="/client" activeClassName="active-link">
          Client
        </NavLink>
        <NavLink to="/newBooking" activeClassName="active-link">
          New Booking
        </NavLink>
        <NavLink to="/bookinglist" activeClassName="active-link">
          Booking List
        </NavLink>
        <NavLink to="/lead" activeClassName="active-link">
          Lead Dashboard
        </NavLink>
        <NavLink to="/packageOrQuotation/package" activeClassName="active-link">
          Package
        </NavLink>
        <NavLink to="/transferList" activeClassName="active-link">
          Travel Transfer
        </NavLink>
      </div>
    );
  }
}

export function AgentBookings() {
  let hasAdmin = localStorage.getItem("role");
  let checkAgent = localStorage.getItem("agent");

  return (
    <>{hasAdmin === "Agent Admin" || checkAgent === "Agent" ?
      <div className="moret">
        <NavLink to="/packageOrQuotation/package" activeClassName="active-link">
          Package
        </NavLink>
        <NavLink to="/agentBookings" activeClassName="active-link">
          Hotel Booking
        </NavLink>
        <NavLink to="/transferList" activeClassName="active-link">
          Travel Transfer
        </NavLink>
      </div> : null}</>
  );
}

export function Vendors() {
  return (
    <div className="moret">
      <NavLink to="/properties" activeClassName="active-link">
        Property List
      </NavLink>

      <NavLink to="/roomListView" activeClassName="active-link">
        Calender View
      </NavLink>
    </div>
  )
}

export function Property() {
  let hasAdmin = localStorage.getItem("role");  
  return (<div className="moret">
    {hasAdmin === 'Agent Admin'?
      <NavLink to="/properties" activeClassName="active-link">
        Properties
      </NavLink> :
      <NavLink to="/propertyList" activeClassName="active-link">
        Properties
      </NavLink>
    }
    <NavLink to="/roomListView" activeClassName="active-link">
      Calender View
    </NavLink>
  </div>
  );
}

export function Profile() {
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div className="moret">
      <NavLink to="/profile" activeClassName="active-link">
        Profile
      </NavLink>
      <NavLink to="/changePassword" activeClassName="active-link">
        Change Password
      </NavLink>
      <Link to="/" onClick={logout}>
        Logout
      </Link>
    </div>
  );
}
