import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Grid, Button } from "@material-ui/core";
import Api from "../../Service/Api";
import LeadAgentForm from "./leadAgentForm";
const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "100%",
    minWidth: "65%",
    position: "absolute",
    margin: "0px",
    right: "0",
    zIndex: "1000",
    padding: "20px",
    "@media (max-width: 767px)": {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      height: "100%",
      overflowY: "scroll",
      maxWidth: "100%",
      minHeight: "95%",
    },
  },
  error: {
    color: "red",
  },
  icon: {
    fill: "currentColor",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fontSize: "1.5rem",
    transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    position: "absolute",
    right: "15px",
    top: "5px",
    color: "#f46d25",
  },
  paper: {
    padding: "15px 20px",
    marginLeft: "5px",
    marginTop: "-3px",
    boxShadow: "0px 1px 4px 1px #343a40b8",
    borderRadius: "4px",
    background: "#F4F4F4",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "10px",
    },
  },
  heading: {
    fontWeight: "bold",
    fontSize: "23px",
    color: "#fff",
    margin: "10px",
    marginLeft: "25px",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  headings: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#black",
    margin: "10px",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  root: {
    display: "-webkit-box",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    minHeight: "30px",
  },
  chip: {
    margin: theme.spacing(0.5),
    color: "#fff",
  },
}));

export default function LeadAgentView(props) {
  const classes = useStyles();
  const [selectedId, setSelectedId] = useState("");
  const [openf, setOpenf] = useState(false);
  const { onClose, selectedIdView, open } = props;
  const [agentDetail, setAgentDetail] = useState("");
  console.log(agentDetail);
  useEffect(() => {
    if (selectedIdView) {
      Api.get(`agenttryingbooking/${selectedIdView}`).then((res) => {
        setAgentDetail(res.data);
      });
    }
  }, [selectedIdView]);

  const handleClose = () => {
    onClose(true);
  };
  const OpenDialog = async () => {
    setOpenf(true);
    setSelectedId(selectedIdView);
  };
  const CloseDialog = () => {
    setOpenf(false);
    setSelectedId(0);
  };
  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={handleClose}
        fullWidth
      >
        <Grid container spacing={2}>
          <Grid
            item
            lg={8}
            style={{
              borderRadius: "5px",
              marginLeft: "2px",
              marginTop: "10px",
              marginBottom: "2px",
            }}
          >
            <h3 className={classes.headings}>
              <b>#</b>
              {agentDetail.uniqueId}
            </h3>
          </Grid>
          <Grid
            item
            lg={1}
            style={{
              borderRadius: "5px",
              marginLeft: "2px",
              marginTop: "20px",
              marginBottom: "2px",
            }}
          >
            <Button
              onClick={() => {
                OpenDialog();
              }}
            >
              Update
            </Button>
          </Grid>
          <Grid
            item
            lg={1}/>
          <Grid
            item
            lg={1}
            style={{
              borderRadius: "5px",
              marginLeft: "-5px",
              marginTop: "20px",
              marginBottom: "2px",
            }}
          >
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
        <div className={classes.modalview}>
          <Grid
            container
            spacing={2}
            item
            lg={12}
            style={{
              backgroundColor: "black",
              borderRadius: "5px",
              marginLeft: "2px",
              marginTop: "10px",
              marginBottom: "2px",
            }}
          >
            <h4 className={classes.heading}>Travel Details</h4>
          </Grid>
          <div className={classes.paper}>
            <Grid container spacing={2} style={{ marginLeft: "25px" }}>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Agent Username
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Hotel Name
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Rooms
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.createdBy}</Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.propertyName}</Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.displayName}</Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Check-In Date
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Check-Out Date
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Adults
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.checkin}</Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.checkout}</Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.noofadults}</Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Children
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Meal Plan
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                
              </Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.noofchild}</Grid>
              <Grid
                item
                md={4}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.mealplan}</Grid>
            </Grid>
          </div>{" "}
          <Grid
            container
            spacing={2}
            item
            lg={12}
            style={{
              backgroundColor: "black",
              borderRadius: "5px",
              marginLeft: "2px",
              marginTop: "10px",
              marginBottom: "2px",
            }}
          >
            <h4 className={classes.heading}>Lead Status</h4>
          </Grid>
          <div className={classes.paper}>
            <Grid container spacing={2} style={{ marginLeft: "55px" }}>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Assigned to:
              </Grid>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Lead Type
              </Grid>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.assignTo}</Grid>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >{agentDetail.leadsource}</Grid>
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                style={{
                  color: "#f46d25",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Lead Scoring:
              </Grid>
              <Grid item md={6} sm={12} xs={12} />
              <Grid
                item
                md={6}
                sm={12}
                xs={12}
                style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}
              >
              {agentDetail.leadscoring}
              </Grid>
              <Grid item md={6} sm={12} xs={12} style={{
                  color: "black",
                  fontSize: "20px",
                  marginTop: "-10px",
                }}>{agentDetail.leadscoringvalue} {agentDetail.reason}</Grid>
            </Grid>
          </div>
        </div>
        <LeadAgentForm
          open={openf}
          onClose={CloseDialog}
          selectedId={selectedId}
        />
      </Dialog>
    </>
  );
}
