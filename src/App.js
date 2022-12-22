import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Login from "./Pages/Auth/Login";
import CompanyRegister from "./Pages/Auth/CompanyRegister";
import Designation from "./Pages/Designation/Designation";
import { Homepage } from "./Pages/Homepage";
import Role from "./Pages/Role/Role";
import Staff from "./Pages/Staff/Staff";
import Dropdown from "./Pages/ProductDropdown/Dropdown";
import Branch from "./Pages/Branch/Branch";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile/Profile";
import ChangePassword from "./Pages/Profile/ChangePassword";
import Client from "./Pages/Clients/Client";
import NewBooking from "./Pages/Booking/NewBooking";
import Bulkupdate from "./Pages/RoomList/Bulkupdate";
import BookingList from "./Pages/Booking/BookingList";
import AdminRoute from "./components/AdminRoute";
import HotelView from "./Pages/Property/View/HotelView";
import RoomView from "./Pages/Property/View/RoomView/RoomView";
import BookingEdit from "./Pages/OrderBooking/BookingEdit";
import RoomMain from "./Pages/RoomList/RoomMain";
import ClientVoucher from "./Pages/OrderBooking/ClientVoucher";
import HotelVoucher from "./Pages/OrderBooking/HotelVoucher";
import Report from "./Pages/Report/Report";
import TravelAgent from "./Pages/TravelAgent/TravelAgent";
import AgentHome from "./Pages/AgentProperty/AgentHome";
import MostPopular from "./Pages/ViewPage/MostPopular/MostPopular";
import LastMinuteDeal from "./Pages/ViewPage/LastMinuteDeals/LastMinuteDeal";
import DealoftheWeek from "./Pages/ViewPage/DealoftheWeek/DealoftheWeek";
import BestSelling from "./Pages/ViewPage/BestSelling/BestSelling";
import AgentRoute from "./components/AgentRoute";
import CommonRoute from "./components/CommonRoute";
import LeadMaster from "./Pages/Lead/leadMaster";
import Commonfeature from "./Pages/LeadCommon/Common";
import Package from './Pages/CreatePackage/package';
import CreatePackage from "./Pages/CreatePackage/CreatePackage";
import ViewPackage from "./Pages/CreatePackage/ViewPackage";
import QuotationTable from "./Pages/CreatePackage/QuotationTable";
import TransferForm from './Pages/Transfer/TransferForm';
import PreviewPage from "./Pages/Transfer/PreviewPage";
import TransferList from './Pages/Transfer/TransferList';
import Preview from "./Pages/CreatePackage/Preview";
import ViewTransfer from "./Pages/Transfer/ViewTransfer";
import CopyTransferPage from "./Pages/Transfer/CopyTransferPage";
import CopyPage from "./Pages/CreatePackage/CopyPage";
import PropertyList from "./Pages/Property/PropertyList/PropertyList";
import Properties from "./Pages/Property/PropertyList/properties";
import AddAgentProperty from "./Pages/Property/PropertyList/AddAgentProperty";
import ViewAgentProperty from "./Pages/Property/PropertyList/ViewAgentProperty";
import AgentBookingList from "./Pages/AgentBookings/AgentBookingList"
import AgentSearch from "./Pages/AgentBookings/AgentSearch";
import NewAgentBooking from "./Pages/AgentBookings/NewAgentBooking";
// import AgentHotel from "./Pages/AgentProperty/AgentHotel";
import AgentClientVoucher from "./Pages/OrderBooking/AgentClientVoucher";
import AgentHotelVoucher from "./Pages/OrderBooking/AgentHotelVoucher";
import AgentHotelCopy from "./Pages/AgentProperty/AgentHotelCopy";
import AgentDashboard from "./Pages/TravelAgentDashboard/AgentDashboard";
import AgentRoleForm from "./Pages/AgentRole/AgentRoleForm";
import AgentRoleList from "./Pages/AgentRole/AgentRoleList";

const AddNewProperty = React.lazy(() =>
  import("./Pages/Property/AddNewProperty")
);
const Dashboard = React.lazy(() => import("./Pages/Dashboard/DashboardCopy"));

