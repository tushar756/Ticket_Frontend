import { useEffect, useState } from "react";
import "./raiseTicket.scss";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import API from "../../../utils/Api/api";

const RaiseTicket = () => {
  const [staffData, setStaffData] = useState([]);
  
  // ---------------------------------------Get all Staff Name----------------------------------------------------
  const getAllStaff = async () => {
    const response = await API.get("/manager/getAllStaff");
    setStaffData(response.data.data);
    
  };
  useEffect(() => {
    getAllStaff();
  }, []);
// --------------------------------------------Form Submission-----------------------------------------------
  const form = useForm();
  const { register, handleSubmit, reset } = form;

  const formSubmit = async (formData) => {
    
    try {
      
 
      const { file, ...data } = formData;
      
      // const formDataToSend = new FormData();
 
    // Object.entries(data).forEach(([key, value]) => {
    //   formDataToSend.append(key, value);
    // });
     
    // formDataToSend.append('file', file[0]);
 
    // formDataToSend.append('media_url', 'adsfdf');
    // formDataToSend.append('_id', user._id);

 
    // const response = await API.post("manager/create-ticket", formDataToSend, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
      const response = await API.post(
        "manager/create-ticket",
        {
          ...data,
          media_url: "adsfdf",
     
          // file: file ? file[0] : undefined, // Ensure file exists before accessing index 0
        },
      {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }
      );
 

      if (response.data.error == false) {
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
      console.log(error)
      toast.error(error.response.data.message, {
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
      <form
        onSubmit={handleSubmit(formSubmit)}
        encType="multipart/form-data"
      >
        <div className="title">
          <h2>Report Bug</h2>
        </div>
        {/* --------------Title---------------------- */}
        <div className="diff-bg input-feilds">
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title")} id="title" />
        </div>
        {/* --------------description---------------------- */}
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
        {/* --------------priority---------------------- */}
        <div className="input-feilds">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            {...register("priority")}
            style={{ width: "200px", height: "39px" }}
            defaultValue="" 
          >
            <option value="" disabled  >
              Select Option
            </option>
            <option value="High">High</option>
            <option value="Mid">Mid</option>
            <option value="Low">Low</option>
          </select>
        </div>
        {/* --------------Bug_Status---------------------- */}
        <div className=" diff-bg input-feilds">
          <label htmlFor="Bug_Status">Bug Status</label>
          <select
            id="Bug_Status"
            {...register("Bug_Status")}
            style={{ width: "200px", height: "39px" }}
            defaultValue="" 
          >
            <option value="" disabled  >
              Select Option
            </option>
            <option value="Open">Open</option>
            <option value="Resolved">Resolved</option>
            <option value="Pending">pending</option>
          </select>
        </div>
        {/* --------------Department---------------------- */}
        <div className=" diff-bg input-feilds">
          <label htmlFor="department"  >Department</label>
          <select
            id="department"
            {...register("department")}
            style={{ width: "200px", height: "39px" }}
            defaultValue="" 
          >
            <option value="" disabled  >
              Select Option
            </option>
            <option value="Harmony Pharmacy">Harmony Pharmacy</option>
            <option value="Ebenezer Pharmacy">Ebenezer Pharmacy</option>
            <option value="Both">Both</option>
          </select>
        </div>
        {/* --------------assigneTo---------------------- */}
        <div className="input-feilds">
          <label htmlFor="assigneTo">Assigned to</label>
          <select
            id="assigneTo"
            {...register("currentAssignedTo")}
            style={{ width: "200px", height: "39px" }}
            defaultValue="" 
          >
            <option value="" disabled  >Select Option</option>
            {staffData.map((value, index) => {
              return (
                <option
                  key={index}
                  value={value.email}
                >{`${value.firstName} ${value.lastName}`}</option>
              );
            })}
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
    </div>
  );
};

export default RaiseTicket;
