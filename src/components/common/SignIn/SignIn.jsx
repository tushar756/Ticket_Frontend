 
import "./SignIn.scss";
import CompanyLogo from "../../../assets/Company Logo/Trace logo (icon).png";
import frame1 from "../../../assets/SignIn/login-bg-1.56c9631ae3f94566edf1.png";
import frame2 from "../../../assets/SignIn/login-bg-2.1849e4c7937f58dea242.png";
import frame3 from "../../../assets/SignIn/login-bg-3.fa795b479d7cb5528ff0.png";
import capsule from "../../../assets/SignIn/capsule.png";
import { useForm } from "react-hook-form";
import api from "../../../utils/Api/contact";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const form = useForm({defaultValues:{
    email:"",
    password:""
  }})
  const navigate = useNavigate()
  const { register, handleSubmit } = form;
  const formSubmit = async(data) => {
    try {
      const response = await api.post("/auth/signin",{
        ...data
      })

      if (response.status==200) {
        if (response.data.data.user.role==="manager") {
          navigate("/manager/dashboard");
        }
        else{
          navigate("/staff/dashboard");

        }
      }
      toast.success("login Succesfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      localStorage.setItem("user",JSON.stringify(response.data.data.user))
      localStorage.setItem("token",response.data.data.token)

    } catch (error) {
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
  return (
    <div className="singin-container">
      <div className="signin-left">
        <div className="singin-left-main">
          <img src={CompanyLogo} alt="" className="logo-main" width={"60px"} />
          <h1>Harmony Discout Phamacy</h1>
        </div>
        <h1 className="left-heading">
          Elevate productivity with our seamless employee task assignment
          solution.
        </h1>
        <img src={frame1} className="bg-1" alt="" />
        <img src={frame2} className="bg-2" alt="" />
        <img src={frame3} className="bg-3" alt="" />
        <img src={capsule} className="bg" alt="" />
      </div>
      {/* ------------------Form-------------------- */}
      <div className="signin-right">
        <div className="container">
          <h3>Sign In</h3>
          <form action="#"  onSubmit={handleSubmit(formSubmit)}>
            <div className="form-group">
              <label htmlFor="email">Work/Official Email</label>
              <input
                type="email"
                id="email"
                placeholder="Jack@example.com"
                className="form-control"
                {...register('email')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" className="form-control"  {...register('password')}/>
            </div>
            <div className="form-group space-setting">
              <label htmlFor="manager">MANAGER</label>
              <input type="radio" value="manager" id="manager" defaultChecked={true}  {...register('role')}/>

              <label htmlFor="staff">Staff</label>
              <input type="radio" id="staff" value="staff" {...register('role')} />
            </div>
            <div className="form-group">
              <button className="submit-button">Sign In</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
