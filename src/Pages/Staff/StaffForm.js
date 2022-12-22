/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  Grid,
  TextField,
  Dialog,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@material-ui/icons/";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "./Staff.css";
import Thumb from "./Thumb";
import { DatePicker } from "formik-material-ui-pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  designationOnlyInitial,
  roleOnlyInitial,
  branchOnlyInitial,
} from "../../redux/actions/dropsAction";
import {
  staffdetailsInitial,
  staffclearFormInitial,
  staffUpdateInitial,
  staffCreateInitial,
} from "../../redux/actions/staffAction";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import Profile from "../../assets/pictures/profile.jpg";
import { twnButtonStyles } from "../../utils/townoStyle";

var CryptoJS = require("crypto-js");

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: "94vh",
    maxHeight: "100vh",
    minWidth: "70%",
    padding: "20px 40px",
    position: "absolute",
    margin: "0px",
    right: "0",
    zIndex: "1000",
  },
  error: {
    color: "red",
  },
  heading: {
    fontSize: "24px",
  },
  create: {
    background: "#5cb85c",
    color: "#fff",
    margin: "5px",
  },
}));

const initialValues = {
  id: "",
  singleFile: "",
  uniqueId: "",
  profile: "",
  branchId: "",
  username: "",
  password: "",
  role: "",
  designation: "",
  genderType: "",
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  dob: "",
  mobile: "",
  altMobile: "",
  phone: "",
  mail: "",
  altMail: "",
};

