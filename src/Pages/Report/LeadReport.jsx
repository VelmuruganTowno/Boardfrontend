import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@material-ui/core";
import XLSX from "xlsx";
import Select from "react-select";
import _ from "lodash";
import { format } from "date-fns";

const parameters = [
  { label: 'Client Name', value: 'clientName' },
  { label: 'Client Number', value: 'clientMobileNo' },
  { label: 'Destination', value: 'destination' },
  { label: 'Lead Type', value: 'leadType' },
  { label: 'Assigned To', value: 'leadassignto' },
]

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  background: "#F46D25",
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  background: "#F46D25",
  color: "#fff",
  fontSize: "12px",
  padding: "5px",
  lineHeight: "1rem",
  minWidth: "100px",
}));

const StyledTableCellInside = styled(TableCell)(({ theme }) => ({
  padding: "5px",
  fontSize: "12px",
  lineHeight: "15px",
}));

const columns = [
  {
    id: "clientName",
    label: "Client Name",
  },
  {
    id: "clienMobileNo",
    label: "Client No",
  },
  {
    id: "clientMail",
    label: "Client Mail",
  },
  {
    id: "checkin",
    label: "Check In",
  },
  {
    id: "destination",
    label: "Destination",
  },
  {
    id: "displayName",
    label: "Hotel Name"
  },
  {
    id: "clientDepartcity",
    label: "Departure City",
  },
  {
    id: "leadType",
    label: "Lead Type",
  },
  {
    id: "leadassignto",
    label: "Assigned To",
  },
  {
    id: "leadscoring",
    label: "Lead Scoring",
  },
  {
    id: "leadsource",
    label: "Lead Source",
  },
  {
    id: "noofnights",
    label: "Nights",
  },
  {
    id: "budget",
    label: "Budget",
  },
  {
    id: "noofpax",
    label: "No of Pax",
  },

  {
    id: "createdAt",
    label: "Created At",
  },
  {
    id: "createdBy",
    label: "Created By",
  },
  {
    id: "updatedAt",
    label: "Updated At",
  },
  {
    id: "updatedBy",
    label: "Updated By",
  },
];

export default function LeadReport(props) {
  const [finalReport, setFinalReport] = useState(props.reportData);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    setFinalReport(props.reportData);
  }, [props]);

  const HandleSort = (sort) => {
    setSort(sort);
    let sorted = _.orderBy(finalReport, [sort.value], ["asec"]);
    setFinalReport(sorted);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(+event.target.value);
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const downloadExcel = () => {
    const newData = finalReport.map((each) => {
      delete each.bookingId;
      delete each.uniqueId;
      delete each.status;
      delete each.notifyemp;
      delete each.notify;
      delete each.checkout;
      delete each.id;
      delete each.leadscoringvalue;
      delete each.notes;
      delete each.propertyId;
      delete each.propertyName;
      delete each.reason;
      delete each.propertyId;
      if (each.checkin !== null && each.checkin.trim() !== "") {
        each.checkin = format(new Date(each.checkin), "d MMM yy");
      }
      if (each.createdAt !== null || "") {
        if (each.createdAt.trim() !== "")
          each.createdAt = format(new Date(each.createdAt), "d MMM yy HH:ii");
      }
      if (each.updatedAt !== null || "") {
        if (each.createdAt.trim() !== "")
          each.updatedAt = format(new Date(each.updatedAt), "d MMM yy HH:ii");
      }
      return each;
    })
    console.log("leadReport|downloadExcel|newdata ", newData);
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Lead");
    // const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.writeFile(workBook, "Lead.xlsx");
  };

  return (
    <div>
      <Grid container spacing={2} style={{ marginBottom: "10px" }}>
        <Grid item md={8}>
          <b>Lead Report</b>
        </Grid>
        <Grid item md={2}>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                top: "-9px",
                zIndex: "1",
                left: "12px",
                color: "#fff",
                background: "#F46D25",
                borderRadius: "4px",
                padding: "1px 4px",
                fontSize: "12px",
              }}
            >
              Sort By
            </span>
            <Select
              options={parameters}
              placeholder=""
              value={sort}
              onChange={HandleSort}
              styles={{
                container: (provided) => ({
                  ...provided,
                }),
                menu: (provided) => ({
                  ...provided,
                  zIndex: 9,
                }),
                control: (base, state) => ({
                  ...base,
                  "&:hover": { borderColor: "#f46d25" },
                  borderColor: "#f46d25",
                  boxShadow: "none",
                }),
              }}
            />
          </div>
        </Grid>
        <Grid item md={2} style={{ textAlign: "right" }}>
          <Button  onClick={downloadExcel}>
            Download As Excel
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <StyledTableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.id} align={column.align}>
                    {column.label}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {finalReport
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row, index) => {
                  return (
                    <TableRow key={index} >
                      <StyledTableCellInside>
                        {row.clientName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.clientMobileNo}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.clientMail}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {(row.checkin !== null && (row.checkin || "").trim() !== "") ?
                          format(new Date(row.checkin), "dd-MM-yyyy") : ""}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.destination}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.displayName}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.clientDepartcity}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.leadType}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.leadassignto}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.leadscoring}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.leadsource}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.noofnights}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.budget}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.noofpax}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.createdAt}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.createdBy}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.updatedAt}
                      </StyledTableCellInside>
                      <StyledTableCellInside>
                        {row.updatedBy}
                      </StyledTableCellInside>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={finalReport.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
    </div >
  );
}
