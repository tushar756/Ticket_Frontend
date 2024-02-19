import React from "react";
import "./style.scss";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
 
import API from '../../../../utils/Api/api'
import { toast } from "react-toastify";
 
const CreateStaff = () => {
  const form = useForm();
  const { register, control, handleSubmit, reset } = form;
  const formSubmit = async (data) => {
    try {
      const response = await API.post("manager/create-user", { ...data });
      if (response.data.error === false) {
      toast.success("Staff Created Succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      formReset();
    }
    } catch (error) {
      toast.error("Failed to create user", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    
  };
  const formReset = () => {
    reset();
  };
  return (
    <div className="addStaffContainer">
      <form action="#" onSubmit={handleSubmit(formSubmit)}>
        <div className="name">
          <h2>Add Staff</h2>
        </div>
        <div className="diff-bg input-feilds">
          <label htmlFor="firstname">First Name</label>
          <input type="text" {...register("firstName")} id="firstname" />
        </div>
        <div className="diff-bg input-feilds">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" {...register("lastName")} id="lastname" />
        </div>
        <div className="diff-bg input-feilds">
          <label htmlFor="email">Email</label>
          <input type="text" {...register("email")} id="email" />
        </div>
        <div className="diff-bg input-feilds">
          <label htmlFor="password">Password</label>
          <input type="password" {...register("password")} id="password" />
        </div>
        <div className="" style={{ display: "flex" }}>
          <label htmlFor="role">MANAGER</label>
          <input
            type="radio"
            value="manager"
            defaultChecked={true}
            {...register("role")}
          />

          <label htmlFor="">Staff</label>
          <input type="radio" value="staff" {...register("role")} />
        </div>

        <div>
          <button className="btn btn-clr">Add</button>
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

export default CreateStaff;
