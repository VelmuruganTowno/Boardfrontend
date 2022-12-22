import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Typography, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Api from "../../Service/Api";

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minHeight: "94vh",
    maxHeight: "100vh",
    minWidth: "70%",
    padding: "30px 30px",
    position: "absolute",
    backgroundColor: "#e3e3e3",
    margin: "0px",
    right: "0",
    zIndex: "1000",
  },
  heading: {
    padding: "30px 15px",
    fontWeight: "bold",
    color: "#fff",
    fontSize:'18px',
    padding:'0px'
  },

  closeIcon: {
    fontSize: "30px",
    textAlign: "right",
    color: "#ffffff",
    cursor: "pointer",
    backgroundColor: "black",
  },
}));

export default function BranchView(props) {
  const classes = useStyles();
  const { onClose, selectedIdView, open } = props;

  const [branchDetail, setBranchDetail] = useState("");

  useEffect(() => {
    if (selectedIdView) {
      Api.get(`branch/${selectedIdView}`).then((res) => {
        setBranchDetail(res.data);
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
            <Grid item lg={12}></Grid>

            <Grid
              container
              spacing={2}
              style={{ borderRadius: "5px", backgroundColor: "#ffffffe8" }}
            >
              <Grid item lg={12}>
                <Grid
                  container
                  spacing={2}
                  style={{ backgroundColor: "black", borderRadius: "5px" }}
                >
                  <Grid item sm={4}>
                    <Typography
                      variant="h4"
                      component="h4"
                      className={classes.heading}
                    >
                      Branch Details
                    </Typography>
                  </Grid>
                  <Grid item sm={8}>
                    <div className={classes.closeIcon}>
                      <CloseIcon
                        onClick={handleClose}
                        style={{
                          backgroundColor: "#7c7a7ac7",
                          borderRadius: "5px",
                        }}
                      ></CloseIcon>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item lg={1}></Grid>
              <Grid item lg={11}>
                <Grid container spacing={2}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "23px",
                        fontWeight: "bold",
                        marginLeft: "28px",
                      }}
                    >
                      Branch Name
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-45px",
                        fontWeight: "bold",
                        marginTop: "20px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-100px",
                        marginTop: "21px",
                        fontWeight: "bold",
                        color: "#F46D25",
                      }}
                    >
                      {branchDetail.name}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Email
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-50px",
                        marginTop: "20px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-110px",
                        marginTop: "25px",
                      }}
                    >
                      {branchDetail.email}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Mobile
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-50px",
                        marginTop: "20px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-110px",
                        marginTop: "25px",
                      }}
                    >
                      {branchDetail.mobile}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Phone
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-50px",
                        marginTop: "20px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-110px",
                        marginTop: "25px",
                      }}
                    >
                      {branchDetail.phone}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>Code</p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-50px",
                        marginTop: "20px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-110px",
                        marginTop: "25px",
                      }}
                    >
                      {branchDetail.code}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Address
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-50px",
                        marginTop: "20px",
                      }}
                    >
                      :
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p
                      style={{
                        fontSize: "20px",
                        marginLeft: "-110px",
                        marginTop: "25px",
                      }}
                    >
                      {branchDetail.address}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </>
  );
}
