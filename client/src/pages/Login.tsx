import axios from "axios";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
 
import { Link } from "react-router-dom";
import { authActions } from "../store";
import { Err } from "../util/ts";


const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  const [errs, setErrs] = useState<Err[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/login", {
        email,
        password,
      });
 
      dispatch(authActions.setToken(res.data.token));
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setErrs(error.response.data.data);
      }
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit}  >
     
      <span >Login in </span>
      <div
         
      >
       
        <span >Email</span> <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        
        ></input>

        <span>
          {errs.find((e) => e.param === "email")?.msg}
        </span>
      </div>{" "}
      <div
       
      >
    <span  >Password</span>       <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        
        ></input>
     
        <span  >
          {errs.find((e) => e.param === "password")?.msg}
        </span>
      </div>{" "}
      <button type="submit" >
        Login
      </button>
      <div>
     
      <Link   to="/signup">
        If you have not account signup
      </Link></div>
    </form>
  );
};
export default Login;
