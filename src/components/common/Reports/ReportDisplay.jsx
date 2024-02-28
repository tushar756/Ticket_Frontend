/* eslint-disable react/prop-types */
import DataTable from "../Tables/DataTable";
import { useState, useEffect } from "react";
import API from "../../../utils/Api/api";
import PropTypes from 'prop-types';

 
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
    width: "200px",
    textAlign: "start",
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
  }
  
];

const ReportDisplay = () => {
 
 
  const [data, setData] = useState([]);

  const getAllReports = async () => {
    const response = await API.get('/staff/getAllReport');
    console.log(response.data.data)
    setData(response.data.data)
  };

  useEffect(() => {
    getAllReports();
  }, []);

  if (data.length==0) {
    // return <h1 style={{minHeight:"70vh",}}>NO TICKET AVAILABLE</h1>
    return <span className="loader"></span>
   }
  

  

 
 
  console.log("render");
  const row = data.map((item, index) => {


    const summary = item.description.split(' ').slice(0, 20).join(' ');

    const limitedSummary = summary.substring(0, 50);
    return {
      S_No: index + 1,
      Reported_Date: item.createdAt,
      // Summary: item.description,
      Summary: limitedSummary,
      Name:item.createdBy,
    //   Last_Comments: item.from.email,
      File: item.fileURL ? (
        <a href={item.fileURL} target="_blank" rel="noreferrer">
          Download File
        </a>
      ) : (
        <span>No file </span>
      ),
  
    };
  });
console.log(row)
  return data.length === 0 ? (
    <div className="escate-history">
      <h1>No Reports</h1>
    
    </div>
  ) : (
    <div className="esclate-main">
      <DataTable columns={ogData} Data={data} row={row} />   
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
