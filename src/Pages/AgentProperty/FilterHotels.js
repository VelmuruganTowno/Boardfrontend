import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Button,
  TableContainer,
  Grid,
} from "@material-ui/core";
import React from "react";
import { baseurl } from "../../Service/httpCommon";
import { makeStyles } from "@material-ui/core/styles";
import "./Table.css";
import { useHistory } from "react-router-dom"
import { Stack } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "2px",
    margin: "0px",
    "@media (max-width: 867px)": {
      margin: "0px 10px",
    },
  },
}));

export default function FilterHotels(props) {
  const { Data } = props;
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <div className="hotelView" style={{ paddingTop: "5px" }}>
          <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table style={{ bordercolor: "black" }}>
                <TableBody>
                  {Data.map((item) => (
                    <TableRow key={item.id} tabIndex={1}>
                      <TableCell>
                        {" "}
                        <Grid container spacing={1}>
                          <Grid item sm={4}>
                            <img
                              src={`${baseurl}getimage/${item.photo}`}
                              alt="HotelImage"
                            />
                          </Grid>{" "}
                          <Grid item lg={8}>
                            <h4>{item.displayName}</h4>
                            <h3>{item.starRating} stars</h3>
                            <Stack direction='row' spacing={4}>
                              <p>{item.city}</p>
                              {/* <Stack direction='row' style={{marginTop:'5px',fontSize:"15px"}}>
                                <span><span style={{color:"#f46d25",fontWeight:"bold"}}>Rate</span> : {item.rent}  |</span>
                                <span>| <span style={{color:"#f46d25",fontWeight:"bold"}}>Net</span> : 8000 |</span>
                                <span>| <span style={{color:"#f46d25",fontWeight:"bold"}}>Percentage</span> : 40%  </span>
                              </Stack> */}
                            </Stack>
                            <br />
                            <Grid container spacing={1}>
                              <Grid item sm={4}>
                                <Button onClick={(e) => { history.push(`/hotelView/${item.propertyId}`) }} fullWidth>Search Rooms</Button>
                              </Grid>
                              <Grid item sm={8}>
                                <Button > Rs.{item.rent} /- (Night).</Button>
                              </Grid>{" "}
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </Container>
    </div>
  );
}
