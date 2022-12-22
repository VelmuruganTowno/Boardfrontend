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
import {
  TableListHead,
  TableListToolbar,
  SearchNotFound,
} from "../../components/tabel";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DesignationForm from "./DesignationForm";
import { designationListInitial } from "../../redux/actions/designationAction";
import { twnButtonStyles } from "../../utils/townoStyle";

const TABLE_HEAD = [
  { id: "name", label: "Designation" },
  { id: "description", label: "Description"},
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

export default function Designation() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const designationList = useSelector((state) => state.designationList);
  const { designationLists } = designationList;
  var uniqueid = localStorage.getItem("unique_id");

  useEffect(() => {
    dispatch(designationListInitial(uniqueid));
  }, [dispatch, uniqueid]);

  const OpenDialog = async (row) => {
    setOpen(true);
    setSelectedId(row.id);
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

  const downloadExcel = () => {
    const newData = designationLists.map((row) => {
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
      body: designationLists,
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
      ? Math.max(0, (1 + page) * rowsPerPage - designationLists.length)
      : 0;

  const filteredDesignation = applySortFilter(
    designationLists,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = filteredDesignation.length === 0;

  return (
    <div style={twnButtonStyles.allPages}>
      <div>
        <TableListToolbar
          filterName={filterName}
          onFilterName={handleFilterByName}
          pdfDownload={DownloadPdf}
          downloadExcel={downloadExcel}
          searchPlaceholderName={"Search Your Designation"}
          tableName={"Designation"}
          open={OpenDialog}
        />

        <Card style={{marginTop:'3px',boxShadow:'none',border:'1px solid #F4F4F4'}}>
          <TableContainer sx={{ minWidth: 499 }}>
            <Table size="small">
              <TableListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={designationLists.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredDesignation
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, name, description } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} style={{...twnButtonStyles.rowStyle,border:'1px solid #F4F4F4'}}>
                        <TableCell component="th" scope="row" style={{fontSize:'12px'}}>
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
                              style={{ padding: "0px",color:"#F46D25" }}
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
            count={designationLists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
      <DesignationForm
        open={open}
        onClose={CloseDialog}
        selectedId={selectedId}
      />
    </div>
  );
}
