/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core/";
import Itienary from "./Itienary";
import {
  Route,
  Switch,
  NavLink,
  useRouteMatch,
  Link,
  useLocation,
} from "react-router-dom";
import Passenger from "./Passenger";
import Payment from "./Payment";
import History from "./History";
import Notes from "./Notes";
import Document from "./Document";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import NoteAdd from "./NoteAdd";
import AddPax from "./AddPax";
import RecievePayment from "./RecievePayment";
import ReturnPayment from "./ReturnPayment";
const useStyles = makeStyles((theme) => ({
  main: {
    display: "block",
    position: "relative",
  },
  sidebar: {
    position: "fixed",
    top: "68px",
    marginLeft: "10px",
    height: "100%",
    width: "12%",
    background: "#000",
    zIndex: "100",
    display: "inline-block",
  },
  layout: {
    display: "inline-block",
    verticalAlign: "top",
    width: "80%",
    marginLeft: "18%",
    paddingTop: "100px",
  },
  navLinks: {
    height: "100%",
    padding: "10px 0 0px 0",
    overflow: "auto",
  },
  li: {
    position: "relative",
    listStyle: "none",
    borderBottom: "0.1px solid #F46D25",
  },
  link: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: "14px",
    color: "#fff",
    padding: "10px 15px",
  },
  bottom: {
    position: "relative",
    top: "10px",
    textAlign: "end",
  },
}));
let isMounted = false;
export default function SideBar() {
  const classes = useStyles();
  const { url, path } = useRouteMatch();
  let location = useLocation();
  const bookingDetails = useSelector(
    (state) => state.bookingDetails.bookingDetail
  );console.log(bookingDetails);
  const [openPayment, setOpenPayment] = useState(false);
  const [openPaymentReturn, setOpenPaymentReturn] = useState(false);

  const [openPax, setOpenPax] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const OpenDialogPayment = () => {
    setOpenPayment(true);
  };
  const CloseDialogPayment = () => {
    setOpenPayment(false);
  };
  
  const OpenDialogPaymentReturn = () => {

    
    setOpenPaymentReturn(true);
  };
  const CloseDialogPaymentReturn = () => {
    
    setOpenPaymentReturn(false);
  };
  const OpenDialogNote = () => {
    setOpenNote(true);
  };
  const CloseDialogNote = () => {
    setOpenNote(false);
  };
  const OpenDialogPax = () => {
    isMounted = true;
    setOpenPax(true);
  };
  const CloseDialogPax = () => {
    isMounted = false;
    setOpenPax(false);
  };
  return (
    <div className={classes.main}>
      <div className={classes.sidebar}>
        <ul className="nav-links">
          <li className="listing">
            <NavLink to={`${url}`} exact={true} activeClassName="active-link">
              Itinerary
            </NavLink>
          </li>
          <li className="listing">
            <NavLink
              to={`${url}/passenger`}
              activeClassName="active-link"
              className={classes.link}
            >
              Client Details
            </NavLink>
          </li>
          <li className="listing">
            <NavLink
              to={`${url}/payment`}
              activeClassName="active-link"
              className={classes.link}
            >
              Payment
            </NavLink>
          </li>
          <li className="listing">
            <NavLink
              to={`${url}/document`}
              activeClassName="active-link"
              className={classes.link}
            >
              Documents
            </NavLink>
          </li>
          <li className="listing">
            <NavLink
              to={`${url}/history`}
              activeClassName="active-link"
              className={classes.link}
            >
              History
            </NavLink>
          </li>
          <li className="listing">
            <NavLink
              to={`${url}/notes`}
              activeClassName="active-link"
              className={classes.link}
            >
              Note
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={classes.layout}>
        <Switch>
          <Route path={`${path}`} component={Itienary} exact />
          <Route path={`${path}/passenger`} component={Passenger} />
          <Route path={`${path}/payment`} component={Payment} />
          <Route path={`${path}/document`} component={Document} />
          <Route path={`${path}/history`} component={History} />
          <Route path={`${path}/Notes`} component={Notes} />
        </Switch>
        <div className={classes.bottom}>
          {location.pathname === `${url}/passenger` ? (
            <Button
              onClick={OpenDialogPax}
              style={{ margin: "0px 10px 0px 0px" }}
              size="small"
            >
              Edit Booking
            </Button>
          ) : null}

          {location.pathname === `${url}/notes` ? (
            <Button
              onClick={OpenDialogNote}
              style={{ margin: "10px 5px 10px 0px" }}
              size="small"
            >
              Add Note
            </Button>
          ) : null}

          {location.pathname === `${url}/payment` ? (
            <>
              {bookingDetails.bookingStatus == "Cancel" ? (<>
                {bookingDetails.refundBy == "true" ? (
                <Button size="small" disabled onClick={OpenDialogPaymentReturn}>
                  <span>Add Refund</span>
                </Button>):(
                <Button size="small" onClick={OpenDialogPaymentReturn}>
                  <span>Add Refund</span>
                </Button>)}</>
              ) : bookingDetails.bookingStatus == "Completed" ? null : (
                <>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={OpenDialogPayment}
                    color="primary"
                  >
                    Add Payment
                  </Button>
                </>
              )}
            </>
          ) : null}

          <Button
            variant="contained"
            component={Link}
            to="/bookinglist"
            size="small"
            style={{
              background: "#121212",
              color: "#fff",
              margin: "10px",
            }}
          >
            Back
          </Button>
        </div>
      </div>
      {isMounted ? <AddPax open={openPax} onClose={CloseDialogPax} /> : null}
      <NoteAdd open={openNote} onClose={CloseDialogNote} />
      <RecievePayment open={openPayment} onClose={CloseDialogPayment} />
      <ReturnPayment
        open={openPaymentReturn}
        onClose={CloseDialogPaymentReturn}
      />
    </div>
  );
}
