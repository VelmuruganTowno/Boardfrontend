import { combineReducers } from "redux";
import { loginReducer } from "./authReducer";
import { BranchDetailReducer, BranchListReducer } from "./branchReducer";
import { ClientDetailReducer, ClientListReducer } from "./clientReducer";
import { AgentDetailReducer, AgentListReducer } from "./agentReducer";
import {
  DesinationListReducer,
  DesinationDetailReducer,
} from "./designationReducer";
import {
  DropDownListReducer,
  DropDownDetailReducer,
} from "./dropDownReducer";
import { RoleDetailReducer, RoleListReducer } from "./roleReducer";
import { StaffListReducer, StaffDetailReducer } from "./staffReducer";
import {
  DesignationOnlyListReducer,
  BranchOnlyListReducer,
  RoleOnlyListReducer,
} from "./dropsReducer";
import {
  propertyListReducer,
  propertyTypeListReducer,
  timeZoneListReducer,
  vccCurrencyListReducer,
  currencyListReducer,
  propertyBasicDataReducer,
  propertyContactDataReducer,
  propertyBankDataReducer,
} from "./propertyReducer";
import {
  parkingReducer,
  laundryReducer,
  swimmingpoolReducer,
  smokeDetectorReducer,
  roomServiceReducer,
  kitchenReducer,
  airConditionReducer,
  interComReducer,
  childCareServiceReducer,
  sightSeeingReducer,
  butlerReducer,
  speciallyAbledReducer,
  firePlaceReducer,
  loungesReducer,
  jacuzziReducer,
  conferenceareaReducer,
  shoppingReducer,
  childrenplayareaReducer,
  templeReducer,
  outdoorFurnitureReducer,
  restaurantReducer,
  steamReducer,
  salonReducer,
  gymReducer,
  spaReducer,
} from "./amenitiesDropDownReducer";
import {BookingDetialListReducer,HistoryListReducer} from "./bookingReducer"
import {hotelDetailsListReducer} from "./hotelViewReducer"
import {roomPaymentListReducer} from "./roomPaymentReducer"

const rootReducer = combineReducers({
  authLogin: loginReducer,
  branchList: BranchListReducer,
  branchDetails: BranchDetailReducer,
  clientList: ClientListReducer,
  clientDetails: ClientDetailReducer,
  agentList: AgentListReducer,
  agentDetails: AgentDetailReducer,
  designationList: DesinationListReducer,
  designationDetails: DesinationDetailReducer,
  dropDownList: DropDownListReducer,
  dropDownDetails: DropDownDetailReducer,
  roleList: RoleListReducer,
  roleDetails: RoleDetailReducer,
  staffList: StaffListReducer,
  staffDetails: StaffDetailReducer,
  branchOnlyList: BranchOnlyListReducer,
  designationOnlyList: DesignationOnlyListReducer,
  roleOnlyList: RoleOnlyListReducer,
  propertyList: propertyListReducer,
  propertyTypeList: propertyTypeListReducer,
  timeZoneList: timeZoneListReducer,
  vccCurrencyList: vccCurrencyListReducer,
  currencyList: currencyListReducer,
  propertyBasicData: propertyBasicDataReducer,
  propertyContactData: propertyContactDataReducer,
  propertyBankData: propertyBankDataReducer,
  parkingList: parkingReducer,
  laundryList: laundryReducer,
  swimmingpoolList: swimmingpoolReducer,
  smokeDetectorList: smokeDetectorReducer,
  roomServiceList: roomServiceReducer,
  airConditionList: airConditionReducer,
  kitchenList: kitchenReducer,
  interComList: interComReducer,
  childCareServiceList: childCareServiceReducer,
  sightSeeingList: sightSeeingReducer,
  butlerList: butlerReducer,
  speciallyAbledList: speciallyAbledReducer,
  firePlaceList: firePlaceReducer,
  loungesList: loungesReducer,
  jacuzziList: jacuzziReducer,
  conferenceareaList: conferenceareaReducer,
  shoppingList: shoppingReducer,
  childrenplayareaList: childrenplayareaReducer,
  templeList: templeReducer,
  outdoorFurnitureList:outdoorFurnitureReducer,
  restaurantList:restaurantReducer,
  steamList:steamReducer,
  salonList:salonReducer,
  spaList:spaReducer,
  gymList:gymReducer,
  bookingDetails:BookingDetialListReducer,
  hotelDetail:hotelDetailsListReducer,
  historyList:HistoryListReducer,
  roomPaymentList:roomPaymentListReducer
});

export default rootReducer;
