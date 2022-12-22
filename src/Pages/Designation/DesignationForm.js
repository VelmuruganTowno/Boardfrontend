import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";
import Api from "../../Service/Api";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  designationdetailsInitial,
  designationCreateInitial,
  designationUpdateInitial,
  designationclearFormInitial,
} from "../../redux/actions/designationAction";
import { twnButtonStyles } from "../../utils/townoStyle";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    width: 400,
    borderRadius: "5px",
    padding: "23px 15px",
    boxShadow:'none',
  },
  error: {
    color: "red",
  },
  // heading: {
  //   fontSize: "24px",
  //   margin: "20px 0px",
  // },
}));

const initialValues = {
  id: "",
  name: "",
  description: "",
};
export default function DesignationForm(props) {
  const classes = useStyles();
  const [designationError, setDesignationError] = useState(false);
  const [designationNameValid, setDesignationNameValid] = useState(false);
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const { onClose, selectedId, open } = props;
  const dispatch = useDispatch();
  const designationDetails = useSelector((state) => state.designationDetails);
  const { designationDetail } = designationDetails;

  useEffect(() => {
    if (selectedId) {
      dispatch(designationdetailsInitial(selectedId));
    }
  }, [dispatch, selectedId]);

  function onSubmit(fields, { setStatus }) {
    const id = selectedId;
    setStatus();
    if (id) {
      updateDesignation(fields);
    } else {
      createDesignation(fields);
    }
  }

  function createDesignation(fields) {
    const createData = { ...create, ...fields };
    dispatch(designationCreateInitial(createData, uniqueid));
    onClose(true);
  }

  function updateDesignation(fields) {
    fields.updateBy = createdBy;
    dispatch(designationUpdateInitial(fields, uniqueid));
    onClose(true);
  }

  const handleClose = () => {
    onClose(true);

    dispatch(designationclearFormInitial());
  };
  const validationDesignation = Yup.object({
    name: Yup.string().required("Designation Required"),
  });

  const validCheck = async (values) => {
    if (values !== "" && values !== undefined && values !== null) {
      const valid = { name: values, id: designationDetail.id };
      Api.post("designationcheck/" + uniqueid, valid).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data == "Invalid") {
          setDesignationError(true);
        } else {
          setDesignationError(false);
        }
      });
    }
    const nameField = { name: values };
    const isValid = await validationDesignation.isValid(nameField);
    setDesignationNameValid(!isValid);
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
        {/* <Typography variant="h5" component="h5" className={classes.heading}> */}
        <Typography variant="h5" component="h5" style={{...twnButtonStyles.lgFonts,color:'#f46d25'}}>
          {designationDetail.id ? "Update Designation" : "Create Designation"}
        </Typography>
        <Formik
          initialValues={designationDetail || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, isValid }) => {
            return (
              <Form autoComplete="off" style={{marginTop:'15px'}}>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <Field
                      name="name"
                      as={TextField}
                      label="Designation Name"
                      onBlur={() => validCheck(values.name)}
                      autoFocus
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                      value={values.name || ""}
                    />
                    {designationNameValid ? (
                      <span className={classes.error}>
                        Designation Required
                      </span>
                    ) : null}
                    {designationError ? (
                      <span className={classes.error}>
                        Designation Already There!
                      </span>
                    ) : null}
                  </Grid>
                  <Grid item sm={12}>
                    <Field
                      name="description"
                      as={TextField}
                      label="Description"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={values.description || ""}
                    />
                  </Grid>

                  <Grid item sm={12} style={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      className={classes.button}
                      disabled={designationNameValid || designationError}
                      style={{boxShadow:'none'}}
                    >
                      {designationDetail.id ? "Update" : "Create"}
                    </Button>

                    <Button
                      color="secondary"
                      onClick={handleClose}
                      style={{
                        background: "#121212",
                        color: "#fff",
                        margin: "10px",
                        boxShadow:'none'
                      }}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
}
