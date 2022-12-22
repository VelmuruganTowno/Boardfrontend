/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, Suspense } from "react";
import {
  Route,
  Switch,
  NavLink,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import "./Add.css";
import BasicDetailAll from "./Basic/BasicDetailAll";
import Bank from "./BankDetails/Bank";
import Loader from "../../components/Loader/Loader";
import Photo from "./Photo/Photo";
import Video from "./Video/Video";
import TermsAndCondition from "./TermsAndCondition/TermsAndCondition";
import CancellationPolicy from "./Cancellation/CancellationPolicy";
import MealplanPolicy from "./MealPolicy/MealPolicy";
import { Tooltip, Grid } from "@material-ui/core";

const AmenitiesAll = React.lazy(() => import("./Amenities/AmenitiesAll"));
const Room = React.lazy(() => import("./Rooms/Room"));

export default function AddNewProperty(props) {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const [hidden, setHidden] = useState(true);
  var propertyId = sessionStorage.getItem("propertyId");

  useEffect(() => {
    if (propertyId !== "" && propertyId !== null && propertyId !== undefined) {
      setHidden(false);
    }
  }, [propertyId]);

  return (
    <>
      <Grid container>
        <Grid item sm={2}>
          <div className="main">
            <div className="sidebar">
              <ul className="nav-links">
                <Tooltip title="Basic Details">
                  <li className="listing">
                    <NavLink
                      to={`${url}`}
                      exact={true}
                      activeClassName="active-link"
                    >
                      <i className="fas fa-university"></i>
                      <span className="link_name">Basic</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title="Amenities">
                  <li className={hidden ? "listinghide" : "listing"}>
                    <NavLink
                      to={`${url}/amenities`}
                      activeClassName="active-link"
                      className={hidden ? "disable" : "disablenone"}
                    >
                      <i className="far fa-file-alt"></i>
                      <span className="link_name">Amenities</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title="Bank Details">
                  <li className={hidden ? "listinghide" : "listing"}>
                    <NavLink
                      to={`${url}/bank`}
                      activeClassName="active-link"
                      className={hidden ? "disable" : "disablenone"}
                    >
                      <i className="fas fa-money-check-alt"></i>
                      <span className="link_name">Bank</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title="Room Details">
                  <li className={hidden ? "listinghide" : "listing"}>
                    <NavLink
                      to={`${url}/room`}
                      activeClassName="active-link"
                      className={hidden ? "disable" : "disablenone"}
                    >
                      <i className="fas fa-hotel"></i>
                      <span className="link_name">Room</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title="Photo">
                  <li className={hidden ? "listinghide" : "listing"}>
                    <NavLink
                      to={`${url}/photo`}
                      activeClassName="active-link"
                      className={hidden ? "disable" : "disablenone"}
                    >
                      <i className="fas fa-camera"></i>
                      <span className="link_name">Photo</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title="Videos">
                  <li className={hidden ? "listinghide" : "listing"}>
                    <NavLink
                      to={`${url}/video`}
                      activeClassName="active-link"
                      className={hidden ? "disable" : "disablenone"}
                    >
                      <i className="fas fa-video"></i>
                      <span className="link_name">Video</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title="Terms & Conditions">
                  <li className={hidden ? "listinghide" : "listing"}>
                    <NavLink
                      to={`${url}/termsAndCondition`}
                      activeClassName="active-link"
                      className={hidden ? "disable" : "disablenone"}
                    >
                      <i className="bx bx-book-alt"></i>
                      <span className="link_name">Terms & Conditions</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title="Cancellation Policy">
                  <li className={hidden ? "listinghide" : "listing"}>
                    <NavLink
                      to={`${url}/cancellationPolicy`}
                      activeClassName="active-link"
                      className={hidden ? "disable" : "disablenone"}
                    >
                      <i className="far fa-file"></i>
                      <span className="link_name">Cancellation Policy</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <Tooltip title="Mealplan Policy">
                  <li className={hidden ? "listinghide" : "listing"}>
                    <NavLink
                      to={`${url}/mealplanPolicy`}
                      activeClassName="active-link"
                      className={hidden ? "disable" : "disablenone"}
                    >
                      <i className="far fa-file"></i>
                      <span className="link_name">Mealplan Policy</span>
                    </NavLink>
                  </li>
                </Tooltip>
                <button
                  className="backbutton"
                  onClick={() => history.push(`/propertyList`)}
                >
                  Back to PropertyList
                </button>
                <button
                  className="backbutton"
                  onClick={() => history.push(`${url}`)}
                >
                  Back to Property
                </button>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid item sm={10}>
          <div className="layout">
            <Suspense fallback={<Loader />}>
              <Switch>
                <Route path={`${path}/amenities`} component={AmenitiesAll} />
                <Route path={`${path}/room`} component={Room} />
              </Switch>
            </Suspense>
            <Switch>
              <Route exact path={`${path}`} component={BasicDetailAll} />
              <Route path={`${path}/bank`} component={Bank} />
              <Route path={`${path}/photo`} component={Photo} />
              <Route path={`${path}/video`} component={Video} />
              <Route
                path={`${path}/termsAndCondition`}
                component={TermsAndCondition}
              />
              <Route
                path={`${path}/cancellationPolicy`}
                component={CancellationPolicy}
              />
              <Route
                path={`${path}/mealplanPolicy`}
                component={MealplanPolicy}
              />
            </Switch>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
