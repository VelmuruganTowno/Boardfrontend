import React from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Stack, Table, TableBody, TableRow, TableHead, Tooltip, IconButton } from '@mui/material';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
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
    // fontWeight: 'bold'
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
  //   backgroundColor: theme.palette.action.hover,
  // }
}));

export default function PackageTable({ tableData }) {

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

  return (
    <>
      <div>
        <Table size="small" >
          <TableHead style={twnButtonStyles.headerStyle}>
            <TableRow>
              <StyledTableCell style={{ borderTopLeftRadius: '5px' }}>Package Id</StyledTableCell>
              <StyledTableCell align="left">Package Name</StyledTableCell>
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
              {tableData.length>0?
          <TableBody>
            {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">{row.packageId}</StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="left">{row.clientName}</StyledTableCell>
                <StyledTableCell align="left">{row.clientMobileNo}</StyledTableCell>
                {hasAdmin === "Admin" || hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" ?
                  <StyledTableCell align="left">{row.createdBy.replace(/^\w/, c => c.toUpperCase())}</StyledTableCell> : null
                }
                <StyledTableCell align="center" style={{ paddingRight: '50px' }}>{row.checkOut && row.checkIn ? differenceInDays(new Date(row.checkOut), new Date(row.checkIn)) : null}</StyledTableCell>
                <StyledTableCell align="left">{format(new Date(row.createdAt), "dd MMM yy")}</StyledTableCell>
                <StyledTableCell align="left">{row.checkIn ? format(new Date(row.checkIn), "dd MMM yy") : null}</StyledTableCell>
                <StyledTableCell align="left">{formatter.format(row.totalGrossAmount)}</StyledTableCell>
                <StyledTableCell align="left">
                  <Stack direction='row' spacing={2} justifyContent='left' style={{ color: '#f46d25' }}>
                    {/* <Link to={{pathname:`/createPackage/${true}/${true}/${row.packageId}`, isPackage:true, id:row.packageId, displayLeads:true}}><EditIcon style={{ color: '#f46d25' }} /></Link> */}
                    <div onClick={() => { window.open(`/createPackageOrQuotation/package/${true}/${row.packageId}`, "_self", `isPackage:true, id:row.packageId, displayLeads:true`) }}><Tooltip title="Edit" arrow><EditIcon style={{ color: '#f46d25', cursor: 'pointer' }} /></Tooltip></div>
                    <Link to={{ pathname: `/viewPackageOrQuotation/package/${row.packageId}` }} ><Tooltip title="View" arrow><VisibilityIcon style={{ color: '#f46d25' }} /></Tooltip></Link>
                    <div onClick={() => { window.open(`/copyPage/package/${row.packageId}`) }}><Tooltip title="Copy Package" arrow><FileCopyIcon style={{ color: '#f46d25', cursor: 'pointer' }} /></Tooltip></div>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          :"Search Not Found"}
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
