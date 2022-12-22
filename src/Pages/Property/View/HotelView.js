import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ImageSlider from "./ImageSlider";
import Images from "./Images";
import HotelBoard from "./HotelBoard";
import ViewTab from "./ViewTab";
import RoomList from "./RoomList";
import Terms from "./Terms";
import CancellationPolicy from "./CancellationPolicy";
import MealPolicy from "./MealPolicy";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hotelDetailsInitial } from "../../../redux/actions/hotelViewAction";
import AmenitiesData from "./Amenities/AmenitiesData";
import { Button } from "@mui/material";
import { twnButtonStyles } from "../../../utils/townoStyle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: "80px",
    margin: "0px 25px",
    "@media(max-width:767px)": {
      padding: "80px 0px",
      margin: "0px 10px",
    },
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    height: "100%",
    background: "#F4F4F4",
    "@media(max-width:767px)": {
      height: "auto",
      padding: theme.spacing(1),
      background: "#fff",
      borderRadius: "0px 0px 7px 7px",
      boxShadow: "0px 1px 4px 1px rgba(52, 58, 64, 0.1)",
    },
  },
  list: {
    textAlign: "initial",
    fontSize: "17px",
  },
  favourite:{
    "@media(max-width:767px)": {
      margin:"0px"
    },
  },
  icons: {
    verticalAlign: "middle",
    fontSize: "18px",
  },
}));

export default function HotelView() {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = { propertyId: id };
  const hotelDetails = useSelector((state) => state.hotelDetail.hotelDetails);
  const [width, setWidth] = useState(window.innerWidth);
  const [close,setClose]=useState(false);

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    dispatch(hotelDetailsInitial(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <>
      <div className={classes.root}>
        {width <= 768 ? (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ImageSlider />
              </Grid>
              <Grid item sm={12} xs={12}>
                <HotelBoard />
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <h3 className={classes.favourite}>Favourite</h3>
                  <ul className={classes.list}>
                    {hotelDetails.checkIn24 ? (
                      <>
                        <li> 24 Hour Check-in</li>{" "}
                      </>
                    ) : null}
                    {hotelDetails.couplefriendly ? (
                      <li>Couple Friendly</li>
                    ) : null}
                    {hotelDetails.petFriendly ? <li>Pet Friendly</li> : null}
                    {hotelDetails.beachnearby ? <li>Beach Nearby</li> : null}
                    {hotelDetails.swimingpool ? <li>Swimingpool</li> : null}
                    {hotelDetails.conferencehall ? <li>Banquet Hall</li> : null}
                    {hotelDetails.kidsplayarea ? <li>Kids Play Area</li> : null}
                    {hotelDetails.designatorforwedding ? (
                      <li>Wedding Destination</li>
                    ) : null}
                    {hotelDetails.isspa ? <li>SPA</li> : null}
                  </ul>
                </Paper>
              </Grid>
              <Grid item sm={12} xs={12}>
                <ViewTab />
              </Grid>
              <Grid item sm={12} xs={12}>
                <RoomList />
              </Grid>
              <Grid item xs={12} sm={12}>
                <AmenitiesData />
              </Grid>
              <Grid item xs={12} sm={12}>
                <CancellationPolicy />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Terms />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container spacing={3}>
            <Grid container item md={9} xs={12}>
              <Grid item md={4} xs={6}>
                <ImageSlider />
              </Grid>
              <Grid item md={8} xs={6}>
                <Images />
              </Grid>
              <Grid item sm={12} xs={12}>
                <HotelBoard />
                <ViewTab />
                <RoomList />
              </Grid>
            </Grid>
            <Grid item md={3} xs={12}>
              <Paper className={classes.paper}>
                <h3>Favourite</h3>
                <ul className={classes.list}>
                  {hotelDetails.checkIn24 ? (
                    <>
                      <li> 24 Hour Check-in</li>{" "}
                    </>
                  ) : null}
                  {hotelDetails.couplefriendly ? (
                    <li>Couple Friendly</li>
                  ) : null}
                  {hotelDetails.petFriendly ? <li>Pet Friendly</li> : null}
                  {hotelDetails.beachnearby ? <li>Beach Nearby</li> : null}
                  {hotelDetails.swimingpool ? <li>Swimingpool</li> : null}
                  {hotelDetails.conferencehall ? <li>Banquet Hall</li> : null}
                  {hotelDetails.kidsplayarea ? <li>Kids Play Area</li> : null}
                  {hotelDetails.designatorforwedding ? (
                    <li>Wedding Destination</li>
                  ) : null}
                  {hotelDetails.isspa ? <li>SPA</li> : null}
                </ul>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} style={{ marginTop: "40px" }}>
              <AmenitiesData />
            </Grid>
            <Grid item xs={12} sm={12}>
              <CancellationPolicy />
              <Terms />
              <MealPolicy />
            </Grid>
            <Button onClick={()=>history.goBack()} style={{...twnButtonStyles.orangeBtn,marginBottom:"1%",marginLeft:"50%"}}>Back</Button>
          </Grid>
        )}
      </div>
    </>
  );
}
