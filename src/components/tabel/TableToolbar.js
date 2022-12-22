/* eslint-disable eqeqeq */
import PropTypes from "prop-types";
// material
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/styles";
import {
  Toolbar,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { twnButtonStyles } from "../../utils/townoStyle";
import { Stack, Typography } from "@mui/material";

// ----------------------------------------------------------------------
const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 32,
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

TableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  searchPlaceholderName: PropTypes.string,
  tableName: PropTypes.string,
};

export default function TableToolbar({
  numSelected,
  filterName,
  onFilterName,
  searchPlaceholderName,
  tableName,
  open,
}) {
  return (
    <Stack direction='row' justifyContent='space-between' style={{paddingTop:'1.95%'}}>
      <Stack>
        <Typography style={{...twnButtonStyles.xlFonts,marginTop:'-9px'}}>{tableName}</Typography>
      </Stack>
      <Stack direction='row' spacing={2}> 
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder={searchPlaceholderName}
          style={twnButtonStyles.smFonts}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
            </InputAdornment>
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={open}
          style={twnButtonStyles.orangeBtn}
        >
          Add New
        </Button>
      </Stack>
    </Stack>
  );
}
