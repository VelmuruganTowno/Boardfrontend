import React, { useState, useEffect } from 'react';
import { Typography, Grid, Dialog, Stack, Card } from '@mui/material';
import { Link } from 'react-router-dom';
import Api from "../../Service/Api";
import { format, differenceInDays } from "date-fns";
import { useParams } from 'react-router-dom';
import { twnButtonStyles } from '../../utils/townoStyle';

const cardLabel = { padding: '0.5em 1em', color: '#111', fontWeight: '500' };
const cardValue = { padding: '0.5em 1em', color: '#111' };

const PackageOrQuotation = (isPackage) => { return isPackage ? "Package" : "Quotation" }

export default function ViewPackage(props) {
    var uniqueid = localStorage.getItem("unique_id");
    var [data, setData] = useState({ "id": "", "type": "", "name": "", "clientName": "", "clientMobileNo": "", "noOfAdults": "", "createdAt": "", "hotelDetails": [], 'leadPax': [], 'transferDetails': [], 'activityDetails': [] });
    let { pkgOrQtn, id } = useParams();
    let isPackage = pkgOrQtn === "package" ? true : false;
    let validLeadPax = data.leadPax != null ? data.leadPax.filter((e) => { return e.leadPaxName != "" }) : 0;
    let validHotelInput = data.hotelDetails.filter((e) => { return e.hotelName != "" });
    let validTransferInput = data.transferDetails.filter((e) => { return e.transferFrom != "" });
    let validActvityInput = data.activityDetails.filter((e) => { return e.city != "" })

    useEffect(() => {
        Api.get(`/getpackageorquotationid/${uniqueid}/${PackageOrQuotation(isPackage)}/${id}`).then((res) => {
            console.log("all data", res.data);
            setData(res.data);
        });
    }, []);

    return (
        <div style={{ ...twnButtonStyles.allPages, paddingTop: '75px' }}>
            <Typography variant="h5" component="h5" style={twnButtonStyles.xlFonts}>Your {PackageOrQuotation(isPackage)}</Typography>

            {/* basic details  */}
            <Card style={{ marginTop: '9px', boxShadow: 'none' }}>
                <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Basic Details</Typography>
                <Stack >
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em 0.5em 0 0.5em' }}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>{PackageOrQuotation(isPackage)} Name</Grid>
                            <Grid item xs={7} style={cardValue}>: {data.name}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} style={cardLabel}>Destination Name</Grid>
                            <Grid item xs={6} style={cardValue}>: {data.destination}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Client Name</Grid>
                            <Grid item xs={8} style={cardValue}>: {data.clientName}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Phone No</Grid>
                            <Grid item xs={7} style={cardValue}>: {data.clientMobileNo}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0 0.5em ' }}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Duration</Grid>
                            <Grid item xs={7} style={cardValue}>: {differenceInDays(new Date(data.checkOut), new Date(data.checkIn))}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} style={cardLabel}>Booking Date</Grid>
                            <Grid item xs={6} style={cardValue}>: {data.createdAt ? format(new Date(data.createdAt), 'dd-MM-yyyy') : null}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Check-In</Grid>
                            <Grid item xs={8} style={cardValue}>: {data.checkIn ? format(new Date(data.checkIn), "dd-MM-yyyy") : null}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Check-Out</Grid>
                            <Grid item xs={7} style={cardValue}>: {data.checkOut ? format(new Date(data.checkOut), "dd-MM-yyyy") : null}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={1.5} style={{ lineHeight: '0.3', padding: '0 0.5em 0.5em 0.5em' }}>
                        <Grid container item xs={2.9}>
                            <Grid item xs={5.1} style={cardLabel}>Adults</Grid>
                            <Grid item xs={6.5} style={cardValue}>: {data.noOfAdults}</Grid>
                        </Grid>
                        <Grid container item xs={2.9}>
                            <Grid item xs={6.15} style={cardLabel}>Children</Grid>
                            <Grid item xs={5.5} style={cardValue}>: {data.noOfChildren}</Grid>
                        </Grid>
                    </Stack>
                    {data.itinerary != "" && data.itinerary != null &&
                        <Stack direction='row' spacing={1.5} style={{ lineHeight: '0.3', padding: '0 0.5em 0.5em 0.5em' }}>
                            <Grid container item xs={2.9}>
                                <Grid item xs={5.1} style={cardLabel}>Itinerary</Grid>
                                <Grid item xs={6.5} style={cardValue}>: {data.itinerary}</Grid>
                            </Grid>
                        </Stack>
                    }
                </Stack>
            </Card>

            {/* lead details  */}
            {validLeadPax.length > 0 &&
                <>
                    <Card style={{ marginTop: '9px', boxShadow: 'none' }}>
                        <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Lead Pax</Typography>
                        {validLeadPax.map((each, index) => {
                            return <>
                                <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em' }}>
                                    <Grid container>
                                        <Grid item xs={4} style={cardLabel}>Name</Grid>
                                        <Grid item xs={8} style={cardValue}>: {each.leadPaxName}</Grid>
                                    </Grid><br />
                                    <Grid container>
                                        <Grid item xs={4} style={cardLabel}>Mobile No</Grid>
                                        <Grid item xs={8} style={cardValue}>: {each.leadPaxMobile}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={4} style={cardLabel}>Alt No</Grid>
                                        <Grid item xs={8} style={cardValue}>: {each.leadPaxAltNo}</Grid>
                                    </Grid><br />
                                    <Grid container>
                                        <Grid item xs={3} style={cardLabel}>Email</Grid>
                                        <Grid item xs={9} style={cardValue}>: {each.leadPaxEmail}</Grid>
                                    </Grid>
                                </Stack>
                            </>
                        })}
                    </Card>
                </>}

            {/* hotel details  */}
            {validHotelInput.length > 0 &&
                <>
                    <Card style={{ marginTop: '9px', boxShadow: 'none' }}>
                        <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Hotel Details</Typography>
                        {validHotelInput.map((each, index) => {
                            return <>
                                <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em ' }}>
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Hotel Name</Grid>
                                        <Grid item xs={7} style={cardValue}>: {each.hotelName}</Grid>
                                    </Grid><br />
                                    <Grid container>
                                        <Grid item xs={7} style={cardLabel}>Hotel Category</Grid>
                                        <Grid item xs={5} style={cardValue}>: {each.hotelCategory}</Grid>
                                    </Grid><br />
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Rooms</Grid>
                                        <Grid item xs={7} style={cardValue}>: {each.noOfRooms}</Grid>
                                    </Grid><br />
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Nights</Grid>
                                        <Grid item xs={7} style={cardValue}>: {each.noOfNights}</Grid>
                                    </Grid>
                                </Stack>
                            </>
                        })}
                    </Card>
                </>
            }

            {/* transfer details  */}
            {validTransferInput.length > 0 && <>
                <Card style={{ marginTop: '9px' }}>
                    <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Tranfer Details</Typography>
                    {validTransferInput.map((each, index) => {
                        return <>
                            <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em 0.5em 0 0.5em' }}>
                                <Grid container>
                                    <Grid item xs={5} style={cardLabel}>From</Grid>
                                    <Grid item xs={7} style={cardValue}>: {each.transferFrom}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={7} style={cardLabel}>To</Grid>
                                    <Grid item xs={5} style={cardValue}>: {each.transferTo}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={5} style={cardLabel}>Trip</Grid>
                                    <Grid item xs={7} style={cardValue}>: {each.transferTrip}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={5} style={cardLabel}>Type</Grid>
                                    <Grid item xs={7} style={cardValue}>: {each.transferType}</Grid>
                                </Grid><br />
                            </Stack>
                            <Stack direction='row' spacing={1.5} style={{ lineHeight: '0.3', padding: '0 0.5em 0.5em 0.5em' }}>
                                <Grid container item xs={2.9}>
                                    <Grid item xs={5.08} style={cardLabel}>Vehicle</Grid>
                                    <Grid item xs={6.5} style={cardValue}>: {each.transferVehicle}</Grid>
                                </Grid>
                            </Stack>
                        </>
                    })}
                </Card>
            </>
            }

            {/* activity details  */}
            {validActvityInput.length > 0 && <>
                <Card style={{ marginTop: '9px', boxShadow: 'none' }}>
                    <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Activity Details</Typography>
                    {validActvityInput.map((each, index) => {
                        return <>
                            <Stack direction='row' spacing={1.5} style={{ lineHeight: '0.3', padding: '0.5em' }}>
                                <Grid container item xs={2.9}>
                                    <Grid item xs={5.1} style={cardLabel}>City</Grid>
                                    <Grid item xs={6.5} style={cardValue}>: {each.city}</Grid>
                                </Grid>
                                <Grid container item xs={2.9}>
                                    <Grid item xs={6.15} style={cardLabel}>Activity</Grid>
                                    <Grid item xs={5.5} style={cardValue}>: {each.activity}</Grid>
                                </Grid>
                            </Stack>
                        </>
                    })}
                </Card>
            </>}


            {/* payment details  */}
            <Card style={{ marginTop: '9px', boxShadow: 'none' }}>
                <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Payment Details</Typography>
                <Stack direction='row' spacing={1.5} style={{ lineHeight: '0.3', padding: '0.5em' }}>
                    <Grid container>
                        <Grid item xs={5} style={cardLabel}>Total Gross Amount</Grid>
                        <Grid item xs={7} style={cardValue}>: {data.totalGrossAmount}</Grid>
                    </Grid><br />
                    <Grid container>
                        <Grid item xs={5} style={cardLabel}>Amount Paid</Grid>
                        <Grid item xs={7} style={cardValue}>: {data.amountPaid}</Grid>
                    </Grid><br />
                    <Grid container>
                        <Grid item xs={5} style={cardLabel}>Commission</Grid>
                        <Grid item xs={7} style={cardValue}>: {data.comission}</Grid>
                    </Grid>
                </Stack>
            </Card> <br />

            <Stack justifyContent='center' alignItems='center' >
                <Link to={{ pathname: `/packageOrQuotation/${pkgOrQtn}` }} style={twnButtonStyles.linkOrangeBtn}>Back to {PackageOrQuotation(isPackage)}</Link>
            </Stack>
        </div>
    )
}