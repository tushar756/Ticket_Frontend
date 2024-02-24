import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
// import Navbar from "../components/common/navbar/navbar";
import { Suspense } from "react";
import Dashboard from "../components/pages/Manager/Dashboard";
// import { LazyBoard } from "./lazyRoutes";
// import MainBoard from "../components/common/MainBoard/MainBoard";
// import ManagerDashbBoard from "../components/pages/Manager/ManagerDashBoard";
import {
  LazyCreateStaff,
  LazyDeleteStaff,
  LazyHighPriorityStaffTickets,
  LazyHighPriorityTickets,
  LazyLowPriorityStaffTickets,
  LazyLowPriorityTickets,
  LazyMainBoard,
  LazyMidPriorityStaffTickets,
  LazyMidPriorityTickets,
  LazyOpenStaffTickets,
  LazyOpenTickets,
  LazyPendingStaffTickets,
  LazyPendingTickets,
  LazyRaiseTicket,
  LazyReportDisplayed,
  LazyReports,
  LazyResolvedStaffTickets,
  LazyResolvedTickets,
  LazyStaffTickets,
  LazyTicketHistory,
  LazyTickets,
  LazyUpdateStaff,
} from "./lazyRoutes";
import { LazySignInPage } from "./lazyRoutes";
import EscalateTicket from "../components/common/EscalateTicket/EscalateTicket";
import StaffDashboard from "../components/pages/Staff/Dashboard/StaffDashboard";
// import ProtectedRoutes from "./ProtectedRoutes";
const Routing = () => {
  return (
    <Suspense fallback={<h1>...loading</h1>}>
      <BrowserRouter>
        <Routes>
 
          <Route path="/" element={<LazySignInPage />} />
          <Route path="manager/" element={<LazyMainBoard />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="openTickets" element={<LazyOpenTickets />} />
            <Route path="pendingTickets" element={<LazyPendingTickets />} />
            <Route path="resolvedTickets" element={<LazyResolvedTickets />} />
            <Route path="highPriorityTickets" element={<LazyHighPriorityTickets />} />
            <Route path="midPriorityTickets" element={<LazyMidPriorityTickets />} />
            <Route path="lowPriorityTickets" element={<LazyLowPriorityTickets />} />
            <Route path="report" element={<LazyReportDisplayed />} />
            <Route path="tickets" element={<LazyTickets />} />
            <Route path="ticketHistory/:id" element={<LazyTicketHistory />} />
            <Route path="escalateTicket/:id" element={<EscalateTicket />} />
            <Route path="raiseticket" element={<LazyRaiseTicket />} />
            <Route path="createStaff" element={<LazyCreateStaff />} />
            <Route path="deleteStaff" element={<LazyDeleteStaff />} />
            <Route path="updateStaff" element={<LazyUpdateStaff />} />
          </Route>

          <Route path="staff/" element={<LazyMainBoard />}>
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="openStaffTickets" element={<LazyOpenStaffTickets />} />
            <Route path="pendingStaffTickets" element={<LazyPendingStaffTickets />} />
            <Route path="resolvedStaffTickets" element={<LazyResolvedStaffTickets />} />
            <Route path="highPriorityStaffTickets" element={<LazyHighPriorityStaffTickets />} />
            <Route path="midPriorityStaffTickets" element={<LazyMidPriorityStaffTickets />} />
            <Route path="lowPriorityStaffTickets" element={<LazyLowPriorityStaffTickets />} />
            <Route path="ticket" element={<LazyStaffTickets />} />
            <Route path="ticketHistory/:id" element={<LazyTicketHistory />} />
            <Route path="escalateTicket/:id" element={<EscalateTicket />} />
            <Route path="raiseticket" element={<LazyRaiseTicket />} />
            <Route path="report" element={<LazyReports />} />
          </Route>
          {/* <Route path="createStaff" element={<LazyCreateStaff />} />
            <Route path="deleteStaff" element={<LazyDeleteStaff />} />
            <Route path="updateStaff" element={<LazyUpdateStaff />} /> */}
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
