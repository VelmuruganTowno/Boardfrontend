import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button, TextField, Grid, makeStyles } from "@material-ui/core/";
import * as Yup from "yup";
import {
  propertyBankCreate,
  propertyBankUpdate,
  propertyBankData,
} from "../../../redux/actions/propertyAction";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "30px 40px",
    marginTop: "20px",
  },
  submit: {
    margin: theme.spacing(3, 2, 2),
    background: "#F46D25",
    color: "#fff",
    "&:hover": {
      background: "#F46D25",
    },
  },

  error: {
    color: "red",
  },
}));

const initialValues = {
  accountNo: "",
  accountHolderName: "",
  branchName: "",
  iFSCCode: "",
  branchCode: "",
  bankname: "",
  bankCode: "",
  panNumber: "",
  nameOnPanCard: "",
  gst: "",
  swiftCode: "",
  upiId: "",
};

export default function Bank(props) {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [loading, setLoading] = useState(false);
  const create = {
    uniqueId: uniqueid,
    createdBy: createdBy,
    propertyId: propertyId,
  };

  const dispatch = useDispatch();
  const propertyBankDatas = useSelector(
    (state) => state.propertyBankData.propertyBankDatas
  );

  useEffect(() => {
    dispatch(propertyBankData(propertyId));
  }, [dispatch, propertyId]);

  const validationSchema = Yup.object({
    accountNo: Yup.string().required("Account No Required"),
    accountHolderName: Yup.string().required("Account Holder Name Required"),
    branchName: Yup.string().required("Branch Name Required"),
    iFSCCode: Yup.string().required("IFSC Code Required"),
    bankname: Yup.string().required("Bank Name Required"),
    panNumber: Yup.string().required("PAN No Required"),
    nameOnPanCard: Yup.string().required("PAN Name  Required"),
  });

  function onSubmit(fields, { setStatus }) {
    const id = propertyBankDatas.id;
    setStatus();
    if (id) {
      updateBank(fields);
    } else {
      createBank(fields);
    }
  }

  function createBank(fields) {
    setLoading(true);
    var createData = { ...fields, ...create };
    dispatch(propertyBankCreate(createData, props.history));
  }

  function updateBank(fields) {
    setLoading(true);
    fields.updateBy = createdBy;
    dispatch(propertyBankUpdate(fields, props.history));
  }

  return (
    <>
      <div className={classes.paper}>
        <Formik
          initialValues={propertyBankDatas || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={validationSchema}
        >
          {({ values }) => {
            return (
              <Form autoComplete="off">
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="accountNo"
                      type="text"
                      fullWidth
                      label="Account No"
                      autoFocus
                      variant="outlined"
                      size="small"
                      as={TextField}
                      required
                    />
                    <ErrorMessage name="accountNo">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="accountHolderName"
                      type="text"
                      fullWidth
                      label="Account Holder Name"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="accountHolderName">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="branchName"
                      value={values.branchName || ""}
                      type="text"
                      fullWidth
                      label="Branch Name"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="branchName">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="iFSCCode"
                      type="text"
                      fullWidth
                      label="IFSC Code"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="iFSCCode">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="branchCode"
                      value={values.branchCode || ""}
                      type="text"
                      fullWidth
                      label="Branch Code"
                      as={TextField}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="bankname"
                      type="text"
                      fullWidth
                      label="Bank Name"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                    />
                    <ErrorMessage name="bankname">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="bankCode"
                      value={values.bankCode || ""}
                      type="text"
                      fullWidth
                      label="Bank Code"
                      as={TextField}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="panNumber"
                      type="text"
                      fullWidth
                      label="PAN No"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                      inputProps={{ style: { textTransform: "uppercase" } }}
                    />
                    <ErrorMessage name="panNumber">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="nameOnPanCard"
                      type="text"
                      fullWidth
                      label="Name On PAN Card"
                      as={TextField}
                      variant="outlined"
                      size="small"
                      required
                      inputProps={{ style: { textTransform: "uppercase" } }}
                    />
                    <ErrorMessage name="nameOnPanCard">
                      {(error) => <div className={classes.error}>{error}</div>}
                    </ErrorMessage>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="gst"
                      type="text"
                      value={values.gst || ""}
                      fullWidth
                      label="GST No"
                      as={TextField}
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="swiftCode"
                      value={values.swiftCode || ""}
                      type="text"
                      fullWidth
                      label="Swift Code"
                      as={TextField}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field
                      name="upiId"
                      value={values.upiId || ""}
                      type="text"
                      fullWidth
                      label="UPI ID"
                      as={TextField}
                      size="small"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} style={{ textAlign: "center" }}>
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
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
}
