import { useState, useEffect } from "react";
import XLSX from 'xlsx';

import {
  Card,
  Table, TableRow, TableBody, TableCell, TableContainer, TablePagination,
  Grid, Container, Dialog, Box, Tooltip,
  IconButton,
} from "@material-ui/core";

import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import BoardView from "./boardView";

// components
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import EventNoteIcon from '@material-ui/icons/EventNote';

import CachedIcon from '@material-ui/icons/Cached';
import BoardLeadForm from "./boardform";
import {
  TableListHead,
  TableLeadToolbar,
  SearchNotFound,
} from "../../components/tabel";
import Api from "../../Service/Api";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import LeadModal from './LeadModal';
import Stack from '@mui/material/Stack';
import { format, addDays } from "date-fns";


const useStyles = makeStyles((theme) => ({
  roots: {
    backgroundColor: theme.palette.background.paper,
    width: 650,
  },
  dialogPaper: {
    minHeight: "25%",
    minWidth: "10%",
    position: "absolute",
    marginRight: "300px",
    marginBottom: "70px",
    right: "0",
    zIndex: "50",
    "@media (max-width: 767px)": {
      position: "absolute",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      height: "100%",
      overflowY: "scroll",
      maxWidth: "100%",
      minHeight: "95%",
    },
  },
}));

const TABLE_HEAD = [
  { id: "clientName", label: "Client Name" },
  { id: "clientMobileNo", label: "Client No" },
  { id: "checkin", label: "Check In" },
  { id: "destination", label: "Destination" },
  { id: "noofnights", label: "Nights" },
  { id: "leadType", label: "Lead Type" },
  { id: "leadassignto", label: "Assigned To" },
  { id: "leadscoring", label: "Lead Scoring " },
  { id: "createdAt", label: "Created At " },
  { id: "", label: "Action", align: "left" },
];


const filterOptions = [
  { label: 'All', value: 'all', icon: " " },
  { label: 'New', value: 'new', icon: <FiberNewIcon style={{ marginLeft: "10px", color: '#fc7506', fontSize: '26px' }} /> },
  { label: 'Followup', value: 'followup', icon: <EventNoteIcon style={{ marginLeft: "10px", color: '#0000a5', fontSize: '26px' }} /> },
  { label: 'Lost', value: 'lost', icon: <ThumbDownIcon style={{ marginLeft: "10px", color: '#abaaaa', fontSize: '26px' }} /> },
  { label: 'Closed', value: 'closed', icon: <ThumbUpIcon style={{ marginLeft: "10px", color: '#1eaf1e', fontSize: '26px' }} /> },
  { label: 'Warm', value: 'followupwarm', icon: <BrightnessHighIcon style={{ marginLeft: "10px", color: '#febc12', fontSize: '26px' }} /> },
  { label: 'Hot', value: 'followuphot', icon: <WhatshotTwoToneIcon style={{ marginLeft: "10px", color: '#e71e24', fontSize: '26px' }} /> },
  { label: 'Cold', value: 'followupcold', icon: <AcUnitIcon style={{ marginLeft: "10px", color: '#8aceee', fontSize: '26px' }} /> },

]

