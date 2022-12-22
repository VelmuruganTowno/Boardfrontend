/* eslint-disable eqeqeq */
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
  Grid,
  TextField,
} from "@material-ui/core";
import {
  TableListHead,
  TableToolbarAdmin,
  SearchNotFound,
} from "../../../components/tabel";
import XLSX from "xlsx";
import "./property.scss";
// components
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { propertyListInitial } from "../../../redux/actions/propertyAction";
import CloseIcon from "@material-ui/icons/Close";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Rating from "./../../OrderBooking/Rating";

const TABLE_HEAD = [
  { id: "propertyName", label: "Name", alignRight: false },
  { id: "city", label: "Location", alignRight: false },
  { id: "starRating", label: "Star Rating", alignRight: false },
  { id: "noofRooms", label: "No of Rooms", alignRight: false },
  { id: "swimingpool", label: "Swimming Pool", alignRight: false },
  { id: "jacuzzi", label: "Jacuzzi", alignRight: false },
  { id: "petFriendly", label: "Pet Friendly", alignRight: false },
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
      (_property) =>
        _property.propertyName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function PropertyList() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const history = useHistory();
  var uniqueid = localStorage.getItem("unique_id");
  var role = localStorage.getItem("role");
  const propertyLists = useSelector(
    (state) => state.propertyList.propertyLists
  );
  const [pageNumber, setPageNumber] = useState(0);
  const DataPerPage = 10;

  const pagesVisited = pageNumber * DataPerPage;

  const pageCount = Math.ceil(propertyLists.length / DataPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const [width, setWidth] = useState(window.innerWidth);

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
    dispatch(propertyListInitial());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadExcel = () => {
    const newData = propertyLists.map((row) => {
      delete row.id;
      delete row.uniqueId;
      delete row.createdBy;
      delete row.createdAt;
      delete row.updatedBy;
      delete row.updatedAt;
      delete row.status;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Property List");
    // const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "PropertyList.xlsx");
  };

  const DownloadPdf = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.text("Property", 20, 10);
    doc.autoTable({
      body: propertyLists,
      columns: [
        { header: "Name", dataKey: "propertyName" },
        { header: "Location", dataKey: "city" },
        { header: "Star Rating", dataKey: "starRating" },
        { header: "noofRooms", dataKey: "noofRooms" },
      ],
    });
    doc.save("Property List.pdf");
  };

  const handleOpen = (propertyList) => {
    history.push("/addproperty");
    var propertyId = propertyList.propertyId.replace(/['"']+/g, "");
    sessionStorage.setItem("propertyId", propertyId);
  };

  const handleCreate = () => {
    history.push("/addproperty");
    sessionStorage.removeItem("propertyId");
  };
  const handleView = (data) => {
    history.push(`/hotelView/${data.propertyId}`);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - propertyLists.length) : 0;

  const filteredProperty = applySortFilter(
    propertyLists,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = filteredProperty.length === 0;

  return (
    <div style={{ padding: '4% 1% 1% 1%' }}>
      <div>
        {width <= 768 ? (
          <>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  name="filterName"
                  value={filterName}
                  variant="outlined"
                  onChange={handleFilterByName}
                  label="Search Your PropertyName"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
            {filteredProperty
              .slice(pagesVisited, pagesVisited + DataPerPage)
              .map((row) => {
                const {
                  id,
                  displayName,
                  city,
                  starRating,
                  noofRooms,
                  swimingpool,
                  jacuzzi,
                  petFriendly,
                } = row;
                return (
                  <div key={id} className="propertycard">
                    <div className="title">
                      <h2>{displayName}</h2>
                      <p>
                        <Rating rating={starRating} />
                      </p>
                    </div>
                    <div className="bookingContent">
                      <h2>Address : {city}</h2>
                      <div style={{ width: "50%", textAlign: "end" }}>
                        <button
                          style={{
                            height: "20px",
                            color: "#fff",
                            background: "#343A40",
                            border: "1px solid #343A40",
                            borderRadius: "3px",
                          }}
                          onClick={() => {
                            handleView(row);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                    <div className="bookingContent">
                      <p>
                        <span className="circle"></span>No of Rooms :{" "}
                        {noofRooms}
                      </p>
                      <p>
                        <span className="circle"></span>Swimming Pool :{" "}
                        {swimingpool ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className="bookingContent">
                      <p>
                        <span className="circle"></span>Jacuzzi :{" "}
                        {jacuzzi ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="circle"></span>Pet Friendly :{" "}
                        {petFriendly ? "Yes" : "No"}
                      </p>
                    </div>
                  </div>
                );
              })}
            <Grid item xs={12} container justifyContent="center">
              <Pagination
                count={pageCount}
                color="primary"
                onPageChange={changePage}
              />
            </Grid>
          </>
        ) : (
          <>
            <TableToolbarAdmin
              filterName={filterName}
              onFilterName={handleFilterByName}
              searchPlaceholderName={"Search Your Property"}
              tableName={"Property List"}
              open={handleCreate}
              pdfDownload={DownloadPdf}
              downloadExcel={downloadExcel}
            />
            <Card>
              <TableContainer>
                <Table>
                  <TableListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={propertyLists.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredProperty
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          id,
                          displayName,

                          city,
                          starRating,
                          noofRooms,
                          swimingpool,
                          jacuzzi,
                          petFriendly,
                          uniqueId,
                        } = row;
                        return (
                          <TableRow hover key={id} tabIndex={-1}>
                            <TableCell component="th" scope="row">
                              {displayName}
                            </TableCell>
                            <TableCell align="left">{city}</TableCell>
                            <TableCell align="left">{starRating}</TableCell>
                            <TableCell align="left">{noofRooms}</TableCell>
                            <TableCell align="left">
                              {swimingpool ? (
                                <CheckCircleIcon style={{ color: "green" }} />
                              ) : (
                                <CloseIcon
                                  style={{
                                    color: "#201D1E",
                                    fontSize: "18px",
                                  }}
                                />
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {jacuzzi ? (
                                <CheckCircleIcon style={{ color: "green" }} />
                              ) : (
                                <CloseIcon
                                  style={{
                                    color: "#201D1E",
                                    fontSize: "18px",
                                  }}
                                />
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {petFriendly ? (
                                <CheckCircleIcon style={{ color: "green" }} />
                              ) : (
                                <CloseIcon
                                  style={{
                                    color: "#201D1E",
                                    fontSize: "18px",
                                  }}
                                />
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {uniqueId == uniqueid &&
                                (role == "Super Admin" || role == "Admin" || role == "Data Manger") ? (
                                <Tooltip title="Edit">
                                  <IconButton
                                    aria-label="edit"
                                    onClick={() => {
                                      handleOpen(row);
                                    }}
                                    style={{
                                      padding: "0px",
                                      color: "#F46D25",
                                    }}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </Tooltip>
                              ) : null}
                              <Tooltip title="View">
                                <IconButton
                                  aria-label="view"
                                  style={{
                                    padding: "0px",
                                    marginLeft: "10px",
                                    color: "#F46D25",
                                  }}
                                  onClick={() => {
                                    handleView(row);
                                  }}
                                >
                                  <VisibilityIcon />
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
                count={propertyLists.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
