import React, { useState, useEffect, useRef } from 'react';
import Board from '../../assets/logo/towno_white.png';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Api from "../../Service/Api";
import { format, differenceInDays } from "date-fns";
import { formatter } from "../../utils/formatNumber";
import { Button } from "@material-ui/core";
import _ from "lodash";
import parse from "html-react-parser";
import { baseurl } from "../../Service/httpCommon";

export default function CopyPage(props) {

    var uniqueid = localStorage.getItem("unique_id");
    const tableRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState("Copy");
    var [data, setData] = useState({ "id": "", "type": "", "transferId": "", "createdAt": "", "basicDetails": [], 'flightDetails': [], 'trainDetails': [], 'cabDetails': [], 'busDetails': [] });
    let { transferId } = useParams();
    const [cancelationpolicy, setCancelationpolicy] = useState({});
    const [termsandcondition, setTermsandcondition] = useState({});

    const [logoUrl, setLogoUrl] = useState("");

    useEffect(() => {
        Api.get(`getAgentLogo/${uniqueid}`).then((res) => {
            console.log("getAgentLogo|response: ", res.data);
            setLogoUrl(res.data);
        })
    }, [])

    useEffect(() => {
        Api.get(`/transferDetail/${uniqueid}/${transferId}`).then((res) => {
            console.log("copyTransferPageId :", res.data);
            setData(res.data);
        });
        Api.get(`agenthoteltermandcondition/${uniqueid}/transferTermCondition`).then((res) => {
            setTermsandcondition(res.data);
        });

        Api.get(`agenthoteltermandcondition/${uniqueid}/transferCancellationPolicy`).then((res) => {
            setCancelationpolicy(res.data);
            console.log("setCancelationpolicy", res.data);
        });
    }, []);

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

    var flightTempAmountArray = data.flightDetails.map((x, i) => { return /^\+?\d+$/.test(x.flightAmount) ? x.flightAmount : 0 });
    var flightTempTotalAmount = flightTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
    var trainTempAmountArray = data.trainDetails.map((x, i) => { return /^\+?\d+$/.test(x.trainAmount) ? x.trainAmount : 0 });
    var trainTempTotalAmount = trainTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0)
    var cabTempAmountArray = data.cabDetails.map((x, i) => { return /^\+?\d+$/.test(x.cabAmount) ? x.cabAmount : 0 });
    var cabTempTotalAmount = cabTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);
    var busTempAmountArray = data.busDetails.map((x, i) => { return /^\+?\d+$/.test(x.busAmount) ? x.busAmount : 0 });
    var busTempTotalAmount = busTempAmountArray.reduce((total, num) => { return total + (num / 1) }, 0);

    return (<div>
        <div style={{ padding: '5% 25% 2% 25%',backgroundColor: '#F7F7F7' }} ref={tableRef}>
            <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '100%' }}>
                <Stack direction='row' justifyContent='space-between' style={{ backgroundColor: '#f46d25',  padding: '0.8em' }}>
                    {/* <img src="https://crmtowno.s3.ap-south-1.amazonaws.com/towno-grey-and-white.png" alt="logo" style={{ width: '5em' }} /> */}
                    <img src={`${baseurl}getimage/${logoUrl}`} alt="logo" style={{ width: '5em' }} />
                    <span style={{ color: '#fff', fontWeight: 'bold',paddingTop: '1em' }}>{data.transferId}</span>
                </Stack>
            </Card>
            {/* basic details starts */}
            <Card style={{ borderRadius: '0', backgroundColor: '#fff', boxShadow: 'none', width: '100%' }}>
                <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Basic Details</Typography>
                {data.basicDetails.map((each, index) => {
                    return <>
                        <Stack style={{ width: '100%', padding: '1em', fontWeight: 'bold' }} justifyContent='center' alignItems='center'>
                            <Grid container>
                                <Grid item xs={5} style={{ padding: '0.5em' }}>Name</Grid>
                                <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.clientName}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ padding: '0.5em' }}>Mobile No</Grid>
                                <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.clientMobileNo}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ padding: '0.5em' }}>Alt No</Grid>
                                <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.clientAltNo}</Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={5} style={{ padding: '0.5em' }}>Email</Grid>
                                <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.clientEmail}</Grid>
                            </Grid>
                        </Stack>
                    </>
                })}
            </Card>
            {/* basic details ends */}

            {/* flight details starts */}
            {flightTempTotalAmount > 0 &&
                <Card style={{ borderRadius: '0', backgroundColor: '#fff',boxShadow: 'none', width: '100%' }}>
                    {data.flightDetails.length > 0 ? <>
                        <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Flight Details</Typography>
                        {data.flightDetails.map((each, index) => {
                            return <>
                                <Stack direction='row' spacing={5} style={{ margin: '1em', fontWeight: 'bold' }}>
                                    <Stack style={{ width: '100%' }}>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Trip</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightTrip}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Name</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightName}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Depart Date</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightDepartDate}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>To</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightTo}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>From</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightFrom}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Return Date</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightReturnDate}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Pnr</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightPnr}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Adults</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightAdults}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Children</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightChild}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Amount</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.flightAmount}</Grid>
                                        </Grid>
                                    </Stack>
                                </Stack>
                            </>
                        })}</> : null}
                </Card>}
            {/* flight details ends */}

            {/* train details starts */}
            {trainTempTotalAmount > 0 &&
                <Card style={{ borderRadius: '0', backgroundColor: '#fff',boxShadow: 'none', width: '100%' }}>
                    {data.trainDetails.length > 0 ? <>
                        <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Train Details</Typography>
                        {data.trainDetails.map((each, index) => {
                            return <>
                                <Stack direction='row' spacing={5} style={{ margin: '1em', fontWeight: 'bold' }}>
                                    <Stack style={{ width: '100%' }}>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>From</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.trainFrom}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>To</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.trainTo}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Depart Date</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.trainDepartDate}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Pnr</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.trainPnr}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Adults</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.trainAdults}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Children</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.trainChild}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Amount</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.trainAmount}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Commission</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.trainComission}</Grid>
                                        </Grid>
                                    </Stack>
                                </Stack>
                            </>
                        })}</> : null}
                </Card>}
            {/* train details ends */}

            {/* Cab Details starts */}
            {cabTempTotalAmount > 0 &&
                <Card style={{ borderRadius: '0', backgroundColor: '#fff',boxShadow: 'none', width: '100%' }}>
                    {data.cabDetails.length > 0 ? <>
                        <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Cab Details</Typography>
                        {data.cabDetails.map((each, index) => {
                            return <>
                                <Stack direction='row' spacing={5} style={{ margin: '1em', fontWeight: 'bold' }}>
                                    <Stack style={{ width: '100%' }}>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>From</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabFrom}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>To</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabTo}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Trip</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabTrip}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Type</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabType}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Vehicle</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabVehicle}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Adults</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabAdults}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Children</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabChild}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Amount</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabAmount}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Commission</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.cabCommission}</Grid>
                                        </Grid>
                                    </Stack>
                                </Stack>
                            </>
                        })}</> : null}
                </Card>}
            {/* cab details ends */}

            {/* Bus Details  */}
            {busTempTotalAmount > 0 &&
                <Card style={{ borderRadius: '0', backgroundColor: '#fff',boxShadow: 'none', width: '100%' }}>
                    {data.busDetails.length > 0 ? <>
                        <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Bus Details</Typography>
                        {data.busDetails.map((each, index) => {
                            return <>
                                <Stack direction='row' spacing={5} style={{ margin: '1em', fontWeight: 'bold' }}>
                                    <Stack style={{ width: '100%' }}>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Name</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.busName}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Seat No</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.busSeatNo}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>From</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.busFrom}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>To</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.busTo}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Adults</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.busAdults}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Chidren</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.busChild}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Amount</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.busAmount}</Grid>
                                        </Grid>

                                    </Stack>
                                </Stack>
                            </>
                        })}</> : null}
                </Card>}
            {/* bus details ends */}

            {/* cancellation policy starts */}
            <Card style={{ borderRadius: '0', backgroundColor: '#fff', boxShadow: 'none',width:'100%' }}>
                <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Cancellation Policy</Typography>
                <div style={{ width: 'auto', padding: '1em', fontWeight: '500', lineHeight: '1.2' }}>
                    {_.isEmpty(cancelationpolicy)
                        ? null
                        : parse(cancelationpolicy)}
                </div>
            </Card>
            {/* cancellation policy ends */}

            {/* terms & conditions starts */}
            <Card style={{ borderRadius: '0', backgroundColor: '#fff', boxShadow: 'none',width:'100%' }}>
                <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Terms & Conditions</Typography>
                <div style={{ width: 'auto', padding: '1em', fontWeight: '500', lineHeight: '1.2' }}>
                    {_.isEmpty(termsandcondition)
                        ? null
                        : parse(termsandcondition)}
                </div>
            </Card>
            {/* terms & conditions ends */}

            <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '100%' }}>
                <Stack style={{ width: '100%', padding: '0.1em', fontWeight: '500' }} justifyContent='center' alignItems='center'>
                    <Grid container></Grid>
                </Stack>
            </Card>
        </div>
        <Stack direction='row' spacing={2} justifyContent='center' style={{ margin: '0 0 1em 0' }}>
            {document.queryCommandSupported("copy") && (
                <div style={{ textAlign: "center" }}>
                    <Button color="primary" onClick={copyToClip}>
                        {copySuccess}
                    </Button>
                </div>
            )}
            {/* <Link to={{ pathname: "/transferList" }} style={{ textAlign: "center", color: "#fff", backgroundColor: '#111', height: '1.5em', padding: '0.4em', borderRadius: '5px' }}>Cancel</Link> */}
        </Stack>
    </div>
    )
}