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
import XLSX from "xlsx";

// components
import jsPDF from "jspdf";
import { TableListHead, TableListToolbar, SearchNotFound } from "../../components/tabel";
import "jspdf-autotable";
import BranchForm from "./BranchForm";
import { useDispatch, useSelector } from "react-redux";
import { branchListInitial } from "../../redux/actions/branchAction";
import BranchView from "./BranchView";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { twnButtonStyles } from "../../utils/townoStyle";

const TABLE_HEAD = [
  { id: "name", label: "Branch Name" },
  { id: "code", label: "Branch Code" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
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
      (_branch) =>
        _branch.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Branch() {
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
  const branchList = useSelector((state) => state.branchList);
  const { branchLists } = branchList;
  var uniqueid = localStorage.getItem("unique_id");

  useEffect(() => {
    dispatch(branchListInitial(uniqueid));
  }, [dispatch, uniqueid]);

  const OpenDialog = async (row) => {
    setOpen(true);
    setSelectedId(row.id);
  };

  const CloseDialog = () => {
    setOpen(false);
    setSelectedId(0);
  };
  const OpenDialogView = async (branch) => {
    setOpenView(true);
    setViewselectedId(branch.id);
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
    const newData = branchLists.map((row) => {
      delete row.id;
      delete row.uniqueId;
      delete row.createdBy;
      delete row.createdAt;
      delete row.updateBy;
      delete row.updateAt;
      delete row.status;
      return row;
    });
    const workSheet = XLSX.utils.json_to_sheet(newData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Branch List");
    // const buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workBook, "BranchList.xlsx");
  };

  const DownloadPdf = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.text("Branch Details", 20, 10);
    doc.autoTable({
      body: branchLists,
      columns: [
        { header: "Branch Name", dataKey: "name" },
        { header: "Branch Code", dataKey: "code" },
        { header: "Email", dataKey: "email" },
        { header: "Mobile", dataKey: "mobile" },
        { header: "Phone", dataKey: "phone" },
        { header: "Address", dataKey: "address" },
      ],
    });
    doc.save("Branch List.pdf");
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - branchLists.length) : 0;

  const filteredBranch = applySortFilter(
    branchLists,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = filteredBranch.length === 0;

  return (
    // <Container>
    <div style={twnButtonStyles.allPages}>
      <div>
        <TableListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          pdfDownload={DownloadPdf}
          downloadExcel={downloadExcel}
          searchPlaceholderName={"Search Your Branch"}
          tableName={"Branch List"}
          open={OpenDialog}
        />

        <Card style={{marginTop:'0.45%',boxShadow:'none',border:'1px solid #F4F4F4'}}>
          <TableContainer sx={{ minWidth: 499 }}>
            <Table size="small">
              <TableListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={branchLists.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredBranch
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, name, email, code, phone, mobile } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} style={twnButtonStyles.rowStyle}>
                        <TableCell component="th" scope="row">
                          {name}
                        </TableCell>
                        <TableCell align="left">{code}</TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{phone}</TableCell>
                        <TableCell align="left">{mobile}</TableCell>
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
                          <Tooltip title="View">
                            <IconButton
                              aria-label="view"
                              style={{ padding: "0px", marginLeft: "10px", color: "#F46D25" }}
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
            style={{padding:'-1.5em'}}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={branchLists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
      <BranchForm open={open} onClose={CloseDialog} selectedId={selectedId} />
      <BranchView
        open={openView}
        onClose={CloseDialogView}
        selectedIdView={viewselectedId}
      />
    </div>
    // </Container>
  );
}
