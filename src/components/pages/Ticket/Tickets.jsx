import { useEffect, useState } from "react";
import DataTable from "../../common/Tables/DataTable";
import { Link } from "react-router-dom";
import "./Ticket.scss";
// import axios from "axios";
// import api from "../../../utils/Api/contact";
import API from "../../../utils/Api/api";
import { GoDotFill } from "react-icons/go";

const Tickets = () => {
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
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateSearch, setdateSearch] = useState("");
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
  const filterData = (data) => {
    const lastTransitions = data.map((item) => {
      const transitions = item.transition;
      const lastTransition = transitions[transitions.length - 1];
      return lastTransition;
    });
    return lastTransitions;
  };
  const getAllTickets = async () => {
    try {
      const response = await API.get("/ticket/all");
      const mainData = response.data.data;

      // console.log(mainData)
      const filteredData = filterData(mainData);
      // console.log(filteredData)

      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  if (loading) {
    return <span className="loader"></span>;
  }

  const row = data
    .filter((item) => {
      // const formattedDate = item.createdAt.toLocaleDateString('en-GB');
      // console.log(item.createdAt)
      const newDate = new Date(item.createdAt).toLocaleDateString("en-GB");
      const existingDate = new Date(search).toLocaleDateString("en-GB");
      // console.log(  newDate == existingDate)

      // console.log(newDate)
      // console.log(existingDate)
      if (
        item.createdBy.firstName.toLowerCase().includes(search.toLowerCase()) ||
        newDate === existingDate || item.department == search
      ) {
        return item;
      }
 
      else {
        return null;
       
      }
    })
    .map((item, index) => {
      const summary = item.description.split(" ").slice(0, 20).join(" ");

      const limitedSummary = summary.substring(0, 50);
      return {
        S_No: index + 1,
        Ticket_No: item.ticketId,
        Issue: item.title,
        department: item.department,
        Reported_Date: item.createdAt,
        Summary: limitedSummary,
        // Last_Comments: item.currentAssignedTo.firstName +" " + item.currentAssignedTo.lastName,
        Last_Comments: item.createdBy.firstName + " " + item.createdBy.lastName,
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

  return data.length == 0 ? (
    <h1>No data Availabel</h1>
  ) : (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div className="feild">
        <div className="feild">

        <label htmlFor="User">User</label>
        <input  
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            console.log(search);
          }}
          />
          </div>
          <div className="feild">

            <label htmlFor="User">Date</label>
      <input
        type="date"
        name=""
        style={{width:"300px"}}
        id=""
        onChange={(e) => {
          setSearch(e.target.value);
          const newDate = new Date(e.target.value);
          console.log(newDate);
        }}
        />
        </div>
        <div className="feild">
          <label htmlFor="priority">department</label>
          <select
            id="priority"
            onChange={(e) => setSearch(e.target.value)}     // {...register("priority")}
            style={{ width: "200px", height: "39px" }}
          >
            <option value="" disabled selected>
              Select Option
            </option>
            <option value="">All Departments</option>
            <option value="Ebenezer Pharmacy">Ebenezer Pharmacy</option>
            <option value="Harmony Pharmacy">Harmony Pharmacy</option>
            <option value="Both">Both</option>

          </select>
        </div>
        <div  className="feild">

        <button className="btn-main" onClick={()=>{setSearch("")}}>
            Reset
          </button>
        </div>
      </div>
      <DataTable columns={ogData} data={data} row={row} />
    </div>
  );
};

export default Tickets;
