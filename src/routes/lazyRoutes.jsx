import { lazy } from "react";


export const LazyTickets = lazy(()=>import("../components/pages/Ticket/Tickets"));
export const LazyRaiseTicket = lazy(()=>import("../components/pages/Ticket/RaiseTicket"))
export const LazySignInPage = lazy(()=>import("../components/common/SignIn/SignIn"))
export const LazyCreateStaff = lazy(()=>import("../components/pages/Manager/Staff Crud/CreateStaff"))
export const LazyDeleteStaff = lazy(()=>import("../components/pages/Manager/Staff Crud/DeleteStaff"))
export const LazyUpdateStaff = lazy(()=>import("../components/pages/Manager/Staff Crud/UpdateStaff"))
export const LazyTicketHistory = lazy(()=>import("../components/common/Ticket History/TicketHistory"))
export const LazyTicket = lazy(()=>import("../components/pages/Ticket/Tickets"))
export const LazyEscalateTicket = lazy(()=>import("../components/common/EscalateTicket/EscalateTicket"))
export const LazyStaffTickets = lazy(()=>import("../components/pages/Staff/Tickets/StaffTickets"))
export const LazyReports = lazy(()=>import("../components/common/Reports/Report"))
export const LazyReportDisplayed = lazy(()=>import("../components/common/Reports/ReportDisplay"))
