import React, { useState } from "react";
// import CompanyLogo from '../../../assets/Company Logo/Logo__-_Profile_Image.png'
import CompanyLogo from "../../../assets/Company Logo/Trace logo (icon).png";
import ProfileImgMaker from "../../../utils";
import { FaBell } from "react-icons/fa";
import {  useNavigate } from "react-router-dom";
// import {useHistory} from 'react-router-dom'
import "./navbar.scss";
const Navbar = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const { firstName, lastName, role } = userData;
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const navigate = useNavigate()
  const Submenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    // Redirect to the signup page
    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="nameShower">
        <h4>{`${firstName} ${lastName}`}</h4>
        <p>{`${role.toUpperCase()}`}</p>
      </div>
      <div>
        <img src={CompanyLogo} alt="" width={"40px"} height={"40px"} />
        <h3>Harmony Discount Pharmacy</h3>
      </div>
      {/* <img src={CompanyLogo} alt=""  width={"50px"} height={"40px"}/> */}

      <div>
        {/* <FaBell size={"30px"} /> */}
        <div className="img-btn">
          <img
            onClick={Submenu}
            className="name-image"
            src={ProfileImgMaker(firstName, lastName)}
            alt="nameImg"
          />
          <ul className="submenu" style={subMenuOpen ? { display: "block" } : { display: "none" }}>
      
              <li>
              <button onClick={handleLogout} className="btn-logout">Log Out</button>
              </li>
         
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
