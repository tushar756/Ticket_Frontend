import { useState, useEffect } from "react";
import API from "../../../utils/Api/api";
import frame1 from "../../../assets/frames/Frame 1.png";
import frame2 from "../../../assets/frames/Frame 2.png";
import frame3 from "../../../assets/frames/Frame 3.png";
import frame4 from "../../../assets/frames/Frame 4.png";
import frame5 from "../../../assets/frames/Frame 5.png";
import "./ManagerDashboard.scss";
import { NavLink } from "react-router-dom";
const Dashboard = () => {
  const [count, setCount] = useState({
    Pending: 0,
    Resolved: 0,
    Open: 0,
    pendingMoreThanTwoDaysCount: 0,
    staffCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  const getAllTickets = async () => {
    try {
      const response = await API.get("/ticket/statusCount", {
        user: user._id,
      });

      setCount(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);
  if (loading) {
    // return <h1 style={{minHeight:"70vh",}}>NO TICKET AVAILABLE</h1>
    return <span className="loader"></span>;
  }

  return (
    <div className="dashboardMain">
      <NavLink to={"/manager/openTickets"} className="menu">
        <div className="frame-position">
          <img src={frame1} alt="" />
          <div className="content-width">
            <h2>Open Tickets</h2>
            <h1>
              {(count.pendingCount || 0) +
                (count.resolvedCount || 0) +
                (count.openCount || 0)}
            </h1>
          </div>
        </div>
      </NavLink>
      <NavLink to={"/manager/pendingTickets"} className="menu">          
      <div className="frame-position">
        <img src={frame2} alt="" />
        <div className="content-width">
          <h2>Pending Tickets</h2>
          <h1>{count.resolvedCount || 0}</h1>
        </div>
      </div>
      </NavLink>
      <NavLink to={"/manager/resolvedTickets"} className="menu">   
      <div className="frame-position">
        <img src={frame3} alt="" />
        <div className="content-width">
          <h2>Resolved Tickets</h2>
          <h1>{count.openCount || 0}</h1>
        </div>
      </div>
      </NavLink>
      <NavLink to={"/manager/highPriorityTickets"} className="menu">   
      <div className="frame-position">
        <img src={frame4} alt="" />
        <div className="content-width">
          <h2>High Priority Tickets</h2>
          <h1>{count.pendingMoreThanTwoDaysCount || 0}</h1>{" "}
          {/* Show 0 if count is undefined */}
        </div>
      </div>
      </NavLink>
      <NavLink to={"/manager/midPriorityTickets"} className="menu">   
      <div className="frame-position">
        <img src={frame5} alt="" />
        <div className="content-width">
          <h2>Mid Priority Tickets</h2>
          <h1>{count.staffCount || 0}</h1> {/* Show 0 if count is undefined */}
        </div>
      </div>
      </NavLink>
      <NavLink to={"/manager/lowPriorityTickets"} className="menu">  
      <div className="frame-position">
        <img src={frame5} alt="" />
        <div className="content-width">
          <h2>Low Priority Tickets</h2>
          <h1>{count.staffCount || 0}</h1> {/* Show 0 if count is undefined */}
        </div>
      </div>
      </NavLink>
    </div>
  );
};

export default Dashboard;
