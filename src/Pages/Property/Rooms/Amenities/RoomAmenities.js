import React from "react";
import { makeStyles } from "@material-ui/core/";
import { Route, Switch, NavLink, useRouteMatch } from "react-router-dom";
import PopularGuests from "./PopularGuests";
import Bathroom from "./Bathroom";
import RoomFeatures from "./RoomFeatures";
import MediaEntertainment from "./MediaEntertainment";
import KitchenAppliances from "./KitchenAppliances";
import Photo from "./Photo/Photo";
import RoomFavourite from "./RoomFavourite";

const useStyles = makeStyles((theme) => ({
  theme: {
    backgroundColor: theme.palette.background.paper,
    display: "table-cell",
    verticalAlign: "Top",
    width: "300px",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  link: {
    display: "block",
    textDecoration: "none",
    border: "1px solid rgb(0 0 0 / 6%)",
    color: "#000000DE",
    padding: "15px",
  },
}));

const activestyle = {
  fontWeight: "bold",
  color: "#fff",
  background: "#F46D25",
  display: "block",
  textDecoration: "none",
};

export default function AmenitiesAll() {
  const classes = useStyles();
  const { url, path } = useRouteMatch();

  return (
    <>
      <div className={classes.theme}>
        <NavLink
          to={`${url}`}
          exact={true}
          activeStyle={activestyle}
          className={classes.link}
        >
          Room Favourite
        </NavLink>

        <NavLink
          to={`${url}/popularguest`}
          exact={true}
          activeStyle={activestyle}
          className={classes.link}
        >
          Popular with Guests
        </NavLink>
        <NavLink
          to={`${url}/bathroom`}
          activeStyle={activestyle}
          className={classes.link}
        >
          Bathroom
        </NavLink>
        <NavLink
          to={`${url}/roomFeatures`}
          activeStyle={activestyle}
          className={classes.link}
        >
          Room Features
        </NavLink>

        <NavLink
          to={`${url}/mediaEntertainment`}
          activeStyle={activestyle}
          className={classes.link}
        >
          Media & Entertainment
        </NavLink>
        <NavLink
          to={`${url}/kitchenAppliances`}
          activeStyle={activestyle}
          className={classes.link}
        >
          Kitchen Appliances
        </NavLink>

        <NavLink
          to={`${url}/photo`}
          activeStyle={activestyle}
          className={classes.link}
        >
          Photo
        </NavLink>
      </div>
      <Switch>
        <Route path={`${path}`} component={RoomFavourite} exact />
        <Route path={`${path}/popularguest`} component={PopularGuests} />
        <Route path={`${path}/bathroom`} component={Bathroom} />
        <Route path={`${path}/roomFeatures`} component={RoomFeatures} />
        <Route
          path={`${path}/mediaEntertainment`}
          component={MediaEntertainment}
        />
        <Route
          path={`${path}/kitchenAppliances`}
          component={KitchenAppliances}
        />
        <Route path={`${path}/photo`} component={Photo} />
      </Switch>
    </>
  );
}
