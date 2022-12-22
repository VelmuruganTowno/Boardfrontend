import React, { useState } from 'react';
import { Stack, Typography, Grid, Card, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { twnButtonStyles } from '../../utils/townoStyle';

const cardLabel = { padding: '0.5em 1em', color: '#f46d25', fontWeight: '500' };
const cardValue = { padding: '0.5em 1em', color: '#111' };
const hrStyle = { backgroundColor: '#111', margin: '1em 0', height: "0.1em" };
export default function PreviewPage({ basicInput, flightInput, trainInput, cabInput, busInput, totalAmount, commission }) {
    var flightTempAmountArray = flightInput.map((x, i) => { return /^\+?\d+$/.test(x.flightAmount) ? x.flightAmount : 0 });
    var flightTempTotalAmount = flightTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
    var trainTempAmountArray = trainInput.map((x, i) => { return /^\+?\d+$/.test(x.trainAmount) ? x.trainAmount : 0 });
    var trainTempTotalAmount = trainTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
    var cabTempAmountArray = cabInput.map((x, i) => { return /^\+?\d+$/.test(x.cabAmount) ? x.cabAmount : 0 });
    var cabTempTotalAmount = cabTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);
    var busTempAmountArray = busInput.map((x, i) => { return /^\+?\d+$/.test(x.busAmount) ? x.busAmount : 0 });
    var busTempTotalAmount = busTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);

    return (
        <div style={twnButtonStyles.allPages}>
            <Typography style={{...twnButtonStyles.xlFonts,color:'#F46D25',marginTop:'-36px'}}>Transfer Details</Typography>

            <Card style={{ backgroundColor: '#F46D25', color: '#fff', fontWeight: 'bold', padding: '0.4em 1em', borderRadius: '0',marginTop:'15px' }}>Client Details</Card>
            <Card style={{ borderRadius: '0' }}>
                {basicInput.map((each, index) => {
                    return (
                        <>
                            <Stack key={index}>
                                <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Name</Grid>
                                        <Grid item xs={1} style={cardLabel}>:</Grid>
                                        <Grid item xs={6} style={cardValue}>{each.clientName}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Mobile No</Grid>
                                        <Grid item xs={1} style={cardLabel}>:</Grid>
                                        <Grid item xs={6} style={cardValue}>{each.clientMobileNo}</Grid>
                                    </Grid>
                                </Stack>
                                <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Email Address</Grid>
                                        <Grid item xs={1} style={cardLabel}>:</Grid>
                                        <Grid item xs={6} style={cardValue}>{each.clientEmail}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={5} style={cardLabel}>Alternate Mobile no</Grid>
                                        <Grid item xs={1} style={cardLabel}>:</Grid>
                                        <Grid item xs={6} style={cardValue}>{each.clientAltNo}</Grid>
                                    </Grid>
                                </Stack>
                            </Stack>

                            {index + 1 !== basicInput.length ? <hr style={{ backgroundColor: '#eee', margin: '0.5em 1em', height: "0.025em" }} /> : null}
                        </>
                    )
                })}
            </Card>
            {/* <hr style={{ backgroundColor: '#111', margin: '1em 0', height: "0.05em" }} /> */}
            <br />

            {/* flight  */}
            {flightTempTotalAmount > 0 &&
                <><Card style={{ backgroundColor: '#F46D25', color: '#fff', fontWeight: 'bold', padding: '0.5em 1em' }}>Flight Details</Card>
                    <Card style={{ borderRadius: '0' }}>
                        {flightInput.map((each, index) => {
                            return (
                                <>
                                    <Stack key={index}>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Name</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightName}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>From</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightFrom}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>To</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightTo}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>PNR</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightPnr}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Departure Date</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>
                                                    {each.flightDepartDate ? format(new Date(each.flightDepartDate), 'dd-MM-yyyy') : null}
                                                </Grid>

                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Return Date</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>
                                                    {each.flightReturnDate ? format(new Date(each.flightReturnDate), 'dd-MM-yyyy') : null}
                                                </Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Adults</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightAdults}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Children</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightChild}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Inclusion</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightInclusion}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Amount</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightAmount}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Commission</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightComission}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Trip</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.flightTrip}</Grid>
                                            </Grid>
                                        </Stack>
                                    </Stack>
                                    {index + 1 !== flightInput.length ? <hr style={{ backgroundColor: '#eee', margin: '0.5em 1em', height: "0.025em" }} /> : null}
                                </>
                            )
                        })}
                    </Card>
                    {/* <hr style={hrStyle} /> */}
                    <br /></>}

            {/* train  */}
            {trainTempTotalAmount > 0 &&
                <><Card style={{ backgroundColor: '#F46D25', color: '#fff', fontWeight: 'bold', padding: '0.5em 1em' }}>Train Details</Card>
                    <Card style={{ borderRadius: '0' }}>
                        {trainInput.map((each, index) => {
                            return (
                                <>
                                    <Stack key={index}>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Name</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainName}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>From</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainFrom}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>To</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainTo}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>PNR</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainPnr}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Departure Date</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>
                                                    {each.trainDepartDate ? format(new Date(each.trainDepartDate), 'dd-MM-yyyy') : null}
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Travel Class</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.traintravelClass}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Adults</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainAdults}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Children</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainChild}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Inclusion</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainInclusion}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Amount</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainAmount}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Commission</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.trainComission}</Grid>
                                            </Grid>
                                            <Grid container></Grid>
                                        </Stack>
                                    </Stack>
                                    {index + 1 !== trainInput.length ? <hr style={{ backgroundColor: '#eee', margin: '0.5em 1em', height: "0.025em" }} /> : null}
                                </>
                            )
                        })}
                    </Card>
                    <br /></>
            }
            {/* cab  */}
            {cabTempTotalAmount > 0 &&
                <><Card style={{ backgroundColor: '#F46D25', color: '#fff', fontWeight: 'bold', padding: '0.5em 1em' }}>Cab Details</Card>
                    <Card style={{ borderRadius: '0' }}>
                        {cabInput.map((each, index) => {
                            return (
                                <>
                                    <Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>From</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabFrom}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>To</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabTo}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Trip</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabTrip}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Type</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabType}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Vehicle</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabVehicle}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Adults</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabAdults}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Children</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabChild}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Amount</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabAmount}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Commission</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.cabComission}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={12}></Grid>
                                            </Grid>
                                        </Stack>
                                    </Stack>
                                </>)
                        })}
                    </Card>
                    <br /></>}
            {/* <hr style={hrStyle} /> */}
            
            {/* bus  */}
            {busTempTotalAmount > 0 &&
                <><Card style={{ backgroundColor: '#F46D25', color: '#fff', fontWeight: 'bold', padding: '0.5em 1em' }}>Bus Details</Card>
                    <Card style={{ borderRadius: '0' }}>
                        {busInput.map((each, index) => {
                            return (
                                <>
                                    <Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Name</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.busName}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>From</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.busFrom}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>To</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.busTo}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Seat No</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.busSeatNo}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Adults</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.busAdults}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Children</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.busChild}</Grid>
                                            </Grid>
                                        </Stack>
                                        <Stack direction='row' spacing={2} style={{ lineHeight: '0.5' }}>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Amount</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.busAmount}</Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} style={cardLabel}>Commission</Grid>
                                                <Grid item xs={1} style={cardLabel}>:</Grid>
                                                <Grid item xs={6} style={cardValue}>{each.busComission}</Grid>
                                            </Grid>
                                        </Stack>
                                    </Stack>
                                </>)
                        })}
                    </Card>
                    <br />
                </>}
            <Card>
                <Stack direction='row' spacing={2} style={{ backgroundColor: '#eee', width: 'auto', fontWeight: 'bold', border: '1px solid #eee' }}>
                    <span style={{ color: '#f46d25', padding: '0.5em 1em', width: '50%' }}>Total Transfer Booking Amount</span>
                    <span style={{ color: '#1eaf1e', padding: '0.5em 1em', width: '50%' }}>Commission</span>
                </Stack>
                <Stack direction='row' spacing={2} style={{ width: 'auto', fontWeight: 'bold', border: '1px solid #eee' }}>
                    <span style={{ padding: '0.5em 1.2em', width: '50%' }}>{totalAmount}</span>
                    <span style={{ padding: '0.5em 1.2em', width: '50%' }}>{commission}</span>
                </Stack>
            </Card>
        </div>
    );
}