import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import Api from "../../../Service/Api";
import { useParams, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#f4f4f4",
    "@media(max-width:767px)": {
      background: "#fff",
      borderRadius: "0px 0px 7px 7px",
      boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    },
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "10px 0px",
    "@media(max-width:767px)": {
      paddingLeft: "0px",
      margin: "10px 0px",
    },
  },
  libox: {
    marginLeft: "1em",
    display: "list-item",
    listStyle: "disc",
    marginRight: "0pt",
  },
  title: {
    background: "#d8d8d8",
    height: "40px",
    paddingLeft: "25px",
    display: "flex",
    alignItems: "center",
    "@media(max-width:767px)": {
      background: "#F46D25",
      margin: "0px",
      color: "#fff",
      fontSize: "14px",
      paddingLeft: "10px",
    },
  },
  insidetitle: {
    "@media(max-width:767px)": {
      fontSize: "14px",
    },
  },
  rooms: {
    width: "150px",
    height: "150px",
  },
  see: {
    color: "#F46D25",
    fontSize: "15px",
    marginLeft: "10px",
    textDecoration: "underline",
  },
  icons: {
    fontSize: "12px",
    position: "relative",
    top: "2px",
  },
}));

export default function RoomList() {
  const classes = useStyles();
  const [roomList, setRoomList] = useState([]);
  const { id } = useParams();
  const data = { propertyId: id };

  const ListProperty = async () => {
    Api.post("propertyamenitiesroomallvalue", data).then((res) => {
      setRoomList(res.data);
        });
  };

  useEffect(() => {
    ListProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Select Your Room</h3>
      {roomList.map((roomEachData) => {
        return (
          <div key={roomEachData.id} style={{ padding: "0px 20px" }}>
            <Grid container>
              <Grid item sm={12} xs={12}>
                <h3 className={classes.insidetitle}>
                  {roomEachData.displayName}
                  <Link
                    to={`/roomdetails/${roomEachData.propertyId}/${roomEachData.displayName}`}
                    className={classes.see}
                  >
                    See more <DoubleArrowIcon className={classes.icons} />
                  </Link>
                </h3>
                <div className={classes.list}>
                  <div className={classes.libox}>{roomEachData.bedType}</div>
                  <div className={classes.libox}>
                    Max Adults {roomEachData.adultsMax}
                  </div>
                  <div className={classes.libox}>
                    Max Child {roomEachData.childMax}
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      })}
    </div>
  );
}
