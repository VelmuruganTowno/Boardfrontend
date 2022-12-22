/* eslint-disable eqeqeq */
import { filter } from "lodash";
import { useState, useEffect } from "react";
// material
import Pagination from "@material-ui/lab/Pagination";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import {
    Card,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Button,
    Paper,
    TextField,
    Grid,
    IconButton,
    Tooltip,
    Dialog,
} from "@material-ui/core";
import XLSX from "xlsx";
import { TableListHead } from "../../components/tabel";
import _ from "lodash";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MaterialSelect from "../../components/Select/MaterialSelect";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";
import { format, subDays } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "./../../components/Loader/Loader";
import "./AgentBookingList.scss";
import { formatter } from "../../utils/formatNumber";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Stack, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AgentSearch from "./AgentSearch";
import { twnButtonStyles } from "../../utils/townoStyle";
import EditIcon from "@material-ui/icons/Edit";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import { parse } from "date-fns";
import moment from "moment/moment";

const TABLE_HEAD = [
    { id: "bookingId", label: "Booking ID", alignRight: false },
    { id: "clientName", label: "Client Name", alignRight: false },
    { id: "clientMobile", label: "Client Number", alignRight: false },
    { id: "hotelName", label: "Hotel Name", alignRight: false },
    { id: "checkIn", label: "CheckIn", alignRight: false },
    { id: "noOfNight", label: "Nights", alignRight: false },
    // { id: "totalRoomRent", label: "Room Rent", alignRight: false },
    { id: "totalBookingAmount", label: "Total Amount", alignRight: false },
    // { id: "pendingAmount", label: "Pending", alignRight: false },
    { id: "createdBy", label: "Agent Name", alignRight: false },
    { label: "Action", alignRight: false },
];

