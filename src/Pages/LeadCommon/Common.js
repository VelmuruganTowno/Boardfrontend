import { filter } from "lodash";
import { useState, useEffect } from "react";
import Api from '../../Service/Api';
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import {
  TableListHead,
  SearchNotFound,
} from "../../components/tabel";
import "jspdf-autotable";
import EditIcon from "@material-ui/icons/Edit";
import CommonForm from "./CommonForm";
import Select from "react-select";
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/styles";
import {
  Toolbar,
  OutlinedInput,
  InputAdornment,
  Grid,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import jsPDF from "jspdf";
import "jspdf-autotable";
import XLSX from 'xlsx';
import { DriveEtaRounded } from "@material-ui/icons";
import { twnButtonStyles } from "../../utils/townoStyle";
import { Stack } from "@mui/material";

const adminOptions = [
  { value: "city", label: "City" },
  { value: "leadType", label: "Lead Type" },
  { value: "leadSource", label: "Lead Source" },
  { value: "bookingSource", label: "Booking Source" }];

const agentOptions = [
  { value: "city", label: "City" },
  { value: "leadType", label: "Lead Type" },
  { value: "leadSource", label: "Lead Source" },
  { value: "bookingSource", label: "Booking Source" },
  { value: "hotelBookingCancellationPolicy", label: "Booking Cancellation Policy" },
  { value: "hotelBookingTermCondition", label: "Booking T&C" },
  { value: "packageTermCondition", label: "Package T&C" },
  { value: "packageCancellationPolicy", label: "Package Cancellation Policy" },
  { value: "quotatioTermCondition", label: "Quotation T&C" },
  { value: "quotationCancellationPolicy", label: "Quotation Cancellation Policy" },
  { value: "transferTermCondition", label: "Transfer T&C" },
  { value: "transferCancellationPolicy", label: "Transfer Cancellation Policy" }];

  const addEnableOptions = ["city","leadType","leadSource","bookingSource"];

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "", label: "Action", align: "right" },
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
      (_dropDown) =>
        _dropDown.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// const RootStyle = styled(Toolbar)(({ theme }) => ({
//   height: 96,
//   display: "flex",
//   justifyContent: "space-between",
//   padding: theme.spacing(0, 0, 0, 0),
//   marginBottom: "10px",
// }));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 220,
  height: 36,
  color: '#1F2937',
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  // '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

export default function Common() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: "", name: "", description: "" });
  const [dropDownAllList, setDropDownAllList] = useState([]);
  const [dropDownLists, setDropDownLists] = useState([]);
  const [selectedOption, setSelectedOption] = useState(agentOptions[0]);
  let hasAdmin = localStorage.getItem("role");


  const filterDropDownList = (option, array) => {
    const tempList = array.filter((each) => { return each.menu === option.value });
    setDropDownLists(tempList);
  }

  var uniqueid = localStorage.getItem("unique_id");
  const fetchData = () => {
    var url = `/commonfeature/${uniqueid}`;
    Api.get(url)
      .then(resData => {
        console.log(resData.data);
        setDropDownAllList(resData.data);
        filterDropDownList(selectedOption, resData.data);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const changeSelect = (drop) => {
    setSelectedOption(drop);
    filterDropDownList(drop, dropDownAllList);
  };

  const OpenDialog = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };

  const CloseDialog = () => {
    setOpen(false);
    setSelectedRow({ id: "", name: "", description: "" });
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

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dropDownLists.length) : 0;

  const filteredDropDown = applySortFilter(
    dropDownLists,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = filteredDropDown.length === 0;

  //pdf
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = selectedOption.label;
    const headers = [["Name", "Description"]];
    const pdfData = dropDownLists.map(elt => [elt.name, elt.description]);

    let content = {
      startY: 50,
      head: headers,
      body: pdfData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(selectedOption.label + ".pdf")
  }

  //csv

  const downloadExcel = () => {
    const apiData = dropDownLists.map((each) => {
      return (
        {
          name: each.name,
          description: each.description
        }
      )
    })
    const workSheet = XLSX.utils.json_to_sheet(apiData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, selectedOption.label);
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, selectedOption.label + ".xlsx");
  }

  return (
    <div style={{ ...twnButtonStyles.allPages, paddingTop: '83px' }}>
      <div>
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            <Select
              name="selectedOption"
              defaultValue={agentOptions[0]}
              options = {hasAdmin === "Agent Admin" ? agentOptions :adminOptions}
              onChange={(selection, action) => changeSelect(selection, action)}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
                control: (base, state) => ({
                  ...base,
                  "&:hover": { borderColor: "#f46d25" },
                  borderColor: "#f46d25",
                  boxShadow: "none",
                  width: '275px',
                }),
                placeholder: (provided, state) => ({
                  ...provided,
                  position: "absolute",
                  top:
                    state.hasValue ||
                      state.selectProps.inputValue
                      ? -15
                      : "50%",
                  background: "#fff",
                  padding: "0px 5px",
                  transition: "top 0.1s, font-size 0.1s",
                  fontSize: "17px",
                }),
              }}
            />
          </Stack>
          <Stack direction='row'>
            <SearchStyle
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Search"
              style={{ ...twnButtonStyles.smFonts }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
                </InputAdornment>
              }
            />
            <Tooltip title="Pdf">
              <IconButton
                onClick={() => {
                  exportPDF();
                }}
              >
                <i className="fas fa-file-pdf" style={{ color: "#F46D25", textAlign: 'center', fontSize: '30px', marginTop: '-10px' }}></i>
              </IconButton>
            </Tooltip>
            <Tooltip title="Excel">
              <IconButton
                onClick={() => {
                  downloadExcel();
                }}
              >
                <i className="fas fa-file-csv" style={{ color: "#F46D25", textAlign: 'center', fontSize: '30px', marginTop: '-10px' }}></i>
              </IconButton>
            </Tooltip>
            { addEnableOptions.includes(selectedOption.value) &&
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
              onClick={OpenDialog}
              size='small'
              style={{ ...twnButtonStyles.orangeBtn, padding: '2px 13px' }}
            >
              Add New
            </Button>}
          </Stack>
        </Stack>

        <Card style={{ marginTop: '0.45%', boxShadow: 'none', border: '1px solid #F4F4F4' }}>
          <TableContainer sx={{ minWidth: 499 }}>
            <Table size="small">
              <TableListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dropDownLists.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredDropDown
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, name, description } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} >
                        <TableCell component="th" scope="row" style={{ fontSize: '12px' }}>
                          {name}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '12px' }}>{description}</TableCell>
                        <TableCell align="left" style={{ fontSize: '12px' }}>
                          <Tooltip title="Edit">
                            <IconButton
                              aria-label="edit"
                              onClick={() => {
                                OpenDialog(row);
                              }}
                              style={{ padding: "0px", color: "#F46D25" }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
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
              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                      <SearchNotFound searchQuery={filterName} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 30]}
            component="div"
            count={dropDownLists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
      <CommonForm
        open={open}
        onClose={CloseDialog}
        selectedRow={selectedRow}
        selectedOption={selectedOption}
        fetchData={fetchData}
      />
      <br /><br />
    </div>
  );
}
