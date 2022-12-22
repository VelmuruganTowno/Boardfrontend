import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Api from "../../../Service/Api";
import parse from "html-react-parser";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#f4f4f4",
    "@media(max-width:767px)": {
      background: "#fff",
      borderRadius: "0px 0px 7px 7px",
      boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    },
  },
  title: {
    background: "#d8d8d8",
    height: "40px",
    paddingLeft: "25px",
    display: "flex",
    alignItems: "center",
    "@media(max-width:767px)": {
      background: "#F46D25",
      margin: "0px",
      color: "#fff",
      fontSize: "14px",
      paddingLeft: "10px",
    },
  },
}));

export default function StayInclusion() {
  const classes = useStyles();
  const { id } = useParams();
  const [mealplan, setMealplan] = useState("");
  useEffect(() => {
    Api.post("mealplantermsandconditionsvalue", { propertyId: id }).then((res) => {
      setMealplan(res.data.message);
    });
  }, [id]);
  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Meal Policy</h3>
      <div style={{ margin: "10px 20px", paddingBottom: "10px" }}>
        {_.isEmpty(mealplan) ? null : parse(mealplan)}
      </div>
    </div>
  );
}
