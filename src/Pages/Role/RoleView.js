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

export default function BranchView(props) {
  const classes = useStyles();
  const { onClose, selectedIdView, open } = props;

  const [roleDetail, setRoleDetail] = useState("");

  useEffect(() => {
    if (selectedIdView) {
      Api.get(`role/${selectedIdView}`).then((res) => {
        setRoleDetail(res.data);
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
                      Role Details
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
                      Role
                    </p>
                  </Grid>
                  <Grid item lg={1}>
                    <p
                      style={{
                        fontSize: "25px",
                        marginLeft: "-50px",
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
                        marginLeft: "-110px",
                        marginTop: "21px",
                        fontWeight: "bold",
                        color: "#F46D25",
                      }}
                    >
                      {roleDetail.name}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Description
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
                      {roleDetail.description}
                    </p>
                  </Grid>
                </Grid>
                {/* <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Create
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
                      {roleDetail.roleCreate ? "Create" : "No create"}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Update
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
                      {roleDetail.roleUpdate ? "Update" : "No Update"}
                    </p>
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ marginTop: "-50px" }}>
                  <Grid item lg={3}>
                    <p style={{ fontSize: "23px", marginLeft: "30px" }}>
                      Delete
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
                      {roleDetail.roleDelete ? "Delete" : "No Delete"}
                    </p>
                  </Grid>
                </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Dialog>
    </>
  );
}
