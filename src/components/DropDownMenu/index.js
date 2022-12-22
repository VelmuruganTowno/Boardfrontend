/* eslint-disable eqeqeq */
import React from "react";
import "./styles.css";
import { Link, useLocation } from "react-router-dom";

const DropdownMenu = (props) => {
  const location = useLocation();

  return (
    <div className="headerDropdownContainer">
      {props.menu}
      
      <div className="dropdown">
        <div className="upArrowContainer">
          <div className="upArrow"></div>
        </div>
        <div className="dropdownMenu">
          <ul className="headerDropdownMenu">
            {props.menus &&
              props.menus.map((item, index) => (
                <li key={index}>
                  <Link
                    to={`${item.to}`}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick && item.onClick();
                      }
                    }}
                    
                    className={
                      location.pathname == item.to ? "activeclass" : 'none'
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { DropdownMenu };
