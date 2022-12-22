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
import PropertyList from "./Pages/Property/PropertyList/PropertyList";
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
import Lead from "./Pages/Lead/lead";
import Commonfeature from "./Pages/LeadCommon/Common";

const AddNewProperty = React.lazy(() =>
  import("./Pages/Property/AddNewProperty")
);
const Dashboard = React.lazy(() => import("./Pages/Dashboard/Dashboard"));

export default function App() {
  return (
    <>
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Switch>
          <AdminRoute path="/addproperty" component={AddNewProperty} />
          <ProtectedRoute
            path="/dashboard"
            component={Dashboard}
          ></ProtectedRoute>
        </Switch>
      </Suspense>
      <Switch>
        <Route path="/" component={Homepage} exact></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/companyregister" component={CompanyRegister}></Route>
        <AdminRoute path="/designation" component={Designation}></AdminRoute>
        <AdminRoute path="/role" component={Role}></AdminRoute>
        <AdminRoute path="/staff" component={Staff}></AdminRoute>
        <AdminRoute path="/dropdown" component={Dropdown} />
        <AdminRoute path="/branch" component={Branch} />
        <AdminRoute path="/travelAgent" component={TravelAgent}></AdminRoute>
        <AdminRoute path="/commonfeature" component={Commonfeature}></AdminRoute>
        <CommonRoute path="/profile" component={Profile}></CommonRoute>
        <CommonRoute
          path="/changePassword"
          component={ChangePassword}
        ></CommonRoute>
        <ProtectedRoute path="/client" component={Client}></ProtectedRoute>
        <CommonRoute path="/roomListView" component={RoomMain}></CommonRoute>
        <ProtectedRoute
          path="/newBooking"
          component={NewBooking}
        ></ProtectedRoute>
        <ProtectedRoute
          path="/lead"
          component={Lead}
        ></ProtectedRoute>
        <AdminRoute
          path="/bulkupdate/:propertyId"
          component={Bulkupdate}
        ></AdminRoute>
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
        <ProtectedRoute path="/report" component={Report}></ProtectedRoute>
        <ProtectedRoute path="/propertyList" component={PropertyList} />
        <CommonRoute path="/hotelView/:id" component={HotelView}></CommonRoute>
        <AgentRoute path="/agent" component={AgentHome}></AgentRoute>
        <Route path="/clientVoucher/:bookingid" component={ClientVoucher} />
        <Route path="/hotelVoucher/:bookingid" component={HotelVoucher} />
      </Switch>
    </>
  );
}
