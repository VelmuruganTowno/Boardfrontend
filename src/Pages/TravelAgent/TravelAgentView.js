import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Typography, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Api from "../../Service/Api";

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
    marginLeft: "30px",
    fontWeight: "bold",
    color: "#ffffff",
  },

  closeIcon: {
    fontSize: "30px",
    textAlign: "right",
    color: "#ffffff",
    cursor: "pointer",
    backgroundColor: "black",
  },
}));

export default function TravelAgentView(props) {
  const classes = useStyles();

  const { onClose, selectedIdView, open } = props;
  const [agentDetail, setAgentDetail] = useState("");

  useEffect(() => {
    if (selectedIdView) {
      Api.get(`companyregisteration/${selectedIdView}`).then((res) => {
        setAgentDetail(res.data);
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
              style={{ borderRadius: "10px", backgroundColor: "#ffffffe8" }}
            >
              <Grid item lg={12}>
                <Grid
                  container
                  spacing={2}
                  style={{ backgroundColor: "black", borderRadius: "8px" }}
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
              </Grid>{" "}
              <Grid item lg={12} style={{ textAlign: "left" }}>
                {" "}
                <h2
                  style={{
                    fontSize: "36px",
                    marginTop: "5px",
                    marginLeft: "30px",
                    fontWeight: "bold",
                    color: "#F46D25",
                  }}
                >
                  {agentDetail.name}
                </h2>
              </Grid>
              <Grid item lg={1}></Grid>
              <Grid
                item
                lg={11}
                style={{
                  marginTop: "-55px",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item lg={3}>
                    <p
                      style={{
                        fontSize: "23px",
                        marginLeft: "30px",
                      }}
                    >
                      User Name
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                        color: "#463295c7",
                      }}
                    >
                      {agentDetail.username}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Unique ID
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.uniqueId}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Website
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.website}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      E.Mail
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.mail}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Mobile
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.mobile}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Alt.Mobile
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.altmobile}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>City</p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.city}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      PanCard
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.panCard}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Onboarded By
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.onboardedBy}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Address
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.address}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Remark
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.remark}
                    </p>
                  </Grid>
                </Grid>
                {/* <div className="preview">
                <p>Hide City</p>:<span>{agentDetail.hideCity}</span>
              </div> */}
                {/* <div className="preview">
                <p>Hide Hotel</p>:<span>{agentDetail.hideHotel}</span>
              </div> */}
                <Grid container spacing={2} style={{ marginTop: "-55px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Travel Agent Category
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-30px",
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
                        marginLeft: "-85px",
                        marginTop: "25px",
                      }}
                    >
                      {agentDetail.travelAgentCategory}
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
