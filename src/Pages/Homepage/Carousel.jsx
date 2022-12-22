import React, { useState, useEffect } from "react";
import { Stack, Paper } from "@mui/material";
import { s3BaseUrl } from '../../Service/httpCommon'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const MINUTE_MS = 4000;

export default function Carousel({ width }) {
    const [currentCarousel, setCurrentCarousel] = useState(0);
    var calculatedWidth = width <= 768 ? '82%' : '27.5em'
    var calculatedHeight = width <= 768 ? 'auto' : '12em'

    useEffect(() => {
        setTimeout(
            changeCarousel,
            MINUTE_MS
        );

        return () => { };
    }, [currentCarousel]);

    const changeCarousel = () => {
        if (currentCarousel === 0) { setCurrentCarousel(1) }
        else { setCurrentCarousel(0) }
    }

    return (
        <Stack justifyContent="center" alignItems="center">
            {currentCarousel === 0 ?
                <>
                    <Paper style={{ width: calculatedWidth, height: calculatedHeight, padding: '4em', textAlign: 'center', fontSize: '14px', boxShadow: '0.7px 0.7px 20px #f46d25', borderRadius: '5px' }}>
                        <sup><img src={s3BaseUrl + "quotes.png"} style={{ color: '#f46d25', height: '8px' }} /></sup>&nbsp;
                        <span>The Board is a super useful platform. It has helped my team manage their leads and create bookings with ease.
                            We were able to great deals for Goa hotels for GIT queries through the platform.
                            Very effective way to help out travel agents! Thank You for this! Kudos to the team!</span>&nbsp;
                        <sup><img src={s3BaseUrl + "quotesclosed.png"} style={{ color: '#f46d25', height: '8px' }} /></sup> <br /><br />
                        <span style={{ textAlign: 'center', fontSize: '1em', fontWeight: 'bold', color: '#f46d25' }}>Mr John Rodrigues</span> <br /> <span>Coimbatore</span>
                    </Paper>
                    <br />
                    <span onClick={changeCarousel}><RadioButtonCheckedIcon fontSize="small" style={{ color: "#f46d25" }} />&nbsp;<RadioButtonUncheckedIcon fontSize="small" style={{ color: "#f46d25" }} /></span>
                </>
                :
                <>
                    <Paper style={{ width: calculatedWidth, height: calculatedHeight, padding: '4em', textAlign: 'center', fontSize: '14px', boxShadow: '0.7px 0.7px 20px #f46d25', borderRadius: '5px' }}>
                        <sup><img src={s3BaseUrl + "quotes.png"} style={{ color: '#f46d25', height: '8px', }} /></sup>&nbsp;
                        <span>I used to pay a bombshell to use a travel CRM to manage leads and bookings and it allowed me no customization.
                            The Board is definitely the best travel CRM out there.
                            In addition to managing leads & bookings and customizing vouchers,
                            I was able to upload rates for my set of hotels with whom
                            I have been working for years - I haven't seen this feature anywhere! I am Game changer!</span>
                        &nbsp;<sup><img src={s3BaseUrl + "quotesclosed.png"} style={{ color: '#f46d25', height: '8px' }} /></sup> <br /><br />
                        <span style={{ textAlign: 'center', fontSize: '1em', fontWeight: 'bold', color: '#f46d25' }}>Harpal Singh</span> <br />
                        <span>Chandigarh</span>
                    </Paper>
                    <br />
                    <span onClick={changeCarousel}><RadioButtonUncheckedIcon fontSize="small" style={{ color: "#f46d25" }} />&nbsp;<RadioButtonCheckedIcon fontSize="small" style={{ color: "#f46d25" }} /></span>
                </>
            }
        </Stack>
    )
}