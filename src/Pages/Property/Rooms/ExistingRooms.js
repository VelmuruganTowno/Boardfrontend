import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  Dialog,
} from "@material-ui/core/";
import EditRoomForm from "./EditRoomForm";
import EditIcon from "@material-ui/icons/Edit";
import RoomAmenities from "./Amenities/RoomAmenities";

const useStyles = makeStyles(() => ({
  table: {
    Width: "100%",
  },
  dialogPaper: {
    minHeight: "94vh",
    maxHeight: "100vh",
    minWidth: "80%",
    padding: "20px 40px",
    position: "absolute",
    margin: "0px",
    right: "0",
    display: "inline-block",
  },
  li: {
    listStyle: "none",
    fontSize: "16px",
    lineHeight: "26px",
    display: "flex",
  },
  icon: {
    width: "25px",
    height: "18px",
    color: "#F46D25",
  },
}));

export default function ExistingRooms(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [amenitiesOpen, setAmenitiesOpen] = useState(false);
  const { rooms, ListProperty } = props;
  const roomhandleOpen = (displayName) => {
    var displayNames = displayName.replace(/['"']+/g, "");
    sessionStorage.setItem("displayName", displayNames);
    setOpen(true);
  };

  const roomhandleClose = (canRefresh) => {
    setOpen(false);
    sessionStorage.removeItem("displayName");
    if (canRefresh) {
      ListProperty();
    }
  };

  const amenitieshandleOpen = (displayName) => {
    var displayNames = displayName.replace(/['"']+/g, "");
    sessionStorage.setItem("displayName", displayNames);
    setAmenitiesOpen(true);
  };

  const amenitieshandleClose = (canRefresh) => {
    setAmenitiesOpen(false);
    sessionStorage.removeItem("displayName");
    if (canRefresh) {
      ListProperty();
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => {
              return (
                <TableRow key={room.id}>
                  <TableCell component="th" scope="row">
                    {room.displayName}
                  </TableCell>
                  <TableCell align="center">{room.longDescription}</TableCell>
                  <TableCell align="center">
                    <ul style={{ display: "inline-block" }}>
                      <li
                        className={classes.li}
                        onClick={() => {
                          roomhandleOpen(room.displayName);
                        }}
                      >
                        <EditIcon className={classes.icon} />
                        <span>Room</span>
                      </li>
                      <li
                        className={classes.li}
                        onClick={() => {
                          amenitieshandleOpen(room.displayName);
                        }}
                      >
                        <EditIcon className={classes.icon} />
                        <span>Amentities</span>
                      </li>
                    </ul>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <EditRoomForm open={open} onClose={roomhandleClose} />
      <Dialog
        open={amenitiesOpen}
        onClose={amenitieshandleClose}
        classes={{ paper: classes.dialogPaper }}
      >
        <RoomAmenities />
      </Dialog>
    </>
  );
}
