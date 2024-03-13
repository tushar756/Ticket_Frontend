/* eslint-disable react/prop-types */
import DataTable from "../Tables/DataTable";
import { useState, useEffect } from "react";
import API from "../../../utils/Api/api";
import PropTypes from 'prop-types';
import { Link, useNavigate, } from "react-router-dom";
import ReportHistory from "./ReportHistory"; 
import { IoIosArrowDown } from "react-icons/io";
import '../../pages/Ticket/Ticket.scss'


const ReportDisplay = () => {
   
  const [rowData, setRowData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpen = (row) => {
    setRowData(row)
    setShowModal(true)
    // const dataToPass = {
     
    //   File:rowData.File.props.children,
    //   Name: rowData.Name,
    //   Reported_Date: rowData.Reported_Date,
    //   Summary:rowData.Summary
    // };
    // console.log(rowData)
 
    
  };
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
    {
      Header: "Actions",
      accessor: "History",
      Cell: ({ row }) => (
        
        <button className="ticket-btn" onClick={() => handleOpen(row.original) }>Open</button>
  
      ),
    },
  ];
  
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true)

  const getAllReports = async () => {
    const response = await API.get('/staff/getAllReport');
    console.log(response.data.data)
    setData(response.data.data)
    setLoading(false)
  };

  useEffect(() => {
    getAllReports();
  }, []);

  if (loading) {
    return <span className="loader"></span>
   }
  
 
  const row = data.map((item, index) => {


    const summary = item.description.split(' ').slice(0, 20).join(' ');

    const limitedSummary = summary.substring(0, 50);
    return {
      S_No: index + 1,
      Reported_Date: item.createdAt,
 
      Summary: limitedSummary,
      Name:item.createdBy,
     
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
  return data.length === 0 ? (
    <div className="escate-history">
      <h1>No Reports</h1>
    
    </div>
  ) : (
    <div className="esclate-main" style={{width:"100%"}}>
      <DataTable columns={ogData} Data={data} row={row} />   
      {showModal && (
        <ReportHistory
          rowData={[rowData]}
          handleCloseModal={handleCloseModal}
        />
      )}
      
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
