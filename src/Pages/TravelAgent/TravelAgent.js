import { filter } from "lodash";
import { useState, useEffect } from "react";
// material
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Avatar,
  TableContainer,
  TablePagination,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import XLSX from "xlsx";
import VisibilityIcon from "@material-ui/icons/Visibility";
import TravelAgentView from "./TravelAgentView";
// components
import jsPDF from "jspdf";
import {
  TableListHead,
  TableListToolbar,
  SearchNotFound,
} from "../../components/tabel";
import "jspdf-autotable";
import EditIcon from "@material-ui/icons/Edit";
import TravelAgentForm from "./TravelAgentForm";
import Api from "../../Service/Api";
import { baseurl } from "../../Service/httpCommon";

const TABLE_HEAD = [
  { id: "profile", label: "Avatar" },
  { id: "name", label: "Agent Name" },
  { id: "Email", label: "Email" },
  { id: "mobile", label: "Mobile" },
  { id: "altmobile", label: "Alt Mobile" },
  { id: "city", label: "City" },
  { id: "Agent Category", label: "Agent Category" },
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
      (_designation) =>
        _designation.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function TravelAgent() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [viewselectedId, setViewselectedId] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [travelAgentList, setTravelAgentList] = useState([]);

  const OpenDialog = async (row) => {
    setOpen(true);
    setSelectedId(row.id);
  };
  useEffect(() => {
    TravelAgent();
  }, []);

  const TravelAgent = () => {
    Api.get("agentlist").then((res) => {
      setTravelAgentList(res.data);
    });
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
  const CloseDialog = () => {
    setOpen(false);
    setSelectedId(0);
    TravelAgent();
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const downloadExcel = () => {
    const newData = travelAgentList.map((row) => {
      delete row.id;
      delete row.uniqueId;
      delete row.createdBy;
      delete row.createdAt;
      delete row.updateBy;
      delete row.updateAt;
      delete row.status;
      delete row.profile;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Designation List");
    // const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "DesignationList.xlsx");
  };

  const DownloadPdf = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.text("Designation Details", 20, 10);
    doc.autoTable({
      body: travelAgentList,
      columns: [
        { header: "Designation", dataKey: "name" },
        { header: "Description", dataKey: "description" },
      ],
    });
    doc.save("Designation List.pdf");
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
      ? Math.max(0, (1 + page) * rowsPerPage - travelAgentList.length)
      : 0;
  const filteredDesignation = applySortFilter(
    travelAgentList,
    getComparator(order, orderBy),
    filterName
  );
  const isNotFound = filteredDesignation.length === 0;
  return (
    <div style={{padding: '4% 1% 1% 1%' }}>
      <div>
        <TableListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          pdfDownload={DownloadPdf}
          downloadExcel={downloadExcel}
          searchPlaceholderName={"Search Your TravelAgent"}
          tableName={"Travel Agent List"}
          open={OpenDialog}
        />
        <Card>
          <TableContainer>
            <Table>
              <TableListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={travelAgentList.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredDesignation
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const {
                      id,
                      logoPath,
                      name,
                      mail,
                      mobile,
                      altmobile,
                      city,
                      travelAgentCategory,
                    } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1}>
                        <TableCell align="left">
                          {logoPath ? (
                            <img
                              src={`${baseurl}getimage/${logoPath}`}
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
                        <TableCell component="th" scope="row">
                          {name}
                        </TableCell>
                        <TableCell align="left">{mail}</TableCell>
                        <TableCell align="left">{mobile}</TableCell>
                        <TableCell align="left">{altmobile}</TableCell>
                        <TableCell align="left">{city}</TableCell>
                        <TableCell align="left">
                          {travelAgentCategory}
                        </TableCell>

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
                              style={{ padding: "0px", marginLeft: "10px",color:"#F46D25" }}
                              onClick={() => {
                                OpenDialogView(row);
                              }}
                            >
                              <VisibilityIcon />
                            </IconButton></Tooltip>
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
            count={travelAgentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
      <TravelAgentForm
        open={open}
        onClose={CloseDialog}
        selectedId={selectedId}
      />
      <TravelAgentView
        open={openView}
        onClose={CloseDialogView}
        selectedIdView={viewselectedId}
      />
    </div>
  );
}