export default function StaffForm(props) {
  const classes = useStyles();
  let hasAdmin = localStorage.getItem("role");
  const [staffError, setStaffError] = useState(false);
  const [userNameValid, setUserNameValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const create = { uniqueId: uniqueid, createdBy: createdBy };
  const dispatch = useDispatch();
  // const roleOnlyList = useSelector((state) => state.roleOnlyList);
  const [ roleOnlyLists, setRoleOnlyLists ] = useState([]);
  const designationOnlyList = useSelector((state) => state.designationOnlyList);
  const { designationOnlyLists } = designationOnlyList;
  const branchOnlyList = useSelector((state) => state.branchOnlyList);
  const { branchOnlyLists } = branchOnlyList;
  const staffDetails = useSelector((state) => state.staffDetails);
  const { staffDetail } = staffDetails;
  const { onClose, selectedId, open } = props;
  const { decryptpassword, setDecryptpassword } = useState("");

  useEffect(() => {
    dispatch(designationOnlyInitial(uniqueid));
    dispatch(branchOnlyInitial(uniqueid));
    // dispatch(roleOnlyInitial(uniqueid));
    if (selectedId) {
      dispatch(staffdetailsInitial(selectedId));
    }
  }, [selectedId, dispatch, uniqueid]);

  useEffect(()=>{
    let url=`/roleonly/${uniqueid}`;
    if (hasAdmin === "Agent Admin"){
    url=`agentroleonly/${uniqueid}`;
  }
    Api.get(url).then((res)=>{
      setRoleOnlyLists(res.data);
    })
  },[])

  function onSubmit(fields, { setStatus }) {
    const id = selectedId;
    setStatus();
    if (id) {
      updateStaff(fields);
    } else {
      createStaff(fields);
    }
  }

  function createStaff(fields) {
    if (fields.dob != "" && fields.dob != null) {
      fields.dob = format(fields.dob, "yyyy-MM-dd");
    }
    const formData = new FormData();
    formData.append("id", 0);
    formData.append("uniqueId", uniqueid);
    formData.append("branchId", fields.branchId);
    formData.append("username", fields.username);
    //var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(fields.password), 'my-secret-key@123').toString();
    formData.append("password", fields.password);
    formData.append("role", fields.role);
    formData.append("designation", fields.designation);
    formData.append("genderType", fields.genderType);
    formData.append("firstName", fields.firstName);
    formData.append("middleName", fields.middleName);
    formData.append("lastName", fields.lastName);
    formData.append("nickName", fields.nickName);
    formData.append("dob", fields.dob);
    formData.append("mobile", fields.mobile);
    formData.append("altMobile", fields.altMobile);
    formData.append("phone", fields.phone);
    formData.append("mail", fields.mail);
    formData.append("altMail", fields.altMail);
    formData.append("city", fields.city);
    formData.append("nationality", fields.nationality);
    formData.append("address", fields.address);
    formData.append("createdBy", createdBy);
    formData.append("image", fields.singleFile);
    Api.post("staff-details", formData).then((res) => {
      onClose(true);
    });
    window.open("/staff", '_self')
  }

  function updateStaff(fields) {
    if (fields.dob != "" && fields.dob != null) {
      fields.dob = format(fields.dob, "yyyy-MM-dd");
    }
    const formData = new FormData();
    formData.append("id", fields.id);
    formData.append("uniqueId", uniqueid);
    formData.append("branchId", fields.branchId);
    formData.append("username", fields.username);
    //var ciphertextupdate = CryptoJS.AES.encrypt(JSON.stringify(fields.password), 'my-secret-key@123').toString();
    formData.append("password", fields.password);
    formData.append("role", fields.role);
    formData.append("designation", fields.designation);
    formData.append("genderType", fields.genderType);
    formData.append("firstName", fields.firstName);
    formData.append("middleName", fields.middleName);
    formData.append("lastName", fields.lastName);
    formData.append("nickName", fields.nickName);
    formData.append("dob", fields.dob);
    formData.append("mobile", fields.mobile);
    formData.append("altMobile", fields.altMobile);
    formData.append("phone", fields.phone);
    formData.append("mail", fields.mail);
    formData.append("altMail", fields.altMail);
    formData.append("city", fields.city);
    formData.append("nationality", fields.nationality);
    formData.append("address", fields.address);
    formData.append("createdBy", createdBy);
    formData.append("image", fields.singleFile);
    Api.post("staff-details", formData).then((res) => {
      onClose(true);
    });
    //dispatch(staffUpdateInitial(fields, uniqueid));
    //onClose(true);
    window.open("/staff", '_self')
  }

  const handleClose = () => {
    onClose(true);
    dispatch(staffclearFormInitial());
  };

  const validationSchema = Yup.object({
    // branchId: Yup.string().required("Branch ID Required"),
    dob: Yup.date().required("D.O.B Required"),
    mail: Yup.string()
      .email("Enter correct Format")
      .strict()
      .trim()
      .required("Email is Required"),
    password: Yup.string().min(8, "Too Short!").required("Password Required"),
    role: Yup.string().required("Role Required"),
    designation: Yup.string().required("Designation Required"),
    firstName: Yup.string().min(3, "Too Short!").required("FirstName Required"),
    lastName: Yup.string().required("LastName Required"),
    mobile: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Invalid Mobile")
      .min(10, "Invalid Mobile Number")
      .max(10, "Invalid Mobile Number")
      .required("Mobile No required"),
  });

  const validationStaff = Yup.object({
    username: Yup.string().required("Role Required"),
  });

  const validCheck = async (values) => {
    if (values !== "" && values !== undefined && values !== null) {
      const valid = { username: values, id: staffDetail.id };
      // Api.post("staffcheck/" + uniqueid, valid).then((res) => {
      let url = "staffusernamecheck/" + values;
      if (staffDetail.id !== null) {
        url = "staffusernamecheck/" + values + "/" + staffDetail.id;
      }
      Api.get(url, valid).then((res) => {
        if (res.data == "Invalid") {
          setStaffError(true);
        } else {
          setStaffError(false);
        }
      });
    }
    const nameField = { username: values };
    const isValid = await validationStaff.isValid(nameField);
    setUserNameValid(!isValid);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={handleClose}
          fullWidth
        >
          <Typography variant="h5" component="h5" style={{ ...twnButtonStyles.lgFonts, color: '#f46d25' }}>
            {staffDetail.id ? "Edit Staff" : "Add New Staff"}
          </Typography>
          <Formik
            initialValues={staffDetail || initialValues}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={validationSchema}
          >
            {({ values, isValid, setFieldValue }) => {
              return (
                <Form autoComplete="off">
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                      <div className="avatar">
                        {values.singleFile ? (
                          <Thumb file={values.singleFile} />
                        ) : (
                          <>
                            {staffDetail.profile !== null &&
                              staffDetail.profile !== undefined ? (
                              <img
                                src={`${baseurl}getimage/${staffDetail.profile}`}
                                alt=""
                              />
                            ) : (
                              <img src={Profile} alt="" />
                            )}
                          </>
                        )}
                        <span>
                          <AddAPhotoIcon style={{ color: "#F46D25" }}></AddAPhotoIcon>
                          <p>Change</p>

                          <input
                            type="file"
                            id="file_up"
                            name="singleFile"
                            onChange={(event) => {
                              setFieldValue(
                                "singleFile",
                                event.currentTarget.files[0]
                              );
                            }}
                            accept="image/*"
                          />
                        </span>
                      </div>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        as={TextField}
                        name="username"
                        label="Username"
                        fullWidth
                        size="small"
                        onBlur={() => validCheck(values.username)}
                        value={values.username || ""}
                        required
                        autoComplete="none"
                      />
                      {userNameValid ? (
                        <span style={{ color: "red" }}>Username Required</span>
                      ) : null}
                      {staffError ? (
                        <span style={{ color: "red" }}>
                          Username Already There!
                        </span>
                      ) : null}
                    </Grid>

                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="off"
                        value={values.password || ""}
                        fullWidth
                        required
                        size="small"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <ErrorMessage name="password">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        as={TextField}
                        name="firstName"
                        value={values.firstName || ""}
                        label="First Name"
                        fullWidth
                        required
                        size="small"
                      />
                      <ErrorMessage name="firstName">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        as={TextField}
                        name="middleName"
                        value={values.middleName || ""}
                        label="Middle Name"
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        as={TextField}
                        name="lastName"
                        value={values.lastName || ""}
                        label="Last Name"
                        fullWidth
                        required
                        size="small"
                      />
                      <ErrorMessage name="lastName">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <FormControl fullWidth>
                        <InputLabel>Role*</InputLabel>
                        <Field
                          name="role"
                          label="Role"
                          as={Select}
                          size="small"
                          value={values.role || ""}
                        >
                          {roleOnlyLists.map((role) => {
                            return (
                              <MenuItem key={role} value={role}>
                                {role}
                              </MenuItem>
                            );
                          })}
                        </Field>
                        <ErrorMessage name="role">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage>
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <FormControl fullWidth>
                        <InputLabel>Designation*</InputLabel>
                        <Field
                          name="designation"
                          label="Designation"
                          as={Select}
                          size="small"
                          value={values.designation || ""}
                        >
                          {designationOnlyLists.map((designation) => {
                            return (
                              <MenuItem key={designation} value={designation}>
                                {designation}
                              </MenuItem>
                            );
                          })}
                        </Field>
                      </FormControl>
                      <ErrorMessage name="designation">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      {hasAdmin === 'Agent Admin' ?
                        <Field
                          as={TextField}
                          name="branchId"
                          value={values.branchId || ""}
                          label="BranchId"
                          fullWidth
                          size="small"
                        /> :
                        <FormControl fullWidth>
                          <InputLabel>Branch</InputLabel>
                          <Field
                            name="branchId"
                            label="BranchId"
                            as={Select}
                            size="small"
                            value={values.branchId || ""}
                          >
                            {branchOnlyLists.map((branchId) => {
                              return (
                                <MenuItem key={branchId} value={branchId}>
                                  {branchId}
                                </MenuItem>
                              );
                            })}
                          </Field>
                          {/* <ErrorMessage name="branchId">
                          {(error) => (
                            <div className={classes.error}>{error}</div>
                          )}
                        </ErrorMessage> */}
                        </FormControl>}
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <FormControl fullWidth>
                        <InputLabel>Gender</InputLabel>
                        <Field
                          name="genderType"
                          label="Gender"
                          as={Select}
                          size="small"
                          value={values.genderType || ""}
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Field>
                      </FormControl>
                    </Grid>

                    <Grid item xs={10} sm={4} lg={3} size="small">
                      <Field
                        as={TextField}
                        name="nickName"
                        label="Nick Name"
                        fullWidth
                        value={values.nickName || ""}
                      />
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        name="dob"
                        component={DatePicker}
                        autoOk
                        label="DOB"
                        value={values.dob || ""}
                        size="small"
                        required
                        format="dd/MM/yyyy"
                        maxDate={new Date()}
                        inputVariant="standard"
                        variant="inline"
                      />
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        as={TextField}
                        value={values.mobile || ""}
                        name="mobile"
                        label="Mobile"
                        fullWidth
                        required
                        size="small"
                      />
                      <ErrorMessage name="mobile">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        as={TextField}
                        value={values.altMobile || ""}
                        name="altMobile"
                        label="Alt Mobile"
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        name="phone"
                        value={values.phone || ""}
                        label="Phone"
                        as={TextField}
                        fullWidth
                        size="small"
                      />
                      <ErrorMessage name="phone">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        as={TextField}
                        name="mail"
                        value={values.mail || ""}
                        label="Mail"
                        fullWidth
                        required
                        size="small"
                      />
                      <ErrorMessage name="mail">
                        {(error) => (
                          <div className={classes.error}>{error}</div>
                        )}
                      </ErrorMessage>
                    </Grid>
                    <Grid item xs={10} sm={4} lg={3}>
                      <Field
                        name="altMail"
                        value={values.altMail || ""}
                        label="Alt Mail"
                        as={TextField}
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item sm={12} style={{ textAlign: "center" }}>
                      <Button
                        type="submit"
                        className={classes.button}
                        disabled={!isValid || userNameValid || staffError}
                      >
                        {staffDetail.id ? "Update" : "Create"}
                      </Button>

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
              );
            }}
          </Formik>
        </Dialog>
      </MuiPickersUtilsProvider>
    </>
  );
}
