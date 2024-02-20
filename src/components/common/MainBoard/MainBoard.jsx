import   {useEffect}from "react";
import Navbar from "../navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
const MainBoard = () => {
    const navigate = useNavigate()
    const { token} = localStorage;
  
    useEffect(() => {
      if (!token) {
        navigate("/signin");
      }
    }, [token, navigate]);
  
    if (!token) {
      return null;
    }
  return (
    <div >
      <Navbar  />
      <div style={{display:"flex"}}>
      <Sidebar/>
        <Outlet style={{  width:"calc(100vw - 250px )"}}/>
      </div>
    </div>
  );
};

export default MainBoard;
