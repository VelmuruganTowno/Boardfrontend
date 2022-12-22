import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Grid, TextField, Dialog, Button, Typography } from "@material-ui/core";
import * as Yup from "yup";
import {
  branchCreateInitial,
  branchdetailsInitial,
  branchUpdateInitial,
  branchclearFormInitial,
} from "../../redux/actions/branchAction";
import { useDispatch, useSelector } from "react-redux";
import Api from "../../Service/Api";
import { twnButtonStyles } from "../../utils/townoStyle";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    width: 400,
    padding: "23px 15px",
    borderRadius: "5px",
    overflow: "unset",
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
  code: "",
  email: "",
  phone: "",
  mobile: "",
  address: "",
};
export default function BranchForm(props) {
  const classes = useStyles();
  const [branchError, setBranchError] = useState(false);
  const [branchNameValid, setBranchNameValid] = useState(false);
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy, status: "1" };
  const dispatch = useDispatch();
  const { onClose, selectedId, open } = props;
  const branchDetails = useSelector((state) => state.branchDetails);
  const { branchDetail } = branchDetails;

  useEffect(() => {
    if (selectedId) {
      dispatch(branchdetailsInitial(selectedId));
    }
  }, [dispatch, selectedId]);

  function onSubmit(fields, { setStatus }) {
    const id = selectedId;
    setStatus();
    if (id) {
      updateBranch(fields);
    } else {
      createBranch(fields);
    }
  }

  function createBranch(fields) {
    const createData = { ...create, ...fields };
    console.log(fields);
    dispatch(branchCreateInitial(createData, uniqueid));
    onClose(true);
  }

  function updateBranch(fields) {
    fields.updateBy = createdBy;
    console.log(fields);
    dispatch(branchUpdateInitial(fields, uniqueid));
    onClose(true);
  }

  const handleClose = () => {
    onClose(true);
    dispatch(branchclearFormInitial());
    setBranchNameValid(true);
    setBranchError(false);
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter correct Format")
      .strict()
      .trim()
      .nullable(),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid Mobile")
      .min(10, "Invalid Mobile Number")
      .max(10, "Invalid Mobile Number")
      .nullable(),
  });
  const validationBranch = Yup.object({
    name: Yup.string().required("Branch Name Required"),
  });

  const validCheck = async (values) => {
    if (values !== "" && values !== undefined && values !== null) {
      const valid = { name: values, id: branchDetail.id };
      Api.post("branchcheck/" + uniqueid, valid).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data == "Invalid") {
          setBranchError(true);
        } else {
          setBranchError(false);
        }
      });
    }
    const nameField = { name: values };
    const isValid = await validationBranch.isValid(nameField);
    setBranchNameValid(!isValid);
  };

  return (
    <div>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {/* <Typography variant="h5" component="h5" className={classes.heading}> */}
        <Typography variant="h5" component="h5" style={twnButtonStyles.lgFonts}>
          {branchDetail.id ? "Edit Branch" : "Add Branch"}
        </Typography>
        <Formik
          initialValues={branchDetail || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {({ values, isValid }) => {
            return (
              <Form autoComplete="off" style={{marginTop:'15px'}}>
                <Grid container spacing={2}>
                  <Grid item sm={12}>
                    <Field
                      name="name"
                      as={TextField}
                      label="Branch Name"
                      value={values.name || ""}
                      onBlur={() => validCheck(values.name)}
                      autoFocus
                      variant="outlined"
                      required
                      fullWidth
                      size="small"
                    />
                    <ErrorMessage name="name">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                    {branchError ? (
                      <span className={classes.error}>
                        Branch Already There!
                      </span>
                    ) : null}
                    {branchNameValid ? (
                      <span className={classes.error}>
                        Branch Name Required
                      </span>
                    ) : null}
                  </Grid>
                  <Grid item sm={12}>
                    <Field
                      name="code"
                      as={TextField}
                      value={values.code || ""}
                      label="Branch Code"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Field
                      name="address"
                      value={values.address || ""}
                      as={TextField}
                      label="Address"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item sm={12}>
                    <Field
                      name="email"
                      value={values.email || ""}
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                    <ErrorMessage name="email">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={12}>
                    <Field
                      name="phone"
                      value={values.phone || ""}
                      as={TextField}
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                    <ErrorMessage name="phone">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={12}>
                    <Field
                      name="mobile"
                      value={values.mobile || ""}
                      as={TextField}
                      label="Mobile"
                      variant="outlined"
                      fullWidth
                      size="small"
                    />
                    <ErrorMessage name="mobile">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item sm={12} style={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      className={classes.button}
                      disabled={!isValid || branchError || branchNameValid}
                      style={{boxShadow:'none'}}
                    >
                      {branchDetail.id ? "Update" : "Create"}
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
    </div>
  );
}
