import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
// import "./Ticket.scss";
// import axios from "axios";
// import api from "../../../utils/Api/contact";

import { GoDotFill } from "react-icons/go";
import DataTable from "../../../common/Tables/DataTable";
import API from "../../../../utils/Api/api";

const EbenezerPharmacyTickets= () => {
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
      Header: "Department",
      accessor: "department",
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
      Header: "User",
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
  const [loading,setLoading]=useState(true)
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
  const filterData = (data)=>{
 
    const lastTransitions = data.map(item => {
      const transitions = item.transition;
      const lastTransition = transitions[transitions.length - 1];
      return lastTransition;
    });
    return lastTransitions;
  }
  const getAllTickets = async () => {
    try {
      const response = await API.get("/ticket/getAllEbenezerTickets");
      const mainData = response.data.data
      
        console.log(mainData)
        const filteredData = filterData(mainData)  
        console.log(filteredData)

      setData(response.data.data.reverse());
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);  
    }
  };
 
  
  useEffect(() => {
    getAllTickets();
  }, []);
  


 
  if (loading) {
    return <span className="loader"></span>
   }

  const row = data.map((item, index)=>{
    const summary = item.description.split(' ').slice(0, 20).join(' ');

    // Limit summary to 50 characters using substring
    const limitedSummary = summary.substring(0, 50);
    return {
      S_No: index + 1,
      Ticket_No: item.ticketId,
      Issue: item.title,
      department:item.department,
      Reported_Date: item.createdAt,
      Summary: limitedSummary,
      // Last_Comments: item.currentAssignedTo.firstName +" " + item.currentAssignedTo.lastName,
      Last_Comments:
      item.createdBy.firstName +
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

export default EbenezerPharmacyTickets;
