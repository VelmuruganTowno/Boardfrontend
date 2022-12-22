/* eslint-disable eqeqeq */
import React, { useState, useRef, useEffect } from "react";
import "./ClientVoucher.css";
import RatingMail from "./RatingMail";
import { Button } from "@material-ui/core";
import { useParams, Link } from "react-router-dom";
import Api from "../../Service/Api";
import { format } from "date-fns";
import moment from "moment";
import parse from "html-react-parser";
import _ from "lodash";
import { formatter } from "../../utils/formatNumber";

export default function ClientVoucher() {
  const tableRef = useRef(null);
  const [copySuccess, setCopySuccess] = useState("copy");
  const { bookingid } = useParams();
  const uniqueid = localStorage.getItem("unique_id");
  const [bookingDetails, setBookingDetails] = useState({});
  const [cancelationpolicy, setCancelationpolicy] = useState({});
  const [termsandcondition, setTermsandcondition] = useState({});
  const [stayInclusion, setStayInclusion] = useState([]);
  const [roomInclusion, setRoomInclusion] = useState([]);
  const [roomOccupied, setroomOccupied] = useState([]);
  const [roomPayment, setRoomPayment] = useState([]);
  const [property, setProperty] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [passenger, setPassenger] = useState([]);

  useEffect(() => {
    Api.get(`bookingdetails/${uniqueid}/${bookingid}`).then((res) => {
      setBookingDetails(res.data);
      Api.post("cancelationpolicyvalue", {
        propertyId: res.data.propertyId,
      }).then((res) => {
        setCancelationpolicy(res.data);
      });
      Api.post("termsandconditionvalue", {
        propertyId: res.data.propertyId,
      }).then((res) => {
        setTermsandcondition(res.data);
      });
      Api.get(`stayinclusion/${res.data.propertyId}`).then((res) => {
        setStayInclusion(res.data);
      });
      Api.post("propertybasicpropertydetailsvalue", {
        propertyId: res.data.propertyId,
      }).then((res) => {
        setProperty(res.data);
      });
    });
    Api.get(`roomlead/${uniqueid}/${bookingid}`).then((res) => {
      setPassenger(res.data);
    });
    Api.get(`roomoccupied/${uniqueid}/${bookingid}`).then((res) => {
      setroomOccupied(res.data);
      const RoomData = _.uniqBy(res.data, "roomType");
      setFiltered(RoomData);
      RoomData.map((item) =>
        Api.get(`stayroominclusion/${item.propertyId}/${item.roomType}`).then(
          (res) => {
            setRoomInclusion((prevState) => [...prevState, ...res.data]);
          }
        )
      );
    });
    Api.get(`roompayment/${uniqueid}/${bookingid}`).then((res) => {
      setRoomPayment(res.data);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const selectedCheckin = moment(bookingDetails.checkin).toDate();
  const selectedCheckout = moment(bookingDetails.checkout).toDate();
  const copyToClip = () => {
    let range = document.createRange();
    range.selectNodeContents(tableRef.current);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("Copy");
    sel.removeAllRanges();
    //paste the copied data to mailto body
    document.addEventListener("paste", function (event) {
      var clipText = event.clipboardData.getData("Text");
      window.location = `mailto:?subject=I wanted you to see this site&body=${clipText}`;
    });
    setCopySuccess("Copied");
  };

  return (
    <div style={{ margin: "20px 0px" }}>
      <div
        ref={tableRef}
        style={{
          maxWidth: "50%",
          margin: "0 auto",
          width: "100%",
          fontSize: "14px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#f46d25",
            width: "100%",
          }}
        >
          <table style={{ width: "100%", padding: "10px" }}>
            <tbody>
              <tr>
                <td style={{ width: "50%" }}>
                  <img
                    src="https://crmtowno.s3.ap-south-1.amazonaws.com/towno-grey-and-white.png"
                    alt="Logo"
                    style={{ width: "100px" }}
                  />
                  <br />
                  <b style={{ color: "#fff", padding: "2px 0px" }}>
                    {bookingDetails.noofRooms} Rooms | {bookingDetails.night}
                    Nights
                  </b>
                </td>
                <td
                  style={{
                    width: "50%",
                    color: "#fff",
                    textAlign: "end",
                    fontSize: "20px",
                  }}
                >
                  <b>{bookingDetails.bookingId}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          style={{
            textAlign: "center",
            backgroundColor: "#1c1c1c",
            width: "100%",
            color: "#fff",
          }}
        >
          <table
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    textAlign: "center",
                    width: "100%",
                    padding: "7px 0px",
                  }}
                >
                  <b>Your Booking is Confirmed</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            width: "100%",
            color: "#000",
          }}
        >
          <div style={{ flex: "100%", padding: "10px", fontSize: "20px" }}>
            <b>{bookingDetails.hotelName}</b>{" "}
            <RatingMail rating={bookingDetails.starRating} />
          </div>
          <div style={{ flex: "100%", padding: "0px 10px 10px 10px" }}>
            <b>Address : </b>
            {bookingDetails.hotelAddress}
            {bookingDetails.hotelContact}
          </div>
          <div
            style={{
              height: "2px",
              backgroundColor: "#f46d25",
              borderColor: "#f46d25",
            }}
          ></div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            width: "100%",
            color: "#000",
            marginTop: "10px",
          }}
        >
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: "#1c1c1c",
                    width: "100%",
                    color: "#fff",
                    padding: "10px",
                  }}
                >
                  <b>Customer Details</b>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%", padding: "10px" }}>
            <tbody>
              <tr>
                <td style={{ width: "49%" }}>Name</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%", textTransform: "capitalize" }}>
                  {bookingDetails.clientName}
                </td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Contact Number</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>{bookingDetails.clientMobile}</td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Room</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>{bookingDetails.noofRooms}</td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Board Type</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%", textTransform: "uppercase" }}>
                  {_.uniqBy(roomOccupied, "boardBasic").map((item) => (
                    <span key={item.id}>{item.boardBasic}</span>
                  ))}
                </td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Adults</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>{bookingDetails.noOfAdults}</td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Children</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>{bookingDetails.noOfChildren}</td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Room Type</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>
                  {_.uniqBy(roomOccupied, "roomType").map((item) => (
                    <span key={item.id}>{item.roomType}<br/></span>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: "#f46d25",
                    color: "#fff",
                    textAlign: "center",
                    width: "40%",
                    padding: "10px",
                  }}
                >
                  <b>Check-in</b> <br />
                  {format(selectedCheckin, "d MMM yy")} |{" "}
                  {_.slice(property.checkinTime, 10)}
                  {""}(IST)
                </td>
                <td
                  style={{
                    backgroundColor: "#f46d25",
                    color: "#fff",
                    textAlign: "center",
                    width: "10%",
                    padding: "10px",
                  }}
                >
                  <b>Duration</b> <br />
                  {bookingDetails.night} Nights
                </td>
                <td
                  style={{
                    backgroundColor: "#f46d25",
                    color: "#fff",
                    textAlign: "center",
                    width: "40%",
                    padding: "10px",
                  }}
                >
                  <b>Check-out </b>
                  <br />
                  {format(selectedCheckout, "d MMM yy")} |{" "}
                  {_.slice(property.checkoutTime, 10)}
                  {""}(IST)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            backgroundColor: "#fff",
            width: "100%",
            color: "#000",
            marginTop: "10px",
          }}
        >
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: "#1c1c1c",
                    width: "100%",
                    color: "#fff",
                    padding: "10px",
                  }}
                >
                  <b>Price Summary</b>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%", padding: "10px" }}>
            <tbody>
              <tr>
                <td style={{ width: "49%" }}>Total</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>
                  Rs. {formatter.format(bookingDetails.totalGrossPrice)}
                </td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Amount Received</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>
                  Rs. {formatter.format(bookingDetails.paidAmount)}
                </td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>
                  Balance Payable To Towno
                </td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>
                  Rs. {formatter.format(bookingDetails.townoPending)}
                </td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>
                  Balance Payable on arrival at Check In
                </td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>
                  Rs. {formatter.format(bookingDetails.totalGrossPrice-bookingDetails.paidAmount-bookingDetails.townoPending)}
                </td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Payment Via</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%", textTransform: "uppercase" }}>
                  {roomPayment.map((item) => (
                    <span key={item.id}>{item.paymentType}</span>
                  ))}
                </td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Reference No</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>
                  {roomPayment.map((item) => (
                    <span key={item.id}>{item.referenceNumber}</span>
                  ))}
                </td>
              </tr>
              <tr>
                <td style={{ width: "49%" }}>Date Of Payment</td>
                <td style={{ width: "2%" }}>:</td>
                <td style={{ width: "49%" }}>
                  {roomPayment.map((item) => (
                    <span key={item.id}> {item.createdAt}</span>
                  ))}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>**All prices are inclusive of taxes, unless mentioned</tr>
            </tfoot>
          </table>
        </div>
        {_.isEmpty(passenger) ? null : (
          <div
            style={{
              backgroundColor: "#fff",
              width: "100%",
              color: "#000",
              marginTop: "10px",
            }}
          >
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#1c1c1c ",
                      width: "100%",
                      color: "#fff",
                      padding: "10px",
                    }}
                  >
                    <b>Lead Pax</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ width: "100%", padding: "10px" }}>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                </tr>
                {passenger.map((passenger) => (
                  <>
                    <td style={{ textAlign: "center" }}>{passenger.name}</td>
                    <td style={{ textAlign: "center" }}>{passenger.mobile}</td>
                    <td style={{ textAlign: "center" }}>{passenger.email}</td>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!_.isEmpty(stayInclusion) ? (
          <div style={{ width: "100%" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#1c1c1c ",
                      width: "100%",
                      color: "#fff",
                      padding: "10px",
                    }}
                  >
                    <b>Stay Inclusion</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              style={{
                width: "100%",

                textTransform: "capitalize",
              }}
            >
              <tr>
                {stayInclusion.map((stay) => (
                  <>
                    <ul style={{ marginBottom: "0px", marginTop: "3px" }}>
                      <li>
                        {stay.type1} {stay.type2}{" "}
                        {stay.name == "Parking"
                          ? "Parking (Subject to Availability)"
                          : stay.name}{" "}
                        {_.isEmpty(stay.type1) && _.isEmpty(stay.type2)
                          ? "Available"
                          : null}
                      </li>
                    </ul>
                  </>
                ))}
              </tr>
            </table>
          </div>
        ) : null}
        {!_.isEmpty(roomInclusion) ? (
          <div style={{ width: "100%" }}>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: "#1c1c1c ",
                      width: "100%",
                      color: "#fff",
                      padding: "10px",
                    }}
                  >
                    <b>Room Inclusion</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              style={{
                width: "100%",
                textTransform: "capitalize",
              }}
            >
              <tbody>
                {filtered.map((item) => (
                  <>
                    <tr>
                      <td style={{ paddingLeft: "10px" }}>
                        <b>{item.roomType} </b>
                      </td>
                    </tr>
                    <tr>
                      <ul style={{ marginBottom: "0px", marginTop: "3px" }}>
                        {roomInclusion.map((room) => (
                          <>
                            {room.aname && item.roomType == room.room ? (
                              <li>
                                {room.type1} {room.type2} {room.name}{" "}
                                {_.isEmpty(room.type1) && _.isEmpty(room.type2)
                                  ? "Available"
                                  : null}
                              </li>
                            ) : null}
                          </>
                        ))}
                      </ul>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <div style={{ width: "100%" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: "#1c1c1c ",
                    width: "100%",
                    color: "#fff",
                    padding: "10px",
                  }}
                >
                  <b>Cancellation Policy</b>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%", padding: "0px 10px" }}>
            <tbody>
              <tr>
                <td>
                  {_.isEmpty(cancelationpolicy.message)
                    ? null
                    : parse(cancelationpolicy.message)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ width: "100%" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: "#1c1c1c ",
                    width: "100%",
                    color: "#fff",
                    padding: "10px",
                  }}
                >
                  <b>Terms & Conditions</b>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%", padding: "0px 10px" }}>
            <tbody>
              <tr>
                <td>
                  {_.isEmpty(termsandcondition.message)
                    ? null
                    : parse(termsandcondition.message)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ width: "100%" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: "#F6F7F8",
                    width: "100%",
                    textAlign: "center",
                    padding: "10px",
                  }}
                >
                  Â© Copyright: Towno 2022. Towno is the authorised/registered
                  sales office of the hotel.
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    backgroundColor: "#F6F7F8",
                    width: "100%",
                    textAlign: "center",
                    padding: "10px 10px 10px 10px",
                  }}
                >
                  By accepting this booking, the customer agrees to abide by
                  Towno's terms & conditions. Visit:{" "}
                  <Link
                    to={{ pathname: "https://towno.in/terms" }}
                    target="_blank"
                  >
                    Click Here
                  </Link>
                </td>{" "}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {document.queryCommandSupported("copy") && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <Button color="primary" onClick={copyToClip}>
            {copySuccess}
          </Button>
        </div>
      )}
    </div>
  );
}
