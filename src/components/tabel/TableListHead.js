import PropTypes from "prop-types";
// material
import {
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/styles";
import { twnButtonStyles } from "../../utils/townoStyle";

// ----------------------------------------------------------------------

TableListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]),
  orderBy: PropTypes.string,
  headLabel: PropTypes.array,
  onRequestSort: PropTypes.func,
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#F46D25",
    color: theme.palette.common.white,
    fontSize: "15px",
    // padding:"10px 15px",
    textAlign:'left',
  },
  body: {
    fontSize: "13px",
    // padding:"10px",
    
  },
}))(TableCell);

const StyledTableSortLabel = withStyles((theme) => ({
  root: {
    color: "white",
    "&:hover": {
      color: "white",
    },
    "&$active": {
      color: "white",
    },
  },
  active: {},
  icon: {
    color: "inherit !important",
  },
}))(TableSortLabel);

const useStyles = makeStyles((theme) => ({
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function TableListHead(props) {
  const { order, orderBy, headLabel, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const classes = useStyles();

  return (
    <TableHead style={twnButtonStyles.headerStyle}>
      <TableRow>
        {headLabel.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <StyledTableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                color: "#fff",
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
