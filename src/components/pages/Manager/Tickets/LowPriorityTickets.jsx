 



import { useEffect, useState } from "react";
import DataTable from "../../../common/Tables/DataTable";
// import DataTable from "../../../";
import { Link } from "react-router-dom";
// import "./Ticket.scss";
// import axios from "axios";
// import api from "../../../utils/Api/contact";
import API from '../../../../utils/Api/api'
import { GoDotFill } from "react-icons/go";

const LowPriorityTickets = () => {
  const ogData = [
    {
      Header: "S_No",
      accessor: "S_No",
    },
    {
      Header: "Ticket_No",
      accessor: "Ticket_No",
    },
    {
      Header: "Issue",
      accessor: "Issue",
      width: "8%",
      textAlign: "start",
    },
    {
      Header: "Reported_Date",
      accessor: "Reported_Date",
    },
    {
      Header: "Summary",
      accessor: "Summary",
      width: "200px",
      textAlign: "start",
    },
    {
      Header: "Last_Comments",
      accessor: "Last_Comments",
    },
    {
      Header: "Priority",
      accessor: "Priority",
    },
    {
      Header: "Bug_Status",
      accessor: "Bug_Status",
    },
    {
      Header: "Actions",
      accessor: "History",
    },
  ];

  const [data, setData] = useState([]);
  const color = {
    High: "rgb(250 177 164 / 66%)",
    Mid: "#D3E5EF",
    Low: "#DBEDDB",
  };
  const bugStatusColor = {
    Open: "#BCECDC",
    Resolved: "#FFD599",
    Pending: "rgb(152 152 152)",
  };
  const dotcolor = {
    High: "red",
    Mid: "rgb(14 162 255)",
    Low: "green",
  };
  const getAllTickets = async () => {
    try {
      const response = await API.get("/ticket/totalMidPriorityTickets");
    
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);  
    }
  };
 
  
  useEffect(() => {
    getAllTickets();
  }, []);
  


 
  if (data.length==0) {
    // return <h1 style={{minHeight:"70vh",}}>NO TICKET AVAILABLE</h1>
    return <span className="loader"></span>
   }

  const row = data.map((item, index)=>{return {
      S_No: index + 1,
      Ticket_No: item.ticketId,
      Issue: item.title,
      Reported_Date: item.createdAt,
      Summary: item.description,
      // Last_Comments: item.currentAssignedTo.firstName +" " + item.currentAssignedTo.lastName,
      Last_Comments:
      item.createdBy.firstName +
      // item.createdBy.firstName +
      " " +
      item.createdBy.lastName,
      Priority: (
        <p
          style={{
            backgroundColor: color[item.priority],
            width: "80px",
            padding: "0 5px 0 5px",
            borderRadius: "5px",
            color: "black",
            display: "flex",
            alignItems: "center",
          }}
        >
          <GoDotFill
            size={15}
            style={{
              color: dotcolor[item.priority],
            }}
          />
          {item.priority}
        </p>
      ),
      Bug_Status: (
        <p
          style={{
            backgroundColor: bugStatusColor[item.Bug_Status],
            width: "80px",
            padding: "0 5px 0 5px",
            borderRadius: "5px",
            color: "black",
          }}
        >
          {item.Bug_Status}
        </p>
      ),
        History: (
          <Link to={`/manager/ticketHistory/${item.ticketId}`}>
            <button className="ticket-btn">History</button>
          </Link>
        ),
      // History: item.Ticket_No
    };
  });

   return (
    data.length == 0 ? (
      <h1>No data Availabel</h1>
    ) : (
      <div style={{ width: "100%", overflowX: "auto" }}>
        <DataTable columns={ogData} data={data} row={row} />
      </div>
    )
   );
};

export default LowPriorityTickets;
