import React, { useState, useEffect, useRef } from 'react';
import { Card, Grid, Stack, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import Api from "../../Service/Api";
import { format, differenceInDays } from "date-fns";
import { formatter } from "../../utils/formatNumber";
import { Button } from "@material-ui/core";
import { twnButtonStyles } from '../../utils/townoStyle';
import _ from "lodash";
import parse from "html-react-parser";
import { baseurl } from "../../Service/httpCommon";

const PackageOrQuotation = (isPackage) => { return isPackage ? "Package" : "Quotation" }

export default function CopyPage(props) {

    var uniqueid = localStorage.getItem("unique_id");
    const tableRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState("Copy");
    var [data, setData] = useState({ "id": "", "type": "", "name": "", "clientName": "", "clientMobileNo": "", "noOfAdults": "", "createdAt": "", "hotelDetails": [], 'leadPax': [], 'transferDetails': [], 'activityDetails': [] });
    let { pkgOrQtn, id } = useParams();
    let isPackage = pkgOrQtn === "package" ? true : false;
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
        Api.get(`/getpackageorquotationid/${uniqueid}/${PackageOrQuotation(isPackage)}/${id}`).then((res) => {
            // console.log(res.data);
            setData(res.data);
        });
        var tncUrl = "quotatioTermCondition";
        var cancelUrl = "quotationCancellationPolicy"
        if (isPackage) {
            tncUrl = "packageTermCondition";
            cancelUrl = "packageCancellationPolicy";
        }
        Api.get(`agenthoteltermandcondition/${uniqueid}/${tncUrl}`).then((res) => {
            setTermsandcondition(res.data);
        });

        Api.get(`agenthoteltermandcondition/${uniqueid}/${cancelUrl}`).then((res) => {
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
        document.execCommand("copy");
        sel.removeAllRanges();
        //paste the copied data to mailto body
        document.addEventListener("paste", function (event) {
            var clipText = event.clipboardData.getData("Text");
            window.location = `mailto:?subject=I wanted you to see this site&body=${clipText}`;
        });
        setCopySuccess("Copied");
    };
    //
    let validLeadPax = data.leadPax != null ? data.leadPax.filter((e) => { return e.leadPaxName != "" }) : 0;
    let validHotelInput = data.hotelDetails.filter((e) => { return e.hotelName != "" });
    let validTransferInput = data.transferDetails.filter((e) => { return e.transferFrom != "" });
    let validActvityInput = data.activityDetails.filter((e) => { return e.city != "" })

    return (<div style={{ padding: '0 0 2% 0', backgroundColor: '#F7F7F7' }}>
        <div style={{ padding: '5% 20% 2% 28%', border: '1px solid #F4F4F4' }} ref={tableRef}>
            <Card style={{ borderRadius: '5px 5px 0 0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                <Stack direction='row' justifyContent='space-between' style={{ backgroundColor: '#f46d25', padding: '0.8em' }}>
                    {/* <img src="https://crmtowno.s3.ap-south-1.amazonaws.com/towno-grey-and-white.png" alt="logo" style={{ width: '5em' }} /> */}
                    <img src={`${baseurl}getimage/${logoUrl}`} alt="logo" style={{ width: '5em' }} />
                    {isPackage ?
                        <span style={{ color: '#fff', fontWeight: 'bold', textAlign: 'right',paddingTop: '1em' }}>{data.packageId}</span> :
                        <span style={{ color: '#fff', fontWeight: 'bold', textAlign: 'right',paddingTop: '1em' }}>{data.quotationId}</span>}
                </Stack>
            </Card>
            {/* basic details starts */}
            <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Basic Details</Typography>
                <Stack style={{ width: '100%', padding: '1em', fontWeight: '500', lineHeight: '0.7' }} justifyContent='center' alignItems='center' >
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>{PackageOrQuotation(isPackage)} Name</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.name}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Destination Name</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.destination}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Client Name</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.clientName}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Phone No</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.clientMobileNo}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Duration</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {differenceInDays(new Date(data.checkOut), new Date(data.checkIn))}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Booking Date</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.createdAt ? format(new Date(data.createdAt), 'dd-MM-yyyy') : null}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Check-In</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.checkIn ? format(new Date(data.checkIn), "dd-MM-yyyy") : null}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Check-Out</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.checkOut ? format(new Date(data.checkOut), "dd-MM-yyyy") : null}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Adults</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.noOfAdults}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Children</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.noOfChildren}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Itenerary</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {data.itinerary}</Grid>
                    </Grid>
                </Stack>
            </Card>
            {/* basic details ends */}

            {/* lead pax starts */}
            {validLeadPax.length > 0 &&
                <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                    {data.leadPax ?
                        <>
                            <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Lead Pax Details</Typography>
                            {data.leadPax.map((each, index) => {
                                return <>
                                    <Stack style={{ width: '100%', padding: '1em', fontWeight: '500', lineHeight: '0.7' }} justifyContent='center' alignItems='center'>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Name</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.leadPaxName}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Mobile No</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.leadPaxMobile}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Alt No</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.leadPaxAltNo}</Grid>
                                        </Grid>
                                        <Grid container>
                                            <Grid item xs={5} style={{ padding: '0.5em' }}>Email</Grid>
                                            <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.leadPaxEmail}</Grid>
                                        </Grid>
                                    </Stack>
                                </>
                            })}</> : null}
                </Card>
            }
            {/* lead pax ends */}

            {/* hotel details starts */}
            {validHotelInput.length > 0 &&
                <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                    <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Hotel Details</Typography>
                    {data.hotelDetails.map((each, index) => {
                        return <>
                            <Stack style={{ width: '100%', padding: '1em', fontWeight: '500', lineHeight: '0.7' }} justifyContent='center' alignItems='center'>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>Hotel Name</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.hotelName}</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>Hotel Category</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.hotelCategory}</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>Rooms</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.noOfRooms}</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>Nights</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.noOfNights}</Grid>
                                </Grid>
                            </Stack>
                        </>
                    })}
                </Card>
            }
            {/* hotel details ends */}

            {/* transfer details starts */}
            {validTransferInput.length > 0 &&
                <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                    <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Transfer Details</Typography>
                    {data.transferDetails.map((each, index) => {
                        return <>
                            <Stack style={{ width: '100%', padding: '1em', fontWeight: '500', lineHeight: '0.7' }} justifyContent='center' alignItems='center'>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>From</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.transferFrom}</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>To</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.transferTo}</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>Trip</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.transferTrip}</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>Type</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.transferType}</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>Vehicle</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.transferVehicle}</Grid>
                                </Grid>
                            </Stack>
                        </>
                    })}
                </Card>
            }
            {/* transfer details ends */}

            {/* activity details starts */}
            {validActvityInput.length > 0 &&
                <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                    <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Activity Details</Typography>
                    {data.activityDetails.map((each, index) => {
                        return <>
                            <Stack style={{ width: '100%', padding: '1em', fontWeight: '500', lineHeight: '0.7' }} justifyContent='center' alignItems='center'>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>City</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.city}</Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={5} style={{ padding: '0.5em' }}>Activity</Grid>
                                    <Grid item xs={7} style={{ padding: '0.5em' }}>: {each.activity}</Grid>
                                </Grid>
                            </Stack>
                        </>
                    })}
                </Card>
            }
            {/* activity details ends */}

            {/* payment details starts */}
            <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Payment Summary</Typography>
                <Stack style={{ width: '100%', padding: '1em', fontWeight: '500', lineHeight: '0.7' }} justifyContent='center' alignItems='center'>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Total Gross Amount</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {formatter.format(data.totalGrossAmount)}</Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={5} style={{ padding: '0.5em' }}>Amount Paid</Grid>
                        <Grid item xs={7} style={{ padding: '0.5em' }}>: {formatter.format(data.amountPaid)}</Grid>
                    </Grid>
                </Stack>
            </Card>
            {/* payment details ends */}

            {/* cancellation policy starts */}
            <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Cancellation Policy</Typography>
                <div style={{ width: 'auto', padding: '1em', fontWeight: '500', lineHeight: '1.2' }}>
                    {_.isEmpty(cancelationpolicy)
                        ? null
                        : parse(cancelationpolicy)}
                </div>
            </Card>
            {/* cancellation policy ends */}

            {/* terms & conditions starts */}
            <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', boxShadow: 'none' }}>
                <Typography variant='h5' style={{ backgroundColor: '#111', color: '#fff', padding: '0.5% 1%' }}>Terms & Conditions</Typography>
                <div style={{ width: 'auto', padding: '1em', fontWeight: '500', lineHeight: '1.2' }}>
                    {_.isEmpty(termsandcondition)
                        ? null
                        : parse(termsandcondition)}
                </div>
            </Card>
            {/* terms & conditions ends */}

            <Card style={{ borderRadius: '0', backgroundColor: '#fff', width: '85%', borderRadius: '0 0 5px 5px', boxShadow: 'none' }}>
                <Stack style={{ width: '100%', padding: '0.1em', fontWeight: '500' }} justifyContent='center' alignItems='center'>
                    <Grid container></Grid>
                </Stack>
            </Card>
        </div>
        <Stack direction='row' justifyContent='center' alignItems='center'>
            {document.queryCommandSupported("copy") && (
                <span style={{ textAlign: "center" }}>
                    <Button color="primary" onClick={copyToClip} style={twnButtonStyles.orangeBtn}>
                        {copySuccess}
                    </Button>
                </span>
            )}
            {/* <Link to={{ pathname: `/package/${isPackage}` }} style={{ textAlign: "center", color: "#fff", backgroundColor: '#111', height: '1.5em', padding: '0.4em', borderRadius: '5px' }}>Cancel</Link> */}
        </Stack>
    </div>
    )
}