import React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Stack, Table, TableBody, TableRow, TableHead, Tooltip } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CachedIcon from '@material-ui/icons/Cached';
import { Link } from 'react-router-dom';
import { format, differenceInDays } from "date-fns";
import TablePagination from '@mui/material/TablePagination';
import { formatter } from "../../utils/formatNumber";
import { twnButtonStyles } from '../../utils/townoStyle';
import FileCopyIcon from '@material-ui/icons/FileCopy';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#f46d25',
        color: "#fff",
        fontSize: 14,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        boxShadow: 'none',
        borderRadius: '5px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    border: "1px solid #eee",
}));

const rowColor = (packageId) => { return packageId === "" ? '#fff' : '#eee' }

export default function QuotationTable({ tableData }) {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    let hasAdmin = localStorage.getItem("role");


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    console.log("Quotation Table Data: ", tableData);
    return (
        <>
            <div>
                <Table size='small'>
                    <TableHead style={twnButtonStyles.headerStyle}>
                        <TableRow>
                            <StyledTableCell style={{ borderTopLeftRadius: '5px' }}>Quotation Id</StyledTableCell>
                            <StyledTableCell align="left">Quotation Name</StyledTableCell>
                            <StyledTableCell align="left">Client Name</StyledTableCell>
                            <StyledTableCell align="left">Phone No.</StyledTableCell>
                            {hasAdmin === "Admin" || hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" ?
                                <StyledTableCell align="left">Agent Name</StyledTableCell> : null
                            }
                            <StyledTableCell align="left">Duration</StyledTableCell>
                            <StyledTableCell align="left">Booking Date</StyledTableCell>
                            <StyledTableCell align="left">Trip Date</StyledTableCell>
                            <StyledTableCell align="left">Total Amount</StyledTableCell>
                            <StyledTableCell align="left" style={{ borderTopRightRadius: '5px' }}>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {tableData.length > 0 ?
                        <TableBody>
                            {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <StyledTableRow key={index} style={{ backgroundColor: rowColor(row.packageId) }}>
                                    <StyledTableCell component="th" scope="row">{row.quotationId}</StyledTableCell>
                                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                                    <StyledTableCell align="left">{row.clientName}</StyledTableCell>
                                    <StyledTableCell align="left">{row.clientMobileNo}</StyledTableCell>
                                    {hasAdmin === "Admin" || hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" ?
                                        <StyledTableCell align="left">{row.createdBy.replace(/^\w/, c => c.toUpperCase())}</StyledTableCell> : null
                                    }
                                    <StyledTableCell align="left">{differenceInDays(new Date(row.checkOut), new Date(row.checkIn))}</StyledTableCell>
                                    <StyledTableCell align="left">{format(new Date(row.createdAt), "dd MMM yy")}</StyledTableCell>
                                    <StyledTableCell align="left">{row.checkIn ? format(new Date(row.checkIn), "dd MMM yy") : null}</StyledTableCell>
                                    <StyledTableCell align="left">{formatter.format(row.totalGrossAmount)}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Stack direction='row' spacing={2} justifyContent='left' >
                                            {row.packageId === "" &&
                                                <>
                                                    <Link to={{ pathname: `/createPackageOrQuotation/quotation/${true}/${row.quotationId}`, displayConvert: true }}><Tooltip title="Convert To Package" arrow><CachedIcon style={{ color: '#f46d25' }} /></Tooltip></Link>
                                                    <div onClick={() => { window.open(`/createPackageOrQuotation/quotation/${false}/${row.quotationId}`, "_self") }}><Tooltip title="Edit" arrow><EditIcon style={{ color: '#f46d25', cursor: 'pointer' }} /></Tooltip></div>
                                                </>}
                                            <Link to={{ pathname: `/viewPackageOrQuotation/quotation/${row.quotationId}` }} ><Tooltip title="View" arrow><VisibilityIcon style={{ color: '#f46d25' }} /></Tooltip></Link>
                                            <div onClick={() => { window.open(`/copyPage/quotation/${row.quotationId}`) }}><Tooltip title="Copy Quotation" arrow><FileCopyIcon style={{ color: '#f46d25', cursor: 'pointer' }} /></Tooltip></div>
                                        </Stack>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                        : "Search Not Found"
                    }
                </Table>
            </div>

            <TablePagination
                component="div"
                count={tableData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
