import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { useParams } from "react-router-dom";
import { bookingDetialInitial } from "../../redux/actions/bookingActions";
import { useDispatch } from "react-redux";
import DetailPanel from "./DetailPanel";
import SideBar from "./SideBar";
import MobileDetailPanel from "./MobileDetailPanel";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    height: "auto",
    "@media (max-width: 767px)": {
      padding: "100px 0px",
    },
  },
  side: {
    display: "inline-block",
    width: "calc(100% - 18%)",
    verticalAlign: "top",
    marginLeft: "18%",
  },
}));

export default function Booking() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  var uniqueid = localStorage.getItem("unique_id");
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

  useEffect(() => {
    if (id) {
      dispatch(bookingDetialInitial(id, uniqueid));
    }
  }, [dispatch, id, uniqueid]);

  return (
    <>
      {width <= 768 ? (
        <div className={classes.root}>
          <MobileDetailPanel />
        </div>
      ) : (
        <>
          <div className={classes.root}>
            <DetailPanel />
          </div>
          <div className={classes.side}>
            <SideBar />
          </div>
        </>
      )}
    </>
  );
}
