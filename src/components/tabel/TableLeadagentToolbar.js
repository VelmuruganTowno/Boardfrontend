/* eslint-disable eqeqeq */
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/styles";
import {
  Toolbar,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import Badge from '@material-ui/core/Badge';
import Stack from '@mui/material/Stack';

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  marginLeft: "400px",
  justifyContent: "space-between",
  padding: theme.spacing(0, 0, 0, 0),
  marginBottom: "10px",
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 230,
  height: 40,
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


TableListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  pdfDownload: PropTypes.func,
  downloadExcel: PropTypes.func,
  searchPlaceholderName: PropTypes.string,
  tableName: PropTypes.string,
  noOfNotifications: PropTypes.number,
};

export default function TableListToolbar(
  { numSelected, filterName, onFilterName, pdfDownload, downloadExcel,
    searchPlaceholderName, tableName, open, openf, noOfNotifications }) {
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
          textAlign: "right",
        }),
      }}
    >
      <Stack direction='row' spacing={2} style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Stack>
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
        </Stack>

        <Stack>
          <Tooltip title="Lead scoring Filter">
            <IconButton onClick={openf}>
              <i class="fa fa-filter" aria-hidden="true" style={{ color: "#f46d25", cursor: "pointer", fontSize: '30px' }} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack>
          <Tooltip title="Excel">
            <IconButton
              onClick={() => {
                downloadExcel();
              }}
            >
              <i className="fas fa-file-csv" style={{ color: "#F46D25" }}></i>
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack>
          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={noOfNotifications} color="error">
                <NotificationsNoneTwoToneIcon style={{ color: "#f46d25", cursor: "pointer", fontSize: '30px' }} />
              </Badge>
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </RootStyle>
  );
}
