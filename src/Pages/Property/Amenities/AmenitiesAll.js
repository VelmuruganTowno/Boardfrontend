import React from "react";
import { makeStyles, Grid } from "@material-ui/core/";
import BasicFacilities from "./BasicFacilities";
import GeneralService from "./GeneralService";
import CommonArea from "./CommonArea";
import FoodDrink from "./FoodDrink";
import Health from "./Health";
import Transfers from "./Transfers";
import Entertainments from "./Entertainments";
import PaymentService from "./PaymentService";
import SafetyHygiene from "./SafetyHygiene";
import Security from "./Security";
import Favourite from "./Favourite";
import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  sidebar: {
    position: "fixed",
    top: "68px",
    height: "100%",
    background: "#000",
    zIndex: "100",
    width: "12%",
  },
  layout: {
    padding: "0px 20px 0px 0px",
  },
}));

export default function AmenitiesAll() {
  const classes = useStyles();
  const { url, path } = useRouteMatch();

  return (
    <>
      <Grid container>
        <Grid item sm={2}>
          <div className={classes.sidebar}>
            <ul className="nav-links">
            <li className="listingAmen">
                <NavLink
                  to={`${url}`}
                  exact={true}
                  activeClassName="active-link"
                >
                  Favourite
                </NavLink>
              </li>

              <li className="listingAmen">
                <NavLink
                  to={`${url}/basicFacilities`}
                  exact={true}
                  activeClassName="active-link"
                >
                  Basic Details
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink
                  to={`${url}/generalService`}
                  activeClassName="active-link"
                >
                  General Service
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink to={`${url}/commonArea`} activeClassName="active-link">
                  Common Area
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink to={`${url}/foodDrink`} activeClassName="active-link">
                  Food Drink
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink to={`${url}/health`} activeClassName="active-link">
                  Health & Beauty
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink to={`${url}/transfers`} activeClassName="active-link">
                  Transfers
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink
                  to={`${url}/paymentService`}
                  activeClassName="active-link"
                >
                  Payment Service
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink
                  to={`${url}/entertainments`}
                  activeClassName="active-link"
                >
                  Entertainment
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink
                  to={`${url}/safetyHygiene`}
                  activeClassName="active-link"
                >
                  Safety & Hygiene
                </NavLink>
              </li>
              <li className="listingAmen">
                <NavLink to={`${url}/security`} activeClassName="active-link">
                  Security
                </NavLink>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item sm={10}>
          <div className={classes.layout}>
            <Switch>
            <Route path={`${path}`} component={Favourite} exact/>
              <Route path={`${path}/basicFacilities`} component={BasicFacilities}  />
              
              <Route
                path={`${path}/generalService`}
                component={GeneralService}
              />
              <Route path={`${path}/commonArea`} component={CommonArea} />
              <Route path={`${path}/foodDrink`} component={FoodDrink} />
              <Route path={`${path}/health`} component={Health} />
              <Route path={`${path}/transfers`} component={Transfers} />
              <Route
                path={`${path}/paymentService`}
                component={PaymentService}
              />
              <Route
                path={`${path}/entertainments`}
                component={Entertainments}
              />
              <Route path={`${path}/safetyHygiene`} component={SafetyHygiene} />
              <Route path={`${path}/security`} component={Security} />
              
              
            </Switch>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
