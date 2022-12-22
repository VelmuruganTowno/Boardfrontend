/* eslint-disable eqeqeq */
import { React, Fragment, useState } from 'react';
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/styles";
import {
  Toolbar,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Tooltip,
  Button,
} from "@material-ui/core";
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import AddIcon from "@material-ui/icons/Add";
import Badge from '@material-ui/core/Badge';
import { Stack } from '@mui/material';
import Select from "react-select";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 230,
  height: 41,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
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

const parameters = [
  { label: 'Client Name', value: 'clientName' },
  { label: 'Client Number', value: 'clientMobileNo' },
  { label: 'Destination', value: 'destination' },
  { label: 'Lead Type', value: 'leadType' },
  { label: 'Assigned To', value: 'leadassignto' },
]

export default function TableListToolbar(
  { numSelected, filterName, onFilterName, pdfDownload, downloadExcel,
    searchPlaceholderName, tableName, open, openf, noOfNotifications, setFilterBy, dateRange, setDateRange }) {
  
  return (
    <Stack direction='row' spacing={1} style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1em' }}>

      <Select
        name="selectedOption"
        placeholder='Select Parameter'
        onChange={(selection, action) => setFilterBy(selection.value)}
        options={parameters}
        styles={{
          container: (provided) => ({
            ...provided,
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 9999,
          }),
          valueContainer: (provided) => ({
            ...provided,
            overflow: "visible",
          }),
          placeholder: (provided, state) => ({
            ...provided,
            position: "absolute",
            top:
              state.hasValue ||
                state.selectProps.inputValue
                ? -4
                : "50%",
            padding: "0px 5px",
            transition: "top 0.1s, font-size 0.1s",
            fontSize: "15px",

          }),
          control: (base, state) => ({
            ...base,
            "&:hover": { borderColor: "#f46d25" },
            borderColor: "#f46d25",
            boxShadow: "none",
            width: '10em',
            backgroundColor: '#fff',
            color: '#fff',
            fontSize: "18px",
          }),
          dropdownIndicator: base => ({
            ...base,
            color: "#f46d25"
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#111',
            fontSize: "15px",
          }),
        }}
      />

      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder={searchPlaceholderName}
        size="small"
        style={{ height: "34px" }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
          </InputAdornment>
        }
      />
      
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selectsRange={true}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        placeholderText="Select Date Range"
        monthsShown={2}
        openToDate={dateRange[0]?dateRange[0]:subDays(new Date(),60)}
        minDate={subDays(new Date(),60)}
        maxDate={new Date()}
        onChange={(update) => {
          setDateRange(update);
        }}
        withPortal
        size='small'
        style={{backgroundColor:'#f46d25',color:'#fff',height:'34px'}}
      />

      <Tooltip title="Lead scoring Filter">
        <IconButton onClick={openf}>
          <i class="fa fa-filter" aria-hidden="true" style={{ color: "#f46d25", cursor: "pointer", fontSize: '35px' }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Excel">
        <IconButton onClick={() => { downloadExcel(); }}>
          <i className="fas fa-file-csv" style={{ color: "#F46D25" }}></i>
        </IconButton>
      </Tooltip>

      <Tooltip title="Notifications">
        <IconButton>
          <Badge badgeContent={noOfNotifications} color="error">
            <NotificationsNoneTwoToneIcon style={{ color: "#f46d25", cursor: "pointer", fontSize: '30px' }} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={open} style={{ color: "#f46d25", cursor: "pointer" }}>
        Add New
      </Button>
    </Stack>
  );
}
