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
  LazyEbenezerPharmacyTickets,
  LazyHarmonyrPharmacyTickets,
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
  LazyRaiseTicketHistory,
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
 
            {/* ----------------------------Singin Routes-------------------------- */}
          <Route path="/" element={<LazySignInPage />} />
            {/* ----------------------------MainBoard Routes-------------------------- */}
          <Route path="manager/" element={<LazyMainBoard />}>
            {/* ----------------------------Dashboard Routes-------------------------- */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="openTickets" element={<LazyOpenTickets />} />
            <Route path="pendingTickets" element={<LazyPendingTickets />} />
            <Route path="resolvedTickets" element={<LazyResolvedTickets />} />
            <Route path="highPriorityTickets" element={<LazyHighPriorityTickets />} />
            <Route path="midPriorityTickets" element={<LazyMidPriorityTickets />} />
            <Route path="lowPriorityTickets" element={<LazyLowPriorityTickets />} />

            {/* ----------------------------Ticket Routes------------------------- */}
            <Route path="tickets" element={<LazyTickets />} />
            <Route path="ticketHistory/:id" element={<LazyTicketHistory />} />
            <Route path="escalateTicket/:id" element={<EscalateTicket />} />
            <Route path="raiseticket" element={<LazyRaiseTicket />} />
            <Route path="raiseTicketHistory" element={<LazyRaiseTicketHistory />} />
            <Route path="ebenezerPharmacyTickts" element={<LazyEbenezerPharmacyTickets />} />
            <Route path="harmonyPharmacyTickts" element={<LazyHarmonyrPharmacyTickets />} />

            {/* ----------------------------Report Routes------------------------- */}
            <Route path="report" element={<LazyReportDisplayed />} />

            {/* ----------------------------Staff Crud Routes------------------------- */}
            <Route path="createStaff" element={<LazyCreateStaff />} />
            <Route path="deleteStaff" element={<LazyDeleteStaff />} />
            <Route path="updateStaff" element={<LazyUpdateStaff />} />
          </Route>

            {/* ==============================================================================================*/}
            {/* ----------------------------MainBoard Routes-------------------------- */}
          <Route path="staff/" element={<LazyMainBoard />}>
            {/* ----------------------------Dashboard Routes-------------------------- */}
            <Route path="dashboard" element={<StaffDashboard />} />
            <Route path="openStaffTickets" element={<LazyOpenStaffTickets />} />
            <Route path="pendingStaffTickets" element={<LazyPendingStaffTickets />} />
            <Route path="resolvedStaffTickets" element={<LazyResolvedStaffTickets />} />
            <Route path="highPriorityStaffTickets" element={<LazyHighPriorityStaffTickets />} />
            <Route path="midPriorityStaffTickets" element={<LazyMidPriorityStaffTickets />} />
            <Route path="lowPriorityStaffTickets" element={<LazyLowPriorityStaffTickets />} />
            {/* ----------------------------Ticket Routes------------------------- */}
            <Route path="ticket" element={<LazyStaffTickets />} />
            <Route path="ticketHistory/:id" element={<LazyTicketHistory />} />
            <Route path="escalateTicket/:id" element={<EscalateTicket />} />
            <Route path="raiseticket" element={<LazyRaiseTicket />} />
            {/* ----------------------------Report Routes------------------------- */}
            <Route path="report" element={<LazyReports />} />
          </Route>
 

          <Route path="*" element={<h1>page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routing;