// ----------------------------------------------------------------------

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
        return filter(
            array,
            (_designation) =>
                _designation.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function AgentBookingList() {
    const classes = useStyles();
    const initalValue = {
        bookingId: "",
        clientName: "",
        email: "",
        contactno: "",
        bookingstatus: "",
        agentName: "",
    };
    const history = useHistory();
    const [expanded, setExpanded] = useState('panel');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const [bookingList, setBookingList] = useState([]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    var uniqueid = localStorage.getItem("unique_id");
    const [checkin, setCheckin] = useState(null);
    const [checkout, setCheckout] = useState(null);
    const [searchData, setSearchData] = useState(initalValue);
    const [bookingDateFrom, setBookingDateFrom] = useState(null);
    const [bookingDateTo, setBookingDateTo] = useState(null);
    const [errorFrom, setErrorFrom] = useState(false);
    const [errorTo, setErrorTo] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [bookingstatus, setBookingstatus] = useState(null);
    const [hotelName, setHotelName] = useState(null);
    const [hotelList, setHotelList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pdfloading, setPdfloading] = useState(false);
    const { bookingId, clientName, email, contactno, agentName } = searchData;
    const [width, setWidth] = useState(window.innerWidth);
    const [searchName, setSearchName] = useState("");
    const [searchList, setSearchList] = useState(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const DataPerPage = 10;
    var createdBy = localStorage.getItem("auth");
    let hasAdmin = localStorage.getItem("role");

    const pagesVisited = pageNumber * DataPerPage;

    const pageCount = Math.ceil(bookingList.length / DataPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    const handleChangeSearchList = (selectedOption) => {
        setSearchList(selectedOption);
    };

    const handleChangePayment = (selectedOption) => {
        setPaymentStatus(selectedOption);
    };

    const handleChangeHotel = (option) => {
        setHotelName(option);
    };

    const handleChangeBookingstatus = (selectedOption) => {
        setBookingstatus(selectedOption);
    };

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name]: value });
    };
    const Submit = (e) => {
        e.preventDefault();
        if (bookingDateFrom !== null) {
            if (bookingDateTo == null) {
                setErrorTo(true);
            }
        }
        if (bookingDateTo !== null) {
            if (bookingDateFrom == null) {
                setErrorFrom(true);
            }
        }
        const data = {
            checkIn: checkin !== null ? format(checkin, "yyyy-MM-dd") : "",
            // checkOut: checkout !== null ? format(checkout, "yyyy-MM-dd") : "",
            from:
                bookingDateFrom !== null ? format(bookingDateFrom, "yyyy-MM-dd") : "",
            to: bookingDateTo !== null ? format(bookingDateTo, "yyyy-MM-dd") : "",
            uniqueId: uniqueid,
            paymentstatus: paymentStatus !== null ? paymentStatus.value : "",
            bookingstatus: bookingstatus !== null ? bookingstatus.value : "",
            hotelname: hotelName !== null ? hotelName.value : "",
        };

        let url = `agentbookingsearch`;
        const QueryValue = { ...searchData, ...data };
        Api.post(url, QueryValue).then((res) => {
            console.log("responseData",res.data,url);
            let sorted = _.orderBy(res.data, ["bookingId"], ["desc"]);
            setBookingList(sorted);
        });
        setOpen(false);
    };

    // const MobileSubmit = (e) => {
    //     e.preventDefault();

    //     let url = `bookingsearch`;
    //     if (searchList.value == "bookingId") {
    //         url += "bookingId";
    //     }

    //     if (searchList.value == "clientName") {
    //         url += "clientName";
    //     }

    //     if (searchList.value == "email") {
    //         url += "clientEmail";
    //     }

    //     if (searchList.value == "contactno") {
    //         url += "clientMobile";
    //     }
    //     if (searchList.value == "agentName") {
    //         url += "createdBy";
    //     }

    //     const obj = { [searchList.value]: searchName };
    //     const unique = { uniqueId: uniqueid };
    //     const QueryValue = { ...obj, ...unique };
    //     Api.post(url, QueryValue).then((res) => {
    //         let sorted = _.orderBy(res.data, ["bookingId"], ["desc"]);
    //         setBookingList(sorted);
    //     });
    // };

    const resetData = (e) => {
        setSearchData(initalValue);
        setCheckin(null);
        setCheckout(null);
        setBookingDateFrom(null);
        setBookingDateTo(null);
        setPaymentStatus(null);
        setBookingstatus(null);
        BookingListData();
        setOpen(false);
    };

    useEffect(() => {
        BookingListData();
        hotelFetch();
    }, []);

    const BookingListData = () => {
        // console.log("bookinglistApi:", `agentBooking/${uniqueid}/${format(bookingDateFrom, "yyyy-MM-dd")}/${format(bookingDateTo, "yyyy-MM-dd")}`)
        setLoading(true);

        //for staffs
        let fromDate = bookingDateFrom??subDays(new Date(), 60)
        let toDate = bookingDateTo??new Date()
        let url = `/staffagentBooking/${uniqueid}/${format(fromDate, "yyyy-MM-dd")}/${format(toDate, "yyyy-MM-dd")}/${createdBy}`;
        if (hasAdmin === "Admin" ||
            hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin") {
            url = `/agentBooking/${uniqueid}/${format(fromDate, "yyyy-MM-dd")}/${format(toDate, "yyyy-MM-dd")}`;
        }
        // Api.get(`agentBooking/${uniqueid}/${format(bookingDateFrom, "yyyy-MM-dd")}/${format(bookingDateTo, "yyyy-MM-dd")}`).then((res) => {
        Api.get(url).then((res) => {
            let sorted = _.orderBy(res.data, ["createdAt"], ["desc"]);
            setBookingList(sorted);
            setLoading(false);
        });
    };
    const hotelFetch = () => {
        Api.get("propertybasicpropertydetailsall").then((res) => {
            setHotelList(res.data);
        });
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const downloadExcel = () => {
        const newData = bookingList.map((row) => {
            delete row.id;
            delete row.uniqueId;
            delete row.createdAt;
            delete row.updatedBy;
            delete row.updatedAt;
            delete row.status;
            return row;
        });
        const workSheet = XLSX.utils.json_to_sheet(newData);
        const workBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workBook, workSheet, "Branch List");
        // const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
        XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workBook, "BookingList.xlsx");
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookingList.length) : 0;

    const filteredBookingList = applySortFilter(
        bookingList,
        getComparator(order, orderBy)
    );

    //pagination
    const totalDataLength = filteredBookingList.length;
    const dataPerPage = 5;
    let noOfPages = Math.ceil(totalDataLength / dataPerPage);
    console.log("totalDataLength", totalDataLength, noOfPages);
    const [currentPageNo, setCurrentPageNo] = useState(1);
    let tempDataIndex = (currentPageNo * dataPerPage);    //variable for min and max data range for page
    let lastDataIndex = Math.min(tempDataIndex, totalDataLength);
    let firstDataIndex = (tempDataIndex - dataPerPage);
    console.log("first and last indices of data:", firstDataIndex, lastDataIndex);

    const changePageNo = (value) => {
        let tempPageNo = currentPageNo + value; //value can be 1 or -1 depending upon arrow clicked
        if (tempPageNo >= 1 && tempPageNo <= noOfPages) {
            setCurrentPageNo(tempPageNo);
        }
    }


    return (
        <div style={{ ...twnButtonStyles.allPages, paddingTop: '75px' }}>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={pdfloading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {loading ? (
                <Loader />
            ) : width <= 768 ? (
                //     <div style={{ padding: "100px 0px", margin: "0px 20px" }}>
                //         <Grid container spacing={2}>
                //             <Grid item xs={6}>
                //                 <MaterialSelect
                //                     options={[
                //                         { value: "bookingId", label: "Booking Id" },
                //                         { value: "clientName", label: "Client Name" },
                //                         { value: "email", label: "Email" },
                //                         { value: "contactno", label: "Contact No" },
                //                         { value: "agentName", label: "Agent Name" },
                //                     ]}
                //                     placeholder="Search List"
                //                     value={searchList}
                //                     onChange={handleChangeSearchList}
                //                     isClearable={true}
                //                 />
                //             </Grid>
                //             <Grid item xs={6}>
                //                 <TextField
                //                     name="searchName"
                //                     value={searchName}
                //                     variant="outlined"
                //                     size="small"
                //                     label="search Name"
                //                     fullWidth
                //                     onChange={(e) => {
                //                         setSearchName(e.target.value);
                //                     }}
                //                 />
                //             </Grid>
                //             <Grid item xs={12}>
                //                 <center>
                //                     <Button onClick={MobileSubmit}>Submit</Button>
                //                     <Button
                //                         type="reset"
                //                         onClick={resetData}
                //                         style={{ background: "#121212", marginLeft: "10px" }}
                //                     >
                //                         Reset
                //                     </Button>
                //                 </center>
                //             </Grid>
                //         </Grid>

                //         {filteredBookingList
                //             .slice(firstDataIndex, lastDataIndex)
                //             .map((row) => {
                //                 const {
                //                     id,
                //                     bookingId,
                //                     clientName,
                //                     hotelName,
                //                     // checkout,
                //                     checkin,
                //                     night,
                //                     noofRooms,
                //                     totalBookingPrice,
                //                     totalNetPrice,
                //                     paidAmount,
                //                     townoPending,
                //                     hotelPending,
                //                     profit,
                //                 } = row;
                //                 return (
                //                     <div key={id}>
                //                         <div className="bookingcard" variant="outlined">
                //                             <div className="title">
                //                                 <h2
                //                                     onClick={() =>
                //                                         history.push(`/bookingvoucher/${row.bookingId}`)
                //                                     }
                //                                     className={classes.link}
                //                                 >
                //                                     {bookingId}
                //                                 </h2>
                //                                 <p>
                //                                     {format(new Date(checkin), "d MMM yy")} -{" "}
                //                                     {format(new Date(checkout), "d MMM yy")}
                //                                 </p>
                //                             </div>
                //                             <div className="bookingContent">
                //                                 <h2>{clientName}</h2>
                //                                 <p>
                //                                     <span className="circle"></span>Nights : <b>{night}</b>
                //                                 </p>
                //                             </div>
                //                             <div className="bookingContent">
                //                                 <h2>{hotelName}</h2>
                //                                 <p>
                //                                     <span className="circle"></span>Rooms :{" "}
                //                                     <b>{noofRooms}</b>
                //                                 </p>
                //                             </div>
                //                             <div className="bookingContent1">
                //                                 <p>Gross : {totalBookingPrice}</p>
                //                                 <p>Net : {totalNetPrice}</p>
                //                                 <p> Amount Paid : {paidAmount} </p>
                //                                 <p> Payable to Towno: {townoPending}</p>
                //                                 <p>Pay at Hotel: {hotelPending}</p>
                //                             </div>
                //                             <div className="bookingContent">
                //                                 <h2>Profit : {profit}</h2>
                //                             </div>
                //                         </div>
                //                     </div>
                //                 );
                //             })}
                //         {/* <Pagination
                //   count={pageCount}
                //   color="primary"
                //   onPageChange={changePage}
                // /> */}
                //         <Stack direction='row' spacing={2} justifyContent='space-between' style={{ margin: '1em' }}>
                //             <span onClick={() => { changePageNo(-1) }}><ArrowLeftIcon /></span>
                //             <span>{currentPageNo} of {noOfPages}</span>
                //             <span onClick={() => { changePageNo(1) }}><ArrowRightIcon /></span>
                //         </Stack>
                //     </div>
                <></>
            ) : (
                <div >
                    <Typography variant="h5" component="h5" style={twnButtonStyles.xlFonts}>Booking List</Typography>
                    <Stack direction='row' spacing={2} justifyContent='flex-end' style={{ marginTop: '-24px' }}>
                        <Button onClick={() => { setOpen(true) }} style={twnButtonStyles.orangeBtn}>Search</Button>

                        <Button component={Link} to="/newAgentBooking" style={twnButtonStyles.orangeBtn}>
                            New Booking
                        </Button>
                        {/* <Button onClick={downloadExcel} style={twnButtonStyles.blackBtn}>
                            Excel
                        </Button> */}
                        <Tooltip title="Excel" style={{ marginTop: '-10px', marginLeft: '-1px', fontSize: '28px' }}>
                            <IconButton onClick={downloadExcel}>
                                <i className="fas fa-file-csv" style={{ color: "#F46D25" }}></i>
                            </IconButton>
                        </Tooltip>
                    </Stack>

                    <Card style={{ marginTop: '4px', boxShadow: 'none', border: '1px solid #F4F4F4', fontSize: '14px' }}>
                        <TableContainer sx={{ minWidth: 499 }}>
                            <Table size="small">
                                <TableListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={bookingList.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredBookingList
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            const {
                                                id,
                                                bookingId,
                                                clientName,
                                                clientMobile,
                                                hotelName,
                                                checkIn,
                                                noOfNight,
                                                // totalRoomRent,
                                                totalBookingAmount,
                                                // pendingAmount,
                                                createdBy,
                                            } = row;
                                            return (
                                                <TableRow
                                                    key={id}
                                                    tabIndex={-1}
                                                // className={bookingStatus == "Cancel" ? classes.tableRow : null}
                                                >
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                        onClick={() =>
                                                            history.push(`/newAgentBooking/${row.bookingId}`)
                                                        }
                                                        // className={bookingStatus == "Cancel" ? classes.links : classes.link}
                                                        style={{ fontSize: '12px', cursor: 'pointer',color:"#f46d25",textDecoration:"underline",fontWeight:"bold" }}
                                                    >
                                                        {bookingId}
                                                    </TableCell>
                                                    <TableCell align="left" style={{ textTransform: "capitalize" }}>{clientName}</TableCell>
                                                    <TableCell align="left">{clientMobile}</TableCell>
                                                    <TableCell align="left">{hotelName}</TableCell>
                                                    <TableCell align="left">{checkIn?format(moment(checkIn,'YYYY-MM-DD')['_d'],'dd-MM-yyyy'):''}</TableCell>
                                                    <TableCell align="left">{noOfNight}</TableCell>
                                                    {/* <TableCell align="left">{totalRoomRent}</TableCell> */}
                                                    <TableCell align="left">
                                                        {formatter.format(totalBookingAmount)}
                                                    </TableCell>
                                                    {/* <TableCell align="left"> */}
                                                    {/* {formatter.format(pendingAmount)}
                                                    </TableCell> */}
                                                    <TableCell align="left">{createdBy}</TableCell>
                                                    <TableCell align="left" style={{ fontSize: '12px' }}>
                                                        <Stack direction='row' spacing={2}>
                                                            <Tooltip title="Client Voucher">
                                                                <IconButton
                                                                    aria-label="edit"
                                                                    onClick={() => {
                                                                        window.open(`/agentClientVoucher/${row.bookingId}`);
                                                                    }}
                                                                    style={{ padding: "0px", color: "#F46D25" }}
                                                                >
                                                                    <AssignmentReturnedIcon/>
                                                                </IconButton>
                                                            </Tooltip>
                                                            <Tooltip title="Hotel Voucher">
                                                                <IconButton
                                                                    aria-label="edit"
                                                                    onClick={() => {
                                                                        window.open(`/agentHotelVoucher/${row.bookingId}`);
                                                                    }}
                                                                    style={{ padding: "0px", color: "#F46D25" }}
                                                                >
                                                                    <FileCopyIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={9} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={bookingList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card>

                    <Dialog open={open} onClose={() => { setOpen(false) }} fullWidth={true} maxWidth={'md'} sx={{ maxHeight: '50vh' }}>
                        {/* <AgentSearch /> */}
                        <Paper className={classes.paper}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <form onSubmit={Submit}>
                                    <Grid container spacing={2}>
                                        <Grid item md={3}>
                                            <TextField
                                                name="bookingId"
                                                variant="outlined"
                                                size="small"
                                                label="Booking Id"
                                                fullWidth
                                                value={bookingId}
                                                onChange={handleChangeInput}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <TextField
                                                name="clientName"
                                                value={clientName}
                                                variant="outlined"
                                                size="small"
                                                label="Client Name"
                                                fullWidth
                                                onChange={handleChangeInput}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <TextField
                                                name="email"
                                                value={email}
                                                variant="outlined"
                                                size="small"
                                                label="Email Id"
                                                onChange={handleChangeInput}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <TextField
                                                name="contactno"
                                                value={contactno}
                                                variant="outlined"
                                                size="small"
                                                label="Contact No"
                                                fullWidth
                                                onChange={handleChangeInput}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <MaterialSelect
                                                placeholder="Hotels"
                                                options={hotelList.map((hotel) => ({
                                                    label: hotel.displayName,
                                                    value: hotel.displayName,
                                                }))}
                                                value={hotelName}
                                                onChange={handleChangeHotel}
                                                isClearable={true}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <MaterialSelect
                                                options={[
                                                    { value: "compeleted", label: "Compeleted" },
                                                    { value: "pending", label: "Pending" },
                                                    { value: "cancel", label: "Cancel" },
                                                ]}
                                                placeholder="Booking Status"
                                                value={bookingstatus}
                                                onChange={handleChangeBookingstatus}
                                                isClearable={true}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <MaterialSelect
                                                options={[
                                                    { value: "Full", label: "Paid" },
                                                    { value: "Partial", label: "Pending" },
                                                ]}
                                                placeholder="Payment Status"
                                                value={paymentStatus}
                                                onChange={handleChangePayment}
                                                isClearable={true}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <TextField
                                                name="agentName"
                                                value={agentName}
                                                variant="outlined"
                                                size="small"
                                                label="Agent Name"
                                                fullWidth
                                                onChange={handleChangeInput}
                                            />
                                        </Grid>
                                        <Grid item md={3}>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    label="Check-In"
                                                    inputVariant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    animateYearScrolling
                                                    format="dd/MM/yyyy"
                                                    variant="inline"
                                                    autoOk="true"
                                                    value={checkin}
                                                    onChange={(e) => setCheckin(e)}
                                                />
                                                <CalendarTodayIcon className={classes.icon} />
                                            </div>
                                        </Grid>
                                        <Grid item md={3}>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    label="Booking Date From"
                                                    inputVariant="outlined"
                                                    fullWidth
                                                    size="small"
                                                    animateYearScrolling
                                                    format="dd/MM/yyyy"
                                                    variant="inline"
                                                    autoOk="true"
                                                    value={bookingDateFrom ?? null}
                                                    onChange={(e) => setBookingDateFrom(e)}
                                                />
                                                <CalendarTodayIcon className={classes.icon} />
                                            </div>
                                            {errorFrom ? (
                                                <div style={{ color: "red" }}>
                                                    Booking Date From Required
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Grid item md={3}>
                                            <div style={{ position: "relative" }}>
                                                <DatePicker
                                                    label="Booking Date To"
                                                    inputVariant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    format="dd/MM/yyyy"
                                                    animateYearScrolling
                                                    variant="inline"
                                                    autoOk="true"
                                                    value={bookingDateTo ?? null}
                                                    onChange={(e) => setBookingDateTo(e)}
                                                />
                                                <CalendarTodayIcon className={classes.icon} />
                                            </div>
                                            {errorTo ? (
                                                <div style={{ color: "red" }}>
                                                    Booking Date To Required
                                                </div>
                                            ) : null}
                                        </Grid>
                                        <Stack direction='row' spacing={2} style={{ margin: '10px' }}>
                                            <Button type="submit" style={{ ...twnButtonStyles.orangeBtn, padding: '0 26px' }}>Search</Button>
                                            <Button type="reset" onClick={resetData} style={{ ...twnButtonStyles.blackBtn, padding: '0 26px' }}>Reset</Button>
                                        </Stack>
                                    </Grid>
                                </form>
                            </MuiPickersUtilsProvider>
                        </Paper>
                    </Dialog>
                </div>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    button: {
        background: "#F46D25",
        color: "#fff",
        "&:hover": {
            background: "#F46D25",
        },
    },
    main: {
        padding: "100px 20px 0px 20px",
    },
    link: {
        textDecoration: "underline",
        color: "#F46D25",
        cursor: "pointer",
    },
    links: {
        textDecoration: "underline",
        color: "black",
        cursor: "pointer",
    },
    paper: {
        background: "#F4F4F4",
        padding: "15px 25px",
        marginBottom: "15px",
    },
    icon: {
        fill: "currentColor",
        width: "1em",
        height: "1em",
        display: "inline-block",
        fontSize: "1.5rem",
        transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        position: "absolute",
        right: "15px",
        top: "5px",
        color: "#f46d25",
    },
    tableRow: {
        backgroundColor: "#F4F4F4",
    },
}));
