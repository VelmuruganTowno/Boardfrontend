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
import {
  TableListHead,
  SearchNotFound,
} from "../../components/tabel";
import "jspdf-autotable";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DropForm from "./DropForm";
import { dropDownListInitial } from "../../redux/actions/dropDownAction";
import Select from "react-select";
import SearchIcon from "@material-ui/icons/Search";
import { styled } from "@material-ui/styles";
import {
  Toolbar,
  OutlinedInput,
  InputAdornment,
  Grid,
  Button,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { twnButtonStyles } from "../../utils/townoStyle";
import { Stack } from "@mui/material";

const options = [
  { value: "Property Type", label: "Property Type" },
  { value: "Currency", label: "Currency" },
  { value: "VCC Currency", label: "VCC Currency" },
  { value: "Timezone", label: "Timezone" },
  { value: "Air Conditioning", label: "Air Conditioning" },
  { value: "Bathroom", label: "Bathroom" },
  { value: "Kitchen & Kitchenette", label: "Kitchen & Kitchenette" },
  { value: "Laundry", label: "Laundry" },
  { value: "Newspaper", label: "Newspaper" },
  { value: "Parking", label: "Parking" },
  { value: "Room service", label: "Room service" },
  { value: "Smoke detector", label: "Smoke detector" },
  { value: "Swimming Pool", label: "Swimming Pool" },
  { value: "Telephone", label: "Telephone" },
  { value: "Wifi", label: "Wifi" },
  { value: "Sanitizers", label: "Sanitizers" },
  { value: "Multilingual Staff", label: "Multilingual Staff" },
  {
    value: "Specially Abled Assistance",
    label: "Specially Abled Assistance",
  },
  { value: "Butler Services", label: "Butler Services" },
  { value: "Welcome kit", label: "Welcome kit" },
  { value: "Beach", label: "Beach" },
  { value: "Bonfire", label: "Bonfire" },
  { value: "Outdoor sports", label: "Outdoor sports" },
  { value: "Water sports", label: "Water sports" },
  { value: "Vehicle Rentals", label: "Vehicle Rentals" },
  { value: "Skiing", label: "Skiing" },
  { value: "Fireplace", label: "Fireplace" },
  { value: "Lounge", label: "Lounge" },
  { value: "Jacuzzi", label: "Jacuzzi" },
  { value: "Cafe", label: "Cafe" },
  { value: "Coffee shop", label: "Coffee shop" },
  { value: "Restaurant", label: "Restaurant" },
  { value: "Gym & Fitness centre", label: "Gym & Fitness centre" },
  { value: "Massage", label: "Massage" },
  { value: "Salon", label: "Salon" },
  { value: "SPA", label: "SPA" },
  { value: "Steam and Sauna", label: "Steam and Sauna" },
  { value: "Hammam", label: "Hammam" },
  { value: "Safe", label: "Safe" },
  { value: "Security", label: "Security" },
  { value: "Airport Transfers", label: "Airport Transfers" },
  { value: "Railway Station Transfers", label: "Railway Station Transfers" },
  { value: "Bus Station Transfers", label: "Bus Station Transfers" },
  { value: "Events", label: "Events" },
  { value: "Electrical chargers", label: "Electrical chargers" },
  { value: "TV", label: "TV" },
  { value: "Casino", label: "Casino" },
  { value: "Indoor games", label: "Indoor games" },
  { value: "Childcare service", label: "Childcare service" },
  { value: "Childrens play area", label: "Childrens play area" },
  { value: "Disinfection", label: "Disinfection" },
  { value: "Shoe covers", label: "Shoe covers" },
  { value: "Hair nets", label: "Hair nets" },
  { value: "Face shields", label: "Face shields" },
  {
    value: "Personal Protective Equipment",
    label: "Personal Protective Equipment",
  },
  { value: "Hospital in the vicinity", label: "Hospital in the vicinity" },
  { value: "Room Gloves", label: "Room Gloves" },
  { value: "Disinfectant wipes", label: "Disinfectant wipes" },
  { value: "Gloves", label: "Gloves" },
  { value: "Safety Sanitizers", label: "Safety Sanitizers" },
  { value: "Safety kit", label: "Safety kit" },
  { value: "Room Type", label: "Room Type" },
  { value: "Room View", label: "Room View" },
  { value: "Bed Type", label: "Bed Type" },
  { value: "Extra Bed Type", label: "Extra Bed Type" },
  { value: "Room Air Conditioning", label: "Room Air Conditioning" },
  { value: "Room Bathroom", label: "Room Bathroom" },
  { value: "Room Heater", label: "Room Heater" },
  { value: "Room HouseKeeping", label: "Room HouseKeeping" },
  { value: "Room In Room Dining", label: "Room In Room Dining" },
  { value: "Room Room Service", label: "Room Room Service" },
  { value: "Room Sanitizers", label: "Room Sanitizers" },
  { value: "Room Bathroom Shower", label: "Room Bathroom Shower" },
  { value: "Room Bathroom Toiletries", label: "Room Bathroom Toiletries" },
  { value: "Room Bathroom Towels", label: "Room Bathroom Towels" },
  {
    value: "Room Features Charging Points",
    label: "Room Features Charging Points",
  },
  { value: "Room Features Mini Bar", label: "Room Features Mini Bar" },
  { value: "Room Features Sofa", label: "Room Features Sofa" },
  { value: "Room Features Telephone", label: "Room Features Telephone" },
  { value: "Room Features Intercom", label: "Room Features Intercom" },
  { value: "Room Features Flooring", label: "Room Features Flooring" },
  { value: "Room Media DVD Player", label: "Room Media DVD Player" },
  { value: "Room Media TV", label: "Room Media TV" },
  { value: "Room Media Game Console", label: "Room Media Game Console" },
  { value: "Room Kitchen Kitchenette", label: "Room Kitchen Kitchenette" },
  { value: "Room Kitchen Cook", label: "Room Kitchen Cook" },
  { value: "Room Kitchen Dishwashing", label: "Room Kitchen Dishwashing" },
  {
    value: "Room Kitchen DishwashingType",
    label: "Room Kitchen DishwashingType",
  },
  { value: "Room Kitchen Glasses", label: "Room Kitchen Glasses" },
  {
    value: "Room Kitchen Cooking Basics",
    label: "Room Kitchen Cooking Basics",
  },
  {
    value: "Room Beds and Blanket Blanket",
    label: "Room Beds and Blanket Blanket",
  },
  {
    value: "Room Beds and Blanket Pillows",
    label: "Room Beds and Blanket Pillows",
  },
  {
    value: "Room Safety and Security Safe",
    label: "Room Safety and Security Safe",
  },
  {
    value: "Room Safety and Security Safety",
    label: "Room Safety and Security Safety",
  },
  {
    value: "Room Safety and Security Safety",
    label: "Room Safety and Security Safety",
  },
  {
    value: "Room Safety and Security Security",
    label: "Room Safety and Security Security",
  },
  {
    value: "Room Other Facilities Balcony",
    label: "Room Other Facilities Balcony",
  },
  { value: "Room Other Facilities Fan", label: "Room Other Facilities Fan" },
  { value: "Ironing Services Type", label: "Ironing Services Type" },
  { value: "Laundry Type", label: "Laundry Type" },
  { value: "Parking Type", label: "Parking Type" },
  { value: "Wifi Type", label: "Wifi Type" },
  { value: "Vehicle Rentals Type", label: "Vehicle Rentals Type" },
  { value: "Steam Sauna Type", label: "Steam Sauna Type" },
  { value: "SPA Type", label: "SPA Type" },
  {
    value: "Bus Station Transfers Type",
    label: "Bus Station Transfers Type",
  },
  {
    value: "Railway Station Transfers Type",
    label: "Railway Station Transfers Type",
  },
  { value: "Airport Transfers Type", label: "Airport Transfers Type" },
  { value: "Sanitizers Type", label: "Sanitizers Type" },
  { value: "Gloves Type", label: "Gloves Type" },
  { value: "Disinfectant Wipes Type", label: "Disinfectant Wipes Type" },
  { value: "Mask Type", label: "Mask Type" },
  { value: "Room Heater Type", label: "Room Heater Type" },
  { value: "Room MiniBar Type", label: "Room MiniBar Type" },
  { value: "Room Dish Washing Type", label: "Room Dish Washing Type" },
  { value: "Room CookChef Type", label: "Room CookChef Type" },
  { value: "InterCom Type", label: "InterCom Type" },
  { value: "Sight Seeing", label: "Sight Seeing" },
  { value: "Temple Chapel Prayerroom", label: "Temple Chapel Prayerroom" },
  { value: "OutDoorFurniture", label: "OutDoorFurniture" },
  { value: "Conference Area", label: "Conference Area" },
  { value: "Shopping", label: "Shopping" },
  { value: "Activities", label: "Activities" },
];

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
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
      (_dropDown) =>
        _dropDown.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

// const RootStyle = styled(Toolbar)(({ theme }) => ({
//   height: 96,
//   display: "flex",
//   justifyContent: "space-between",
//   padding: theme.spacing(0, 0, 0, 0),
//   marginBottom: "10px",
// }));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  height: 37,
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

export default function Dropdown() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const dropDownList = useSelector((state) => state.dropDownList);
  const { dropDownLists } = dropDownList;
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    const data = { type: "Property Type" };
    dispatch(dropDownListInitial(data));
  }, [dispatch]);

  const changeSelect = (drop) => {
    setSelectedOption(drop);
    const data = { type: drop.value };
    dispatch(dropDownListInitial(data));
  };

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dropDownLists.length) : 0;

  const filteredDropDown = applySortFilter(
    dropDownLists,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = filteredDropDown.length === 0;

  return (
    <div style={{...twnButtonStyles.allPages,paddingTop:'83px'}}>      
        <Stack direction='row' justifyContent='space-between'>
          <Stack>
            <Select
              name="selectedOption"
              value={selectedOption}
              onChange={(selection, action) => changeSelect(selection, action)}
              defaultValue={{
                label: "Property Type",
                value: "Property Type",
              }}
              options={options}
              styles={{
                menu: (provided) => ({ ...provided, zIndex: 9999, }),
                control: (base, state) => ({
                    ...base,
                    "&:hover": { borderColor: "#f46d25" },
                    borderColor: "#f46d25",
                    boxShadow: "none",
                    width: '275px',
                }),
                placeholder: (provided, state) => ({
                    ...provided,
                    position: "absolute",
                    top:
                        state.hasValue ||
                            state.selectProps.inputValue
                            ? -15
                            : "50%",
                    background: "#fff",
                    padding: "0px 5px",
                    transition: "top 0.1s, font-size 0.1s",
                    fontSize: "17px",
                }),
            }}
            />
          </Stack>
          <Stack direction='row' spacing={2}>
            <SearchStyle
              value={filterName}
              onChange={handleFilterByName}
              placeholder="Search"
              style={{ ...twnButtonStyles.smFonts}}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "text.disabled" }} color="primary" />
                </InputAdornment>
              }
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              color="primary"
              onClick={OpenDialog}
              style={{ ...twnButtonStyles.orangeBtn }}
            >
              Add New
            </Button>
          </Stack>
        </Stack>

        <Card style={{marginTop:'15px',boxShadow:'none',border:'1px solid #F4F4F4'}}>
          <TableContainer sx={{ minWidth: 499 }}>
            <Table size="small">
              <TableListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dropDownLists.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredDropDown
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    const { id, name, description } = row;
                    return (
                      <TableRow hover key={id} tabIndex={-1} style={{...twnButtonStyles.rowStyle,border:'1px solid #F4F4F4'}}>
                        <TableCell component="th" scope="row">
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
                              style={{ padding: "0px", color: "#F46D25" }}
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
            count={dropDownLists.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
     
      <DropForm
        open={open}
        onClose={CloseDialog}
        selectedId={selectedId}
        selectedOption={selectedOption}
      />
    </div>
  );
}
