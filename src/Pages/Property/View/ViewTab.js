import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import Api from "../../../Service/Api";
import { useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#F4F4F4",
    margin: "10px 0px",
    "@media(max-width:767px)": {
      background: "#fff",
      borderRadius: "0px 0px 7px 7px",
      boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    },
  },
  appbar: {
    background: "#F4F4F4",
    boxShadow: "none",
    "@media(max-width:767px)": {
      background: "#343A40",
      borderRadius: "7px 7px 0px 0px",
      color: "#fff",
    },
  },
  space: {
    background: "#fff",
    height: "10px",
    "@media(max-width:767px)": {
      height: "0px",
    },
  },
}));

export default function ViewTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [contactData, setContactData] = useState({});
  const { id } = useParams();
  const data = { propertyId: id };
  const hotelDetails = useSelector((state) => state.hotelDetail.hotelDetails);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    getEnterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getEnterData = () => {
    Api.post("propertybasiccontactvalue", data).then((res) => {
      setContactData(res.data);
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: "#f46d25" } }}
        >
          <Tab label="About" {...a11yProps(0)} />
          <Tab label="Contact" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <div className={classes.space}></div>
      <TabPanel value={value} index={0}>
        {hotelDetails.description}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ul>
          <li>
            <span>Phone</span> :{contactData.hotelPhone}
          </li>
          <li>
            <span>Mobile</span> :{contactData.hotelMobile}
          </li>
        </ul>
      </TabPanel>
    </div>
  );
}