export default function App() {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Switch>
          <AdminRoute path="/addproperty" component={AddNewProperty} />
          {/* <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
          ></ProtectedRoute> */}
          <CommonRoute path="/dashboard" component={Dashboard}></CommonRoute>
        </Switch>
      </Suspense>
      <Switch>
        <Route path="/" component={Homepage} exact></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/companyregister" component={CompanyRegister}></Route>
        <AdminRoute path="/dropdown" component={Dropdown} />
        <AdminRoute path="/branch" component={Branch} />
        <AdminRoute path="/travelAgent" component={TravelAgent}></AdminRoute>
        {/* <AdminRoute path="/commonfeature" component={Commonfeature}></AdminRoute> */}
        <CommonRoute path="/commonfeature" component={Commonfeature}></CommonRoute>
        <CommonRoute path="/profile" component={Profile}></CommonRoute>
        <CommonRoute path="/properties" component={Properties}></CommonRoute>
        <CommonRoute path="/addAgentProperty/:propertyId?" component={AddAgentProperty}></CommonRoute>
        <CommonRoute path="/propertyList" component={PropertyList} />
        <CommonRoute path="/viewAgent/:propertyId" component={ViewAgentProperty}></CommonRoute>
        <CommonRoute
          path="/changePassword"
          component={ChangePassword}
        ></CommonRoute>
        <CommonRoute path="/client" component={Client}></CommonRoute>
        <CommonRoute path="/roomListView" component={RoomMain}></CommonRoute>
        <CommonRoute path="/newBooking" component={NewBooking}></CommonRoute>
        <CommonRoute path="/lead" component={LeadMaster}></CommonRoute>
        <CommonRoute path="/agentBookings" component={AgentBookingList}></CommonRoute>
        <Route path="/agentSearch" component={AgentSearch} />
        <CommonRoute path="/newAgentBooking/:bookingId?" component={NewAgentBooking}/>
        {/* <CommonRoute path="/agentRoleForm" component={AgentRoleForm}/> */}
        <CommonRoute path="/roleList" component={AgentRoleList}/>
        

        {/* admin  */}
        <CommonRoute path="/designation" component={Designation}></CommonRoute>
        <CommonRoute path="/role" component={Role}></CommonRoute>
        <CommonRoute path="/staff" component={Staff}></CommonRoute>
        
        <CommonRoute path="/packageOrQuotation/:pkgOrQtn" component={Package}></CommonRoute>
        <CommonRoute path="/createPackageOrQuotation/:pkgOrQtn?/:displayLeads?/:id?" component={CreatePackage}></CommonRoute> 
        <CommonRoute path="/viewPackageOrQuotation/:pkgOrQtn/:id" component={ViewPackage}></CommonRoute>
        <CommonRoute path="/preview" component={Preview}></CommonRoute> 
        <Route path="/copyPage/:pkgOrQtn/:id" component={CopyPage}></Route>
        
        <CommonRoute path="/transferForm/:transferId?" component={TransferForm}></CommonRoute>
        <CommonRoute path="/previewPage" component={PreviewPage}></CommonRoute>
        {/* <ProtectedRoute path="/transferList" component={TransferList}></ProtectedRoute> */}
        <CommonRoute path="/transferList" component={TransferList}></CommonRoute>
        <CommonRoute path="/viewTransfer/:transferId" component={ViewTransfer}></CommonRoute>
        <Route path="/copyTransferPage/:transferId" component={CopyTransferPage}></Route>
        
        <AdminRoute path="/bulkupdate/:propertyId" component={Bulkupdate}></AdminRoute>
        <AdminRoute path="/bestSelling" component={BestSelling}></AdminRoute>
        <AdminRoute
          path="/lastMinuteDeals"
          component={LastMinuteDeal}
        ></AdminRoute>
        <AdminRoute
          path="/DealoftheWeek"
          component={DealoftheWeek}
        ></AdminRoute>
        <AdminRoute path="/mostPopular" component={MostPopular}></AdminRoute>
        <ProtectedRoute
          path="/bookinglist"
          forceRefresh={true}
          component={BookingList}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/bookingvoucher/:id"
          component={BookingEdit}
        ></ProtectedRoute>
        <CommonRoute
          path="/roomdetails/:id/:roomid"
          component={RoomView}
        ></CommonRoute>
        <CommonRoute path="/report" component={Report}></CommonRoute>
        <CommonRoute path="/hotelView/:id" component={HotelView}></CommonRoute>
        <AgentRoute path="/agent" component={AgentHome}></AgentRoute>
        <CommonRoute path="/agentDashboard" component={AgentDashboard}></CommonRoute>
        <Route path="/clientVoucher/:bookingid" component={ClientVoucher} />
        <Route path="/agentClientVoucher/:bookingId" component={AgentClientVoucher} />
        <Route path="/hotelVoucher/:bookingid" component={HotelVoucher} />
        <Route path="/agentHotelVoucher/:bookingId" component={AgentHotelVoucher} />
        <CommonRoute path="/agentHotelCopy" component={AgentHotelCopy}/>
      </Switch>
    </>
  );
}
