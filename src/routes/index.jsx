 
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import Navbar from "../components/common/navbar/navbar";
import { Suspense } from "react";

// import { LazyBoard } from "./lazyRoutes";
// import MainBoard from "../components/common/MainBoard/MainBoard";
// import ManagerDashboard from "../components/pages/Manager/ManagerDashBoard";
import { LazyCreateStaff, LazyDeleteStaff, LazyMainBoard, LazyRaiseTicket, LazyReportDisplayed, LazyReports, LazyStaffTickets, LazyTicketHistory, LazyTickets, LazyUpdateStaff } from "./lazyRoutes";
import { LazySignInPage } from "./lazyRoutes";
import EscalateTicket from "../components/common/EscalateTicket/EscalateTicket";
import StaffDashboard from "../components/pages/Staff/Dashboard/StaffDashboard";
// import ProtectedRoutes from "./ProtectedRoutes";
const Routing = () => {
  return (
    <Suspense fallback={<h1>...loading</h1>}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LazyLandingPage />} /> */}
          <Route path="/" element={<LazySignInPage   />} />
            {/* <ProtectedRoutes> */}
          <Route path="manager/" element={<LazyMainBoard />}>
            {/* <Route path="dashboard" element={<ManagerDashboard />} /> */}
            <Route path="report" element={<LazyReportDisplayed />} />
            <Route path="ticket" element={<LazyTickets />} />
            <Route path="ticketHistory/:id" element={<LazyTicketHistory />} />
            <Route path="escalateTicket/:id" element={<EscalateTicket/>} />
            <Route path="raiseticket" element={<LazyRaiseTicket />} />
            <Route path="createStaff" element={<LazyCreateStaff />} />
            <Route path="deleteStaff" element={<LazyDeleteStaff />} />
            <Route path="updateStaff" element={<LazyUpdateStaff />} />
          </Route>
            {/* </ProtectedRoutes> */}
          <Route path="staff/" element={<LazyMainBoard />}>
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="ticket" element={<LazyStaffTickets />} />
            <Route path="ticketHistory/:id" element={<LazyTicketHistory />} />
            <Route path="escalateTicket/:id" element={<EscalateTicket/>} />
            <Route path="raiseticket" element={<LazyRaiseTicket />} />
            <Route path="report" element={<LazyReports />} />
            {/* <Route path="createStaff" element={<LazyCreateStaff />} />
            <Route path="deleteStaff" element={<LazyDeleteStaff />} />
            <Route path="updateStaff" element={<LazyUpdateStaff />} /> */}
          </Route>
          {/* <Route path="staff" element={<MainBoard />}>
            <Route path="dashboard" element={<ManagerDashBoard />} />
            <Route path="ticket" element={<Tickets />} />
            <Route path="raiseticket" element={<LazyRaiseTicket />} />
          </Route> */}

          <Route path="*" element={<h1>page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routing;
