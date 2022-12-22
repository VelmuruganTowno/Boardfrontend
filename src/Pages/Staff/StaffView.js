import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Typography, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
import Profile from "../../assets/pictures/profile.jpg";
import { format } from "date-fns";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: "94vh",
    maxHeight: "100vh",
    minWidth: "70%",
    padding: "20px 40px",
    position: "absolute",
    backgroundColor: "#e3e3e3",
    margin: "0px",
    right: "0",
    zIndex: "1000",
  },
  heading: {
    // marginLeft: "30px",
    padding:'8px',
    fontWeight: "bold",
    fontSize: '24px',
    color: "#fff",
  },
  profile: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginLeft: "80px",
    marginRight: "15px",
    marginTop: "80px",
  },
  grid: {
    marginLeft: "30px",
    direction: "row",
    alignItems: "left",
  },
  grid1: {
    marginLeft: "90px",
  },

  text: {
    fontSize: "20px",
    fontWeight: "150",
    color: "black",
    marginLeft: "90px",
  },
  value: {
    fontSize: "18px",
    color: "blue",
    fontWeight: "bold",
    marginLeft: "10px",
  },
  upload: {
    marginTop: "30px",
  },
  closeIcon: {
    padding:'5px',
    textAlign: "end",
    fontSize: "30px",
    color: "#fff",
    cursor: "pointer",
    backgroundColor: "#f46d25",
    borderTopRightRadius: "5px",
  },
}));

export default function StaffForm(props) {
  const classes = useStyles();

  const { onClose, selectedIdView, open } = props;
  const [staffDetail, setStaffDetail] = useState("");
  useEffect(() => {
    if (selectedIdView) {
      Api.get(`staff-details/${selectedIdView}`).then((res) => {
        setStaffDetail(res.data);
      });
    }
  }, [selectedIdView]);

  const handleClose = () => {
    onClose(true);
  };

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <div className={classes.modalview}>
          <Grid container spacing={2}>
            <Grid item lg={12}></Grid>{" "}
            <Grid
              container
              spacing={2}
              style={{ borderRadius: "5px", backgroundColor: "#ffffffe8" }}
            >
              <Grid
                container
                // spacing={2}
                style={{ backgroundColor: "#f46d25", borderTopLeftRadius: "5px",borderTopRightRadius: "5px" }}
              >
                <Grid item lg={4}>
                  <Typography
                    variant="h4"
                    component="h4"
                    className={classes.heading}
                  >
                    Staff Details
                  </Typography>
                </Grid>
                <Grid item lg={8}>
                  <div className={classes.closeIcon}>
                    <CloseIcon onClick={handleClose}></CloseIcon>
                  </div>
                </Grid>
              </Grid>
              <Grid item lg={4}>
                <div>
                  {staffDetail.profile !== "" &&
                    staffDetail.profile !== null ? (
                    <img
                      className={classes.profile}
                      src={`${baseurl}getimage/${staffDetail.profile}`}
                      alt=""
                    />
                  ) : (
                    <img src={Profile} alt="" className={classes.profile} />
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  <h2 style={{ fontSize: "30px", margin: "2px" }}>
                    {staffDetail.firstName} {staffDetail.middleName && staffDetail.middleName !== 'undefined'?staffDetail.middleName:null}
                    {" "} {staffDetail.lastName}
                  </h2>
                  <h3 style={{ fontSize: "24px", margin: "2px" }}>
                  {staffDetail.nickName && staffDetail.nickName !== 'undefined'?<span>({staffDetail.nickName})</span>:null}
                  </h3>
                  <h3
                    style={{
                      color: "#F46D25",
                      fontSize: "30px",
                      margin: "2px",
                    }}
                  >
                    {staffDetail.role}
                  </h3>
                </div>
              </Grid>
              <Grid item sm={8} style={{ fontSize: "17px", marginTop: "30px" }}>
                <Grid container spacing={2}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginLeft: "28px",
                      }}
                    >
                      Username
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "20px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "23px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                        color: "#F46D25",
                      }}
                    >
                      {staffDetail.username}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-45px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      Unique ID
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.uniqueId}
                    </p>
                  </Grid>
                </Grid>{" "}
                <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      Date of Brith
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    {staffDetail.dob !== undefined ? (
                      <p
                        style={{
                          fontSize: "18px",
                          marginLeft: "-50px",
                          marginTop: "18px",
                        }}
                      >
                        {format(new Date(staffDetail.dob), "dd/MM/yyyy")}
                      </p>
                    ) : null}
                  </Grid>
                </Grid>{" "} <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      Role
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.role}
                    </p>
                  </Grid>
                </Grid>{" "} <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      Designation
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.designation}
                    </p>
                  </Grid>
                </Grid>{" "}
                {staffDetail.branchId && staffDetail.branchId !== 'undefined' ?
                <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      Branch
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.branchId}
                    </p>
                  </Grid>
                </Grid>:null}{" "} 
                {staffDetail.genderType && staffDetail.genderType !== 'undefined'?
                <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      Gender
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.genderType}
                    </p>
                  </Grid>
                </Grid>:null}{" "} <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      Mobile No.
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.mobile}
                    </p>
                  </Grid>
                </Grid>{" "} 
                {staffDetail.altMobile && staffDetail.altMobile !== 'undefined'?
                <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      AltMobile No.
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.altMobile}
                    </p>
                  </Grid>
                </Grid>:null}{" "} <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      E-mail ID
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.mail}
                    </p>
                  </Grid>
                </Grid>{" "}
                {staffDetail.altMail && staffDetail.altMail !== 'undefined'?
                <Grid container spacing={2} style={{ marginTop: "-42px" }}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        marginLeft: "30px",
                      }}
                    >
                      Alt E-mail ID
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-20px",
                        marginTop: "15px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "18px",
                        marginLeft: "-50px",
                        marginTop: "18px",
                      }}
                    >
                      {staffDetail.altMail}
                    </p>
                  </Grid>
                </Grid>:null}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </>
  );
}
