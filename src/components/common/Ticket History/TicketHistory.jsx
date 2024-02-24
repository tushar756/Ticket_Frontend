import DataTable from "../Tables/DataTable";
import "./TicketHistory.scss";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../utils/Api/contact";
import { GoDotFill } from "react-icons/go";
import "../../pages/Ticket/raiseTicket.scss";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import API from "../../../utils/Api/api";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';

 
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
    Header: "File",
    accessor: "fileURL",
    Cell: ({ row }) => {
      console.log(row.original.File.props.href); // Moved console.log here
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

const TicketHistory = () => {
  const [staffData, setStaffData] = useState([]);
  const { id } = useParams();
  const form = useForm();
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true)
  const getAllTickets = async () => {
    const response = await api.get(`ticket/ticketHistory/${id}`);
    if (Array.isArray(response.data.data.transition)) {
      setData(response.data.data.transition);
      console.log(response.data.data.transition);
    } else {
      console.error("Response data is not an array:", response.data);
    }
  };

  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllStaff = async () => {
    const response = await API.get("/manager/getAllStaff");
    setStaffData(response.data.data);
    setLoading(false)
  };

  useEffect(() => {
    getAllStaff();
  }, []);


  if (loading) {
    return <span className="loader"></span>
   }
  
  const user = JSON.parse(localStorage.getItem("user"));

  const { register, control, handleSubmit, reset } = form;

  const formSubmit = async (formData) => {
    try {
      const { file, ...data } = formData;
      // if (file && file.length > 0) {
      //   const selectedFile = file[0];
      //   console.log("Selected File:", selectedFile); // Log the selected file
      // } else {
      //   console.error('No file selected');
      // }

      const response = await API.post(
        "ticket/esclate",
        {
          ...data,
          media_url: "adsfdf",
          ticketId: id,
          assignedBy: user.email,
          file: file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("API Response:", response);

      console.log("API Response:", response);
      if (response.data.error === false) {
        toast.success("Ticket Assigned Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        formReset();
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const formReset = () => {
    reset();
  };

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
  console.log("render");
  const row = data.map((item, index) => {
    console.log("File URL:", item.fileURL);
    return {
      S_No: index + 1,
      Ticket_No: item.from.ticketId,
      Reported_Date: item.from.createdAt,
      Summary: item.from.description,
      Last_Comments:`${item.from.firstName} ${item.from.lastName} `,
      Priority: (
        <p
          style={{
            backgroundColor: color[item.from.priority],
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
              color: dotcolor[item.from.priority],
            }}
          />
          {item.from.priority}
        </p>
      ),
      Bug_Status: (
        <p
          style={{
            backgroundColor: bugStatusColor[item.from.Bug_Status],
            width: "80px",
            padding: "0 5px 0 5px",
            borderRadius: "5px",
            color: "black",
          }}
        >
          {item.from.Bug_Status}
        </p>
      ),
      File: item.fileURL ? (
        <a href={item.fileURL} target="_blank" rel="noreferrer">
          Download File
        </a>
      ) : (
        <span>No file </span>
      ),
  
    };
  });
 
  return data.length === 0 ? (
    <div className="escate-history">
      <h1>No data found</h1>
      <div className="escalte-btn">
        <h2>Do you want to Escalate Ticket?</h2>
        <Link to={`/${user.role}/escalateTicket/${id}`}>
          <button className="escalate-btn">Escalate</button>
        </Link>
      </div>
    </div>
  ) : (
    <div className="esclate-main">
      <DataTable columns={ogData} Data={data} row={row} />
      <div className="escalte-btn">
        <h2>Do you want to Escalate Ticket?</h2>
        <div className="raiseTicketContainer">
          <form
            onSubmit={handleSubmit(formSubmit)}
            encType="multipart/form-data"
          >
            <div className="title">
              <h2>Report Bug</h2>
            </div>
            <div className="input-feilds">
              <label htmlFor="description">Bug Description</label>
              <textarea
                {...register("description")}
                style={{ width: "80%", fontSize: "1rem", padding: "5px" }}
                id="description"
                cols="30"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="input-feilds">
              <label htmlFor="priority">Priority</label>
              <select
                name="priority"
                id="priority"
                {...register("priority")}
                style={{ width: "200px", height: "39px" }}
                required
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="High">High</option>
                <option value="Mid">Mid</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="diff-bg input-feilds">
              <label htmlFor="Bug_Status">Bug Status</label>
              <select
                id="Bug_Status"
                {...register("Bug_Status")}
                style={{ width: "200px", height: "39px" }}
                required
              >
                <option value="" disabled>
                  Select Bug Status
                </option>
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="input-feilds">
              <label htmlFor="assigneTo">Assigned to</label>
              <select
                id="assigneTo"
                {...register("currentAssignedTo")}
                style={{ width: "200px", height: "39px" }}
                required
              >
                <option value="" disabled>
                  Select Assigned To
                </option>
                {staffData.map((value, index) => (
                  <option
                    key={index}
                    value={value.email}
                  >{`${value.firstName} ${value.lastName}`}</option>
                ))}
              </select>
            </div>
            {/* --------------file---------------------- */}
            <div className="diff-bg input-feilds">
              <label htmlFor="file">File</label>
              <input
                type="file"
                id="file"
                name="file"
                {...register("file")}
                accept=".pdf,.doc,.docx,.jpg,.png"
                // required
              />
            </div>
            <div>
              <button className="btn btn-clr">Submit</button>
            </div>
            <div>
              <button className="btn" onClick={formReset}>
                Reset
              </button>
            </div>
          </form>

          <DevTool control={control} />
        </div>
      </div>
    </div>
  );
};
TicketHistory.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object,
  register: PropTypes.func,
  control: PropTypes.object,
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
};
export default TicketHistory;
