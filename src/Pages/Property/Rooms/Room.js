import React, { useState, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core/";
import ExistingRooms from "./ExistingRooms";
import RoomForm from "./RoomForm";
import Api from "../../../Service/Api";
import { baseurl } from "../../../Service/httpCommon";
import axios from "axios";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: "fixed",
    top: "68px",
    height: "100%",
    background: "#000",
    zIndex: "100",
    width: "12%",
  },
  layout: {
    padding: "0px 20px 0px 0px",
  },
}));

export default function AmenitiesAll() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const [toggleState, setToggleState] = useState(1);
  const [rooms, setRooms] = useState([]);
  const dataValue = { propertyId: propertyId };

  const ListProperty = async () => {
    await Api
      .post("propertyamenitiesroomallvalue", dataValue)
      .then((res) => {
        setRooms(res.data);
        if (_.isEmpty(res.data)) {
          setToggleState(2);
        }
      });
  };
  useEffect(() => {
    ListProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <Grid container>
      <Grid item sm={2}>
        <div className={classes.sidebar}>
          <ul className="nav-links">
            <li className="listingAmen">
              {_.isEmpty(rooms) ? (
                ""
              ) : (
                <p
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  Existing Rooms
                </p>
              )}
            </li>
            <li className="listingAmen">
              <p
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={
                  (e) => {
                    setToggleState(2)
                    sessionStorage.removeItem("displayName");
                  }}
              >
                New Room
              </p>
            </li>
          </ul>
        </div>
      </Grid>
      <Grid item sm={10}>
        <div className={classes.layout}>
          <div className="content-tabs">
            {_.isEmpty(rooms) ? (
              ""
            ) : (
              <div
                className={
                  toggleState === 1 ? "content  active-content" : "content"
                }
              >
                <ExistingRooms rooms={rooms} ListProperty={ListProperty} />
              </div>
            )}

            <div
              className={
                toggleState === 2 ? "content  active-content" : "content"
              }
            >
              <RoomForm ListProperty={ListProperty} />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
