import React, { useState, useReducer, useEffect } from 'react';
import { Stack, Typography, Grid, Card, Button, Paper } from '@mui/material';
import { format } from 'date-fns';
import { twnButtonStyles } from '../../utils/townoStyle';

const cardLabel = { padding: '0.5em 1em', color: '#111', fontWeight: '500' };
const cardValue = { padding: '0.5em 1em', color: '#111' };
const hrStyle = { backgroundColor: '#111', margin: '1em 0', height: "0.1em" };

export default function Preview({ data }) {
    console.log("data: ", data, "itinerary:", data.itinerary)

    return (
        <div style={{padding: '2% 1%', fontSize: '14px', backgroundColor: '#F7F7F7'}}>
            {/* <Typography style={{ color: '#f46d25', fontWeight: 'bold',fontSize: '32px', fontFamily: 'Segoe UI' }}>{data.type} Details</Typography> */}
            <Typography variant="h5" component="h5" style={twnButtonStyles.xlFonts}>{data.type} Details</Typography>
            <Card style={{marginTop:'9px'}}>
                <div style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 1em',fontSize:'18px',fontWeight: '500' }}>Basic Details</div>
                <Stack>
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3',padding: '0.5em 0.5em 0 0.5em' }}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Destination</Grid>
                            <Grid item xs={7} style={cardValue}>: {data.destination}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} style={cardLabel}>{data.type} Name</Grid>
                            <Grid item xs={6} style={cardValue}>: {data.name}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>ClientName</Grid>
                            <Grid item xs={8} style={cardValue}>: {data.clientName}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Mobile No</Grid>
                            <Grid item xs={7} style={cardValue}>: {data.clientMobileNo}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3',padding: '0 0.5em 0.5em 0.5em' }}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Adults</Grid>
                            <Grid item xs={7} style={cardValue}>: {data.noOfAdults}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} style={cardLabel}>Children</Grid>
                            <Grid item xs={6} style={cardValue}>: {data.noOfChildren}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Check-In</Grid>
                            <Grid item xs={8} style={cardValue}>: {data.checkIn ? format(new Date(data.checkIn), 'dd-MM-yyyy') : null}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Check-Out</Grid>
                            <Grid item xs={7} style={cardValue}>: {data.checkOut ? format(new Date(data.checkOut), 'dd-MM-yyyy') : null}</Grid>
                        </Grid>
                    </Stack>
                    {data.itinerary != null && data.itinerary != "" &&
                        <Stack style={{lineHeight: '0.3',padding: '0 0.5em 0.5em 0.5em' }} >
                            <Grid container item xs={2.9}>
                                <Grid item xs={5} style={cardLabel}>Itinerary</Grid>
                                <Grid item xs={7} style={cardValue}>: {data.itinerary}</Grid>
                            </Grid>
                        </Stack>}
                </Stack>
            </Card>

            {data.displayLeads && data.leadPax.length > 0 &&
                <>
                    <Card style={{marginTop:'9px'}}>
                        <div style={{ backgroundColor: '#f46d25', color: '#fff', fontWeight: '500', padding: '0.5em 1em',fontSize:'18px' }}>Lead Pax Details</div>
                        {data.leadPax.map((each, index) => {
                            return <>
                                <Stack direction='row' spacing={2} style={{ lineHeight: '0.3',padding: '0.5em '  }}>
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Name</Grid>
                                        <Grid item xs={7} style={cardValue}>: {each.leadPaxName}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Mobile No</Grid>
                                        <Grid item xs={7} style={cardValue}>: {each.leadPaxMobile}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Alt No</Grid>
                                        <Grid item xs={7} style={cardValue}>: {each.leadPaxAltNo}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={3} style={cardLabel}>Email</Grid>
                                        <Grid item xs={9} style={cardValue}>: {each.leadPaxEmail}</Grid>
                                    </Grid>
                                </Stack>
                            </>
                        })}</Card></>}

            {data.hotelDetails.length > 0 &&
                <>
                    <Card style={{marginTop:'9px'}}> <div style={{ backgroundColor: '#f46d25', color: '#fff', fontWeight: '500', padding: '0.5em 1em',fontSize:'18px' }}>Hotel Details</div>
                        {data.hotelDetails.map((each, index) => {
                            return <>
                                <Card>
                                    <Stack direction='row' spacing={2} style={{ lineHeight: '0.3',padding: '0.5em'  }}>
                                        <Grid container>
                                            <Grid item xs={5} style={cardLabel}>Name</Grid>
                                            <Grid item xs={7} style={cardValue}>: {each.hotelName}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={cardLabel}>Category</Grid>
                                            <Grid item xs={7} style={cardValue}>: {each.hotelCategory}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={cardLabel}>Rooms</Grid>
                                            <Grid item xs={7} style={cardValue}>: {each.noOfRooms}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={cardLabel}>Nights</Grid>
                                            <Grid item xs={7} style={cardValue}>: {each.noOfNights}</Grid>
                                        </Grid>
                                    </Stack>
                                </Card>
                            </>
                        })}</Card></>}

            {data.transferDetails.length > 0 &&
                <>
                    <Card style={{marginTop:'9px'}}> <div style={{ backgroundColor: '#f46d25', color: '#fff', fontWeight: '500', padding: '0.5em 1em',fontSize:'18px' }}>Transfer Details</div>
                        {data.transferDetails.map((each, index) => {
                            return <>
                                <Card>
                                    <Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.3',padding: '0.5em 0.5em 0 0.5em'  }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>From</Grid>
                                                <Grid item xs={7} style={cardValue}>: {each.transferFrom}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>To</Grid>
                                                <Grid item xs={7} style={cardValue}>: {each.transferTo}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Trip</Grid>
                                                <Grid item xs={7} style={cardValue}>: {each.transferTrip}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Type</Grid>
                                                <Grid item xs={7} style={cardValue}>: {each.transferType}</Grid>
                                            </Grid>
                                        </Stack>
                                    </Stack>
                                    <Grid container item xs={2.9} style={{ lineHeight: '0.3',padding: '0 0.5em 0.5em 0.5em'}}>
                                        <Grid item xs={5} style={cardLabel}>Vehicle</Grid>
                                        <Grid item xs={7} style={cardValue}>: {each.transferVehicle}</Grid>
                                    </Grid>
                                </Card></>
                        })}</Card></>}

            {data.activityDetails.length > 0 &&
                <>
                    <Card style={{marginTop:'9px'}}> <div style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 1em',fontSize:'18px',fontWeight:'500' }}>Activity Details</div>
                        {data.activityDetails.map((each, index) => {
                            return <>
                                <Card>
                                    <Stack>
                                        <Stack direction='row' style={{ lineHeight: '0.3',padding: '0.5em'  }}>
                                            <Grid container>
                                                <Grid item xs={2.5} style={cardLabel}>City</Grid>
                                                <Grid item xs={9.5} style={cardValue}>: {each.city}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={2.5} style={cardLabel}>Activity</Grid>
                                                <Grid item xs={9.5} style={cardValue}>: {each.activity}</Grid>
                                            </Grid>
                                        </Stack>
                                    </Stack>
                                </Card></>
                        })}</Card>
                </>
            }

            <Card style={{marginTop:'9px'}}> <div style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 1em',fontSize:'18px',fontWeight:'500' }}>Payment Details</div>
                <Stack>
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3',padding: '0.5em'  }}>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Total Amount</Grid>
                            <Grid item xs={8} style={cardValue}>: {data.totalGrossAmount}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Amount Paid</Grid>
                            <Grid item xs={8} style={cardValue}>: {data.amountPaid}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Commission</Grid>
                            <Grid item xs={8} style={cardValue}>: {data.comission}</Grid>
                        </Grid>
                    </Stack>

                </Stack>
            </Card>

        </div>
    );
}