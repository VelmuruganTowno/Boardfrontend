import { filter } from "lodash";
import { useState, useEffect } from "react";
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
import CityForm from "./CityForm";
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

const options = [
  { value: "city", label: "City" },
  { value: "leadType", label: "Lead Type" },
  { value: "leadSource", label: "Lead Source" },
  { value: "bookingSource", label: "Booking Source" }];

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

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 0, 0, 0),
  marginBottom: "10px",
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 40,
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

export default function City() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({ id: "", name: "", description: "" });
  const [dropDownAllList, setDropDownAllList] = useState([]);
  const [dropDownLists, setDropDownLists] = useState([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);


  const filterDropDownList = (option, array) => {
    const tempList = array.filter((each) => { return each.menu === option.value });
    setDropDownLists(tempList);
  }

  const fetchData = () => {
    fetch("/api/v1/commonfeature/TWNTOW0")
      .then(response => {
        return response.json()
      })
      .then(resData => {
        setDropDownAllList(resData);
        filterDropDownList(selectedOption, resData);
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const changeSelect = (drop) => {
    setSelectedOption(drop);
    filterDropDownList(drop, dropDownAllList);
  };

  const OpenDialog = async (row) => {
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

const downloadExcel = () =>{
    const apiData = dropDownLists.map((each)=>{
      return(
        {
          name:each.name,
          description:each.description
        }
      )
    })
    const workSheet = XLSX.utils.json_to_sheet(apiData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet,selectedOption.label);
    XLSX.write(workBook, {bookType: "xlsx", type: "binary"});
    XLSX.writeFile(workBook, selectedOption.label + ".xlsx");
  }

  return (
    <Container>
      <div style={{ paddingTop: "100px" }}>
        <RootStyle>
          <Grid item sm={3}>
            <Select
              name="selectedOption"
              defaultValue={options[0]}
              onChange={(selection, action) => changeSelect(selection, action)}              
              options={options}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999 }),
              }}
            />
          </Grid>
          <Grid item sm={12} style={{ textAlign: "right" }}>
            <SearchStyle
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Search"
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item sm={3} style={{ textAlign: "right" }}>
          <Tooltip title="Pdf">
          <IconButton
            onClick={() => {
              exportPDF();
            }}
          >
            <i className="fas fa-file-pdf" style={{ color: "#F46D25" }}></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Excel">
          <IconButton
            onClick={() => {
              downloadExcel();
            }}
          >
            <i className="fas fa-file-csv" style={{ color: "#F46D25" }}></i>
          </IconButton>
        </Tooltip>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
              onClick={OpenDialog}
            >
              Add New
            </Button>
          </Grid>
        </RootStyle>

        <Card>
          <TableContainer>
            <Table>
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
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell component="th" scope="row">
                          {name}
                        </TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="right">
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={dropDownLists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
      <CityForm
        open={open}
        onClose={CloseDialog}
        selectedRow={selectedRow}
        selectedOption={selectedOption}
        fetchData={fetchData}
      />
    </Container>
  );
}
