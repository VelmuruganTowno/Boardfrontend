import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Button,
  TextField,
  Grid,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";
import Api from "../../../Service/Api";
import { baseurl } from "../../../Service/httpCommon";
import axios from "axios";
import ReactPlayer from "react-player";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 40px",
    marginTop: "20px",
  },
  button: {
    margin: theme.spacing(1.6, 0.5, 2),
    background: "#F46D25",
    color: "#fff",
    "&:hover": {
      background: "#F46D25",
    },
  },
  card: {
    marginTop: "50px",
    marginLeft: "20px",
    width: "300px",
  },
}));

export default function Video() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  const data = { propertyId: propertyId };
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [selectedDeleteId, setSelectedDeleteId] = useState("");
  const [video, setVideo] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const videoList = () => {
    Api.post("propertyamenitiesvideosvalue", data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setVideo(res.data);
      });
  };

  useEffect(() => {
    videoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
    videoList();
  };

  const initalValue = {
    name: "",
  };

  const handleDelete = (id) => {
    setOpen(true);
    setSelectedDeleteId(id);
  };

  const deleteVideo = () => {
    Api.delete("propertyamenitiesvideos/" + selectedDeleteId, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        handleClose();
        toast.success("Successfully Deleted");
      });
  };

  const onSubmit = (fields, { resetForm }) => {
    setLoading(true);
    var createData = { ...data, ...fields, ...create };
    Api.post("propertyamenitiesvideos", createData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res) {
          toast.success("Successfully Uploded");
          videoList();
          setLoading(false);
          history.push(`/addproperty/termsAndCondition`);
        }
      });
    resetForm();
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Video Url Required"),
  });
  return (
    <>
      <div className={classes.paper}>
        <Formik
          initialValues={initalValue}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form autoComplete="off">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Field
                  name="name"
                  type="text"
                  fullWidth
                  label="Video Url *"
                  autoFocus
                  variant="outlined"
                  size="small"
                  as={TextField}
                />
                <ErrorMessage name="name">
                  {(error) => <div style={{color:"red"}}>{error}</div>}
                </ErrorMessage>
              </Grid>

              {loading ? (
                <Button type="submit" className={classes.button} disabled>
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{
                      marginRight: "8px",
                    }}
                  ></i>
                  Save and Continue
                </Button>
              ) : (
                <Button type="submit" className={classes.button}>
                  Save and Continue
                </Button>
              )}
            </Grid>
            {video.map((video) => {
              return (
                <div key={video.id} style={{ display: "inline-block" }}>
                  <Card className={classes.card}>
                    <CardHeader
                      action={
                        <DeleteIcon
                          onClick={() => {
                            handleDelete(video.id);
                          }}
                        />
                      }
                    />
                    <CardContent>
                      <ReactPlayer
                        controls
                        url={video.name}
                        width="100%"
                        height="100%"
                      />
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </Form>
        </Formik>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle id="alert-dialog-title">Image Upload</DialogTitle>
          <DialogContent>
            <DialogContentText>Are You Want Delete video</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteVideo()}
            >
              Delete
            </Button>
            <Button onClick={handleClose} color="secondary" variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
