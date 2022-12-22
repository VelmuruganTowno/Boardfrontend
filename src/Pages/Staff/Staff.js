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
  Avatar,
} from "@material-ui/core";
import XLSX from "xlsx";
// components
import jsPDF from "jspdf";
import {
  TableListHead,
  TableListToolbar,
  SearchNotFound,
} from "../../components/tabel";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import { baseurl } from "../../Service/httpCommon";
import StaffForm from "./StaffForm";
import StaffView from "./StaffView";
import { staffListInitial } from "../../redux/actions/staffAction";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { twnButtonStyles } from "../../utils/townoStyle";

const TABLE_HEAD = [
  { id: "profile", label: "Avatar" },
  { id: "username", label: "User Name" },
  { id: "designation", label: "Designation" },
  { id: "role", label: "Role" },
  { id: "mail", label: "Email" },
  { id: "mobile", label: "Mobile" },
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
      (_staff) =>
        _staff.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Staff() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [openView, setOpenView] = useState(false);
  const [viewselectedId, setViewselectedId] = useState("");
  const staffLists = useSelector((state) => state.staffList.staffLists);
  var uniqueid = localStorage.getItem("unique_id");

  useEffect(() => {
    dispatch(staffListInitial(uniqueid));
  }, [dispatch, uniqueid]);

  const OpenDialog = async (row) => {
    setOpen(true);
    setSelectedId(row.id);
  };

  const CloseDialog = () => {
    setOpen(false);
    setSelectedId(0);
  };
  const OpenDialogView = async (row) => {
    setOpenView(true);
    setViewselectedId(row.id);
  };
  const CloseDialogView = () => {
    setOpenView(false);
    setViewselectedId(0);
    setSelectedId(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const downloadExcel = () => {
    const newData = staffLists.map((row) => {
      delete row.id;
      delete row.uniqueId;
      delete row.createdBy;
      delete row.createdAt;
      delete row.updatedBy;
      delete row.updatedAt;
      delete row.status;
      delete row.profile;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Staff List");
    // const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "StaffList.xlsx");
  };

  const DownloadPdf = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.text("Staff Details", 20, 10);
    doc.autoTable({
      body: staffLists,
      columns: [
        { header: "User Name", dataKey: "username" },
        { header: "Designation", dataKey: "designation" },
        { header: "Role", dataKey: "role" },
        { header: "Email", dataKey: "mail" },
        { header: "Mobile", dataKey: "mobile" },
      ],
    });
    doc.save("Staff List.pdf");
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - staffLists.length) : 0;

  const filteredStaff = applySortFilter(
    staffLists,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = filteredStaff.length === 0;

  return (
    <div style={twnButtonStyles.allPages}>
      <div>
        <TableListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          pdfDownload={DownloadPdf}
          downloadExcel={downloadExcel}
          searchPlaceholderName={"Search Your Staff Name"}
          tableName={"Staff List"}
          open={OpenDialog}
        />

        <Card style={{ marginTop: '3px', boxShadow: 'none', border: '1px solid #F4F4F4',fontSize:'14px' }}>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table size="small">
              <TableListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={staffLists.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredStaff
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const {
                      id,
                      username,
                      mail,
                      mobile,
                      role,
                      profile,
                      designation,
                    } = row;
                    return (
                      <TableRow hover key={index} tabIndex={-1}>
                        <TableCell align="left">
                          {profile ? (
                            <img
                              src={`${baseurl}getimage/${profile}`}
                              alt="profile"
                              style={{
                                width: "40px",
                                borderRadius: "50%",
                                height: "40px",
                              }}
                            />
                          ) : (
                            <Avatar></Avatar>
                          )}
                        </TableCell>
                        <TableCell align="left">{username}</TableCell>
                        <TableCell align="left">{designation}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">{mail}</TableCell>
                        <TableCell align="left">{mobile}</TableCell>
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
            count={staffLists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
      <StaffForm open={open} onClose={CloseDialog} selectedId={selectedId} />
      <StaffView
        open={openView}
        onClose={CloseDialogView}
        selectedIdView={viewselectedId}
      />
    </div>
  );
}
