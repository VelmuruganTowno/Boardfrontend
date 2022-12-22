import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import Select from "react-select";
import {
  Grid,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
  TableContainer,
  TextField,
  FormControlLabel,
  Dialog,
  Button,
  Switch,
  Typography,
} from "@material-ui/core";
//import { clientListInitial } from "../../redux/actions/clientAction";
import Api from "../../Service/Api";
import * as Yup from "yup";
import { clientListInitial } from "../../redux/actions/clientAction";
import { useDispatch, useSelector } from "react-redux";
import {
  roleCreateInitial,
  roledetailsInitial,
  roleUpdateInitial,
  roleclearFormInitial,
} from "../../redux/actions/roleAction";
import { twnButtonStyles } from "../../utils/townoStyle";

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    // minHeight: "100%",
    // minWidth: "85%",
    // position: "absolute",
    // margin: "0px",
    // right: "0",
    // zIndex: "1000",
    // padding: "23px 15px",
    // boxShadow:'none',
    // "@media (max-width: 767px)": {
    //   position: "absolute",
    //   top: "0",
    //   bottom: "0",
    //   left: "0",
    //   right: "0",
    //   height: "100%",
    //   overflowY: "scroll",
    //   maxWidth: "100%",
    //   minHeight: "95%",
    //   boxShadow:'none',
    width: 400,
    borderRadius: "5px",
    padding: "23px 15px",
    boxShadow:'none',
  },
  error: {
    color: "red",
  },
  paper: {
    padding: "23px 15px",
    boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    borderRadius: "4px",
    background: "#F4F4F4",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "10px",
    },
  },
  heading: {
    margin: "20px",
    color: "#f46d25",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
}));

