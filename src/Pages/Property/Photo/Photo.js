/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import "./Photo.css";
import axios from "axios";
import { baseurl } from "../../../Service/httpCommon";
import Api from "../../../Service/Api";
import {
  Button,
  Paper,
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

const useStyles = makeStyles((theme) => ({
  theme: {
    backgroundColor: theme.palette.background.paper,
    padding: "20px",
  },
}));

const Photo = () => {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [photo, setPhoto] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [photovalue, setPhotovalue] = useState([]);
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [selectedDeleteImagepath, setSelectedDeleteImagepath] = useState("");
  const [loading, setLoading] = useState(false);

  const photoList = () => {
    const data = { propertyId: propertyId };
    Api.post("propertyamenitiesphotovalue", data, {
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
  const handleDelete = (id, imagepath) => {
    setOpenDelete(true);
    setSelectedDeleteId(id);
    setSelectedDeleteImagepath(imagepath);
  };
  const deleteImage = () => {
    Api.delete("propertyamenitiesphoto/" + selectedDeleteId, {
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
    setPhoto("");
  };
  const SingleFileChange = (e) => {
    setPhoto(e.target.files[0]);
    setOpen(true);
  };

  const addNew = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", photo);
    formData.append("propertyId", propertyId);
    formData.append("uniqueId", uniqueid);
    formData.append("createdBy", createdBy);
    await Api.post("propertyamenitiesphotoAWS", formData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      toast.success("Successfully Upload");
      setOpen(false);
      setLoading(false);
      photoList();
    });
  }

  return (
    <>
      <Paper variant="outlined" square className={classes.theme}>
        <div className="row">
          <Card className="card1">
            <CardContent>
              <input
                type="file"
                className="form-control"
                onChange={SingleFileChange}
                accept="image/*"
                id="file"
                onClick={(e) => (e.target.value = null)}
              />
              <label htmlFor="file" className="label">
                <i className="material-icons">add_a_photo</i>
              </label>
            </CardContent>
          </Card>

          {photovalue.map((image) => {
            return (
              <div key={image.id} style={{ display: "inline-block" }}>
                <Card className="card">
                  <CardHeader
                    action={
                      <DeleteIcon
                        onClick={() => {
                          handleDelete(image.id, image.imagepath);
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
        </div>
        <Dialog open={open} onClose={handleClose} maxWidth="md">
          <DialogTitle>Image Upload</DialogTitle>
          <DialogContent dividers>
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
                onClick={() => addNew()}
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
        <Dialog open={openDelete} onClose={handleCloseDelete} maxWidth="md">
          <DialogTitle>Image Upload</DialogTitle>
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
      </Paper>
    </>
  );
};

export default Photo;
