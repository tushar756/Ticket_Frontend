import { useState,useEffect } from 'react';
import API from "../../../../utils/Api/api";
import frame1 from "../../../../assets/frames/Frame 1.png";
// import frame1 from "../../../../assets/frames/";
import frame2 from "../../../../assets/frames/Frame 2.png";
import frame3 from "../../../../assets/frames/Frame 3.png";
import frame4 from "../../../../assets/frames/Frame 4.png";
import frame5 from "../../../../assets/frames/Frame 5.png";
// import frame6 from "../../../assets/frames/Frame 6.png";
import "./StaffDashboard.scss";
const StaffDashboard = () => {

  const [count, setCount] = useState({
    Pending: 0,
    Resolved: 0,
    Open: 0,
    pendingMoreThanTwoDaysCount: 0,
    staffCount: 0
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const getAllTickets = async () => {
    try {
      const response = await API.get("/staff/counts", {
        user: user._id,
      });
      
 
      setCount(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // setData([]);
    }
  };


  useEffect(() => {
    getAllTickets();
  }, []);

  return (
    <div className="dashboardMain" >
      <div className="frame-position">
        <img src={frame1} alt="" />
        <div className="content-width">
          <h2>Total Tickets</h2>
          <h1>{count.Pending || 0  + count.Resolved || 0 + count.Open || 0}</h1>
        </div>
      </div>
      <div className="frame-position">
        <img src={frame2} alt="" />
        <div className="content-width">
          <h2>Resolved  and Closed Ticket</h2>
          <h1>{count.Resolved || 0}</h1>
        </div>
      </div>
      <div className="frame-position">
        <img src={frame3} alt="" />
        <div className="content-width" >
           {/*Pending Ticket  */}
          <h2>Open Tickets</h2>
          <h1>{count.Open || 0}</h1>
        </div>
      </div>
      <div className="frame-position">
        <img src={frame4} alt="" />
        <div className="content-width" >
          <h2>Open Since last Two Days</h2>
          <h1>{count.OpenSinceLastTwoDays || 0}</h1>
        </div>
      </div>
      <div className="frame-position">
        <img src={frame5} alt="" />
        <div className="content-width">
          <h2>Staff Counts</h2>
          <h1>{count.staffCount || 0}</h1>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
