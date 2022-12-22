/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "../../../Photo/Photo.css";
import axios from "axios";
import { baseurl } from "../../../../../Service/httpCommon";
import Api from "../../../../../Service/Api";
import {
  Button,
  makeStyles,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CardHeader,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";

const useStyles = makeStyles(() => ({}));

const Rooms = () => {
  const classes = useStyles();

  var propertyId = sessionStorage.getItem("propertyId");

  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  var displayName = sessionStorage.getItem("displayName");
  const [photo, setPhoto] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [photovalue, setPhotovalue] = useState([]);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [loading, setLoading] = useState(false);

  const photoList = () => {
    const data = {
      propertyId: propertyId,
      displayName: displayName,
      photoType: "rooms",
    };
    Api.post("propertyamenitiesroomphotovalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPhotovalue(res.data);
      });
  };
  useEffect(() => {
    photoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseDelete = () => {
    setOpenDelete(false);
    photoList();
  };
  const handleDelete = (id) => {
    setOpenDelete(true);
    setSelectedDeleteId(id);
  };
  const deleteImage = () => {
    Api.delete("propertyamenitiesroomphoto/" + selectedDeleteId, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        toast.success("Successfully Deleted");
        handleCloseDelete();
      });
  };

  const handleClose = () => {
    setOpen(false);
    setPhoto("")
  };

  const SingleFileChange = (e) => {
    setPhoto(e.target.files[0]);
    setOpen(true);
  };

  const addNewRoomPhoto = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", photo);
    formData.append("propertyId", propertyId);
    formData.append("displayName", displayName);
    const namevalue = sessionStorage.getItem("roomRT");
    formData.append("uniqueId", uniqueid);
    formData.append("createdBy", createdBy);
    formData.append("photoType", "rooms");
    await Api.post("propertyamenitiesroomphoto", formData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
    }).then((res) => {
      toast.success("Uploaded Successfully ");
      setOpen(false);
      setLoading(false);
      photoList();
    });
  }
  return (
    <>
      <div className={classes.theme}>
        <Card className="card1">
          <CardContent>
            <input
              type="file"
              className="form-control"
              onChange={(e) => SingleFileChange(e)}
              id="file"
              accept="image/*"
              onClick={(e) => (e.target.value = null)}
            />
            <label htmlFor="file" className="label">
              <i className="material-icons">add_a_photo</i>
            </label>
          </CardContent>
        </Card>

        {photovalue.map((image) => {
          return (
            <div
              key={image.id}
              style={{ margin: "0px", padding: "0px", display: "contents" }}
            >
              <Card className="card">
                <CardHeader
                  action={
                    <DeleteIcon
                      onClick={() => {
                        handleDelete(image.id);
                      }}
                    />
                  }
                />
                <CardContent>
                  <img
                    src={`${baseurl}getimage/${image.imagepath}`}
                    alt="HotelPhoto"
                  />
                </CardContent>
              </Card>
            </div>
          );
        })}

        <Dialog open={open} onClose={handleClose} className={classes.dialog}>
          <DialogTitle id="alert-dialog-title">Image Upload</DialogTitle>
          <DialogContent>
            <DialogContentText>Are You Want Upload Image</DialogContentText>
          </DialogContent>
          <DialogActions>
            {loading ? (
              <Button disabled variant="contained" color="primary">
                <i
                  className="fa fa-refresh fa-spin"
                  style={{
                    marginRight: "8px",
                  }}
                ></i>
                Upload
              </Button>
            ) : (
              <Button
                onClick={() => addNewRoomPhoto()}
                variant="contained"
                color="primary"
              >
                Upload
              </Button>
            )}
            <Button onClick={handleClose} color="secondary" variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDelete}
          onClose={handleCloseDelete}
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">Image Upload</DialogTitle>

          <DialogContent dividers>
            <DialogContentText>Are You Want Delete Image</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteImage()}
            >
              Delete
            </Button>
            <Button
              onClick={handleCloseDelete}
              color="secondary"
              variant="contained"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default Rooms;
