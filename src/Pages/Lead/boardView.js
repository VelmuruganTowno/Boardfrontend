import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Grid } from "@material-ui/core";
import Api from "../../Service/Api";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";
const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    minHeight: "100%",
    minWidth: "75%",
    position: "absolute",
    margin: "0px",
    right: "0",
    zIndex: "1000",
    padding: "10px",
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
    marginLeft: "62px",
    width: "86.1%",
    marginTop: "-1.6px",
    boxShadow: "0px 1px 3px 1px #343a40b8",
    borderBottomLeftRadius: "6px",
    borderBottomRightRadius: "6px",
    background: "#F4F4F4",
    "@media (max-width: 767px)": {
      boxShadow: "none",
      padding: "10px",
    },
  },
  heading: {
    fontWeight: "bold",
    fontSize: "20px",
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

const cardLabel = { padding: '0.5em 1em', color: '#111', fontWeight: '500' };
const cardValue = { padding: '0.5em 1em', color: '#111' };

export default function BoardView(props) {
  const classes = useStyles();
  const { onClose, selectedIdView, open } = props;
  const [agentDetail, setAgentDetail] = useState({ createdAt: "", updatedAt: "" });
  const [selectedId, setSelectedId] = useState("");
  const [openf, setOpenf] = useState(false);
  var uniqueid = localStorage.getItem("unique_id");

  useEffect(() => {
    if (selectedIdView) {
      Api.get(`/boardlead/${uniqueid}/${selectedIdView}`).then((res) => {
        setAgentDetail(res.data);
      });
    }
  }, [uniqueid, selectedIdView]);

  const handleClose = () => {
    onClose(true);
  };

  if (agentDetail.createdAt !== null && agentDetail.createdAt !== "") {
    agentDetail.createdAt = format(new Date(agentDetail.createdAt), "d MMM yy HH:mm");
  }
  if (agentDetail.updatedAt !== null && agentDetail.updatedAt !== "") {
    agentDetail.updatedAt = format(new Date(agentDetail.updatedAt), "d MMM yy HH:mm");
  }
  return (
    <>
      <Dialog classes={{ paper: classes.dialogPaper }} open={open} onClose={handleClose} fullWidth>
        <Grid container spacing={2}>
          <Grid
            item
            lg={8}
            style={{
              borderRadius: "5px",
              marginLeft: "50px",
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
              marginLeft: "-50px",
              marginTop: "20px",
              marginBottom: "2px",
            }}
          >
          </Grid>
          <Grid item lg={1} />
          <Grid
            item
            lg={1}
            style={{
              borderRadius: "5px",

              marginLeft: "-40px",
              marginTop: "20px",
              marginBottom: "2px",
            }}
          >
            <button
              style={{
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
                background: "black",
                borderColor: "black",
                boxShadow: "fff",
                borderRadius: "6px",
                borderWidth: " thin",
                color: "white",
                width: "90px",
                height: "35px",
                marginLeft: "60px",
                marginTop: "5px",
              }}
              onClick={handleClose}
            >
              Back
            </button>
          </Grid>
        </Grid>

        <Grid container style={{ backgroundColor: "black", borderTopLeftRadius: "6px", borderTopRightRadius: "6px", boxShadow: "0px 1px 3px 1px #343a40b8", marginLeft: "60px", width: "89.9%", marginTop: "10px", marginBottom: "2px" }}>
          <h4 className={classes.heading}>Basic Details</h4>
        </Grid>

        <Stack spacing={0} className={classes.paper}>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }}>
            <Typography variant="h6" style={{ width: '55%' }}>Client Name: <span style={{ color: '#111' }}>{agentDetail.clientName}</span></Typography>
            <Typography variant="h6" style={{ width: '35%', textAlign: 'left' }}>Client Mobile no.: <span style={{ color: '#111' }}>{agentDetail.clientMobileNo}</span></Typography>
          </Stack>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }} >
            <Typography variant="h6" style={{ color: '#f46d25', width: '55%' }}>Client Email: <span style={{ color: '#111' }}>{agentDetail.clientMail}</span></Typography>
            <Typography variant="h6" style={{ color: '#f46d25', width: '35%', textAlign: 'left' }}>Departure City: <span style={{ color: '#111' }}>{agentDetail.clientDepartcity}</span></Typography>
          </Stack>
        </Stack>

        <Grid container style={{ backgroundColor: "black", borderTopLeftRadius: "6px", borderTopRightRadius: "6px", boxShadow: "0px 1px 3px 1px #343a40b8", marginLeft: "60px", width: "89.9%", marginTop: "10px", marginBottom: "2px" }}>
          <h4 className={classes.heading}>Travel Details</h4>
        </Grid>

        <Stack spacing={0} className={classes.paper}>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }}>
            <Typography variant="h6" style={{ width: '55%' }}>Lead Type: <span style={{ color: '#111' }}>{agentDetail.leadType}</span></Typography>
            <Typography variant="h6" style={{ color: '#f46d25', width: '35%', textAlign: 'left' }}>Destination City: <span style={{ color: '#111' }}>{agentDetail.destination}</span></Typography>
          </Stack>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }} >
            <Typography variant="h6" style={{ color: '#f46d25', width: '55%', textAlign: 'left' }}>Hotel/Package Name: <span style={{ color: '#111' }}>{agentDetail.displayName}</span></Typography>
            <Typography variant="h6" style={{ width: '35%' }}>Checkin Date: <span style={{ color: '#111' }}>{agentDetail.checkin}</span></Typography>
          </Stack>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }} >
            <Typography variant="h6" style={{ color: '#f46d25', width: '55%', textAlign: 'left' }}>No. of Nights: <span style={{ color: '#111' }}>{agentDetail.noofnights}</span></Typography>
            <Typography variant="h6" style={{ width: '35%' }}>No. of Pax: <span style={{ color: '#111' }}>{agentDetail.noofpax}</span></Typography>
          </Stack>
          <Stack direction='row' style={{ color: '#f46d25' }}>
            <Typography variant="h6" style={{ color: '#f46d25', width: '35%', textAlign: 'left' }}>Budget: <span style={{ color: '#111' }}>{agentDetail.budget}</span></Typography>
          </Stack>
          <Stack direction='row' style={{ color: '#f46d25' }} >
            <Typography variant="h6" style={{ width: '100%' }}>Remark: <span style={{ color: '#111' }}>{agentDetail.notes}</span></Typography>
          </Stack>
        </Stack>

        <Grid container style={{ backgroundColor: "black", borderTopLeftRadius: "6px", borderTopRightRadius: "6px", boxShadow: "0px 1px 3px 1px #343a40b8", marginLeft: "60px", width: "89.9%", marginTop: "10px", marginBottom: "2px" }}>
          <h4 className={classes.heading}>Lead Status</h4>
        </Grid>

        <Stack spacing={0} className={classes.paper}>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }}>
            <Typography variant="h6" style={{ width: '55%' }}>Assigned To: <span style={{ color: '#111' }}>{agentDetail.leadassignto}</span></Typography>
            <Typography variant="h6" style={{ color: '#f46d25', width: '35%', textAlign: 'left' }}>Lead Source: <span style={{ color: '#111' }}>{agentDetail.leadsource}</span></Typography>
          </Stack>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }}>
            <Typography variant="h6" style={{ width: '55%' }}>Created By: <span style={{ color: '#111' }}>{agentDetail.createdBy}</span></Typography>
            <Typography variant="h6" style={{ color: '#f46d25', width: '35%', textAlign: 'left' }}>Created At: <span style={{ color: '#111' }}>{agentDetail.createdAt}</span></Typography>
          </Stack>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }}>
            <Typography variant="h6" style={{ width: '55%' }}>Updated By: <span style={{ color: '#111' }}>{agentDetail.updatedBy}</span></Typography>
            <Typography variant="h6" style={{ color: '#f46d25', width: '35%', textAlign: 'left' }}>Updated At: <span style={{ color: '#111' }}>{agentDetail.updatedAt}</span></Typography>
          </Stack>
          <Stack direction='row' justifyContent={'space-between'} style={{ color: '#f46d25' }} >
            <Typography variant="h6" style={{ width: '60%' }}>Lead Scoring:
              <span style={{ color: '#111', textAlign: 'right' }}>
                <>
                  {agentDetail.leadscoring !== "new" ? null : (
                    <>
                      <span
                        style={{
                          fontSize: "20px",
                          marginLeft: '5px',
                        }}
                      >
                        New
                      </span>
                      <span style={{ marginTop: '9px' }}><FiberNewIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /></span>
                    </>
                  )}
                  <>
                    {agentDetail.leadscoring !== "lost" ? null : (
                      <span
                        style={{
                          color: "#c1c1c1",
                          fontSize: "20px",
                          fontWeight: 'bold',
                        }}
                      >
                        lost <ThumbDownIcon style={{ marginLeft: "10px", color: '#c1c1c1', fontSize: '26px' }} />
                      </span>
                    )}

                  </>
                  {agentDetail.leadscoring !== "closed" ? null : (
                    <span
                      style={{
                        color: "#0ca909",
                        marginTop: "-5px",
                        marginBottom: "6px",
                        fontSize: "20px",
                      }}
                    >
                      Closed (<ThumbUpIcon style={{ marginLeft: "10px", color: '#1eaf1e', fontSize: '26px' }} />)
                    </span>
                  )}
                  {agentDetail.leadscoring !== "followup" ? null : (
                    <span
                      style={{
                        color: "#000",
                        width: '55%',
                        // marginTop: "-5px",
                        // marginLeft: '5px',
                        // marginBottom: "6px",
                        fontSize: "20px",
                      }}
                    >
                      Follow Up
                      (
                      {(agentDetail.leadscoring === "followup" && agentDetail.leadscoringvalue === "followuphot") ? (
                        <>
                          <WhatshotTwoToneIcon style={{ color: 'DF2038' }} />
                          <span
                            style={{
                              color: "#333", fontWeight: "bold",
                              // marginTop: "-38px",
                              // marginLeft: "35px",
                              // marginBottom: "3px",
                              fontSize: "20px",
                            }}
                          >
                            Hot
                          </span>
                        </>
                      ) : null}
                      {(agentDetail.leadscoring === "followup" && agentDetail.leadscoringvalue === "followupwarm") ? (
                        <>
                          <BrightnessHighIcon style={{ color: "EA8A23" }} />
                          <span
                            style={{
                              color: "#333",
                              fontWeight: "bold",
                              // marginTop: "-38px",
                              // marginLeft: "35px",
                              // marginBottom: "3px",
                              fontSize: "20px",
                            }}
                          >
                            Warm
                          </span>
                        </>
                      ) : null}
                      {(agentDetail.leadscoring === "followup" && agentDetail.leadscoringvalue === "followupcold") ? (
                        <>
                          <AcUnitIcon style={{ color: "#8aceee" }} />
                          <span
                            style={{
                              color: "#333",
                              fontWeight: "bold",
                              // marginTop: "-38px",
                              // marginLeft: "35px",
                              // marginBottom: "3px",
                              fontSize: "20px",
                            }}
                          >
                            Cold
                          </span>
                        </>
                      ) : null}
                      {(agentDetail.leadscoring === "followup" && agentDetail.leadscoringvalue !== "followuphot" && agentDetail.leadscoringvalue !== "followupwarm" && agentDetail.leadscoringvalue !== "followupcold") ? (
                        <EventNoteIcon style={{ marginLeft: "10px", color: '#0000a5', fontSize: '26px' }} />
                      ) : null}
                      )
                    </span>
                  )}
                </>
              </span>
            </Typography>
            <div style={{ width: '35%', textAlign: 'left' }}>
              {agentDetail.leadscoring === "lost" ? (
                <>
                  <span
                    style={{
                      color: "#f46d25",
                      marginTop: "15px",

                      textAlign: 'left',
                      fontSize: "20px",

                      // fontWeight: 'bold',
                    }}
                  >
                    Reason:
                  </span>
                  <span
                    style={{
                      color: "black",
                      fontSize: "20px",
                      marginLeft: "5px",
                    }}
                  >
                    {agentDetail.reason}
                  </span></>
              ) : null
              }


            </div>
          </Stack>
        </Stack>
        {/* </div> */}
      </Dialog>

    </>
  );
}