const initialValues = {
  id: "",
  accessId1: "",
  accessId2: "",
  accessId3: "",
  name: "",
  description: "",
  dashboardIndividual: false,
  dashboardAll: false,
  branchAdd: false,
  branchEdit: false,
  branchView: false,
  designationAdd: false,
  designationEdit: false,
  designationView: false,
  roleAdd: false,
  roleEdit: false,
  roleView: false,
  staffAdd: false,
  staffEdit: false,
  staffView: false,
  featureAdd: false,
  featureEdit: false,
  featureView: false,
  clientAdd: false,
  clientEdit: false,
  clientViewAll: false,
  clientViewIndividual: false,
  clientViewOther:"vel,deepak",
  bookingAdd: false,
  bookingEdit: false,
  bookingView: false,
  bookingCancel: false,
  bookingRefundAmount: false,
  bookingViewAll: false,
  bookingViewIndividual: false,
  bookingViewOther: "",
  propertyAdd: false,
  propertyEdit: false,
  propertyView: false,
  roomRentBulkUpdate: false,
  roomRentEdit: false,
  roomRentViewAll: false,
  roomRentViewIndividual: false,
  roomRentViewAgent: false,
  reportAll: false,
  reportFinance: false,
  reportAgentWise: false,
  reportHotels: false,
  reportClient: false,
  reportRefund: false,
  travelAgentAdd: false,
  travelAgentEdit: false,
  travelAgentView: false,
  mostpopularAdd: false,
  mostpopularEdit: false,
  mostpopularStatus: false,
  mostpopularView: false,
  lastminutedealAdd: false,
  lastminutedealEdit: false,
  lastminutedealStatus: false,
  lastminutedealView: false,
  bestsellingAdd: false,
  bestsellingEdit: false,
  bestsellingView: false,
  bestsellingStatus: false,
  dealofweekAdd: false,
  dealofweekEdit: false,
  dealofweekStatus: false,
  dealofweekView: false,
};
export default function RoleForm(props) {
  const classes = useStyles();
  const [roleError, setRoleError] = useState(false);
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const [roleNameValid, setRoleNameValid] = useState(false);
  const clientLists = useSelector((state) => state.clientList.clientLists);
  const { onClose, selectedId, open } = props;
  const dispatch = useDispatch();
  const roleDetails = useSelector((state) => state.roleDetails);
  const { roleDetail } = roleDetails;
  let hasAdmin = localStorage.getItem("role");

  useEffect(() => {
    dispatch(clientListInitial(uniqueid));
    // eslint-disable-next-line
  }, [uniqueid]);
  useEffect(() => {
    if (selectedId) {
      dispatch(roledetailsInitial(selectedId));
    }
  }, [dispatch, selectedId]);

  function onSubmit(fields, { setStatus }) {
    const BookingOther = [];
    if (
      fields.bookingViewOther !== "" &&
      fields.bookingViewOther !== null &&
      fields.bookingViewOther !== undefined
    ) {
      fields.bookingViewOther.map((ele) => BookingOther.push(ele.value));
      fields.bookingViewOther = BookingOther.toString();
    } else {
      fields.bookingViewOther = "";
    }
    const ClientOther = [];
    if (
      fields.clientViewOther !== "" &&
      fields.clientViewOther !== null &&
      fields.clientViewOther !== undefined
    ) {
      fields.clientViewOther.map((ele) => ClientOther.push(ele.value));
      fields.clientViewOther = ClientOther.toString();
    } else {
      fields.clientViewOther = "";
    }
    const id = selectedId;
    setStatus();
    if (id) {
      updateRole(fields);
    } else {
      createRole(fields);
    }
  }

  function createRole(fields) {
    const createData = { ...create, ...fields };
    console.log("Create Role: ",createData)
    dispatch(roleCreateInitial(createData, uniqueid));
    onClose(true);
  }

  function updateRole(fields) {
    fields.updateBy = createdBy;
    dispatch(roleUpdateInitial(fields, uniqueid));
    onClose(true);
  }

  const handleClose = () => {
    onClose(true);
    dispatch(roleclearFormInitial());
  };

  const validationRole = Yup.object({
    name: Yup.string().required("Role Required"),
  });

  const Clientoptions =
    clientLists &&
    clientLists.map((client) => {
      let first = client.firstName;
      let last = client.lastName;
      let combine = `${first}\t${last}`;
      return { label: combine, value: client.firstName };
    });
  const validCheck = async (values) => {
    if (values !== "" && values !== 'undefined' && values !== null) {
      const valid = { name: values, id: roleDetail.id };
      console.log("roleValid",valid);
      Api.post("roleall/" + uniqueid, valid).then((res) => {
        // eslint-disable-next-line eqeqeq
        if (res.data == "Invalid") {
          setRoleError(true);
        } else {
          setRoleError(false);
        }
      });
    }
    const nameField = { name: values };
    const isValid = await validationRole.isValid(nameField);
    setRoleNameValid(!isValid);
  };

  return (
    <>
      <Dialog
        // classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'xl'}
        sx={{ maxHeight: '100vh' }}
      >
        {/* <Typography variant="h4" component="h4" className={classes.heading}> */}
        <Typography variant="h5" component="h5" style={{...twnButtonStyles.lgFonts,padding:'10px 0 5px 15px',color:"#f46d25"}}>
          {roleDetail.id ? "Edit Role" : "New Role"}
        </Typography>
        <Formik
          initialValues={roleDetail || initialValues}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ values, isValid, setFieldValue }) => {
            return (
              <Form autoComplete="off" style={{marginTop:'15px'}}>
                <Grid container spacing={2} style={{padding:"0px 20px"}}>
                  <Grid item lg={12}>
                    <div className={classes.paper}>
                      <Grid container spacing={2}>
                        <Grid item lg={12}>
                          <Field
                            name="name"
                            as={TextField}
                            label="Role Name"
                            onBlur={() => validCheck(values.name)}
                            value={values.name || ""}
                            autoFocus
                            variant="outlined"
                            required
                            fullWidth
                            size="small"
                          />
                          {roleNameValid ? (
                            <span className={classes.error}>Role Required</span>
                          ) : null}
                          {roleError ? (
                            <span className={classes.error}>
                              Role Already There!
                            </span>
                          ) : null}
                        </Grid>
                        <Grid item lg={12}>
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
                      </Grid>
                    </div>
                  </Grid>
                  {hasAdmin==="Agent Admin"?null:
                  <Grid item lg={12}>
                    <div className={classes.paper}>
                      <Grid item sm={12}>
                        <TableContainer sx={{ minWidth: 800 }}>
                          <Table>
                            <TableBody>
                              {" "}
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Dashboard
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={5}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="dashboardIndividual"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Individual Dashboard"
                                      />
                                    </Grid>
                                    <Grid item sm={5}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="dashboardAll"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="All Dashboard"
                                      />
                                    </Grid>{" "}
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Branch
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="branchAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="branchEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="branchView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                  </Grid>{" "}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Designation
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="designationAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="designationEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="designationView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={4}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Role
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="roleAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="roleEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="roleView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Staff
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="staffAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="staffEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="staffView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Add Feature
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="featureAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="featureEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="featureView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>{" "}
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Client
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="clientAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="clientEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <div>
                                        <FormControlLabel
                                          control={
                                            <Field
                                              name="clientViewAll"
                                              as={Switch}
                                              color="primary"
                                              type="checkbox"
                                            />
                                          }
                                          label="View All"
                                        />
                                        <br />
                                        <FormControlLabel
                                          control={
                                            <Field
                                              name="clientViewIndividual"
                                              type="checkbox"
                                              as={Checkbox}
                                              color="primary"
                                            />
                                          }
                                          label="View Individual"
                                        />
                                      </div>
                                      <div>
                                        <Select
                                          name="clientViewOther"
                                          isMulti
                                          fullWidth
                                          value={values.clientViewOther || ""}
                                          onChange={(values) => {
                                            setFieldValue(
                                              "clientViewOther",
                                              values
                                            );
                                          }}
                                          placeholder="View Other"
                                          options={Clientoptions}
                                        />
                                      </div>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Booking List
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bookingAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bookingEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bookingView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bookingRefundAmount"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Refund Amount"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bookingCancel"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Cancel"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <div>
                                        <FormControlLabel
                                          control={
                                            <Field
                                              name="bookingViewAll"
                                              type="checkbox"
                                              as={Checkbox}
                                              color="primary"
                                            />
                                          }
                                          label="View All"
                                        />
                                        <br />
                                        <FormControlLabel
                                          control={
                                            <Field
                                              name="bookingViewIndividual"
                                              type="checkbox"
                                              as={Checkbox}
                                              color="primary"
                                            />
                                          }
                                          label="View Individual"
                                        />
                                      </div>
                                      <div>
                                        <Select
                                          name="bookingViewOther"
                                          fullWidth
                                          isMulti
                                          value={values.bookingViewOther || ""}
                                          onChange={(values) => {
                                            setFieldValue(
                                              "bookingViewOther",
                                              values
                                            );
                                          }}
                                          placeholder="View Other"
                                          options={Clientoptions}
                                        />
                                      </div>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Property
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="propertyAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="propertyEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="propertyView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Room Rent
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="roomRentBulkUpdate"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Bulk Update"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="roomRentEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label=" Rent Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="roomRentViewAll"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View All"
                                      />
                                    </Grid>
                                    <Grid item sm={1} />
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="roomRentViewIndividual"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View Individual"
                                      />
                                    </Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="roomRentViewAgent"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Agent Rent"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Report
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="reportAll"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="All Report"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="reportFinance"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Finance Report"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="reportAgentWise"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Agent Wise Sales Report"
                                      />
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="reportHotels"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Hotels Report"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="reportClient"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Clients Report"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="reportRefund"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Refund Report"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Travel Agent
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="travelAgentAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="travelAgentEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={4}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="travelAgentView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>{" "}
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Most Popular
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="mostpopularAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="mostpopularEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={3}>
                                      {" "}
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="mostpopularView"
                                            type="checkbox"
                                            as={Switch}
                                            color="primary"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                    <Grid item sm={2}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="mostpopularStatus"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Status"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Last Minute Deals
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="lastminutedealAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="lastminutedealEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="lastminutedealView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                    <Grid item sm={2}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="lastminutedealStatus"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Status"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Best Selling
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bestsellingAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bestsellingEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bestsellingView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                    <Grid item sm={2}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="bestsellingStatus"
                                            type="checkbox"
                                            as={Switch}
                                            color="primary"
                                          />
                                        }
                                        label="Status"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    width: "180px",
                                  }}
                                >
                                  <Grid container>
                                    <Grid item sm={3}>
                                      <h3
                                        style={{
                                          textAlign: "center",
                                          fontSize: "20px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        Deal Of The Week
                                      </h3>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                                <TableCell>
                                  <Grid container spacing={2}>
                                    <Grid item sm={1}></Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="dealofweekAdd"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Create"
                                      />
                                    </Grid>
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="dealofweekEdit"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Update"
                                      />
                                    </Grid>{" "}
                                    <Grid item sm={3}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="dealofweekView"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="View"
                                      />
                                    </Grid>
                                    <Grid item sm={2}>
                                      <FormControlLabel
                                        control={
                                          <Field
                                            name="dealofweekStatus"
                                            as={Switch}
                                            color="primary"
                                            type="checkbox"
                                          />
                                        }
                                        label="Status"
                                      />
                                    </Grid>
                                  </Grid>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </div>
                  </Grid>}
                  <Grid item sm={12} style={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      className={classes.button}
                      disabled={roleNameValid || roleError}
                      style={{boxShadow:'none'}}
                    >
                      {roleDetail.id ? "Update" : "Create"}
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
