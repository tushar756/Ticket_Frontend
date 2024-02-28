import { lazy } from "react";


export const LazyMainBoard = lazy(()=>import("../components/common/MainBoard/MainBoard"))
// --------------------------Staff Crud --------------------------------
export const LazySignInPage = lazy(()=>import("../components/common/SignIn/SignIn"))
export const LazyCreateStaff = lazy(()=>import("../components/pages/Manager/Staff Crud/CreateStaff"))
export const LazyDeleteStaff = lazy(()=>import("../components/pages/Manager/Staff Crud/DeleteStaff"))
export const LazyUpdateStaff = lazy(()=>import("../components/pages/Manager/Staff Crud/UpdateStaff"))
// --------------------------Ticket --------------------------------
export const LazyTicketHistory = lazy(()=>import("../components/common/Ticket History/TicketHistory"))
export const LazyTicket = lazy(()=>import("../components/pages/Ticket/Tickets"))
export const LazyEscalateTicket = lazy(()=>import("../components/common/EscalateTicket/EscalateTicket"))
export const LazyStaffTickets = lazy(()=>import("../components/pages/Staff/Tickets/StaffTickets"))
export const LazyTickets = lazy(()=>import("../components/pages/Ticket/Tickets"));
export const LazyRaiseTicket = lazy(()=>import("../components/pages/Ticket/RaiseTicket"))
export const LazyRaiseTicketHistory = lazy(()=>import("../components/common/Raised Ticket History/RaisedTicketHistory"))
export const LazyEbenezerPharmacyTickets = lazy(()=>import("../components/pages/Manager/Department Tickets/EbenerzerPharmacyTicket"))
export const LazyHarmonyrPharmacyTickets = lazy(()=>import("../components/pages/Manager/Department Tickets/HarmonyPharmacy"))
// --------------------------Reports --------------------------------
export const LazyReports = lazy(()=>import("../components/common/Reports/Report"))
export const LazyReportDisplayed = lazy(()=>import("../components/common/Reports/ReportDisplay"))
// --------------------------Manager Dashboard--------------------------------
export const LazyOpenTickets = lazy(()=>import("../components/pages/Manager/Tickets/OpenTickets"))
export const LazyPendingTickets = lazy(()=>import("../components/pages/Manager/Tickets/PendingTickets"))
export const LazyResolvedTickets = lazy(()=>import("../components/pages/Manager/Tickets/ResolvedTickets"))
export const LazyLowPriorityTickets = lazy(()=>import("../components/pages/Manager/Tickets/LowPriorityTickets"))
export const LazyMidPriorityTickets = lazy(()=>import("../components/pages/Manager/Tickets/MidPriorityTickets"))
export const LazyHighPriorityTickets = lazy(()=>import("../components/pages/Manager/Tickets/HighPriorityTickets"))
// --------------------------Staff Dashboard---------------------------------
export const LazyOpenStaffTickets = lazy(()=>import("../components/pages/Staff/Dashboard/Tickets/OpenStaffTickets"))
export const LazyPendingStaffTickets = lazy(()=>import("../components/pages/Staff/Dashboard/Tickets/PendingStaffTickets"))
export const LazyResolvedStaffTickets = lazy(()=>import("../components/pages/Staff/Dashboard/Tickets/ResolvedStaffTickets"))
export const LazyLowPriorityStaffTickets = lazy(()=>import("../components/pages/Staff/Dashboard/Tickets/LowPriorityStaffTickets"))
export const LazyMidPriorityStaffTickets = lazy(()=>import("../components/pages/Staff/Dashboard/Tickets/MidPriorityStaffTickets"))
export const LazyHighPriorityStaffTickets = lazy(()=>import("../components/pages/Staff/Dashboard/Tickets/HighPriorityStaffTickets"))
export const LazyStaffEbenezerPharmacyTickets = lazy(()=>import("../components/pages/Staff/Department Tickets/StaffEbenerzerPharmacyTicket"))
export const LazyStaffHarmonyrPharmacyTickets = lazy(()=>import("../components/pages/Staff/Department Tickets/StaffHarmonyPharmacy"))
