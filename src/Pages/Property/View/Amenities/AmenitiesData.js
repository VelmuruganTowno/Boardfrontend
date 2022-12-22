import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BasicFacilitiesView from "./BasicFacilitiesView";
import GeneralView from "./GeneralView";
import CommonAreaView from "./CommonAreaView";
import FoodView from "./FoodView";
import HealthView from "./HealthView";
import TransferView from "./TransferView";
import PaymentView from "./PaymentView";
import EntertainmentView from "./EntertainmentView";
import SafetyView from "./SafetyView";
import SecurityView from "./SecurityView";
import "./style.css";
import Api from "../../../../Service/Api";
import { useParams } from "react-router-dom";
import _ from "lodash";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: "16px",
    fontWeight: 600,
    margin:"0px 20px" 
  },
}));

export default function AmenitiesData() {
  const classes = useStyles();
  const { id } = useParams();
  const data = { propertyId: id };
  const [basicData, setBasicData] = useState({});
  const [commonData, setCommonData] = useState({});
  const [generalData, setGeneralData] = useState({});
  const [foodData, setFoodData] = useState({});
  const [healthData, setHealthData] = useState({});
  const [transferData, setTransferData] = useState({});
  const [paymetData, setPaymetData] = useState({});
  const [entertainmentData, setEntertainmentData] = useState({});
  const [securityData, setSecurityData] = useState({});
  const [safetyData, setSafetyData] = useState({});

  useEffect(() => {
    getBaiscData();
    getCommonData();
    getGeneralData();
    getFoodData();
    getHealthData();
    getTransferData();
    getPaymetData();
    getEnterData();
    getSafeData();
    getSecurityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBaiscData = () => {
    Api.post("amenitiesbasicfacilitiesvalue", data).then((res) => {
      setBasicData(res.data);
    });
  };
  const getCommonData = () => {
    Api.post("amenitiescommonareavalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setCommonData(res.data);
      }
    });
  };
  const getGeneralData = () => {
    Api.post("AmenitiesGeneralServicevalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setGeneralData(res.data);
      }
    });
  };

  const getFoodData = () => {
    Api.post("AmenitiesFoodAndDrinksvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setFoodData(res.data);
      }
    });
  };
  const getHealthData = () => {
    Api.post("AmenitiesHealthAndBeautyvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setHealthData(res.data);
      }
    });
  };
  const getTransferData = () => {
    Api.post("AmenitiesTransfersvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setTransferData(res.data);
      }
    });
  };
  const getPaymetData = () => {
    Api.post("AmenitiesPaymentServicevalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setPaymetData(res.data);
      }
    });
  };
  const getEnterData = () => {
    Api.post("AmenitiesEntertainmentvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setEntertainmentData(res.data);
      }
    });
  };

  const getSafeData = () => {
    Api.post("AmenitiesSafetyAndHygienevalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setSafetyData(res.data);
      }
    });
  };

  const getSecurityData = () => {
    Api.post("AmenitiesSecurityvalue", data).then((res) => {
      const ValidCheck = Object.values(res.data).includes(true);
      if (ValidCheck === true) {
        setSecurityData(res.data);
      }
    });
  };

  return (
    <div className={classes.root}>
      {_.isEmpty(basicData) ? null : (
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>
              Basic Facilities
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BasicFacilitiesView basicData={basicData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(generalData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>General Service</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <GeneralView generalData={generalData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(commonData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>Common Area</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CommonAreaView commonData={commonData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(foodData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>Food and Drinks</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FoodView foodData={foodData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(healthData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>
              Health and Beauty
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HealthView healthData={healthData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(transferData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>Transfer</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TransferView transferData={transferData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(paymetData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>Payment Service</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <PaymentView paymetData={paymetData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(entertainmentData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>Entertainments</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EntertainmentView entertainmentData={entertainmentData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(safetyData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>
              Safety and Hygiene
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SafetyView safetyData={safetyData} />
          </AccordionDetails>
        </Accordion>
      )}
      {_.isEmpty(securityData) ? null : (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            style={{ borderBottom: "1px solid #f46d25" }}
          >
            <Typography className={classes.heading}>Security</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SecurityView securityData={securityData} />
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
}
