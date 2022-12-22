import { filter } from "lodash";
import { useState, useEffect } from "react";
import XLSX from 'xlsx';
// import warm from "../../assets/pictures/Warm.png";
import {
  TableListHead,
  TableLeadagentToolbar,
  SearchNotFound,
} from "../../components/tabel";
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Dialog,
  Container,
  TableContainer,
  TablePagination,
  IconButton,
  Tooltip,
  FormControl,
  Select
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import LeadAgentForm from "./leadAgentForm";
import LeadAgentView from "./leadAgentView";

// components
import { makeStyles } from "@material-ui/core/styles";
import FolderOpenTwoToneIcon from '@material-ui/icons/FolderOpenTwoTone';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import WhatshotTwoToneIcon from '@material-ui/icons/WhatshotTwoTone';
import FiberNewIcon from '@material-ui/icons/FiberNew';

import Api from "../../Service/Api";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import LeadModal from './LeadModal';
const useStyles = makeStyles((theme) => ({
  roots: {
    backgroundColor: theme.palette.background.paper,
    width: 650,
  },
  dialogPaper: {
    minHeight: "5%",
    minWidth: "3%",
    position: "absolute",
    marginRight: "150px",
    marginBottom: "250px",
    right: "0",
    zIndex: "50",
    padding: "20px",
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
  { id: "createdBy", label: "AgentName" },
  { id: "checkin", label: "Check in" },
  { id: "checkout", label: "Check out" },
  { id: "propertyName", label: "Hotel Name" },
  { id: "displayName", label: "Room Type" },
  { id: "noofrooms", label: "No of Rooms " },
  { id: "assignTo", label: "Assigned To" },
  { id: "leadscoring", label: "Lead Scoring " },
  { id: "", label: "Action", align: "left" },
];

const rowStyle = {
  default_row: {},
  active_row: {
    backgroundColor: '#f5f5f5',
    fontWeight:'bold'
  }
};

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Followup', value: 'followup' },
  { label: 'Lost', value: 'lost' },
  { label: 'Closed', value: 'closed' },
  { label: 'Warm', value: 'followupwarm' },
  { label: 'Hot', value: 'followuphot' },
  { label: 'Cold', value: 'followupcold' },

]

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
      (_designation) =>
        _designation.createdBy.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
export default function LeadAgent() {
  const [page, setPage] = useState(0);
  var uniqueid = localStorage.getItem("unique_id");
  const [order, setOrder] = useState("desc");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [filterName, setFilterName] = useState("");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openfollow, setOpenfollow] = useState(false);
  const [selectedscoreId, setSelectedscoreId] = useState("");
  const [agentLeadList, setLeadList] = useState([]);
  const [noOfNotifications, setNoOfNotifications] = useState(0);
  const [openView, setOpenView] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [viewselectedId, setViewselectedId] = useState("");
  const [openfilter, setfilter] = useState(false);
  const [filterValue, setFilterValue] = useState("all");

  const getStyle = (eachRow) => {
  
    let isActive= eachRow.notifyemp===1;
    if (hasAdmin === "Admin" ||
    hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin") {
    isActive=eachRow.notify===1;
  }
    console.log("from getStyle", isActive);
    return isActive ? rowStyle.active_row : rowStyle.default_row
  }
//function for notification
  const notifyFun=(rowId)=>{
    let url=`/agentnotifyemp/${rowId}`;
    if (hasAdmin === "Admin" ||
      hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin") {
      url=`/agentnotify/${rowId}`;
    }
    Api.get(url).then((res) => {      
      console.log("notify api response: ", res.data);
      Lead();
    });
  }

  //excel download
  const downloadExcel = () => {
    const apiData = agentLeadList.map((each) => {
      delete each.id;
      delete each.uniqueId;
      delete each.status;
      delete each.bookingStatus;
      delete each.bookingId;
      delete each.budget;
      delete each.notifyemp;
      delete each.notify;
      delete each.bookingId;
      return each;
    })
    const workSheet = XLSX.utils.json_to_sheet(apiData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Branch List");
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "BranchList.xlsx");
  }


  let hasAdmin = localStorage.getItem("role");
  var username = localStorage.getItem("auth");

  useEffect(() => {
    Lead();
    // eslint-disable-next-line
  }, [uniqueid]);

  const OpenDialog = async (row) => {
    setOpen(true);
    setSelectedId(row.id);
  };

  const scoreFilterFun = (event) => {
    var selectedValue = event.target.value;
    setFilterValue(event.target.value);
    let url = `agentleademployee/${username}`;
    if (hasAdmin === "Admin" ||
      hasAdmin === "Super Admin" || hasAdmin === "Finance Team" || hasAdmin === "Agent Admin") {
      url = `agentlead`;
    }
    console.log("From Filter: Searching For: ", selectedValue);

    if (selectedValue === "new" || selectedValue === "lost" || selectedValue === "followup" || selectedValue === "closed")
      url = url + `/${selectedValue}`;
    if (selectedValue === "followupwarm" || selectedValue === "followuphot" || selectedValue === "followupcold")
      url = url + `/followup/${selectedValue}`;

    Api.get(url).then((res) => {
      setLeadList(res.data);
      console.log("Response Data: ", res.data);
      var temp;
      if (hasAdmin !== "Admin" &&
        hasAdmin !== "Super Admin" && hasAdmin !== "Finance Team" && hasAdmin !== "Agent Admin") {
        temp = res.data.reduce((total, each) => { return total + each.notifyemp }, 0);
      } else {
        temp = res.data.reduce((total, each) => { return total + each.notify }, 0);
      }
      setNoOfNotifications(temp);
    });

    setfilter(false);
  }

  const Lead = () => {
    let url = `/agentlead`;
    if (hasAdmin !== "Admin" &&
      hasAdmin !== "Super Admin" && hasAdmin !== "Finance Team" && hasAdmin !== "Agent Admin") {
      url = `/agentleademployee/${username}`
    }
    Api.get(url).then((res) => {
      setLeadList(res.data);
      console.log("Lead Agent Data: ", res.data);
      var temp;
      if (hasAdmin !== "Admin" &&
        hasAdmin !== "Super Admin" && hasAdmin !== "Finance Team" && hasAdmin !== "Agent Admin") {
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

  const filterlead = async (row) => {
    setfilter(true);
  };

  const handleClickOpenfollow = (data) => {
    if (data.id !== "" && data.id !== undefined && data.id !== null) {
      setSelectedscoreId(data.id);
      console.log(data.id);
    }
    setOpenfollow(true);
  };
  const handlefollow = () => {
    setOpenfollow(false);
    Lead();
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - agentLeadList.length) : 0;
  const filteredDesignation = applySortFilter(
    agentLeadList,
    getComparator(order, orderBy),
    filterName
  );
  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const isNotFound = filteredDesignation.length === 0;

  return (
    <Container>
      <div
        style={{
          paddingTop: "100px",
          marginTop: "-170px",
          paddingLeft: "-67px",
          marginLeft: "-25px",
        }}
      >
        <>
          <TableLeadagentToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
            searchPlaceholderName={"Search Agent Name"}
            openf={filterlead}
            style={{ marginLeft: "400px" }}
            noOfNotifications={noOfNotifications}
            downloadExcel={downloadExcel}
          />
          <Card style={{ marginTop: "10px" }}>
            <TableContainer>
              <Table>
                <TableListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={agentLeadList.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredDesignation
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        leadscoring,
                        leadscoringvalue,
                        createdBy,
                        checkin,
                        checkout,
                        propertyName,
                        displayName,
                        assignTo,
                        noofrooms,
                      } = row;
                      return (
                        <TableRow hover key={id} tabIndex={-1} style={getStyle(row)}>
                          <TableCell component="th" scope="row" style={{ paddingLeft: '15px' }}>{createdBy}</TableCell >
                          <TableCell align="left" style={{ paddingLeft: '15px' }}>{checkin}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '15px' }}>{checkout}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '15px' }}>{propertyName}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '15px' }}>{displayName}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '15px' }}>{noofrooms}</TableCell>
                          <TableCell align="left" style={{ paddingLeft: '15px' }}>{assignTo}</TableCell>
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
                                    <p
                                      style={{
                                        color: "#c1c1c1",
                                        fontWeight: "bold",
                                        marginTop: "9px",
                                        marginBottom: "6px",
                                        fontSize: "16px",
                                        marginLeft:'10px'
                                      }}
                                    >
                                      lost
                                    </p>
                                  )}
                                  {leadscoring !== "closed" ? null : (
                                    <p
                                      style={{
                                        color: "#0ca909",
                                        fontWeight: "bold",
                                        marginTop: "9px",
                                        marginBottom: "6px",
                                        fontSize: "16px",
                                        marginLeft:'10px'
                                      }}
                                    >
                                      Closed
                                    </p>
                                  )}
                                  {leadscoring !== "followup" ? null : (
                                    <>
                                      {leadscoringvalue !==
                                        "followuphot" ? null : (
                                        <Grid continer spacing={2}>
                                          <Grid item lg={12}>
                                            <WhatshotTwoToneIcon style={{ marginLeft: '10px',marginBottom: "6px", color: 'DF2038' }} />
                                          </Grid>
                                        </Grid>
                                      )}
                                      {leadscoringvalue !==
                                        "followupwarm" ? null : (
                                        <Grid continer spacing={2}>
                                          <Grid item lg={12}>
                                            <BrightnessHighIcon style={{ marginLeft: '10px', marginBottom: "6px", color: "EA8A23" }} />
                                          </Grid>
                                        </Grid>
                                      )}
                                      {leadscoringvalue !==
                                        "followupcold" ? null : (
                                        <Grid continer spacing={2}>
                                          <Grid item lg={12}>
                                            <AcUnitIcon style={{ marginLeft: '10px', marginBottom: "6px", color: '2356A5' }} />
                                          </Grid>
                                        </Grid>
                                      )}
                                    </>
                                  )}
                                </>
                              </Grid>{" "}
                            </>
                          </TableCell>
                          <TableCell align="left">
                            <Tooltip title="lead scoring">
                              <IconButton
                                aria-label="lead scoring"
                                onClick={() => {
                                  handleClickOpenfollow(row);
                                }}
                                style={{ padding: "0px", color: "#F46D25" }}
                              >
                                <FolderOpenTwoToneIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton
                                aria-label="edit"
                                onClick={() => {
                                  OpenDialog(row);
                                }}
                                style={{
                                  padding: "0px",
                                  marginLeft: "10px",
                                  color: "#F46D25",
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="View">
                              <IconButton
                                aria-label="view"
                                style={{
                                  padding: "0px",
                                  marginLeft: "10px",
                                  color: "#F46D25",
                                }}
                                onClick={() => {
                                  OpenDialogView(row);
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
              count={agentLeadList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
          <LeadAgentForm
            open={open}
            onClose={CloseDialog}
            selectedId={selectedId}
          />
          <LeadAgentView
            open={openView}
            onClose={CloseDialogView}
            selectedIdView={viewselectedId}
          />
        </>
      </div>
      <LeadModal selectedTable={"agentlead"} open={openfollow} handleClose={handlefollow} selectedscoreId={selectedscoreId} fetchBoard={Lead} />
      <Dialog classes={{ paper: classes.dialogPaper }} open={openfilter} onClose={() => { setfilter(false); }}>
        <FormControl>
          <Select
            multiple
            native
            value={filterValue}
            onChange={scoreFilterFun}
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {filterOptions.map((each, index) => (

              <option key={index} value={each.value} label={each.label} style={{ height: '30px' }} ></option>
            ))}
          </Select>
          {/* <FormControl>
          <RadioGroup name="filter-radio-buttons-group" onChange={scoreFilterFun} value={filterValue}>
            {
              filterOptions.map((each, index) => {
                return <FormControlLabel value={each.value} control={<Radio style={{ color: 'rgb(244, 109, 37)' }} />} label={each.label} />
              })
            }
          </RadioGroup>
        </FormControl> */}
        </FormControl>
      </Dialog>
    </Container>
  );
}
