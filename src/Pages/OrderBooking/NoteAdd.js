import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import axios from "axios";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { historyListInitial } from "../../redux/actions/bookingActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "0px",
  },
  error: {
    color: "red",
  },
  heading: {
    fontSize: "24px",
    margin: "20px 0px",
  },
}));

export default function NoteAdd(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const dispatch = useDispatch();
  const createdBy = localStorage.getItem("auth");
  const uniqueId = localStorage.getItem("unique_id");
  const [loading, setLoading] = useState(false);
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );

  const initialValues = {
    note: "",
  };

  const handleClose = () => {
    onClose(true);
  };

  const validationSchema = Yup.object({
    note: Yup.string().required("Note Details Required"),
  });

  const onSubmit = (data) => {
    setLoading(true)
    const create = {
      uniqueId: bookingDetails.uniqueId,
      propertyId: bookingDetails.propertyId,
      bookingId: bookingDetails.bookingId,
      createdBy: createdBy,
    };
    const createData = { ...create, ...data };
    Api.post("bookingnote", createData).then((res) => {
      onClose(true);
      setLoading(false)
      toast.success("Note Added SuccessFully");
      dispatch(historyListInitial(uniqueId, bookingDetails.bookingId));
    });
  };

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
      >
        <Typography variant="h5" component="h5" className={classes.heading}>
          Add Note
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form autoComplete="off">
            <Grid container spacing={4}>
              <Grid item sm={12} xs={12}>
                <Field
                  name="note"
                  as={TextField}
                  label="Note"
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="note">
                  {(error) => <div style={{ color: "red" }}>{error}</div>}
                </ErrorMessage>
              </Grid>
              <Grid item sm={12} xs={12} style={{ textAlign: "center" }}>
                {loading ? (
                  <Button type="submit" className={classes.button} disabled>
                    <i
                      className="fa fa-refresh fa-spin"
                      style={{
                        marginRight: "8px",
                      }}
                    ></i>
                    Submit
                  </Button>
                ) : (
                  <Button type="submit" className={classes.button}>
                    Submit
                  </Button>
                )}
                <Button
                  color="secondary"
                  onClick={handleClose}
                  style={{
                    background: "#121212",
                    color: "#fff",
                    margin: "10px",
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Dialog>
    </>
  );
}
