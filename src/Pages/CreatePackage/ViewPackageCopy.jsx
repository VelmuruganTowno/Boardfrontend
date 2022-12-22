import React, { useState, useEffect } from 'react';
import { Typography, Grid, Dialog, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Api from "../../Service/Api";
import { format, differenceInDays } from "date-fns";
import { useParams } from 'react-router-dom';
import { twnButtonStyles } from '../../utils/townoStyle';

const PackageOrQuotation = (isPackage) => { return isPackage ? "Package" : "Quotation" }

export default function ViewPackage(props) {
    var uniqueid = localStorage.getItem("unique_id");
    var [data, setData] = useState({ "id": "", "type": "", "name": "", "clientName": "", "clientMobileNo": "", "noOfAdults": "", "createdAt": "", "hotelDetails": [], 'leadPax': [], 'transferDetails': [], 'activityDetails': [] });
    let { pkgOrQtn, id } = useParams();
    let isPackage = pkgOrQtn === "package" ? true : false;
    let validLeadPax = data.leadPax != null ? data.leadPax.filter((e) => { return e.leadPaxName != "" }):0;
    let validHotelInput = data.hotelDetails.filter((e) => { return e.hotelName != "" });
    let validTransferInput = data.transferDetails.filter((e) => { return e.transferFrom != "" });
    let validActvityInput = data.activityDetails.filter((e) => { return e.city != "" })

    useEffect(() => {
        Api.get(`/getpackageorquotationid/${uniqueid}/${PackageOrQuotation(isPackage)}/${id}`).then((res) => {
            console.log("all data",res.data);
            setData(res.data);
        });
    }, []);

    return (
        <div style={{ padding: '5% 2%' }}>
            {/* <Typography style={{ color: '#f46d25', marginLeft: "1%", fontWeight: 'bold',fontSize: '32px', fontFamily: 'Segoe UI '  }}>Your {PackageOrQuotation(isPackage)}</Typography> */}
            <Typography variant="h5" component="h5" style={twnButtonStyles.xlFonts}>Your {PackageOrQuotation(isPackage)}</Typography>
            <div>
                <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 1em',fontSize:'18px',fontWeight: '500' }}>Basic Details</Typography>
                <Stack direction='row' spacing={5} style={{ lineHeight: '0.3',padding: '0.5em 0.5em 0 0.5em' }}>
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3',padding: '0.5em 0.5em 0 0.5em' }}>
                        <Grid container >
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>{PackageOrQuotation(isPackage)} Name</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.name}</Grid>
                        </Grid> <br />
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Destination Name</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.destination}</Grid>
                        </Grid> <br />
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Client Name</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.clientName}</Grid>
                        </Grid><br />
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Phone No</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.clientMobileNo}</Grid>
                        </Grid><br />
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Duration</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {differenceInDays(new Date(data.checkOut), new Date(data.checkIn))}</Grid>
                        </Grid>
                    </Stack>
                    <Stack style={{ width: '50%' }}>
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Booking Date</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.createdAt ? format(new Date(data.createdAt), 'dd-MM-yyyy') : null}</Grid>
                        </Grid><br />
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Check-In</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.checkIn ? format(new Date(data.checkIn), "dd-MM-yyyy") : null}</Grid>
                        </Grid><br />
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Check-Out</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.checkOut ? format(new Date(data.checkOut), "dd-MM-yyyy") : null}</Grid>
                        </Grid><br />
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Adults</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.noOfAdults}</Grid>
                        </Grid><br />
                        <Grid container>
                            <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Children</Grid>
                            <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.noOfChildren}</Grid>
                        </Grid>
                    </Stack>
                    
                </Stack>
                {validLeadPax.length > 0 &&
                    <>
                        <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', margin: "1%", padding: '0.4% 1%' }}>Lead Pax Details</Typography>
                        {validLeadPax.map((each, index) => {
                            return <>
                                <Stack direction='row' spacing={3} style={{ lineHeight: '0.5', margin: '0.5em 0.8em' }}>
                                    <Grid container>
                                        <Grid item xs={3} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Name</Grid>
                                        <Grid item xs={9} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.leadPaxName}</Grid>
                                    </Grid><br />
                                    <Grid container>
                                        <Grid item xs={4} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Mobile No</Grid>
                                        <Grid item xs={8} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.leadPaxMobile}</Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={4} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Alt No</Grid>
                                        <Grid item xs={8} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.leadPaxAltNo}</Grid>
                                    </Grid><br />
                                    <Grid container>
                                        <Grid item xs={3} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Email</Grid>
                                        <Grid item xs={9} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.leadPaxEmail}</Grid>
                                    </Grid>
                                </Stack>
                            </>
                        })}</>}
                {data.itinerary != "" && data.itinerary != null &&
                    <Grid container>
                        <Grid item xs={12} style={{ backgroundColor: '#eee', padding: '0.7em', margin: '0.5% 1%', fontWeight: '500' }}>Itinerary  <span> :  {data.itinerary}</span></Grid>
                    </Grid>
                }
                {(validHotelInput.length > 0 || validTransferInput.length > 0 || validActvityInput.length > 0) &&
                <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', margin: "1%", padding: '0.4% 1%' }}>{PackageOrQuotation(isPackage)} Details</Typography>}
                {validHotelInput.length > 0 && <>
                    <Typography variant='h6' style={{ color: '#f46d25', lineHeight: '0.5', margin: '0.5em 0.8em' }}>Hotel Details</Typography>
                    {validHotelInput.map((each, index) => {
                        return <>
                            <Stack direction='row' spacing={2} style={{ lineHeight: '0.5', margin: '0.7em 0.8em' }}>
                                <Grid container>
                                    <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Hotel Name</Grid>
                                    <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.hotelName}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Hotel Category</Grid>
                                    <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.hotelCategory}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Rooms</Grid>
                                    <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.noOfRooms}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Nights</Grid>
                                    <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.noOfNights}</Grid>
                                </Grid>
                            </Stack>
                        </>
                    })}
                </>
                }
                {validTransferInput.length > 0 && <>
                    <Typography variant='h6' style={{ color: '#f46d25', lineHeight: '0.5', margin: '0.8em 0.8em' }}>Transfer Details</Typography>
                    {validTransferInput.map((each, index) => {
                        return <>
                            <Stack direction='row' spacing={2} style={{ lineHeight: '0.5', margin: '0.5em 0.8em' }}>
                                <Grid container>
                                    <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>From</Grid>
                                    <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.transferFrom}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>To</Grid>
                                    <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.transferTo}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Trip</Grid>
                                    <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.transferTrip}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Type</Grid>
                                    <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.transferType}</Grid>
                                </Grid><br />
                            </Stack>
                            <Grid container style={{ lineHeight: '0.5', margin: '0.7em 0.8em' }}>
                                <Grid item xs={2.85} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Vehicle <span style={{ paddingLeft: '4.5em' }}>: {each.transferVehicle}</span></Grid>
                                {/* <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.transferVehicle}</Grid> */}
                            </Grid>
                        </>
                    })}</>
                }
                {validActvityInput.length > 0 && <>
                    <Typography variant='h6' style={{ color: '#f46d25', lineHeight: '0.5', margin: '0.8em 0.8em' }}>Activity Details</Typography>
                    {validActvityInput.map((each, index) => {
                        return <>
                            <Stack direction='row' spacing={2} style={{ lineHeight: '0.5', margin: '0.5em 0.8em' }}>
                                <Grid container>
                                    <Grid item xs={2.5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>City</Grid>
                                    <Grid item xs={9.5} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.city}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={2.5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Activity</Grid>
                                    <Grid item xs={9.5} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {each.activity}</Grid>
                                </Grid>
                            </Stack>
                        </>
                    })}
                </>}
                <Typography variant='h5' style={{ backgroundColor: '#f46d25', color: '#fff', margin: "1%", padding: '0.4% 1%' }}>Payment Details</Typography>
                <Stack direction='row' spacing={2} style={{ lineHeight: '0.5', margin: '0.7em 0.8em',marginTop:'-5px' }}>
                    <Grid container>
                        <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Total Gross Amount</Grid>
                        <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.totalGrossAmount}</Grid>
                    </Grid><br />
                    <Grid container>
                        <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Amount Paid</Grid>
                        <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.amountPaid}</Grid>
                    </Grid><br />
                    <Grid container>
                        <Grid item xs={5} style={{ backgroundColor: '#eee', padding: '0.7em', fontWeight: '500' }}>Commission</Grid>
                        <Grid item xs={7} style={{ backgroundColor: '#eee', padding: '0.7em' }}>: {data.comission}</Grid>
                    </Grid>
                </Stack>
            </div><br />
            <Stack direction='row' spacing={2} justifyContent='center' alignItems='center'>
                <Link to={{ pathname: `/packageOrQuotation/${pkgOrQtn}` }} style={twnButtonStyles.linkOrangeBtn}>Back to {PackageOrQuotation(isPackage)}</Link>
                {isPackage ?
                    // <Link to={{ pathname: `/copyPage/${isPackage}/${data.packageId}` }} style={{ color: "#fff", background: "#111", padding: '1em', borderRadius: '10px', width: '6em', textAlign: 'center' }}>Next</Link> :
                    // <Link to={{ pathname: `/copyPage/${isPackage}/${data.quotationId}` }} style={{ color: "#fff", background: "#111", padding: '1em', borderRadius: '10px', width: '6em', textAlign: 'center' }}>Next</Link>
                    <span onClick={() => { window.open(`/copyPage/${isPackage}/${data.packageId}`) }} style={{...twnButtonStyles.linkBlackBtn}}>Copy Package</span> :
                    <span onClick={() => { window.open(`/copyPage/${isPackage}/${data.quotationId}`) }} style={twnButtonStyles.linkBlackBtn}>Copy Quotation</span>
                }
            </Stack>
        </div >
    )
}