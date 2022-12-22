import React, { useState, useEffect } from "react";
import { Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { baseurl } from "../../Service/httpCommon";
import Api from "../../Service/Api";
import { useParams } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "20px 0px",
  },
  li: {
    fontSize: "15px",
  },
}));

export default function Passenger() {
  const [passenger, setPassenger] = useState([]);
  const uniqueId = localStorage.getItem("unique_id");
  const { id } = useParams();
  const [width, setWidth] = useState(window.innerWidth);
  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    Api.get(`roomlead/${uniqueId}/${id}`).then((res) => {
      setPassenger(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {width <= 768 ? (
        <>
          {passenger.map((passenger) => (
            <div key={passenger.id} className="bookingvouchercard">
              <div className="split">
                <div className="preview">
                  <p>Name </p>:<span>{passenger.name}</span>
                </div>
                <div className="preview">
                  <p>Mobile</p> :<span>{passenger.mobile}</span>
                </div>
                <div className="preview">
                  <p>Mobile</p> :<span>{passenger.email}</span>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <Grid container>
          <Grid item lg={12}>
            <table
              style={{
                width: "100%",
                padding: "10px",
                background: "#F4F4F4",
                margin: "20px 0px",
                borderRadius: "8px",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ width: "30%", fontWeight: "600" }}>Name</td>
                  <td style={{ width: "2%" }}>:</td>
                  <td style={{ width: "68%",textTransform:"capitalize" }}>{bookingDetails.clientName}</td>
                </tr>
                <tr>
                  <td style={{ width: "30%", fontWeight: "600" }}>Mobile No</td>
                  <td style={{ width: "2%" }}>:</td>
                  <td style={{ width: "68%" }}>
                    {bookingDetails.clientMobile}
                  </td>
                </tr>
                <tr>
                  <td style={{ width: "30%", fontWeight: "600" }}>Email Id</td>
                  <td style={{ width: "2%" }}>:</td>
                  <td style={{ width: "68%" }}>{bookingDetails.clientEmail}</td>
                </tr>
                <tr>
                  <td style={{ width: "30%", fontWeight: "600" }}>Address</td>
                  <td style={{ width: "2%" }}>:</td>
                  <td style={{ width: "68%" }}>
                    {bookingDetails.clientAddress}
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item lg={12}>
            <h4 style={{margin:"2px"}}>Lead Pax</h4>
          </Grid>
          <Grid item lg={12}>
            <div style={{ background: "#F4F4F4", borderRadius: "4px" }}>
              <Table className={classes.table}>
                <TableBody>
                  {passenger.map((passenger, index) => (
                    <TableRow key={passenger.id}>
                      <TableCell>
                        <b>{index + 1}.</b>
                      </TableCell>
                      <TableCell>
                        {passenger.name}
                        <br />
                        {passenger.email}
                      </TableCell>
                      <TableCell>
                        {passenger.mobile} <br />
                        {passenger.altMobile}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
