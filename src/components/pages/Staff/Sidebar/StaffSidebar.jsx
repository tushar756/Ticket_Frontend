// import { useState } from "react";
import "./StaffSidebar.scss";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
// import { IoPeopleSharp } from "react-icons/io5";
// import { IoIosArrowUp } from "react-icons/io";
// import { IoIosArrowDown } from "react-icons/io";
import { NavLink} from "react-router-dom";
const StaffSidebar = () => {
  // const [toggler, setToggler] = useState(false);

  return (
    <div className="sidebar">
      <ul className="menu-item">
        <NavLink to={"dashboard"} className="menu">
          <li>
            <div>
              <MdOutlineDashboardCustomize size={21} />{" "}
            </div>
            <div className="menu-title">Dashboard</div>
            {/* <h3>Dashboard</h3> */}
          </li>
        </NavLink>
        <NavLink to={"ticket"} className="menu">
          <li>
            <div>
              <FaTicketAlt size={21} />
            </div>
            <div className="menu-title">Tickets</div>
          </li>
        </NavLink>
        <NavLink to={"raiseticket"} className="menu">
          <li>
            <div>
              <FaTicketAlt size={21} />
            </div>
            <div className="menu-title">Raise New Ticket</div>
          </li>
        </NavLink>
        <NavLink to={"report"} className="menu">
          <li>
            <div>
              <FaTicketAlt size={21} />
            </div>
            <div className="menu-title">Reports</div>
          </li>
        </NavLink>

        {/* <li
          // onClick={() => {
          //   setToggler(!toggler);
          // }}
          style={{ display: "flex", flexDirection: "row" }}
        >
          {" "}
          <div>
            <Link className=" menu-space">
              <div
                className="menu icon-link"
                onClick={() => {
                  setToggler(!toggler);
                }}
              >
                <IoPeopleSharp size={21} />
                <span className="menu-title">Staff</span>

                {toggler ? (
                  <IoIosArrowUp style={{ marginLeft: "110px" }} />
                ) : (
                  <IoIosArrowDown
                    style={{ marginLeft: "110px" }}
                    onClick={() => {
                      setToggler(!toggler);
                    }}
                  />
                )}
              </div>
            </Link> */}
            {/* <div>
              <ul className={toggler ? "sub-menu-open" : "sub-menu-closed"}>
                <NavLink to="createStaff" className="menu">
                  <li>
                    <div className="sub-menu-title">Add Staff</div>
                  </li>
                </NavLink>
                <NavLink to="updateStaff" className="menu">
                  <li>
                    <div className="sub-menu-title">Edit Staff</div>
                  </li>
                </NavLink>
                <NavLink to="deleteStaff" className="menu">
                  <li>
                    <div className="sub-menu-title">Delete Staff</div>
                  </li>
                </NavLink>
              </ul>
            </div> */}
          {/* </div> */}
        {/* </li> */}
      </ul>
    </div>
  );
};

export default StaffSidebar;