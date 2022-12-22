import { Stack, Button, Box, Typography, TextField, Dialog, Tooltip, IconButton, OutlinedInput, InputAdornment } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import Badge from '@material-ui/core/Badge';
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/styles";
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { Container } from '@material-ui/core';
import MobileCards from './MobileCards';
import AddMobileLead from './AddMobileLead';
import EditIcon from "@material-ui/icons/Edit";
import Api from "../../Service/Api";
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import NotificationSound from "../../assets/sound/mixkit-doorbell-single-press-333.wav";
import Loader from "./../../components/Loader/Loader";

const leads = [
    { label: 'Board Lead', value: 'boardLead' },
    { label: 'Travel Agent Lead', value: 'travelAgentLead' }
];

let followupOptions = [
    { label: 'Hot', value: 'followuphot', icon: <WhatshotTwoToneIcon style={{ color: '#e71e24', fontSize: '26px' }} /> },
    { label: 'Warm', value: 'followupwarm', icon: <BrightnessHighIcon style={{ color: '#febc12', fontSize: '26px' }} /> },
    { label: 'Cold', value: 'followupcold', icon: <AcUnitIcon style={{ color: '#8aceee', fontSize: '26px' }} /> }
];

const filterOptions = [
    { label: 'All', value: 'all', icon: " " },
    { label: 'New', value: 'new', icon: <FiberNewIcon style={{ color: '#fc7506', fontSize: '26px' }} /> },
    { label: 'Followup', value: 'followup', icon: <EventNoteIcon style={{ color: '#0000a5', fontSize: '26px' }} /> },
    { label: 'Lost', value: 'lost', icon: <ThumbDownIcon style={{ color: '#abaaaa', fontSize: '26px' }} /> },
    { label: 'Closed', value: 'closed', icon: <ThumbUpIcon style={{ color: '#1eaf1e', fontSize: '26px' }} /> },
    { label: 'Warm', value: 'followupwarm', icon: <BrightnessHighIcon style={{ color: '#febc12', fontSize: '26px' }} /> },
    { label: 'Hot', value: 'followuphot', icon: <WhatshotTwoToneIcon style={{ color: '#e71e24', fontSize: '26px' }} /> },
    { label: 'Cold', value: 'followupcold', icon: <AcUnitIcon style={{ color: '#8aceee', fontSize: '26px' }} /> },
]

const leadScores = [
    { label: 'New', value: 'new' },
    { label: 'FollowUp', value: 'followup' },
    { label: 'Lost', value: 'lost' },
    { label: 'Closed', value: 'closed' }
];

