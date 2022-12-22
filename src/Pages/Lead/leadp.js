import { Grid,FormControlLabel,Radio, Container } from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import Boardlead from "./boardlead";
import LeadAgent from "./leadAgent";
import React, { useState } from "react";
const initialValues = {
  status: "active",
};
export default function Lead() {
  let [full, setFull] = useState("active");
  return (
    <Container>
      <div style={{ paddingTop: "150px" }}>
        <Grid
          container style={{
            marginBottom: "-140px",
            marginLeft: "24px",
          }}
          spacing={1}
        >
          <Formik enableReinitialize initialValues={initialValues}>
            <Form autoComplete="off">
              <Grid
                container
                item
                lg={12}
                style={{
                  marginBottom: "-100px",
                  borderRadius: "10px",
                  background: "#121212",
                }}
              >
                <Grid
                  item
                  lg={6}
                  style={{
                    color: "#fff",
                    padding: "2px 4px",
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "5px",
                    height: "50px",
                    background: "#f46d25",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                      as={Radio}
                        type="radio"
                        name="status"
                        color="primary"
                        value="active"
                        onClick={() => setFull("active")}
                        style={{
                          color: "black",
                          fontSize: "18px",
                        }}
                      />
                    }
                    label={
                      <span style={{ fontSize: "18px" }}>Board Lead</span>
                    }
                  />
                </Grid>
                <Grid
                  item
                  lg={6}
                  style={{
                    color: "#fff",
                    height: "50px",
                    borderRadius: "5px",
                    marginTop: "-4px",
                    padding: "2px 4px",
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Field
                      as={Radio}
                        type="radio"
                        name="status"
                        color="primary"
                        value="inactive"
                        onClick={() => setFull("inactive")}
                        style={{
                          color: "#f46d25",
                          fontSize: "18px",
                        }}
                      />
                    }
                    label={
                      <span style={{ fontSize: "18px" }}>Travel Agent Lead</span>
                    }
                  />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Grid>
        {full !== "active" ? <LeadAgent /> : <Boardlead />}
              </div>
    </Container>
  );
}
