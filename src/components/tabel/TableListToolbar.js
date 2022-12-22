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
import { Stack } from "@mui/material";

// ----------------------------------------------------------------------
const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 220,
  height: 32,
  fontSize:'14px',
  color:'#1F2937',
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

TableListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  pdfDownload: PropTypes.func,
  downloadExcel: PropTypes.func,
  searchPlaceholderName: PropTypes.string,
  tableName: PropTypes.string,
};

export default function TableListToolbar({
  numSelected,
  filterName,
  onFilterName,
  pdfDownload,
  downloadExcel,
  searchPlaceholderName,
  tableName,
  open,
}) {
  return (
    <Stack direction='row' justifyContent='space-between'>
      <Stack>
        <h1 style={twnButtonStyles.xlFonts}>{tableName}</h1>
      </Stack>
      <Stack direction='row'>
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={searchPlaceholderName}
          style={{ ...twnButtonStyles.smFonts, "marginTop":'1em'}}
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
            <i className="fas fa-file-pdf" style={{ color: "#F46D25", textAlign: 'center',fontSize:'30px' }}></i>
          </IconButton>
        </Tooltip>
        <Tooltip title="Excel">
          <IconButton
            onClick={() => {
              downloadExcel();
            }}
          >
            <i className="fas fa-file-csv" style={{ color: "#F46D25", textAlign: 'center',fontSize:'30px' }}></i>
          </IconButton>
        </Tooltip>
        <Button
          variant="contained"
          // startIcon={<AddIcon />}
          color="primary"
          onClick={open}
          style={{ ...twnButtonStyles.orangeBtn, "marginTop":'1.1em'}}
        >
          Add New
        </Button>
      </Stack>
    </Stack>
  );
}
