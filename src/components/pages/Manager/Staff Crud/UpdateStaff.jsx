 
import "./style.scss";
import { useForm} from "react-hook-form";
import { DevTool } from '@hookform/devtools';
import { useEffect, useState } from "react";
import API from "../../../../utils/Api/api";

import { toast } from "react-toastify";
// import API from "../../../utils/Api/api";
const UpdateStaff = () => {
  const form = useForm();
  const {register,control,handleSubmit,reset,setValue }= form
  const [staffData, setStaffData] = useState([]);
  // ---------------------------------------Get all Staff Name----------------------------------------------------
  const getAllStaff = async () => {
    const response = await API.get("manager/getAllStaff");
    setStaffData(response.data.data);
    // console.log(response.data.data)
  };
  useEffect(() => {
    getAllStaff();
  }, []);
  const formSubmit = async (data)=>{
    try {
    console.log(data)
    const response = await API.post(
      "staff/update-staff",
      {
        ...data,
      }
    )
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
  }
    catch (error) {
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
  }
  const formReset =()=>{
    reset()
  }

  const handleStaffSelection = (event) => {
    const selectedStaffEmail = event.target.value;
    const selectedStaff = staffData.find(staff => staff.email === selectedStaffEmail);
    if (selectedStaff) {
      setValue("firstName", selectedStaff.firstName);
      setValue("lastName", selectedStaff.lastName);
      setValue("email", selectedStaff.email);
      setValue("role", selectedStaff.role); 
      // You may continue setting other form values here
    }
  };
  return (
    <div className="addStaffContainer" >
 
          {/* --------------assigneTo---------------------- */}
          <div className="input-feilds">
          <label htmlFor="assigneTo"><b>Select Staff</b></label>
          <select
            id="assigneTo"
            onChange={handleStaffSelection}
            style={{ width: "200px", height: "39px" }}
          >
            <option value="" disabled>Select Option</option>
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
 
    <form action="#" onSubmit={handleSubmit(formSubmit)}>
        <div className="name">
   
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
    <DevTool control={control}/>
  </div>
  );
}

export default UpdateStaff;
