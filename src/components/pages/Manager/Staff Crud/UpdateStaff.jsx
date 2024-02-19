 
import "./style.scss";
import { useForm} from "react-hook-form";
import { DevTool } from '@hookform/devtools';

const UpdateStaff = () => {
  const form = useForm();
  const {register,control,handleSubmit,reset}= form
  const formSubmit = (data)=>{
    console.log(data)
  }
  const formReset =()=>{
    reset()
  }
  return (
    <div className="addStaffContainer" >
      
    <form action="#" onSubmit={handleSubmit(formSubmit)}>
      <div className="name">
        <h2>Edit Staff</h2>
      </div>
      <div className="diff-bg input-feilds">
        <label   htmlFor="name">Name</label>
        <input type="text" {...register("name")} id="name" />
      </div>
      <div className="diff-bg input-feilds">
        <label   htmlFor="email">Email</label>
        <input type="text" {...register("email")} id="email" />
      </div>
      
   




      <div>
        <button className="btn btn-clr">Add</button>
      </div>
      <div>
        <button className="btn" onClick={formReset}>Reset</button>
      </div>
    </form>
    <DevTool control={control}/>
  </div>
  );
}

export default UpdateStaff;
