import { Grid, Stack, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Api from '../../Service/Api';
import { useParams } from 'react-router-dom';
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { twnButtonStyles } from '../../utils/townoStyle';

export default function ViewTransfer(props) {
    var uniqueid = localStorage.getItem("unique_id");
    var [data, setData] = useState({ "id": "", "type": "", "transferId": "", "createdAt": "", "basicDetails": [], 'flightDetails': [], 'trainDetails': [], 'cabDetails': [], 'busDetails': [] });
    let { transferId } = useParams();

    useEffect(() => {
        Api.get(`/transferDetail/${uniqueid}/${transferId}`).then((res) => {
            console.log("transferData :", res.data);
            setData(res.data);
        });
    }, []);

    var flightTempAmountArray = data.flightDetails.map((x, i) => { return /^\+?\d+$/.test(x.flightAmount) ? x.flightAmount : 0 });
    var flightTempTotalAmount = flightTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
    var trainTempAmountArray = data.trainDetails.map((x, i) => { return /^\+?\d+$/.test(x.trainAmount) ? x.trainAmount : 0 });
    var trainTempTotalAmount = trainTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
    var cabTempAmountArray = data.cabDetails.map((x, i) => { return /^\+?\d+$/.test(x.cabAmount) ? x.cabAmount : 0 });
    var cabTempTotalAmount = cabTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);
    var busTempAmountArray = data.busDetails.map((x, i) => { return /^\+?\d+$/.test(x.busAmount) ? x.busAmount : 0 });
    var busTempTotalAmount = busTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);

    return (
        <div style={{ padding: '5% 2%' }}>
            <Typography variant='h4' style={{ color: '#f46d25', marginLeft: "0.8%", fontWeight: 'bold' }}>Travel Transfer Details</Typography>

            <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', margin: "1%", padding: '0.5% 1%' }}>Basic Details</Typography>
            {data.basicDetails.map((each, index) => {
                return <>
                    <Stack direction='row' spacing={2} style={{ margin: '0.8em', lineHeight: '0.8' }}>
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em', fontWeight: '500' }}>Name</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.clientName}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Mobile No</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.clientMobileNo}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Alt No</Grid>
                            <Grid item xs={8} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.clientAltNo}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Email</Grid>
                            <Grid item xs={8} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.clientEmail}</Grid>
                        </Grid>
                    </Stack>
                </>
            })}
            {flightTempTotalAmount > 0 ? <>
                <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', margin: "1%", padding: '0.5% 1%' }}>Flight Details</Typography>
                {data.flightDetails.map((each, index) => {
                    return <>
                        <Stack direction='row' spacing={2} style={{ margin: '0.8em', lineHeight: '0.8' }}>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Trip</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightTrip}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Name</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightName}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Depart Date</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightDepartDate ? format(new Date(each.flightDepartDate), 'dd-MM-yyyy') : null}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Return Date</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightReturnDate ? format(new Date(each.flightReturnDate), 'dd-MM-yyyy') : null}</Grid>
                            </Grid>
                        </Stack>
                        <Stack direction='row' spacing={2} style={{ margin: '0.8em', lineHeight: '0.8' }}>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>To</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightTo}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>From</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightFrom}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Pnr</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightPnr}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Adults</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightAdults}</Grid>
                            </Grid>
                        </Stack>
                        {/* <Grid container item xs={2.85} style={{ margin: '0.7em', lineHeight: '0.8' }}>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Children</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {data.flightChild}</Grid>
                        </Grid> */}
                        <Stack direction='row' spacing={2} style={{ margin: '0.8em', lineHeight: '0.8' }}>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Children</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightChild}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Amount</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightAmount}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Commission</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.flightComission}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={12} ></Grid>
                            </Grid>
                        </Stack>
                    </>
                })}</> : null}
            {trainTempTotalAmount > 0 ? <>
                <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', margin: "1%", padding: '0.5% 1%' }}>Train Details</Typography>
                {data.trainDetails.map((each, index) => {
                    return <>
                        <Stack direction='row' spacing={2} style={{ margin: '0.8em', lineHeight: '0.8' }}>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Class</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.traintravelClass}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Name</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.trainName}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Depart Date</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.trainDepartDate ? format(new Date(each.trainDepartDate), 'dd-MM-yyyy') : null}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>From</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.trainFrom}</Grid>
                            </Grid>
                        </Stack>
                        <Stack direction='row' spacing={2} style={{ margin: '0.8em',lineHeight:'0.8' }}>

                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>To</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.trainTo}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Pnr</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.trainPnr}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Adults</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.trainAdults}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Children</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.trainChild}</Grid>
                            </Grid>
                        </Stack>
                        <Grid container item xs={2.85} style={{ margin: '0.7em', lineHeight: '0.8' }}>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Amount</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.trainAmount}</Grid>
                        </Grid>
                    </>
                })}</> : null}
            {cabTempTotalAmount > 0 ? <>
                <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', margin: "1%", padding: '0.5% 1%' }}>Cab Details</Typography>
                {data.cabDetails.map((each, index) => {
                    return <>
                        <Stack key={index} direction='row' spacing={2} style={{ margin: '0.8em', lineHeight: '0.8' }}>
                            {/* <Stack style={{ width: '50%' }}> */}
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>From</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabFrom}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>To</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabTo}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Trip</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabTrip}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Type</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabType}</Grid>
                            </Grid>
                        </Stack>
                        {/* <Stack style={{ width: '50%' }}> */}
                        <Stack direction='row' spacing={2} style={{ margin: '0.8em',lineHeight:'0.8' }}>
                            
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Vehicle</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabVehicle}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Adults</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabAdults}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Children</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabChild}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Amount</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabAmount}</Grid>
                            </Grid>
                        </Stack>                            
                            <Grid container item xs={2.85} style={{ margin: '0.7em', lineHeight: '0.8' }}>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Comission</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.cabCommission}</Grid>
                            </Grid>
                    </>
                })}</> : null}

            {busTempTotalAmount > 0 ? <>
                <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', margin: "1%", padding: '0.5% 1%' }}>Bus Details</Typography>
                {data.busDetails.map((each, index) => {
                    return <>
                        <Stack direction='row' spacing={2} style={{ margin: '0.8em', lineHeight: '0.8' }}>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Name</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.busName}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Depart Date</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.busSeatNo}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>From</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.busFrom}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>To</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.busTo}</Grid>
                            </Grid>
                        </Stack>
                        {/* <Stack style={{ width: '50%' }}> */}
                        <Stack direction='row' spacing={2} style={{ margin: '0.8em',lineHeight:'0.8' }}>
                            <Grid container item xs={2.9}>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Adults</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.busAdults}</Grid>
                            </Grid>
                            <Grid container item xs={2.65}>
                                <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.5em' }}>Children</Grid>
                                <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.5em' }}>: {each.busChild}</Grid>
                            </Grid>
                        </Stack>
                    </>
                })}</> : null}

            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center' style={{ margin: '1.2em 0 -2em 0' }}>
                <Link to={{ pathname: "/transferList" }} style={twnButtonStyles.linkOrangeBtn}>Back</Link>
                {/* <Link to={{ pathname: `/copyTransferPage/${data.transferId}` }} style={{ color: "#fff", background: "#111", padding: '1em', borderRadius: '10px', width: '6em', textAlign: 'center' }}>Next</Link> */}
                <span onClick={() => { window.open(`/copyTransferPage/${data.transferId}`) }} style={twnButtonStyles.blackBtn}>Copy Transfer</span>
            </Stack>

        </div >
    );
}