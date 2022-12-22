import React, { useState, useReducer, useEffect } from 'react';
import { Stack, Typography, Grid, Card, Button, Paper } from '@mui/material';
import { format } from 'date-fns';
import { twnButtonStyles } from '../../utils/townoStyle';

const cardLabel = { padding: '0.5em 1em', color: '#111', fontWeight: '500' };
const cardValue = { padding: '0.5em 1em', color: '#111' };
const hrStyle = { backgroundColor: '#111', margin: '1em 0', height: "0.1em" };

export default function Preview({ data }) {
  console.log("data: ", data)

  return (
    <div style={{ padding: '2% 1%', fontSize: '14px', backgroundColor: '#F7F7F7' }}>
      {/* <Typography style={{ color: '#f46d25', fontWeight: 'bold',fontSize: '32px', fontFamily: 'Segoe UI' }}>{data.type} Details</Typography> */}
      <Typography variant="h5" component="h5" style={twnButtonStyles.xlFonts}>Booking Details</Typography>
      <Card style={{ marginTop: '9px' }}>
        <div style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 1em', fontSize: '18px', fontWeight: '500' }}>Basic Details</div>
        <Stack>
          <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em 0.5em 0 0.5em' }}>
            <Grid container>
              <Grid item xs={4} style={cardLabel}>Name</Grid>
              <Grid item xs={8} style={cardValue}>: {data.clientName}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5} style={cardLabel}>Mobile No.</Grid>
              <Grid item xs={7} style={cardValue}>: {data.clientMobile}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4} style={cardLabel}>Email</Grid>
              <Grid item xs={8} style={cardValue}>: {data.clientEmail}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5} style={cardLabel}>Destination</Grid>
              <Grid item xs={7} style={cardValue}>: {data.destinationCity}</Grid>
            </Grid>
          </Stack>
          <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0 0.5em 0.5em 0.5em' }}>
            <Grid container>
              <Grid item xs={4} style={cardLabel}>Hotel</Grid>
              <Grid item xs={8} style={cardValue}>: {data.hotelName}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5} style={cardLabel}>Hotel Email</Grid>
              <Grid item xs={7} style={cardValue}>: {data.hotelEmail}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4} style={cardLabel}>Check-In</Grid>
              <Grid item xs={8} style={cardValue}>: {data.checkIn}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5} style={cardLabel}>Check-Out</Grid>
              <Grid item xs={7} style={cardValue}>: {data.checkOut}</Grid>
            </Grid>
          </Stack>
          <Grid container item xs={3} style={{ lineHeight: '0.3', padding: '0 0.5em 0.5em 0.5em' }}>
            <Grid item xs={7} style={cardLabel}>Booking Source:</Grid>
            <Grid item xs={5} style={cardValue}>{data.bookingSource}</Grid>
          </Grid>
        </Stack>
      </Card>

      {/* lead details  */}
      {data.bookingLeads.length > 0 &&
        <>
          <Card style={{ marginTop: '9px' }}>
            <div style={{ backgroundColor: '#f46d25', color: '#fff', fontWeight: '500', padding: '0.5em 1em', fontSize: '18px' }}>Lead Pax Details</div>
            {data.bookingLeads.map((each, index) => {
              return <>
                <Stack direction='row' spacing={2} style={{ lineHeight: '0.3', padding: '0.5em ' }}>
                  <Grid container>
                    <Grid item xs={5} style={cardLabel}>Name</Grid>
                    <Grid item xs={7} style={cardValue}>: {each.name}</Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={5} style={cardLabel}>Mobile No</Grid>
                    <Grid item xs={7} style={cardValue}>: {each.mobile}</Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={5} style={cardLabel}>Alt No</Grid>
                    <Grid item xs={7} style={cardValue}>: {each.altMobile}</Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={3} style={cardLabel}>Email</Grid>
                    <Grid item xs={9} style={cardValue}>: {each.email}</Grid>
                  </Grid>
                </Stack>
              </>
            })}</Card></>}

      {/* room details  */}
      {data.roomCategories.length > 0 &&
        <>
          <Card style={{ marginTop: '9px' }}> <div style={{ backgroundColor: '#f46d25', color: '#fff', fontWeight: '500', padding: '0.5em 1em', fontSize: '18px' }}>Room Details</div>
            {data.roomCategories.map((each, index) => {
              return <>
                <Card>
                  <Stack>
                    <Stack direction='row' spacing={2} style={{ lineHeight: '0.3', padding: '0.5em' }}>
                      <Grid container>
                        <Grid item xs={5} style={cardLabel}>Room Type</Grid>
                        <Grid item xs={7} style={cardValue}>: {each.roomType}</Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={5} style={cardLabel}>Adults</Grid>
                        <Grid item xs={7} style={cardValue}>: {each.adult}</Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={5} style={cardLabel}>Children</Grid>
                        <Grid item xs={7} style={cardValue}>: {each.child}</Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={5} style={cardLabel}>Rooms</Grid>
                        <Grid item xs={7} style={cardValue}>: {each.rooms}</Grid>
                      </Grid>
                    </Stack>
                    <Stack direction='row' spacing={2} style={{ lineHeight: '0.3', padding: '0.5em' }}>
                      <Grid container>
                        <Grid item xs={5} style={cardLabel}>Meal Plan</Grid>
                        <Grid item xs={7} style={cardValue}>: {each.mealplan}</Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={5} style={cardLabel}>Selling Price</Grid>
                        <Grid item xs={7} style={cardValue}>: {each.sellingPrice}</Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={5} style={cardLabel}>Net Price</Grid>
                        <Grid item xs={7} style={cardValue}>: {each.netPrice}</Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={5} style={cardLabel}>Total Price</Grid>
                        <Grid item xs={7} style={cardValue}>: {each.totalNetPrice}</Grid>
                      </Grid>
                    </Stack>
                  </Stack>
                </Card>
              </>
            })}</Card></>}

      {/* inclusion details  */}
      {data.bookingInclusions.length > 0 &&
        <>
          <Card style={{ marginTop: '9px' }}> <div style={{ backgroundColor: '#f46d25', color: '#fff', fontWeight: '500', padding: '0.5em 1em', fontSize: '18px' }}>Inclusion Details</div>
            {data.bookingInclusions.map((each, index) => {
              return <>
                <Card>
                  <Stack direction='row' spacing={2} style={{ lineHeight: '0.3', padding: '0.5em ' }}>
                    <Grid container>
                      <Grid item xs={5} style={cardLabel}>Name</Grid>
                      <Grid item xs={7} style={cardValue}>: {each.inclusion}</Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={5} style={cardLabel}>Selling Price</Grid>
                      <Grid item xs={7} style={cardValue}>: {each.sellingPrice}</Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={6} style={cardLabel}>Net to Vendor</Grid>
                      <Grid item xs={6} style={cardValue}>: {each.vendorPrice}</Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={5} ></Grid>
                      <Grid item xs={7}></Grid>
                    </Grid>
                  </Stack>
                </Card></>
            })}</Card></>}

      <Card style={{ marginTop: '9px' }}> <div style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 1em', fontSize: '18px', fontWeight: '500' }}>Payment Details</div>
        <Stack>
          <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em' }}>
            <Grid container>
              <Grid item xs={7} style={cardLabel}>Room Rent</Grid>
              <Grid item xs={5} style={cardValue}>: {data.totalRoomSellingAmount}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} style={cardLabel}>Inclusion Amount</Grid>
              <Grid item xs={6} style={cardValue}>: {data.totalInclusionAmount}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} style={cardLabel}>Booking Amount</Grid>
              <Grid item xs={6} style={cardValue}>: {data.totalBookingAmount}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5} style={cardLabel}>Net Payout</Grid>
              <Grid item xs={7} style={cardValue}>: {data.totalNetAmount}</Grid>
            </Grid>
          </Stack>
          <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em' }}>
            <Grid container>
              <Grid item xs={7} style={cardLabel}>Commission</Grid>
              <Grid item xs={5} style={cardValue}>: {data.profit}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} style={cardLabel}>Amount Received</Grid>
              <Grid item xs={6} style={cardValue}>: {data.paidAmount}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6} style={cardLabel}>Payment Mode</Grid>
              <Grid item xs={6} style={cardValue}>: {data.paymentMode}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={5} style={cardLabel}>BPAH</Grid>
              <Grid item xs={7} style={cardValue}>: {data.balancePayableHotel}</Grid>
            </Grid>
          </Stack>
          <Stack direction='row' style={{ lineHeight: '0.3', padding: '0.5em' }}>
            <Grid container item xs={3}>
              <Grid item xs={7} style={cardLabel}>Reference No.</Grid>
              <Grid item xs={5} style={cardValue}>: {data.paymentRefNo}</Grid>
            </Grid>
            <Grid container item xs={3}>
              <Grid item xs={6} style={cardLabel}>Balance Payable</Grid>
              <Grid item xs={6} style={cardValue}>: {data.partialPayment}</Grid>
            </Grid>
          </Stack>
        </Stack>
      </Card>

    </div>
  );
}