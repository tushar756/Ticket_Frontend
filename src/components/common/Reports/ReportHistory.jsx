/* eslint-disable react/prop-types */
import DataTable from "../Tables/DataTable";
import { useState, useEffect } from "react";
import API from "../../../utils/Api/api";
import PropTypes from 'prop-types';
import { Link, useNavigate, } from "react-router-dom";
import './reportHistory.scss'



const ReportDisplay = ({rowData,handleCloseModal}) => {
  console.log("ubabd",rowData)
  const ogData = [
    {
      Header: "S_No",
      accessor: "S_No",
   
    },
   
    {
      // Header: "Date&Time",
      Header: "Reported_Date",
      accessor: "Reported_Date",
       
    },
    {
      Header: "Name",
      accessor: "Name",
       
    },
    {
      Header: "Summary",
      accessor: "Summary",
     
    },
    {
      Header: "File",
      accessor: "fileURL",
      Cell: ({ row }) => {
      //   console.log(row.original.File.props.href); // Moved console.log here
        return (
          row.original.File.props.href ? ( 
            <a href={row.original.File.props.href} download>
              Download File
            </a>
          ) : (
            <span>No file exists</span>
          )
        );
      },
    },
    
  ];
  
  // const [data, setData] = useState([]);

 

  if (rowData.length==0) {
    // return <h1 style={{minHeight:"70vh",}}>NO TICKET AVAILABLE</h1>
    return <span className="loader"></span>
   }
  



 
 
  console.log("render");
  const row = rowData.map((item, index) => {

 
    return {
      S_No: index + 1,
      Reported_Date: item.Reported_Date,
 
      Summary: item.Summary,
      Name:item.Name,
     
      File: item.fileURL ? (
        <a href={item.fileURL} target="_blank" rel="noreferrer">
          Download File
        </a>
      ) : (
        <span>No file </span>
      ),
      // History: (
      //   <Link to={`/manager/reportHistory`}>
      //   <button className="ticket-btn" onClick={() => handleOpen(row.original)}>Open</button>
      // </Link>
      // ),
  
    };
  });
console.log(row)
  return rowData.length === 0 ? (
    <div className="escate-history">
      <h1>No Reports</h1>
</div>
  ) : (
    <div className="esclate-main box"  >
      {/* <RxCross2 /> */}
      <div className="modal-content">

      <DataTable columns={ogData} Data={rowData} row={row} />   
      <div><button onClick={()=>{handleCloseModal()}} className="close ">close</button></div>
      </div>
    </div>
  );
};
ReportDisplay.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object,
  register: PropTypes.func,
  control: PropTypes.object,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
};
export default ReportDisplay;
