import React, { useState } from 'react';
import { Stack, Typography, Grid, Card, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const cardLabel = { padding: '0.5em 1em', color: '#f46d25' };
const cardValue = { padding: '0.5em 1em', color: '#111' };
const hrStyle = { backgroundColor: '#111', margin: '1em 0', height: "0.1em" };
export default function PreviewPage() {

    const [data, setData] = useState({
        clientName: '', clientMobileNo: '', clientEmail: '', clientAltNo: '',
        flightName: '', flightFrom: '', flightTo: '', flightDepartDate: '', flightReturnDate: '', flightPnr: '',
        flightAdult: '', flightChild: '', flightInclusion: '', flightAmount: '', flightComission: '', trainName: '',
        trainFrom: '', trainTo: '', trainDepart: '', traintravelClass: '', trainPnr: '', trainAdults: '', trainChild: '',
        trainInclusion: '', trainAmount: '', trainComission: '', cabFrom: '', cabTo: '', cabTrip: '', cabType: '', cabVehicle: '',
        cabAdult: '', cabChild: '', cabAmount: '', cabComission: '', busName: '', busFrom: '', busTo: '', busSeatNo: '',
        busAdult: '', busChild: '', busAmount: '', busComission: ''
    })
    return (
        <div style={{ padding: "5% 1%" }}>
            <Typography variant='h4' style={{ color: '#f46d25' }}>Transfer Details</Typography> <br />

            <Card style={{ backgroundColor: '#eee', color: '#111', fontWeight: 'bold', padding: '0.5em 1em' }}>Client Details</Card>
            <Card>
                <Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Name</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.clientName}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Mobile No</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.clientMobileNo}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Email Address</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.clientEmail}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Alternate Mobile no</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.clientAltNo}</Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Card><hr style={{ backgroundColor: '#111', margin: '1em 0', height: "0.05em" }} />

            <Card style={{ backgroundColor: '#eee', color: '#111', fontWeight: 'bold', padding: '0.5em 1em' }}>Flight Details</Card>
            <Card>
                <Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Name</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightName}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>From</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightFrom}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>To</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightTo}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>PNR</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightPnr}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Departure Date</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightDepartDate}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Return Date</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightReturnDate}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Adults</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightAdult}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Children</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightChild}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Inclusion</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightInclusion}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Amount</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightAmount}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Commission</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.flightComission}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}></Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Card><hr style={hrStyle} />

            <Card style={{ backgroundColor: '#eee', color: '#111', fontWeight: 'bold', padding: '0.5em 1em' }}>Train Details</Card>
            <Card>
                <Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Name</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainName}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>From</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainFrom}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>To</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainTo}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>PNR</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainPnr}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Departure Date</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainDepart}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Travel Class</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.traintravelClass}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Adults</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainAdults}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Children</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainChild}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Inclusion</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainInclusion}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Amount</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainAmount}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Commission</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.trainComission}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}></Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Card><hr style={hrStyle} />

            <Card style={{ backgroundColor: '#eee', color: '#111', fontWeight: 'bold', padding: '0.5em 1em' }}>Cab Details</Card>
            <Card>
                <Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>From</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabFrom}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>To</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabTo}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Trip</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabTrip}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Type</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabType}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Vehicle</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabVehicle}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Adults</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabAdult}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Children</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabChild}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Amount</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabAmount}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Commission</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.cabComission}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}></Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Card><hr style={hrStyle} />

            <Card style={{ backgroundColor: '#eee', color: '#111', fontWeight: 'bold', padding: '0.5em 1em 0 1em' }}>Bus Details</Card>
            <Card>
                <Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Name</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.busName}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>From</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.busFrom}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>To</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.busTo}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Seat No</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.busSeatNo}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Adults</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.busAdult}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Children</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.busChild}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Amount</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.busAmount}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Commission</Grid>
                            <Grid item xs={1} style={cardLabel}>:</Grid>
                            <Grid item xs={6} style={cardValue}>{data.busComission}</Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Card>
        </div>
    );
}