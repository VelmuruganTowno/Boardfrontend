import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Stack, Typography, Button, Table, TableBody, TableRow, TableHead, OutlinedInput, InputAdornment } from '@mui/material';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import { format, differenceInDays } from "date-fns";
import TablePagination from '@mui/material/TablePagination';
import Api from '../../Service/Api';
import { formatter } from "../../utils/formatNumber";
import { uniqueId } from 'lodash';
import { twnButtonStyles } from "../../utils/townoStyle";
import SearchIcon from "@material-ui/icons/Search";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f46d25',
        color: "#fff",
        fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        backgroundColor: '#fff',
        boxShadow: 'none',
        borderRadius: '5px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    border: "1px solid #eee",
    // '&:nth-of-type(odd)': {
    //     backgroundColor: theme.palette.action.hover,
    // }
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    height: 32,
    transition: theme.transitions.create(["box-shadow", "width"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    // '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
    "& fieldset": {
        borderWidth: `1px !important`,
        borderColor: `#f46d25 !important`,
    },
}));

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

function applySortFilter(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function TransferList() {
    var uniqueid = localStorage.getItem("unique_id");
    let hasAdmin = localStorage.getItem("role");
    const [rawData, setRawData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [textToSearch, setTextToSearch] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState("desc");
    const [orderBy, setOrderBy] = useState("createdAt");
    var createdBy = localStorage.getItem("auth");

    useEffect(() => {
        let url = `/stafftransferList/${uniqueid}/${createdBy}`;
        if (hasAdmin === "Admin" ||
            hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin") {
            url = `/transferList/${uniqueid}`;
        }
        Api.get(url).then((res) => {
            const sortedData = applySortFilter(res.data, getComparator(order, orderBy));
            setTableData(sortedData);
            setRawData(sortedData);
        })
    }, []);

    //this useEfffect is for searching texts from table
    useEffect(() => {
        if (textToSearch.length > 2) {
            var filteredArrayId = rawData.filter((tableRow) => {
                return tableRow.transferId.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0;
            })
            var filteredArrayClientName = rawData.filter((tableRow) => {
                return tableRow.clientName.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0;
            })
            var filteredArrayMobileNo = rawData.filter((tableRow) => {
                return tableRow.clientPhoneNumber.toLowerCase().indexOf(textToSearch.toLowerCase()) >= 0;
            })
            var mergedArray = filteredArrayId.concat(filteredArrayClientName, filteredArrayMobileNo);
            setTableData(mergedArray);
        }
        else {
            setTableData(rawData);
        }

    }, [textToSearch])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={twnButtonStyles.allPages}>
            <Stack direction='row' justifyContent='space-between' style={{ paddingTop: '1.95%' }}>
                <Typography style={{ ...twnButtonStyles.xlFonts, marginTop: '-9px' }}>Transfer List</Typography>

                <Stack direction='row' spacing={2} justifyContent='right' alignItems='right'>
                    <SearchStyle
                        value={textToSearch}
                        onChange={(e) => { setTextToSearch(e.target.value) }}
                        placeholder="Search"
                        style={twnButtonStyles.smFonts}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
                            </InputAdornment>
                        }
                    />
                    <div onClick={() => { window.open("/transferForm", '_self') }}
                        style={twnButtonStyles.linkOrangeBtn}>
                        Create Transfer
                    </div>
                </Stack>
            </Stack>

            <Table size="small" style={{ marginTop: '15px' }}>
                <TableHead style={twnButtonStyles.headerStyle}>
                    <TableRow>
                        <StyledTableCell align="left">Transfer Id</StyledTableCell>
                        <StyledTableCell align="left">Client Name</StyledTableCell>
                        <StyledTableCell align="left">Phone No.</StyledTableCell>
                        {hasAdmin === "Admin" || hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" ?
                            <StyledTableCell align="left">Agent Name</StyledTableCell> : null
                        }
                        <StyledTableCell align="left">Transfers</StyledTableCell>
                        <StyledTableCell align="left">Comission</StyledTableCell>
                        <StyledTableCell align="left">Total Amount</StyledTableCell>
                        <StyledTableCell align="left">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                {tableData.length > 0 ?
                    <TableBody>
                        {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="left">{row.transferId}</StyledTableCell>
                                <StyledTableCell align="left">{row.clientName}</StyledTableCell>
                                <StyledTableCell align="left">{row.clientPhoneNumber}</StyledTableCell>
                                {hasAdmin === "Admin" || hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" ?
                                    <StyledTableCell align="left">{row.createdBy.replace(/^\w/, c => c.toUpperCase())}</StyledTableCell> : null
                                }
                                <StyledTableCell align="left">{row.type}</StyledTableCell>
                                <StyledTableCell align="left">{formatter.format(row.commission)}</StyledTableCell>
                                <StyledTableCell align="left">{formatter.format(row.totalAmount)}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <Stack direction='row' spacing={2} justifyContent='left' style={{ color: '#f46d25' }}>
                                        {/* <Link to={{ pathname: `/transferForm/${row.transferId}`}}><EditIcon style={{ color: '#f46d25' }} /></Link> */}
                                        <div onClick={() => { window.open(`/transferForm/${row.transferId}`, '_self') }}><EditIcon style={{ color: '#f46d25', cursor: 'pointer' }} /></div>
                                        <Link to={{ pathname: `/viewTransfer/${row.transferId}` }} ><VisibilityIcon style={{ color: '#f46d25' }} /></Link>
                                    </Stack>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                    : "Search Not Found"
                }
            </Table>
            <TablePagination
                component="div"
                count={tableData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}