const rowStyle = {
  default_row: {},
  active_row: {
    backgroundColor: '#f5f5f5',
  },
  filter_default_row: { cursor: 'pointer', padding: '5px 10px' },
  filter_selected_row: { cursor: 'pointer', color: '#000', padding: '5px 10px', backgroundColor: '#bbb' }
};
//getstyle for filter dropdown
const filterGetStyle = (isActive) => {
  return isActive ? rowStyle.filter_selected_row : rowStyle.filter_default_row
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props; return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={4}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query, filterBy, dateRange) {

  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    let filteredArray = array.filter((each) => {
      return each[filterBy] !== null && each[filterBy].toLowerCase().indexOf(query.toLowerCase()) !== -1
    });
    if (dateRange[0] !== null) {
      filteredArray = filteredArray.filter((each) => {
        return new Date(each.createdAt) >= dateRange[0] && new Date(each.createdAt) <= addDays(dateRange[1],1)
      });
    }
    return filteredArray;
  }

  if (dateRange[0] !== null) {
    return array.filter((each) => {
      return new Date(each.createdAt) >= dateRange[0] && new Date(each.createdAt) <= addDays(dateRange[1],1)
    });
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function Boardlead() {
  const [page, setPage] = useState(0);
  const classes = useStyles();
  var uniqueid = localStorage.getItem("unique_id");
  const [order, setOrder] = useState("desc");
  const [filterName, setFilterName] = useState("");
  const [filterBy, setFilterBy] = useState("clientName");
  const [open, setOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("createdAt", "clientName", "clientMobileNo", "checkin", "destination", "noofnights", "leadType", "leadassignto", "leadscoring");
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [openfollow, setOpenfollow] = useState(false);
  const [selectedscoreId, setSelectedscoreId] = useState("");
  const [agentLeadList, setLeadList] = useState([]);
  const [noOfNotifications, setNoOfNotifications] = useState(0);
  const [openView, setOpenView] = useState(false);
  const [openfilter, setfilter] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [viewselectedId, setViewselectedId] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [dateRange, setDateRange] = useState([null, null]);

  let hasAdmin = localStorage.getItem("role");
  let hasDesignation = localStorage.getItem("designation");
  var username = localStorage.getItem("auth");


  const getStyle = (eachRow) => {

    let isActive = eachRow.notifyemp === 1;
    if (hasAdmin === "Admin" ||
      hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" || hasDesignation === "Lead Manager") {
      isActive = eachRow.notify === 1;
    }
    return isActive ? rowStyle.active_row : rowStyle.default_row
  }

  const scoreFilterFun = (selectedValue) => {
    var isAdminRole = false;
    setFilterValue(selectedValue);
    let url = null;

    if (hasAdmin === "Admin" ||
      hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" || hasDesignation === "Lead Manager") {
      isAdminRole = true;
    }

    if (isAdminRole && selectedValue === "all")
      url = `/boardlead/${uniqueid}`;
    else if (isAdminRole && (selectedValue === "new" || selectedValue === "lost" || selectedValue === "followup" || selectedValue === "closed"))
      url = `boardLeadScoring/${uniqueid}/${selectedValue}`;
    else if (isAdminRole && (selectedValue === "followupwarm" || selectedValue === "followuphot" || selectedValue === "followupcold"))
      url = `boardLeadScoringValue/${uniqueid}/followup/${selectedValue}`
    else if (!isAdminRole && selectedValue === "all")
      url = `boardleadEmployee/${uniqueid}/${username}`;
    else if (!isAdminRole && (selectedValue === "new" || selectedValue === "lost" || selectedValue === "followup" || selectedValue === "closed"))
      url = `boardLeadEmployeeScoring/${uniqueid}/${username}/${selectedValue}`;
    else if (!isAdminRole && (selectedValue === "followupwarm" || selectedValue === "followuphot" || selectedValue === "followupcold"))
      url = `boardLeadEmployeeScoringValue/${uniqueid}/${username}/followup/${selectedValue}`;

    if (url !== null) {
      Api.get(url).then((res) => {
        setLeadList(res.data);
        var temp;
        if (isAdminRole === true)
          temp = res.data.reduce((total, each) => { return total + each.notify }, 0);
        else
          temp = res.data.reduce((total, each) => { return total + each.notifyemp }, 0);
        setNoOfNotifications(temp);
      });
    }
    setfilter(false);
  }

  useEffect(() => {
    Lead();
  }, [uniqueid]);

  const OpenDialog = async (row) => {
    setOpen(true);
    setSelectedId(row.id);
  };

  const Lead = () => {
    console.log("boardlead|role:", hasAdmin)
    let url = `/searchboardlead/${uniqueid}`;
    if (hasAdmin !== "Admin" &&
      hasAdmin !== "Super Admin" && hasAdmin !== "Finance Team" && hasAdmin !== "Agent Admin" && hasDesignation !== "Lead Manager") {
      url = `/searchboardleadEmployee/${uniqueid}/${username}`;
    }

    Api.get(url).then((res) => {
      console.log("boardlead|lead api data: ", res.data);
      setLeadList(res.data);
      var temp;
      if (hasAdmin !== "Admin" &&
        hasAdmin !== "Super Admin" && hasAdmin !== "Finance Team" && hasAdmin !== "Agent Admin" && hasDesignation !== "Lead Manager") {
        temp = res.data.reduce((total, each) => { return total + each.notifyemp }, 0);
      } else {
        temp = res.data.reduce((total, each) => { return total + each.notify }, 0);
      }
      setNoOfNotifications(temp);
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

  const OpenDialogView = async (row) => {
    notifyFun(row.id);
    setOpenView(true);
    setViewselectedId(row.id);
  };

  //function to notify
  const notifyFun = (rowId) => {
    let url = `/boardleadnotifyemp/${rowId}`;
    if (hasAdmin === "Admin" ||
      hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin" || hasDesignation === "Lead Manager") {
      url = `/boardleadnotify/${rowId}`;
    }
    Api.get(url).then((res) => {
      Lead();
    });
  }

  //excel download
  const downloadExcel = () => {
    const apiData = agentLeadList.map((each) => {
      delete each.id;
      delete each.uniqueId;
      delete each.status;
      delete each.notifyemp;
      delete each.notify;
      if (each.checkin !== null && each.checkin.trim() !== "") {
        each.checkin = format(new Date(each.checkin), "d MMM yy");
      }
      if (each.createdAt !== null || "") {
        if (each.createdAt.trim() !== "")
          each.createdAt = format(new Date(each.createdAt), "d MMM yy HH:mm");
      }
      if (each.updatedAt !== null || "") {
        if (each.createdAt.trim() !== "")
          each.updatedAt = format(new Date(each.updatedAt), "d MMM yy HH:mm");
      }
      return each;
    })
    const workSheet = XLSX.utils.json_to_sheet(apiData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Lead");
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "BoardLead.xlsx");
  }

  const filterlead = async (row) => {
    setfilter(true);
  };

  const CloseDialogView = () => {
    setOpenView(false);
    setViewselectedId(0);
  };

  const CloseDialog = () => {
    setOpen(false);
    setSelectedId(0);
    Lead();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpenfollow = (data) => {
    if (data.id !== "" && data.id !== undefined && data.id !== null) {
      setSelectedscoreId(data.id);
    }
    setOpenfollow(true);
  };

  const handlefollow = () => {
    setOpenfollow(false);
    Lead();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - agentLeadList.length) : 0;

  const filteredDestination = applySortFilter(
    agentLeadList,
    getComparator(order, orderBy),
    filterName,
    filterBy,
    dateRange
  );

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const isNotFound = filteredDestination.length === 0;

  return (
    <div style={{ width: '99.6%' }}>
      <div
        style={{
          marginTop: "-60px",
          paddingLeft: "-67px",
          marginLeft: "-25px",
        }}
      >
        <div style={{ marginLeft: "2%" }}>

          <TableLeadToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            searchPlaceholderName={"Search...."}
            open={OpenDialog}
            openf={filterlead}
            noOfNotifications={noOfNotifications}
            downloadExcel={downloadExcel}
            setFilterBy={setFilterBy}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          <Card style={{ marginTop: "5px" }}>
            <TableContainer>
              <Table >
                <TableListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} rowCount={agentLeadList.length} onRequestSort={handleRequestSort} />
                <TableBody >
                  {filteredDestination
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      let {
                        id,
                        clientName,
                        leadassignto,
                        leadscoring,
                        checkin,
                        destination,
                        noofnights,
                        leadscoringvalue,
                        leadType,
                        createdAt,
                        clientMobileNo,
                      } = row;
                      if (checkin !== null && checkin !== "" && checkin.trim() !== "") {
                        checkin = format(new Date(checkin), "d MMM yy");
                      }
                      return (
                        <TableRow hover key={id} tabIndex={-1} style={getStyle(row)}>
                          <TableCell component="th" scope="row" style={{ paddingLeft: '15px' }}>{clientName}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '10px' }}>{clientMobileNo}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '10px' }}>{checkin}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '10px' }}>{destination}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '10px' }}>{noofnights}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '10px' }}>{leadType}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '10px' }}>{leadassignto}</TableCell>
                          <TableCell align="left">
                            <>
                              <Grid container item spacing={1}>
                                <>
                                  {leadscoring !== "new" ? null : (
                                    <Grid continer spacing={2}>
                                      <Grid item lg={12}>
                                        <FiberNewIcon style={{ marginLeft: "10px", color: '#f46d25', fontSize: '30px' }} />
                                      </Grid>
                                    </Grid>
                                  )}
                                  {leadscoring !== "lost" ? null : (
                                    <Grid continer spacing={2}>
                                      <Grid item lg={12}>
                                        <ThumbDownIcon style={{ marginLeft: "10px", color: '#abaaaa', fontSize: '24px' }} />
                                      </Grid>
                                    </Grid>
                                  )}
                                  {leadscoring !== "closed" ? null : (
                                    <Grid continer spacing={2}>
                                      <Grid item lg={12}>
                                        <ThumbUpIcon style={{ marginLeft: "10px", color: '#1eaf1e' }} />
                                      </Grid>
                                    </Grid>
                                  )}
                                  {leadscoring !== "followup" ? null : (
                                    <>
                                      {leadscoringvalue !==
                                        "followuphot" ? null : (
                                        <Grid continer spacing={2}>
                                          <Grid item lg={12}>
                                            <WhatshotTwoToneIcon style={{ marginLeft: "10px", color: '#e71e25' }} />
                                          </Grid>
                                        </Grid>
                                      )}
                                      {leadscoringvalue !==
                                        "followupwarm" ? null : (
                                        <Grid continer spacing={2}>
                                          <Grid item lg={12}>
                                            <BrightnessHighIcon style={{ marginLeft: "10px", color: '#febc12' }} />
                                          </Grid>
                                        </Grid>
                                      )}
                                      {leadscoringvalue !==
                                        "followupcold" ? null : (
                                        <Grid continer spacing={2}>
                                          <Grid item lg={12}>
                                            <AcUnitIcon style={{ marginLeft: "10px", color: '#8aceee' }} />
                                          </Grid>
                                        </Grid>
                                      )}
                                    </>
                                  )}
                                </>
                              </Grid>{" "}
                            </>
                          </TableCell>
                          <TableCell align="left" style={{ paddingLeft: '10px' }}>{format(new Date(createdAt), "d MMM yy HH:mm")}</TableCell>
                          <TableCell align="left">
                            <Tooltip title="lead scoring">
                              <IconButton onClick={() => { handleClickOpenfollow(row) }}
                                style={{ padding: "0px", color: "#F46D25" }}>
                                <CachedIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton
                                aria-label="edit"
                                onClick={() => { OpenDialog(row) }}
                                style={{ padding: "0px", marginLeft: "10px", color: "#F46D25" }}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View">
                              <IconButton
                                style={{ padding: "0px", marginLeft: "10px", color: "#F46D25" }}
                                onClick={() => { OpenDialogView(row) }}>
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
              rowsPerPageOptions={[25, 50, 100]}
              component="div"
              count={filteredDestination.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </div>
        <BoardLeadForm
          open={open}
          onClose={CloseDialog}
          selectedId={selectedId}
        />
        <BoardView
          open={openView}
          onClose={CloseDialogView}
          selectedIdView={viewselectedId}
        />
      </div>

      <LeadModal selectedTable={"boardlead"} open={openfollow} handleClose={handlefollow} selectedscoreId={selectedscoreId} fetchBoard={Lead} />

      <Dialog classes={{ paper: classes.dialogPaper }} open={openfilter} onClose={() => { setfilter(false); }}>
        <Stack spacing={1}>
          {
            filterOptions.map((each, index) => {
              return (
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" onClick={() => scoreFilterFun(each.value)} style={filterGetStyle(each.value === filterValue)}>
                  <span >{each.label}</span>
                  <span>{each.icon}</span>
                </Stack>)
            })
          }
        </Stack>
      </Dialog>
    </div >

  );
}
