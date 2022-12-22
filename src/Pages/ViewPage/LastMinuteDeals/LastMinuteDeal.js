/* eslint-disable eqeqeq */
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
  Switch,
} from "@material-ui/core";
import {
  TableListHead,
  TableToolbar,
  SearchNotFound,
} from "../../../components/tabel";
import "jspdf-autotable";
import EditIcon from "@material-ui/icons/Edit";
import LastMinuteDealForm from "./LastMinuteDealForm";
import Api from "../../../Service/Api";

import { baseurl } from "../../../Service/httpCommon";

const TABLE_HEAD = [
  { id: "profile", label: "Image" },
  { id: "propertyName", label: "Property Name" },
  { id: "starrating", label: "Star Rating" },
  { id: "city", label: "City" },
  { id: "minimumprice", label: "Minimumprice" },
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
      (_most) =>
        _most.propertyName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function LastMinuteDeal() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [LastMinuteDeal, setLastMinuteDeal] = useState([]);

  useEffect(() => {
    LastMinuteDealAll();
  }, []);

  const LastMinuteDealAll = () => {
    Api.get("agentlastminutedeal").then((res) => {
      setLastMinuteDeal(res.data);
    });
  };
  const OpenDialog = (data) => {
    setOpen(true);
    // eslint-disable-next-line eqeqeq
    if (data.id !== "" && data.id !== undefined && data.id !== null) {
      setSelectedId(data.id);
    }
  };

  const CloseDialog = () => {
    setOpen(false);
    setSelectedId(0);
    LastMinuteDealAll();
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - LastMinuteDeal.length)
      : 0;

  const filteredMostPopular = applySortFilter(
    LastMinuteDeal,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = filteredMostPopular.length === 0;

  const Delete = (row) => {
    if(row.status == "1") {
      Api.delete(`agentlastminutedeal/${row.id}/${row.createdBy}`).then((res) => {
        LastMinuteDealAll();
      })
    } else {
      Api.put(`agentlastminutedealactive/${row.id}/${row.createdBy}`).then((res) => {
        LastMinuteDealAll();
      })
    }
    
  };
  return (
    <div style={{padding: '4% 1% 1% 1%' }}>
        <div>
          <TableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            searchPlaceholderName={"Search Your PropertyName"}
            tableName={"Last Minute Deals"}
            open={OpenDialog}
          />
          <Card style={{ marginTop: '15px', boxShadow: 'none', border: '1px solid #F4F4F4',fontSize:'14px' }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small">
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={LastMinuteDeal.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredMostPopular
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        propertyName,
                        starRate,
                        city,
                        minmumprice,
                        image,
                        status,
                      } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1}>
                          <TableCell component="th" scope="row">
                            <img
                              src={`${baseurl}getimage/${image}`}
                              alt="profile"
                              style={{
                                width: "70px",
                                height: "40px",
                              }}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {propertyName}
                          </TableCell>

                          <TableCell align="left">{starRate}</TableCell>
                          <TableCell align="left">{city}</TableCell>
                          <TableCell align="left">{minmumprice}</TableCell>
                          <TableCell align="left">
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
                            <Tooltip title="Edit">
                              <Switch
                                color="primary"
                                size="small"
                                checked={parseInt(status)}
                                onChange={() => {
                                  Delete(row);
                                }}
                              />
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
              count={LastMinuteDeal.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </div>
        <LastMinuteDealForm
          open={open}
          onClose={CloseDialog}
          selectedId={selectedId}
        />
      </div>
  );
}
