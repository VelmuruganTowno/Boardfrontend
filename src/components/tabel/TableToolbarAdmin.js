/* eslint-disable eqeqeq */
import PropTypes from "prop-types";
// material
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Grid,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { twnButtonStyles } from "../../utils/townoStyle";
import { Stack, Typography } from "@mui/material";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 0, 0, 0),
  marginBottom: "10px",
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 32,
  fontSize: '14px',
  color: '#1F2937',
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  // '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

TableToolbarAdmin.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  pdfDownload: PropTypes.func,
  downloadExcel: PropTypes.func,
  searchPlaceholderName: PropTypes.string,
  tableName: PropTypes.string,
};

export default function TableToolbarAdmin({
  numSelected,
  filterName,
  onFilterName,
  pdfDownload,
  downloadExcel,
  searchPlaceholderName,
  tableName,
  open,
}) {
  const role = localStorage.getItem("role");
  let hasAdmin = localStorage.getItem("role");
  let checkAgent = localStorage.getItem("agent");
  return (
    <>
      {hasAdmin === "Agent Admin" || checkAgent === "Agent" ?
        <Stack direction="row" justifyContent="flex-end" style={{padding:'0% 1%'}}>
          <SearchStyle
            value={filterName}
            onChange={onFilterName}
            placeholder={searchPlaceholderName}
            size="small"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
              </InputAdornment>
            }
          />
          <Tooltip title="Pdf">
            <IconButton
              onClick={() => {
                pdfDownload();
              }}
            >
              <i className="fas fa-file-pdf" style={{ color: "#F46D25", marginTop: "-12px", fontSize: '30px' }}></i>
            </IconButton>
          </Tooltip>
          <Tooltip title="Excel">
            <IconButton
              onClick={() => {
                downloadExcel();
              }}
            >
              <i className="fas fa-file-csv" style={{ color: "#F46D25", marginTop: "-12px", fontSize: '30px' }}></i>
            </IconButton>
          </Tooltip>
        </Stack>
        :
        <Stack direction="row" justifyContent="space-between" style={{padding:'6% 1% 0 1%'}}>
          <Stack>
            <Typography variant="h5" component="h5" style={twnButtonStyles.xlFonts}>{tableName}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignContent="flex-end">
            <SearchStyle
              value={filterName}
              onChange={onFilterName}
              placeholder={searchPlaceholderName}
              size="small"
              style={{ marginTop: '8px' }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
                </InputAdornment>
              }
            />
            <Tooltip title="Pdf">
              <IconButton
                onClick={() => {
                  pdfDownload();
                }}
              >
                <i className="fas fa-file-pdf" style={{ color: "#F46D25" }}></i>
              </IconButton>
            </Tooltip>
            <Tooltip title="Excel">
              <IconButton
                onClick={() => {
                  downloadExcel();
                }}
              >
                <i className="fas fa-file-csv" style={{ color: "#F46D25" }}></i>
              </IconButton>
            </Tooltip>
            <Button
              variant="contained"
              // startIcon={<AddIcon />}
              color="primary"
              onClick={open}
              style={{ ...twnButtonStyles.orangeBtn, marginTop: "8px" }}
            >
              Add New
            </Button>
          </Stack>
        </Stack>
      }</>
  );
}
