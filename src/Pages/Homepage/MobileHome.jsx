import React from "react";
import {s3BaseUrl} from '../../Service/httpCommon'
import { Link } from "react-router-dom"
import { Stack, Typography, Button, Grid, Paper, Container } from "@mui/material";


import lines from './images/lines.png';
import Backsdfas from './images/Backsdfas.png';
import verticalline from './images/verticalline.png';
import BoardLogo from '../../assets/logo/Board-logo.png';

import BusinessIcon from '@material-ui/icons/Business';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';

import Carousel from './Carousel'

const cards = [
    { label: 'Access To Towno Hotel Sales Network', icon: <BusinessIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '30px' }} /> },
    { label: 'Higher Margins Through Offline Rates', icon: <TrendingUpIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Easy Booking Management And Lead Tracking', icon: <MonetizationOnIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Freedom To Add Own Hotels And Partners', icon: <AllInclusiveIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Zero Dependency On OTAs And B2B Portals', icon: <AutorenewIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Freedom Of Setting Their Own Margins Per Lead', icon: <StoreMallDirectoryIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> }
];

export default function MobileHome({width}) {
    return (
        <div style={{ margin: "0", padding: "0", width: "100wh", height: "100vh" }}>
            {/* Navbar  */}
            <div style={{ backgroundColor: '#111' }}>
                <Stack direction='row' justifyContent='space-between'>
                    <img src={BoardLogo} alt="logo" style={{ width: '8em', height: 'auto', margin: '0.7em', marginLeft: '1.8em' }} />
                    <Link to="/login" style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#f46d25', width: '5em', height: '1.5em', marginTop: '0.7em', marginRight: '2em', textAlign: 'center', borderRadius: '5px', fontWeight: 'bold', paddingTop: '0.2em' }}>Login</Link>
                </Stack>
            </div>
            {/* Navbar Ends  */}

            {/* HERO SECTION  */}
            <div style={{ backgroundImage: `url(${Backsdfas})`, backgroundColor: '#e0f7fa' }}>
                <div style={{ textAlign: 'center', fontSize: '1.75em', fontWeight: '700', padding: "10% 5%" }}>
                    <div style={{ lineHeight: '1' }}>
                        Take Your<br />
                        <span style={{ color: '#f46d25' }}>Travel Agency</span><br />
                        to New Heights
                    </div>
                    <div style={{ color: '#111', fontSize: '0.50em', fontWeight: '500', lineHeight: '1.4', marginTop: '1em' }}>
                        Be the master of your <wbr />game with the help of The Board <br />
                        that offers you an All-in-One Travel Management System.
                    </div>
                    <Button style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 2em', fontWeight: 'bold' }}>Get A Free Demo</Button>
                </div>
            </div>
            {/* HERO SECTION ENDS  */}

            {/* ABOUT US SECTION  */}
            <div style={{ backgroundImage: `url(${lines})`, backgroundColor: '#fff'}}>
                <Stack justifyContent="center" alignItems="center" spacing={2} py={4}>
                    <img src={s3BaseUrl+"MobMockuppss.ba1399a0.png"} alt="this is a laptop" style={{ maxWidth: "100%", height: "auto" }} />
                    <div style={{lineHeight: '1', fontSize: '1.75em', fontWeight: '700', maxWidth: "100%", textAlign: 'center'}}>
                            Travel<br />Management<br />
                            <span style={{ color: '#f46d25' }}>Decoded</span>
                    </div>
                    <div style={{ color: '#111', fontSize: '0.75em', fontWeight: '500', lineHeight: '1.4', padding: "0 5%" }}>
                        We call it "Travel Mangement decoded"  for a reason!
                        The Board can help you manage your travel agency
                        business at the tip of your fingers.
                        <br /><br />
                        Right from managing your clients, finding the best
                        deals to 100+ Towno set hotels to adding hotels of
                        your choice, the ease to close your sales has never
                        been so effective!
                    </div>

                </Stack>

                <Stack justifyContent='space-between' alignItems='center' spacing={2} pb={2}>
                    <img src={s3BaseUrl+"Girl.6db8a1f4.png"} alt="this is a laptop" style={{ maxWidth: "100%", height: "auto" }} />

                    <div style={{ fontSize: '1.5em', fontWeight: '700', maxWidth: "100%", textAlign: "center"}}>
                        <span>Who Are <span style={{ color: '#f46d25' }}>We</span> ?</span>
                        <div style={{ color: '#111', fontSize: '0.50em', fontWeight: '500', lineHeight: '1.4', padding: "0 5%" }}>
                            We are the #1 sales partner to Hotels, Resorts and Homestays
                            and distributes their offline and exclusive rates to our travel
                            agent partners and community.
                        </div>
                        <br />
                        <span>What's in it for <span style={{ color: '#f46d25' }}>Travel Agents</span> ?</span>
                        <div style={{ color: '#111', fontSize: '0.50em', fontWeight: '500', lineHeight: '1.4', padding: "0 5%" }}>
                            Use our CRM as an all-in-one travel management system to
                            access the best offline rates our hotels have to offer as well as
                            your own in-house booking management CRM.
                        </div>
                        <br />
                        <span>Why <span style={{ color: '#f46d25' }}>The Board</span> ?</span>
                        <div style={{ color: '#111', fontSize: '0.50em', fontWeight: '500', lineHeight: '1.4', padding: "0 5%" }}>
                            We are sure you wouldn't have come across an All-In-One
                            platform to manage your travel agency! it's as simple as
                            that.
                        </div>
                    </div>
                </Stack>
            </div>
            {/* ABOUT US SECTION ENDS */}

            {/* FEATURES SECTION  */}
            <Stack spacing={2} justifyContent="center" alignItems="center" style={{ backgroundImage: `url(${Backsdfas})`, backgroundColor: '#e0f7fa' }} py={4}>
                <Typography style={{color: '#f46d25', fontWeight: 'bold', fontSize: '1.5em' }}>Features</Typography>
                    {cards.map((each, index) => {
                        return (
                            <Paper key={index} style={{ padding: '1.5em', width: '60%', height: 'auto' }}>
                                <Stack direction='row' alignItems='center' justifyContent='left'>
                                    <span>{each.icon}</span>
                                    <img src={verticalline} style={{ height: '3em', color: '#f46d25' }} />
                                    <span style={{ fontSize: '0.8em' }}>{each.label}</span>
                                </Stack>
                            </Paper>
                        )
                    })
                    }
            </Stack>
            {/* FEATURES SECTION ENDS  */}

            <div style={{ backgroundImage: `url(${lines})`, backgroundColor: '#fff', paddingTop: '2.5em' }}>
                {/* WE MADE EAZY FOR YOU  */}
                <Stack justifyContent='space-around' alignItems='center' spacing={4}>
                    <div style={{ fontSize: '1.75em', fontWeight: '700', maxWidth: "100%", textAlign: "center" }}>
                        <div style={{ lineHeight: '1' }}>
                            We <br />
                            <span style={{ color: '#f46d25' }}> Made It Easy </span><br />
                            For You!
                        </div>
                        <br />
                        <div style={{ color: '#111', fontSize: '0.50em', fontWeight: '500', lineHeight: '1.4', padding: "0 5%" }}>
                            Haven't you still got the hold of what we do and how the
                            board can help you?
                            <br /><br />
                            We couldn't help you more by making this "Step By Step
                            Guide" video for you!
                            Watch this video to understand it better!
                        </div>
                    </div>
                    <video src="" controls style={{ minWidth: "80%", borderRadius: '5px', height: "auto", paddingBottom: "10%" }}></video>
                </Stack>
                {/* WE MADE EAZY FOR YOU ENDS */}

                <div style={{ backgroundImage: `url(${s3BaseUrl+"CRMMOCKUP.7f475e07.png"})`, backgroundSize: '100%', backgroundColor: '#fff', backgroundRepeat: 'no-repeat', padding: "10% 0" }}>
                    <div style={{ color: "#fff", fontSize: "1.5em", fontWeight: '700', lineHeight: "1", textAlign: "center" }}>
                        Claim Your Space<br />
                        <span style={{ color: '#f46d25' }}>&nbsp; In Travel World</span>
                    </div>
                    <br />
                    <div style={{ textAlign: 'center', fontSize: "0.50em", color: '#fff' }}>You don't have to anticipate anymore! <br/>
                    <br/>
                    <Button style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.25em 1em', fontWeight: 'bolder',  fontSize:'1.5em' }}>Get A Free Demo</Button> </div>
                </div>

                {/* Our Community  */}
                <Stack justifyContent='center' alignItems="center" py={4} spacing={4} mx={8}>
                    <div style={{ textAlign: "center", fontSize: "1.5em", fontWeight: '700', lineHeight: "1" }}>
                        Our <span style={{ color: '#f46d25' }}> Community</span> <br />
                        Is Buzzing With <br />
                        <span style={{ color: '#f46d25' }}>Excitement</span>!
                    </div>
                    <Carousel width={width}/>
                </Stack>
                {/* Our Community Ends  */}
            </div>


            {/* FOOTER  */}
            <div style={{ backgroundImage: `url(${s3BaseUrl+"Handshake1.c24fe083.png"})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: '#fff', padding: "10% 0" }}>
                <Typography style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: "1.5em" }}>
                    What Are You <span style={{ color: '#f46d25' }}>Waiting</span> For ? <br />
                    Let's Get <span style={{ color: '#f46d25' }}>Started!</span>
                </Typography>
                <br />
                <Stack spacing={1} justifyContent='center' alignItems="center">
                    <img src={BoardLogo} alt="logo" style={{ width: '8em', height: 'auto' }} />
                    <hr style={{ color: '#fff', width: "60%" }} />
                    <span style={{ color: '#fff' }}>Copyright@2022</span>
                </Stack>
            </div>
            {/* FOOTER ENDS  */}

        </div>
    )
}