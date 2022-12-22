import React from "react";
import {s3BaseUrl} from '../../Service/httpCommon'
import { Link } from "react-router-dom"
import { Stack, Typography, Button, Grid, Paper, Container } from "@mui/material";

import lines from './images/lines.png';
import R from './images/R.jfif';
import verticalline from './images/verticalline.png';
import Backsdfas from './images/Backsdfas.png';
import BoardLogo from '../../assets/logo/Board-logo.png';

import BusinessIcon from '@material-ui/icons/Business';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';

import Carousel from './Carousel'

const cards = [
    { label: 'Access To Towno Hotel Sales Network', icon: <StoreMallDirectoryIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '30px' }} /> },
    { label: 'Higher Margins Through Offline Rates', icon: <TrendingUpIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Easy Booking Management And Lead Tracking', icon: <AutorenewIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Freedom To Add Own Hotels And Partners', icon: <BusinessIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Zero Dependency On OTAs And B2B Portals', icon: <AllInclusiveIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Freedom Of Setting Their Own Margins Per Lead', icon: <MonetizationOnIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> }
];

export default function DesktopHome({width}) {
    return (
        <div style={{ margin: "0", padding: "0", width: "100wh", height: "100vh" }}>

            {/* Navbar  */}
            <div style={{ backgroundColor: '#111' }}>
                <Stack direction='row' justifyContent='space-between'>
                    <img src={BoardLogo} alt="logo" style={{ width: '12em', height: '2.5em', margin: '0.7em', marginLeft: '1.8em' }} />
                    <Link to="/login" style={{ textDecoration:'none', color: '#fff', backgroundColor: '#f46d25', width: '8em', height: '2em', marginTop: '1em', marginRight: '2em', textAlign: 'center', borderRadius: '5px', fontWeight: 'bold', paddingTop: '0.2em' }}>Login</Link>
                </Stack>
            </div>
            {/* Navbar Ends  */}

            {/* HERO SECTION  */}
            <div style={{ backgroundImage: `url(${s3BaseUrl+"Backsdfas.5bee357a.png"})`, backgroundColor: '#e0f7fa' }}>
                <Stack direction='row' justifyContent='space-around' alignItems='center' spacing={2} style={{ height: "100vh" }}>
                    <img src={s3BaseUrl+"HeroSection.b99df042.png"} alt="this is a laptop" style={{ maxWidth: "45%", height: "auto" }} />
                    <div style={{ textAlign: 'right', fontSize: '2.75em', fontWeight: '700', padding: "1em" }}>
                        <div style={{ lineHeight: '1' }}>
                            Take Your<br />
                            <span style={{ color: '#f46d25' }}>Travel Agency</span><br />
                            to New Heights
                        </div>
                        <div style={{ color: '#111', fontSize: '0.30em', fontWeight: '500', lineHeight: '1.4', marginTop: '1em' }}>
                            Be the master of your <wbr />game with the help of The Board <br />
                            that offers you an All-in-One Travel Management System.
                        </div>
                        <Button style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 2em', fontWeight: 'bold' }}>Get A Free Demo</Button>
                    </div>
                </Stack>
            </div>
            {/* HERO SECTION ENDS  */}

            {/* ABOUT US SECTION  */}
            <div style={{ backgroundImage: `url(${lines})`, backgroundColor: '#fff' }}>
                <Stack direction='row' justifyContent='space-around' alignItems='center' spacing={4} style={{ height: "100vh" }}>
                    <div style={{ fontSize: '2.75em', fontWeight: '700', maxWidth: "40%", paddingLeft: '2em' }}>
                        <div style={{ lineHeight: '1' }}>
                            Travel<br />Management<br /><span style={{ color: '#f46d25' }}>Decoded</span>
                        </div>
                        <div style={{ color: '#111', fontSize: '0.30em', fontWeight: '500', lineHeight: '1.4', marginTop: '1em', maxWidth: "65%" }}>
                            We call it "Travel Mangement decoded"  for a reason!
                            The Board can help you manage your travel agency
                            business at the tip of your fingers.
                            <br /><br />
                            Right from managing your clients, finding the best
                            deals to 100+ Towno set hotels to adding hotels of
                            your choice, the ease to close your sales has never
                            been so effective!
                        </div>
                    </div>
                    <img src={s3BaseUrl+"MobMockuppss.ba1399a0.png"} alt="this is a laptop" style={{ maxWidth: "45%", height: "auto" }} />
                </Stack>

                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={4} style={{ height: "90vh" }}>
                    <img src={s3BaseUrl+"Girl.6db8a1f4.png"} alt="this is a laptop" style={{ maxWidth: "45%", height: "auto" }} />
                    <div style={{ fontSize: '2.25em', fontWeight: '700', maxWidth: "40%" }}>
                        <span>Who Are <span style={{ color: '#f46d25' }}>We</span> ?</span>

                        <div style={{ color: '#111', fontSize: '0.40em', fontWeight: '500', lineHeight: '1.4', marginTop: '1em', maxWidth: "65%" }}>
                            We are the #1 sales partner to Hotels, Resorts and Homestays
                            and distributes their offline and exclusive rates to our travel
                            agent partners and community.
                        </div><br />
                        <Stack>
                        <span>What's in it for</span>
                        <span style={{marginTop:'-0.3em'}}><span style={{ color: '#f46d25'}}>Travel Agents</span> ?</span>
                        </Stack>
                        <div style={{ color: '#111', fontSize: '0.40em', fontWeight: '500', lineHeight: '1.4', marginTop: '1em', maxWidth: "65%" }}>
                            Use our CRM as an all-in-one travel management system to
                            access the best offline rates our hotels have to offer as well as
                            your own in-house booking management CRM.
                        </div>
                        <br />
                        <span>Why <span style={{ color: '#f46d25' }}>The Board</span> ?</span>

                        <div style={{ color: '#111', fontSize: '0.40em', fontWeight: '500', lineHeight: '1.4', marginTop: '1em', maxWidth: "65%" }}>
                            We are sure you wouldn't have come across an All-In-One
                            platform to manage your travel agency! it's as simple as
                            that.
                        </div>
                    </div>
                </Stack>
            </div>
            {/* ABOUT US SECTION ENDS */}

            {/* FEATURES SECTION  */}
            <div style={{ backgroundImage: `url(${Backsdfas})`, height: '60vh', backgroundColor: '#e0f7fa', padding: "7%" }}>
                <Typography style={{ textAlign: 'center', color: '#f46d25', fontWeight: 'bold' }} variant='h3'>Features</Typography>
                <Grid container spacing={4} mt={4}>
                    {cards.map((each, index) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} alignItems='center' justifyContent="center">
                                <Paper key={index} style={{ padding: '2em', height: 'auto' }}>
                                    <Stack direction='row' alignItems='center' justifyContent='center'>
                                        <span>{each.icon}</span>
                                        <img src={verticalline} style={{ height: '3em', color: '#f46d25' }} />
                                        <span style={{ fontSize: '1em' }}>{each.label}</span>
                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    })
                    }
                </Grid>
            </div>
            {/* FEATURES SECTION ENDS  */}

            {/* EAZY FOR YOU  */}
            <div style={{ backgroundImage: `url(${lines})`, backgroundColor: '#fff', paddingTop: '1em' }}>
                <Stack direction='row' justifyContent='space-around' alignItems='center' spacing={4} style={{ height: "70vh" }}>
                    <div style={{ fontSize: '2.75em', fontWeight: '700', maxWidth: "40%", paddingLeft: '2em' }}>
                        <div style={{ lineHeight: '1' }}>
                            We<span style={{ color: '#f46d25' }}> Made</span> It <br />
                            <span style={{ color: '#f46d25' }}>Easy</span> For You!
                        </div>
                        
                        <div style={{ color: '#111', fontSize: '0.40em', fontWeight: '500', lineHeight: '1.4', marginTop: '1.5em', maxWidth: "65%" }}>
                            Haven't you still got the hold of what we do and how the
                            board can help you?
                            <br /><br />
                            We couldn't help you more by making this "Step By Step
                            Guide" video for you!
                            Watch this video to understand it better!
                        </div>
                    </div>
                    <video src="" controls style={{ minWidth: "35%", borderRadius: '5px', height: "auto" }}>
                    </video>
                </Stack>
            </div>
            {/* EAZY FOR YOU ENDS */}

            {/* CLAIM YOUR SPACE  */}
            <div style={{ position: "relative", width: "100%", height: "150vh" }}>
                {/* foreground  */}
                <div style={{ position: "relative", zIndex: 1 }}>
                    <Stack justifyContent="center" alignItems="center">
                        <Stack justifyContent="center" alignItems="center" style={{ height: "85vh" }}>
                            <div style={{ paddingTop: "20vh", color: "#fff", fontSize: "40px", fontWeight: '700', lineHeight: "1", alignItems: "center" }}>
                                Claim Your Space<br />
                                <span style={{ color: '#f46d25' }}>&nbsp; In Travel World</span>
                            </div>
                            <br />
                            <span style={{ color: "#fff", fontSize: "15px", color: '#fff' }}>You don't have to anticipate anymore!</span><br />
                            <Button style={{ backgroundColor: '#f46d25', color: '#fff', padding: '0.5em 2em', fontWeight: 'bolder' }}>Get A Free Demo</Button> <br />
                        </Stack>

                        <Stack direction='row' spacing={2} style={{ height: "80vh" }}>
                            <img src={s3BaseUrl+"PropertyList.a26cb2ac.png"} alt="this is a laptop" style={{ height: '80vh', borderRadius: '10px', boxShadow: '-1px 1px 20px #111' }} />
                            <img src={s3BaseUrl+"PropertyView.734fd387.png"} alt="this is a laptop" style={{ height: '80vh', borderRadius: '10px', boxShadow: '-1px 1px 20px #111' }} />
                        </Stack>

                    </Stack>
                </div>
                {/* background  */}
                <div style={{ position: "absolute", top: "0", left: "0", zIndex: "-1" }}>
                    <img src={s3BaseUrl+"CRMMOCKUP.7f475e07.png"} style={{ height: '90vh', width: '100%' }} />
                    <img src={R} style={{ height: '70vh', width: '100%', marginTop: '-5px' }} />
                    <img src={lines} style={{ height: '90vh', width: '100%' }} />
                </div>
            </div>
            {/* CLAIM YOUR SPACE ENDS  */}

            {/* Our Community  */}
            <Stack direction='row' justifyContent='space-around' alignItems="center" style={{ paddingTop: '8em', height:"85vh" }}>
                <Carousel width={width}/>
                <div style={{ fontSize: "2.5em", fontWeight: '700', lineHeight:"1" }}>
                    Our <span style={{ color: '#f46d25' }}> Community</span> <br/>
                    Is Buzzing With <br/>
                    <span style={{ color: '#f46d25' }}>Excitement</span>!
                </div>
            </Stack>
            {/* Our Community Ends  */}

            {/* FOOTER  */}
            <div style={{ backgroundImage: `url(${s3BaseUrl+"Handshake1.c24fe083.png"})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundColor: '#fff', }}>
                <Typography style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', paddingTop: '3em' }} variant='h4'>What Are You <span style={{ color: '#f46d25' }}>Waiting</span> For ?</Typography>
                <Typography style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }} variant='h4'>Let's Get <span style={{ color: '#f46d25' }}>Started!</span></Typography>
                <Stack direction='row' spacing={2} justifyContent='space-between' alignItems="center" style={{ padding: '5% 20% 0 20%' }}>
                    <img src={BoardLogo} alt="logo" style={{ width: '12em', height: '2.5em' }} />
                    <span style={{ color: '#fff' }}>Copyright@2022</span>
                </Stack>
                
                <div style={{border:"1px solid #fff",margin: '1% 20% 0 20%'}}></div>
                <br />
            </div>
            {/* FOOTER ENDS  */}
        </div>
    );
}