


import { useEffect, useState } from "react";
// import "./raiseTicket.scss";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import API from "../../../utils/Api/api";
 
const Report = () => {
 
  const form = useForm();
  const { register, handleSubmit, reset } = form;

  const formSubmit = async (formData) => {
    
    try {
      // const { ...data } = formData;
 
      console.log(formData)
      
      const response = await API.post(
        "/staff/createReport",
        {
          ...formData,
          // createdBy:"nothy"
          // media_url: "adsfdf",
          // file: file ? file[0] : undefined, // Ensure file exists before accessing index 0
        },
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
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
      // console.log(error)
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
      <form
        onSubmit={handleSubmit(formSubmit)}
        // encType="multipart/form-data"
      >
        <div className="title">
          <h2>Daily Work Report</h2>
        </div>
        {/* --------------Title---------------------- */}
        {/* <div className="diff-bg input-feilds">
          <label htmlFor="title">Title</label>
          <input type="text" {...register("title")} id="title" />
        </div> */}
        {/* --------------description---------------------- */}
        <div className="input-feilds">
          <label htmlFor="description">Write Here</label>
          <textarea
            {...register("description")}
            style={{ width: "80%", fontSize: "1rem", padding: "5px" }}
            id="description"
            cols="30"
            rows="5"
          ></textarea>
        </div>
       
      
       
        {/* --------------file---------------------- */}
        <div className="diff-bg input-feilds">
          <label htmlFor="file">File</label>
          {/* <input
            type="file"
            id="file"
            name="file"
            {...register("file")}
            accept=".pdf,.doc,.docx,.jpg,.png"
            // required
          /> */}
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

export default Report;
