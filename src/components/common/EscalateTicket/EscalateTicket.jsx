import "../../pages/Ticket/raiseTicket.scss";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import API from "../../../utils/Api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const EscalateTicket = () => {
  const [staffData, setStaffData] = useState([]);
  const { id } = useParams();
  const getAllStaff = async () => {
    const response = await API.get("/manager/getAllStaff");
    setStaffData(response.data.data);
  };
  useEffect(() => {
    getAllStaff();
  }, []);
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user)
  const form = useForm();
  //
  const { register, control, handleSubmit, reset } = form;

  const formSubmit = async (data) => {
    try {
   
      const formData = {
        ticketId: id,
        assignedBy: user.email,
        currentAssignedTo: data.currentAssignedTo,
        description: data.description,
        Bug_Status: data.Bug_Status,
        priority: data.priority,
        file: data.file[0],
      };

      const response = await API.post("ticket/esclate", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }});

      console.log(response);

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
  return (
    <div className="raiseTicketContainer">
     <form onSubmit={handleSubmit(formSubmit)} >
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
          ></textarea>
        </div>
        <div className="input-feilds">
          <label htmlFor="priority">Priority</label>
          <select
            {...register("priority")}
            style={{ width: "200px", height: "39px" }}
          >
            <option value="">Select Priority</option>
            <option value="High">High</option>
            <option value="Mid">Mid</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="diff-bg input-feilds">
          <label htmlFor="Bug_Status">Bug Status</label>
          <select
            {...register("Bug_Status")}
            style={{ width: "200px", height: "39px" }}
          >
            <option value="">Select Bug Status</option>
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
        <div className="input-feilds">
          <label htmlFor="assigneTo">Assigned to</label>
          <select
            {...register("currentAssignedTo")}
            style={{ width: "200px", height: "39px" }}
          >
            <option value="">Select Assigned To</option>
            {staffData.map((value, index) => (
              <option key={index} value={value.email}>
                {`${value.firstName} ${value.lastName}`}
              </option>
            ))}
          </select>
        </div>
        <div className="diff-bg input-feilds">
          <label htmlFor="file">File</label>
          <input type="file" name="file" {...register("file")} />

        </div>
        <div>
          <button className="btn btn-clr" type="submit">
            Submit
          </button>
        </div>
        <div>
          <button className="btn" onClick={formReset}>
            Reset
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default EscalateTicket;
