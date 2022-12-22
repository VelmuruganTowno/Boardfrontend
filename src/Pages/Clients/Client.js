import { filter } from "lodash";
import { useState, useEffect } from "react";
// material
import Pagination from "@material-ui/lab/Pagination";
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
  Button,
  TextField,
  Grid,
} from "@material-ui/core";
import {
  TableListHead,
  TableToolbar,
  SearchNotFound,
} from "../../components/tabel";
import "./Client.scss";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { clientListInitial } from "../../redux/actions/clientAction";
import ClientForm from "./ClientForm";
import Loader from "./../../components/Loader/Loader";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import AddIcon from "@material-ui/icons/Add";
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Stack } from '@mui/material';
import { twnButtonStyles } from "../../utils/townoStyle";

const TABLE_HEAD = [
  { id: "firstName", label: "Name" },
  { id: "mobile", label: "Mobile" },
  { id: "mail", label: "Email" },
  { id: "city", label: "City" },
  { id: "status", label: "Status", align: "center" },
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
      (_client) =>
        _client.firstName.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        (_client.mail.toLowerCase().indexOf(query.toLowerCase()) !== -1) ||
        (_client.mobile && _client.mobile.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Client() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  var uniqueid = localStorage.getItem("unique_id");
  const clientLists = useSelector((state) => state.clientList.clientLists);
  const clientLoad = useSelector((state) => state.clientList.loading);
  const [width, setWidth] = useState(window.innerWidth);
  const [pageNumber, setPageNumber] = useState(0);
  const DataPerPage = 10;

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    dispatch(clientListInitial(uniqueid));
  }, [dispatch, uniqueid]);

  const OpenDialog = (client) => {
    setOpen(true);
    // eslint-disable-next-line eqeqeq
    if (client.id !== "" && client.id !== undefined && client.id !== null) {
      setSelectedId(client.id);
    }
  };

  const CloseDialog = () => {
    setOpen(false);
    setSelectedId(0);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientLists.length) : 0;

  const filteredClient = applySortFilter(
    clientLists,
    getComparator(order, orderBy),
    filterName
  );
  console.log("filteredClient",filteredClient);

  const isNotFound = filteredClient.length === 0;

  //mobile pagination
  const totalDataLength = filteredClient.length;
  const dataPerPage = 6;
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
    <>
      {clientLoad ? (
        <Loader />
      ) : (
        <div style={twnButtonStyles.allPages}>
          {width <= 768 ? (
            <div style={{ padding: "100px 0px", height: '80vh', overflow: 'auto' }}>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    name="filterName"
                    value={filterName}
                    variant="outlined"
                    onChange={handleFilterByName}
                    label="Client Name"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} style={{ textAlign: "end" }}>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    color="primary"
                    onClick={OpenDialog}
                    size="small"
                  >
                    Add New
                  </Button>
                </Grid>
              </Grid>
              {filteredClient
                .slice(firstDataIndex, lastDataIndex)
                .map((row) => {
                  const {
                    id,
                    firstName,
                    middleName,
                    lastName,
                    mobile,
                    mail,
                    nationality,
                  } = row;
                  return (
                    <div key={id} className="clientcard">
                      <div className="title">
                        <h2>
                          {firstName}&nbsp;{middleName}&nbsp;{lastName}
                        </h2>
                      </div>
                      <div className="bookingContent">
                        <h5>Mobile : {mobile}</h5>
                        <h5>Nationality : {nationality}</h5>
                      </div>
                      <div className="bookingContent">
                        <h5>Email : {mail}</h5>
                        <h5 style={{ textAlign: "end" }}>
                          <button
                            onClick={() => {
                              OpenDialog(row);
                            }}
                            style={{
                              height: "20px",
                              color: "#fff",
                              background: "#343A40",
                              border: "1px solid #343A40",
                              borderRadius: "3px",
                            }}
                          >
                            Edit
                          </button>
                        </h5>
                      </div>
                    </div>
                  );
                })}
              {/* <Grid item xs={12} container justifyContent="center">
                <Pagination
                  count={pageCount}
                  color="primary"
                  onPageChange={changePage}
                />
              </Grid> */}
              <Stack direction='row' spacing={2} justifyContent='space-between' style={{ margin: '1em' }}>
                <span onClick={() => { changePageNo(-1) }}><ArrowLeftIcon /></span>
                <span>{currentPageNo} of {noOfPages}</span>
                <span onClick={() => { changePageNo(1) }}><ArrowRightIcon /></span>
              </Stack>
            </div>
          ) : (
            <div >
              <TableToolbar
                filterName={filterName}
                onFilterName={handleFilterByName}
                searchPlaceholderName={"Search Your Client"}
                tableName={"Client List"}
                open={OpenDialog}
              />
              <Card style={{ marginTop: '15px', boxShadow: 'none', border: '1px solid #F4F4F4',fontSize:'14px' }}>
                <TableContainer sx={{ minWidth: 499 }}>
                  <Table size="small">
                    <TableListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      rowCount={clientLists.length}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {filteredClient
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          const {
                            id,
                            firstName,
                            mobile,
                            mail,
                            city,
                            status,
                          } = row;
                          return (
                            <TableRow hover key={id} tabIndex={-1} >
                              <TableCell component="th" scope="row" style={{fontSize:'12px'}}>
                                {firstName}
                              </TableCell>
                              <TableCell style={{fontSize:'12px'}}>{mobile}</TableCell>
                              <TableCell style={{fontSize:'12px'}}>{mail}</TableCell>
                              <TableCell style={{fontSize:'12px'}}>{city}</TableCell>
                              <TableCell align="left" style={{fontSize:'12px'}}>
                                {/* {" "} */}
                                {status === "active" ? (
                                  <DoneIcon
                                    style={{
                                      color: "green",
                                      margin: "0px",
                                      padding: "0px",
                                    }}
                                  />
                                ) : (
                                  <ClearIcon
                                    style={{
                                      color: "red",
                                      margin: "0px",
                                      padding: "0px",
                                    }}
                                  />
                                )}
                              </TableCell>
                              <TableCell align="left" style={{fontSize:'12px'}}>
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
                  count={clientLists.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </div>
          )}
          <ClientForm
            open={open}
            onClose={CloseDialog}
            selectedId={selectedId}
          />
        </div>
      )}
    </>
  );
}