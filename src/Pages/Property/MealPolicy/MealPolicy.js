/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { baseurl } from "../../../Service/httpCommon";
import Api from "../../../Service/Api";
import { Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "20px 20px 0px 20px",
      height: "auto",
    },
  },
  bottom: {
    display: "flex",
    flexWrap: "wrap",
    float: "right",
    "& > *": {
      margin: "20px 100px 50px 20px",
      width: theme.spacing(16),
      height: "auto",
    },
  },
  paper: {
    width: "100%",
  },

  heading: {
    textAlign: "left",
    fontSize: "20px",
  },
  layout: {
    margin: "40px 20px",
  },
}));

export default function MealPolicy() {
  const classes = useStyles();
  var propertyId = sessionStorage.getItem("propertyId");
  var uniqueid = localStorage.getItem("unique_id");
  var createdBy = localStorage.getItem("auth");
  const [message, setMessage] = useState("");
  const [termData, setTermData] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleCkeditor = (event, editor) => {
    const data = editor.getData();
    setMessage(data);
  };

  const GetMealPolicy = () => {
    Api
      .post( "mealplantermsandconditionsvalue", {
        propertyId: propertyId,
      })
      .then((res) => {
        setTermData(res.data);
        if (res.data !== "" && res.data!=null ) {
          setMessage(res.data.message);
        }
      });
  };
  useEffect(() => {
    GetMealPolicy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mySubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const Data = {
      message: message,
      uniqueId: uniqueid,
      createdBy: createdBy,
      propertyId: propertyId,
    };
    const updateData = {
      message: message,
      updatedBy: createdBy,
      uniqueId: uniqueid,
      createdBy: createdBy,
      propertyId: propertyId,
    };

    if (
      termData.id !== null &&
      termData.id !== "" &&
      termData.id !== undefined
    ) {
      Api
        .put(
          "mealplantermsandconditionsupdate/" + termData.id,
          updateData
        )
        .then((res) => {
          if (res.status === 200) {
            toast.success("Updated Successfully");
            setLoading(false);
            history.push("/propertyList");
          }
        });
    } else {
      Api.post("mealplantermsandconditions", Data).then((res) => {
        if (res.status === 200) {
          toast.success("Created Successfully");
          setLoading(false);
          history.push("/propertyList");
        }
      });
    }
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.paper}>
          <h4 className={classes.heading}>MealPlan Policy</h4>
          <div className={classes.layout}>
            <Paper className={classes.paper} variant="outlined">
              <div className={classes.layout}>
                <form onSubmit={mySubmit}>
                  <Grid container spacing={2}>
                    <Grid item sm={12}>
                      <div>
                        <CKEditor
                          editor={ClassicEditor}
                          type="inline"
                          config={{
                            toolbar: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "blockQuote",
                              "link",
                              "numberedList",
                              "bulletedList",
                              "mediaEmbed",
                              "|",
                              "undo",
                              "redo",
                            ],
                          }}
                          name="message"
                          onChange={handleCkeditor}
                          value={message}
                          content={message}
                          data={message}
                        />
                      </div>
                    </Grid>

                    <Grid item sm={12}>
                      {loading ? (
                        <Button
                          type="submit"
                          className={classes.button}
                          disabled
                        >
                          <i
                            className="fa fa-refresh fa-spin"
                            style={{
                              marginRight: "8px",
                            }}
                          ></i>
                          Save and Continue
                        </Button>
                      ) : (
                        <Button type="submit" className={classes.button}>
                          Save and Continue
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
}
