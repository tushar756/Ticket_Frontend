import { useEffect, useState } from "react";
import DataTable from "../../../common/Tables/DataTable";
import { Link } from "react-router-dom";
import "../../Ticket/Ticket.scss";
import API from "../../../../utils/Api/api";
import { GoDotFill } from "react-icons/go";

const StaffTickets = () => {
  const ogData = [
    {
      Header: "S_No",
      accessor: "S_No",
      width: "100%",
    },
    {
      Header: "Ticket_No",
      accessor: "Ticket_No",
      width: "100%",
    },
    {
      Header: "Department",
      accessor: "department",
    },
    {
      Header: "Issue",
      accessor: "Issue",
      width: "100%",
      textAlign: "start",
    },
    {
      Header: "Reported_Date",
      accessor: "Reported_Date",
      width: "100%",
    },
    {
      Header: "Summary",
      accessor: "Summary",
      // width: "200px",
      width: "100%",
      textAlign: "start",
    },
    {
      Header: "User",
      accessor: "Last_Comments",
      width: "100%",
    },
    {
      Header: "Priority",
      accessor: "Priority",
      width: "100%",
    },
    {
      Header: "Bug_Status",
      accessor: "Bug_Status",
      width: "100%",
    },
    {
      Header: "Actions",
      accessor: "History",
      width: "100%",
    },
  ];
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
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading,setLoading]=useState(true)
  const user = JSON.parse(localStorage.getItem("user"));
  const getAllTickets = async () => {
    try {
      const response = await API.get("/staff/staffTickets", {
        user: user._id,
      });

      setData(response.data.data);
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

  const row = data.filter((item) => {
      
    const newDate = new Date(item.createdAt).toLocaleDateString("en-GB");
    const existingDate = new Date(search).toLocaleDateString("en-GB");

    if (
      item.createdBy.firstName.toLowerCase().includes(search.toLowerCase()) ||
      newDate === existingDate || item.department == search
    ) {
      return item;
    }

    else {
      return null;
     
    }
  }).map((item, index) => {
    return {
      S_No: index + 1,
      Ticket_No: item.ticketId,
      Issue: item.title,
      department:item.department,
      Reported_Date: item.createdAt,
      Summary: item.description,
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
            padding: "0 5px 0 15px",
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
        <Link to={`/staff/ticketHistory/${item.ticketId}`}>
          <button className="ticket-btn">History</button>
        </Link>
      ),
      // History: item.Ticket_No
    };
  });

  return data.length == 0 ? (
    <h1>No data found</h1>
  ) : (
    <div className="datatable" style={{ width: "100%", overflowX: "auto" }}>
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
            style={{ width: "300px" }}
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
            onChange={(e) => setSearch(e.target.value)} // {...register("priority")}
            style={{ width: "200px", height: "39px" }}
            defaultValue=""
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="">All Departments</option>
            <option value="Ebenezer Pharmacy">Ebenezer Pharmacy</option>
            <option value="Harmony Pharmacy">Harmony Pharmacy</option>
            <option value="Both">Both</option>
          </select>
        </div>
        <div className="feild">
          <button
            className="btn-main"
            onClick={() => {
              setSearch("");
            }}
          >
            Reset
          </button>
        </div>
      </div>
      <DataTable columns={ogData} data={data} row={row} />
    </div>
  );
};

export default StaffTickets;
