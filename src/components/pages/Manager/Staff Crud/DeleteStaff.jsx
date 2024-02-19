 
import "./style.scss";
import { useForm } from "react-hook-form";
 
import { toast } from "react-toastify";
import api from '../../../../utils/Api/contact'
const DeleteStaff = () => {
  const form = useForm();
  const { register, handleSubmit,reset } = form;
  const formReset = () => {
    reset();
  };
  const formSubmit = async(data) => {
    try {
      const response = await api.post("manager/delete-staff",{...data})
 
      if (response.data.error === false) {
      toast.success("Staff Deleted Successfully", {
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

  return (
    <div className="addStaffContainer">
      <form action="#" onSubmit={handleSubmit(formSubmit)}>
        <div className="name">
          <h2>Delete Staff</h2>
        </div>

        <div className="diff-bg input-feilds">
          <label htmlFor="email">
            Email
          </label>
          <input type="text" {...register("email")} id="email" />
        </div>

        <div>
          <button className="btn btn-clr">Delete</button>
        </div>
      </form>
    </div>
  );
};

export default DeleteStaff;