export default function MobileLead() {

    const [lead, setLead] = useState([]);
    const [response, setResponse] = useState([]);
    const [leadScoring, setLeadScoring] = useState({ label: 'New', value: 'new' });
    const [leadScoringValue, setLeadScoringValue] = useState({ label: 'Hot', value: 'followuphot' });
    const [lostReason, setLostReason] = useState("");
    const [openScoring, setOpenScoring] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [viewselectedDetails, setViewselectedDetails] = useState({});
    const [noOfNotifications, setNoOfNotifications] = useState(localStorage.getItem("noOfNotifications"));
    // const [noOfNotifications, setNoOfNotifications] = useState(0);
    const audioPlayer = useRef(null);
    const [filterName, setFilterName] = useState("");
    const [loading, setLoading] = useState(false);

    var uniqueid = localStorage.getItem("unique_id");
    let hasAdmin = localStorage.getItem("role");
    var isAdminRole = false;
    let hasDesignation = localStorage.getItem("designation");
    var username = localStorage.getItem("auth");

    if (hasAdmin === "Admin" ||
        hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" || hasDesignation === "Lead Manager") {
        isAdminRole = true;
    }

    function playAudio() {
        
    }

    //Lead api data
    const Lead = () => {
        let url = `/boardlead/${uniqueid}`;
        if (isAdminRole === false) {
            url = `/boardleadEmployee/${uniqueid}/${username}`;
        }
        setLoading(true);
        Api.get(url).then((res) => {
            setResponse(res.data);
            var temp;
            if (isAdminRole === true)
                temp = res.data.reduce((total, each) => { return total + each.notify }, 0);
            else
                temp = res.data.reduce((total, each) => { return total + each.notifyemp }, 0);
            
            console.log("MobileLead.js|Lead|noOfNotifications",noOfNotifications, temp);
            if (temp>noOfNotifications && audioPlayer.current != null){
                // play notification sound
                console.log("Play Sound");
                audioPlayer.current.play();
            }
            setNoOfNotifications(temp);
            localStorage.setItem("noOfNotifications", temp);
            setLoading(false);
        });
    };

    useEffect(() => {
        // setNoOfNotifications();
        Lead();
    }, []);

    useEffect(() => {
        if ("leadscoring" in viewselectedDetails) {
            setLeadScoring(leadScores.filter((each) => each.value === viewselectedDetails.leadscoring)[0]);
            setLeadScoringValue(followupOptions.filter((each) => each.value === viewselectedDetails.leadscoringvalue)[0]);
            setLostReason(viewselectedDetails.reason);
        } else {
            setLostReason("");
            setLeadScoring({ label: 'New', value: 'new' });
            setLeadScoringValue({ label: 'Hot', value: 'followuphot' })
        }

    }, [viewselectedDetails])

    const sortedFilteredData = applySortFilter(
        response,
        getComparator("desc", "createdAt"),
        filterName
    );

   // pagination
    const totalDataLength = sortedFilteredData.length;
    const dataPerPage = 5;
    let noOfPages = Math.ceil(totalDataLength/dataPerPage);
    console.log("totalDataLength",totalDataLength,noOfPages);
    const [currentPageNo,setCurrentPageNo] = useState(1);
    let tempDataIndex = (currentPageNo*dataPerPage);    //variable for min and max data range for page
    let lastDataIndex = Math.min(tempDataIndex,totalDataLength);
    let firstDataIndex = (tempDataIndex-dataPerPage); 
    console.log("first and last indices of data:",firstDataIndex,lastDataIndex);

    const changePageNo = (value)=>{
        let tempPageNo = currentPageNo + value; //value can be 1 or -1 depending upon arrow clicked
        if(tempPageNo>=1 && tempPageNo<=noOfPages){
            setCurrentPageNo(tempPageNo);
        }
    }

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    // Filter variables and functionality
    const [filterValue, setFilterValue] = useState("all");
    const [openfilter, setfilter] = useState(false);

    const rowStyle = {
        default_row: {},
        active_row: {
            backgroundColor: '#f5f5f5',
        },
        filter_default_row: { cursor: 'pointer', padding: '5px 10px' },
        filter_selected_row: { cursor: 'pointer', color: '#000', padding: '5px 10px', backgroundColor: '#bbb' }
    };

    const filterGetStyle = (isActive) => {
        return isActive ? rowStyle.filter_selected_row : rowStyle.filter_default_row
    }

    const scoreFilterFun = (selectedValue) => {
        setFilterValue(selectedValue);
        let url = null;

        if (isAdminRole && selectedValue === "all")
            url = `/boardlead/${uniqueid}`;
        else if (isAdminRole && (selectedValue === "new" || selectedValue === "lost" || selectedValue === "followup" || selectedValue === "closed"))
            url = `boardLeadScoring/${uniqueid}/${selectedValue}`;
        else if (isAdminRole && (selectedValue === "followupwarm" || selectedValue === "followuphot" || selectedValue === "followupcold"))
            url = `boardLeadScoringValue/${uniqueid}/followup/${selectedValue}`
        else if (!isAdminRole && selectedValue === "all")
            url = `boardleadEmployee/${uniqueid}/${username}`;
        else if (!isAdminRole && (selectedValue === "new" || selectedValue === "lost" || selectedValue === "followup" || selectedValue === "closed"))
            url = `boardLeadEmployeeScoring/${uniqueid}/${username}/${selectedValue}`;
        else if (!isAdminRole && (selectedValue === "followupwarm" || selectedValue === "followuphot" || selectedValue === "followupcold"))
            url = `boardLeadEmployeeScoringValue/${uniqueid}/${username}/followup/${selectedValue}`;

        if (url !== null) {
            Api.get(url).then((res) => {
                setResponse(res.data);
                var temp;
                if (isAdminRole === true)
                    temp = res.data.reduce((total, each) => { return total + each.notify }, 0);
                else
                    temp = res.data.reduce((total, each) => { return total + each.notifyemp }, 0);
                console.log("MobileLead.js|Lead|noOfNotifications",noOfNotifications, temp);
                setNoOfNotifications(temp);
            });
        }
        setfilter(false);
    }
    // Filter Functionality Ends

    //function to notify
    const notifyFun = (rowId) => {
        let url = `/boardleadnotifyemp/${rowId}`;
        if (isAdminRole === true) {
            url = `/boardleadnotify/${rowId}`;
        }
        Api.get(url).then((res) => {
            Lead();
        });
    }

    // Sorting function
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function applySortFilter(array, comparator, query) {
        
        const stabilizedThis = array.map((el, index) => [el, index]);

        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });

        if (query) {
            return array.filter((each) => {
                return each.clientMail != null && each.clientMail.toLowerCase().indexOf(query.toLowerCase()) !== -1
            });
        }

        return stabilizedThis.map((el) => el[0]);
    }

    // Change scoring values
    const onSubmitScoring = (event) => {
        let id = viewselectedDetails.id;
        var url = '/boardleadupdatescoring/' + id;

        if (leadScoring.value === "followup") { var data = { "id": id, "leadscoringvalue": leadScoringValue.value, "leadscoring": leadScoring.value, "reason": "", "updatedBy": username } }
        else if (leadScoring.value === "lost") { var data = { "id": id, "leadscoringvalue": "", "leadscoring": leadScoring.value, "reason": lostReason, "updatedBy": username } }
        else { var data = { "id": id, "leadscoringvalue": "", "leadscoring": leadScoring.value, "reason": "", "updatedBy": username } }

        console.log(data);

        Api.put(url, data)
            .then((response) => {
                Lead();
                setOpenScoring(false);
                setViewselectedDetails({});
            })
    }

    const mouseMovedEvent =()=>{
        console.log("Mouse Moved!!");
    }

    return (
        <>
        { loading ? (<Loader />):
        <Container style={{ paddingTop: "5em", paddingBottom: '5em' }} onMouseMove={mouseMovedEvent}>
            <Typography variant='h5' style={{ fontWeight: 'bold', marginBottom: '0.4em' }}>Lead Dashboard</Typography>
            <Stack direction='row' justifyContent='space-between' style={{ marginBottom: '0.6em' }} >
                <Select
                    name="lead"
                    defaultValue={leads[0]}
                    onChange={(event) => setLead(event.value)}
                    options={leads}
                    styles={{
                        container: (provided) => ({
                            ...provided,
                        }),
                        menu: (provided) => ({
                            ...provided,
                            zIndex: 9999,
                        }),
                        valueContainer: (provided) => ({
                            ...provided,
                            overflow: "visible",
                        }),
                        placeholder: (provided, state) => ({
                            ...provided,
                            position: "absolute",
                            top:
                                state.hasValue ||
                                    state.selectProps.inputValue
                                    ? -4
                                    : "50%",
                            padding: "0px 5px",
                            transition: "top 0.1s, font-size 0.1s",
                            fontSize: "12px",

                        }),
                        control: (base, state) => ({
                            ...base,
                            "&:hover": { borderColor: "#f46d25" },
                            borderColor: "#f46d25",
                            boxShadow: "none",
                            width: '12em',
                            backgroundColor: '#f46d25',
                            color: '#fff',
                            fontSize: "18px",
                        }),
                        dropdownIndicator: base => ({
                            ...base,
                            color: "#fff"
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: '#fff',
                            fontWeight: 'bold'
                        }),
                    }}
                />
                <Button style={{ backgroundColor: '#333', color: '#fff', fontWeight: 'bold' }} onClick={() => setOpenAdd(true)}>Add New</Button>
                <AddMobileLead Lead={Lead} open={openAdd} setOpenAdd={setOpenAdd} viewselectedDetails={viewselectedDetails} setViewselectedDetails={setViewselectedDetails} />
            </Stack>
            <Stack direction='row' spacing={2} justifyContent='space-between' style={{ width: '100%', marginBottom: '0.6em' }}>
                <Stack style={{ alignContent: 'left' }}>
                    <OutlinedInput
                        value={filterName}
                        onChange={handleFilterByName}
                        startAdornment={<InputAdornment position="start">
                            <SearchIcon sx={{ color: "text.disabled" }} color='primary' />
                        </InputAdornment>}
                        placeholder={"Search Client Email"}
                        size='small'
                        style={{width:'13.5em'}}
                    />
                </Stack>
                <Stack direction='row' >
                    <Stack style={{ alignContent: 'right' }}>
                        <Tooltip title="Lead scoring Filter">
                            <IconButton onClick={() => setfilter(true)}>
                                <i className="fa fa-filter" aria-hidden="true" style={{ color: "#f46d25", cursor: "pointer", fontSize: '30px' }} />
                            </IconButton>
                        </Tooltip>
                        <audio ref={audioPlayer} src={NotificationSound} />
                        <Dialog open={openfilter} onClose={() => { setfilter(false); }} >
                            <Stack spacing={1} style={{ width: '15em' }}>
                                {
                                    filterOptions.map((each, index) => {
                                        return (
                                            <Stack key={index} direction="row" spacing={1} justifyContent="space-between" alignItems="center" onClick={() => scoreFilterFun(each.value)} style={filterGetStyle(each.value === filterValue)}>
                                                <span >{each.label}</span>
                                                <span>{each.icon}</span>
                                            </Stack>)
                                    })
                                }
                            </Stack>
                        </Dialog>
                    </Stack>
                    <Stack>
                        <Tooltip title="Notifications">
                            <IconButton>
                                <Badge badgeContent={noOfNotifications} color="error">
                                    <NotificationsNoneTwoToneIcon style={{ color: "#f46d25", cursor: "pointer", fontSize: '30px' }} />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>
            </Stack>
            <Stack spacing={2}>
                {
                    sortedFilteredData.map((each, index) => {
                        return (
                            <MobileCards key={index} details={each} setOpenScoring={setOpenScoring} setOpenView={setOpenView} setViewselectedDetails={setViewselectedDetails} notifyFun={notifyFun} setOpenAdd={setOpenAdd} />
                        )
                    })
                }

            </Stack>

            {/* lead scoring dialog */}
            <Dialog open={openScoring} onClose={() => { setOpenScoring(false); setViewselectedDetails({}); }}>
                <Box style={{ width: '20em', height: '18em' }}>
                    <Stack spacing={2} style={{ padding: '1em' }}>
                        <Typography>Lead Scoring</Typography>
                        <Select
                            name="leadScores"
                            value={leadScoring}
                            onChange={(event) => {
                                console.log(event);
                                setLeadScoring({ "label": event.label, "value": event.value })
                            }}

                            options={leadScores}
                            styles={{
                                menu: (provided) => ({ ...provided, zIndex: 9999, }),
                            }}
                        />
                        <LeadScoringValue leadScoring={leadScoring} leadScoringValue={leadScoringValue} setLeadScoringValue={setLeadScoringValue} lostReason={lostReason} setLostReason={setLostReason} />
                        <Stack direction='row' justifyContent='space-evenly' style={{ marginTop: '3em' }}>
                            <Button style={{ backgroundColor: '#f46d25', color: '#fff', width: '7em' }} onClick={(event) => { onSubmitScoring(event) }}>Submit</Button>
                            <Button style={{ backgroundColor: '#222', color: '#fff', width: '7em' }} onClick={() => { setOpenScoring(false); setViewselectedDetails({}); }}>Back</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Dialog>

            {/* view dialog */}
            <Dialog open={openView} onClose={() => { setOpenView(false); setViewselectedDetails({}); }} >
                <Box style={{ overflow: 'hidden' }}>
                    <Stack direction='row' justifyContent='space-between' style={{ backgroundColor: "#f46d25", color: '#fff', width: '100vw' }}>
                        <Stack>
                            <span style={{ fontWeight: 'bold', padding: '1em 1em 0 1em' }}>{viewselectedDetails.clientName}</span>
                            <span style={{ padding: '0 1em 1em 1em' }}>{viewselectedDetails.clientMail}</span>
                        </Stack>
                        <IconButton
                            aria-label="edit">
                            <EditIcon style={{ color: "#fff", fontSize: '1em', paddingRight: '0.75em' }} onClick={() => { setOpenAdd(true); setOpenView(false); }}></EditIcon>
                            <CancelIcon style={{ color: "#fff", fontSize: '1em', paddingRight: '3em' }} onClick={() => { setOpenView(false); setViewselectedDetails({}); }}></CancelIcon>
                        </IconButton>

                    </Stack>
                    <Stack spacing={2} style={{ backgroundColor: '#fff', padding: '1.5em 0.5em', fontSize: '1em', borderBottomRightRadius: '0.5em', borderBottomLeftRadius: '0.5em', width: '100vw' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Phone No.  </td>
                                    <td>:  {viewselectedDetails.clientMobileNo}</td>
                                </tr>
                                <tr>
                                    <td>Departure City  </td>
                                    <td>:  {viewselectedDetails.clientDepartcity}</td>
                                </tr>
                                <tr>
                                    <td>Destination City</td>
                                    <td>:  {viewselectedDetails.destination}</td>
                                </tr>
                                <tr>
                                    <td>Lead Type </td>
                                    <td>:  {viewselectedDetails.leadType}</td>
                                </tr>
                                <tr>
                                    <td>Budget </td>
                                    <td>:  {viewselectedDetails.budget}</td>
                                </tr>
                                <tr>
                                    <td>No of Pax</td>
                                    <td>:  {viewselectedDetails.noofpax}</td>
                                </tr>
                                <tr>
                                    <td>No. of Nights</td>
                                    <td>:  {viewselectedDetails.noofnights}</td>
                                </tr>
                                <tr>
                                    <td>Check In Date</td>
                                    <td>:  {viewselectedDetails.checkin}</td>
                                </tr>
                                <tr>
                                    <td>Lead Assigned To</td>
                                    <td>:  {viewselectedDetails.leadassignto}</td>
                                </tr>
                                <tr>
                                    <td>Lead Source</td>
                                    <td>:  {viewselectedDetails.leadsource}</td>
                                </tr>
                                <tr>
                                    <td>Lead Scoring</td>
                                    <Stack>
                                        <td>:  {viewselectedDetails.leadscoring}

                                            ({viewselectedDetails.leadscoring !== "followup" ? null : (
                                                <>
                                                    <>
                                                        {viewselectedDetails.leadscoringvalue !==
                                                            "followuphot" ? null : (
                                                            <span>Hot<WhatshotTwoToneIcon style={{ color: '#e71e25' }} /></span>
                                                        )}
                                                        {viewselectedDetails.leadscoringvalue !==
                                                            "followupwarm" ? null : (
                                                            <span>Warm<BrightnessHighIcon style={{ color: '#febc12' }} /></span>
                                                        )}
                                                        {viewselectedDetails.leadscoringvalue !==
                                                            "followupcold" ? null : (
                                                            <span>Cold <AcUnitIcon style={{ color: '#8aceee' }} /></span>
                                                        )}
                                                    </>
                                                </>
                                            )}
                                            <>
                                                {viewselectedDetails.leadscoring !== "closed" ? null : (
                                                    <ThumbUpIcon style={{ textAlign: 'center', color: '#1eaf1e' }} />)}
                                                {viewselectedDetails.leadscoring !== "lost" ? null :
                                                    (<ThumbDownIcon style={{ color: '#abaaaa' }} />)
                                                }
                                                {viewselectedDetails.leadscoring !== "new" ? null : (
                                                    <FiberNewIcon style={{ textAlign: 'center', color: '#f46d25', fontSize: '1.6em' }} />)}

                                                )
                                            </>
                                        </td>
                                    </Stack>
                                </tr>
                                {viewselectedDetails.leadscoring !== "lost" ? null :
                                    <tr>
                                        <td>Reason</td>
                                        <td>:  {viewselectedDetails.reason}</td>
                                    </tr>
                                }

                                <tr>
                                    <td>Remarks</td>
                                    <td>:  {viewselectedDetails.notes}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Stack>
                </Box>
            </Dialog>
            <Stack direction='row' spacing={2} justifyContent='space-between' style={{margin:'1em'}}>
               <span onClick={()=>{changePageNo(-1)}}><ArrowLeftIcon/></span>
               <span>{currentPageNo} of {noOfPages}</span> 
               <span onClick={()=>{changePageNo(1)}}><ArrowRightIcon/></span>
            </Stack>
        </Container>
        }
        </>
    )
}
// function LeadScoringValue({ leadScoring, leadScoringValue, setLeadScoringValue }) {
function LeadScoringValue(props) {
    let leadScoringValue = "";
    if (typeof props.leadScoring !== "undefined") { leadScoringValue = props.leadScoring.value }
    if (leadScoringValue == 'followup') {
        return (
            <Select
                name="followup"
                value={props.leadScoringValue}
                onChange={(event) => {
                    console.log(event);
                    props.setLeadScoringValue({ "label": event.label, "value": event.value })
                }}
                options={followupOptions}
                styles={{
                    menu: (provided) => ({ ...provided, zIndex: 9999, }),
                }}
            />
        )
    }
    else if (leadScoringValue == 'lost') {
        return (
            <TextField
                name="reason"
                type="text"
                value={props.lostReason}
                fullWidth
                variant="outlined"
                size="small"
                onChange={(event) => {
                    console.log(event.target.value);
                    props.setLostReason(event.target.value)
                }}
            />
        )
    }
    else {
        return <></>
    }
}