import React, { useState, useEffect } from 'react';
import Api from '../../../Service/Api';
import { useHistory, useParams } from 'react-router-dom';
import { twnButtonStyles } from "../../../utils/townoStyle";
import { Card, Stack, Grid, Typography, Button } from "@mui/material";

const cardLabel = { padding: '0.5em 1em', color: '#111', fontWeight: '500' };
const cardValue = { padding: '0.5em 1em', color: '#111' };

export default function ViewAgentProperty() {
    var uniqueid = localStorage.getItem("unique_id");
    var [agentData, setAgentData] = useState({
        "id": "", hotelName: "", city: "", starCategory: "", totalNoOfRooms: "", checkinTime: "", checkoutTime: "", amenties: "", propertyId: "", hotelAddress: "", hotelContact: "", hotelEmail: "", roomCategories: [],
        "checkIn24": false, "couplefriendly": false, "beachnearby": false, "swimingpool": false,
        "conferencehall": false, "kidsplayarea": false, "designatorforwedding": false, "petFriendly": false, "isspa": false
    });
    let { propertyId } = useParams();
    const history = useHistory();

    useEffect(() => {
        Api.get(`/quickPropertybyid/${uniqueid}/${propertyId}`).then((res) => {
            console.log("all data", res.data);
            setAgentData(res.data);
        });
    }, []);

    return (
        <div style={{ ...twnButtonStyles.allPages, paddingTop: '75px' }}>
            <Typography variant="h5" component="h5" style={twnButtonStyles.xlFonts}>Your Property</Typography>

            {/* basic details  */}
            <Card style={{ marginTop: '9px', boxShadow: 'none' }}>
                <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Basic Details</Typography>
                <Stack >
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em 0.5em 0 0.5em' }}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Hotel Name</Grid>
                            <Grid item xs={7} style={cardValue}>: {agentData.hotelName}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} style={cardLabel}>Contact</Grid>
                            <Grid item xs={6} style={cardValue}>: {agentData.hotelContact}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Address</Grid>
                            <Grid item xs={8} style={cardValue}>: {agentData.hotelAddress}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em' }}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Email</Grid>
                            <Grid item xs={7} style={cardValue}>: {agentData.hotelEmail}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} style={cardLabel}>City</Grid>
                            <Grid item xs={6} style={cardValue}>: {agentData.city}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Star Category</Grid>
                            <Grid item xs={8} style={cardValue}>: {agentData.starCategory}</Grid>
                        </Grid>
                    </Stack>
                    <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em' }}>
                        <Grid container>
                            <Grid item xs={5} style={cardLabel}>Rooms</Grid>
                            <Grid item xs={7} style={cardValue}>: {agentData.totalNoOfRooms}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6} style={cardLabel}>Check-In Time</Grid>
                            <Grid item xs={6} style={cardValue}>: {agentData.checkinTime}</Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={4} style={cardLabel}>Check-Out Time</Grid>
                            <Grid item xs={8} style={cardValue}>: {agentData.checkoutTime}</Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Card>

            {/* room details  */}
            {agentData.roomCategories.length > 0 &&
                <Card style={{ marginTop: '15px', boxShadow: 'none' }}>
                    <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Room Category</Typography>
                    {agentData.roomCategories.map((each, index) => {
                        return <>
                            <Stack direction='row' spacing={1} style={{ lineHeight: '0.3', padding: '0.5em' }}>
                                <Grid container>
                                    <Grid item xs={4} style={cardLabel}>Name</Grid>
                                    <Grid item xs={8} style={cardValue}>: {each.name}</Grid>
                                </Grid><br />
                                <Grid container>
                                    <Grid item xs={4} style={cardLabel}>Price</Grid>
                                    <Grid item xs={8} style={cardValue}>: {each.price}</Grid>
                                </Grid>
                            </Stack>
                        </>
                    })}
                </Card>}

            {/* amenities  */}
            {agentData.amenties != "" && agentData.amenties != null &&
                <Card style={{ marginTop: '9px', boxShadow: 'none' }}>
                    <Typography style={{ ...twnButtonStyles.headerStyle, padding: '10px 0 0 5px', height: '32px' }}>Amenities</Typography>
                    <Grid container>
                        <Grid item xs={4} style={cardLabel}>{agentData.amenties}</Grid>
                    </Grid>
                </Card>
            }
            <Button style={{ ...twnButtonStyles.blackBtn, margin: '30px 0 0 45%' }} onClick={() => { history.push({ pathname: '/properties' }) }}>Back</Button>
        </div>
    );
}