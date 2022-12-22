import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Property from "./Property";
import Contact from "./Contact";
import "./Tab.css";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: "fixed",
    top: "68px",
    height: "100%",
    background: "#000",
    zIndex: "100",
    width:"12%"
  },
  layout: {
    padding: "0px 20px 0px 0px",
  },
}));

export default function AmenitiesAll() {
  const classes = useStyles();
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  var propertyId = sessionStorage.getItem("propertyId");

  return (
    <Grid container>
      <Grid item sm={2} md={2}>
        <div className={classes.sidebar}>
          <ul className="nav-links">
            <li className="listingAmen">
              <p
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >
                Property Details
              </p>
            </li>
            <li className="listingAmen">
              {propertyId !== "" &&
              propertyId !== null &&
              propertyId !== undefined ? (
                <p
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
                >
                  Contact
                </p>
              ) : (
                <p className="tabsDisable" onClick={() => toggleTab(2)}>
                  Contact
                </p>
              )}
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item sm={10} md={10}>
        <div className={classes.layout}>
          <div className="content-tabs">
            <div
              className={
                toggleState === 1 ? "content  active-content" : "content"
              }
            >
              <Property onTab={toggleTab} />
            </div>
            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <Contact />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
