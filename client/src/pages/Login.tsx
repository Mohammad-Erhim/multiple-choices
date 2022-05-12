import axios from "axios";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
 
import { Link } from "react-router-dom";
import { authActions } from "../store";

enum Inputs {
  Name,
  Email,
  Password,
  ConfirmPassword,
}

interface Err {
  location: string;
  msg: string;
  param: string;
  value: string;
}


const Login: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("111111");

  const [foucs, setFoucs] = useState<Inputs|null>(null);
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
    <form onSubmit={onSubmit} className="form init-animation">
  
      <span className="title">Login in "Multiple Choices"</span>
      <div
        className={`form__input ${
          foucs === Inputs.Email || email ? "focus" : ""
        } ${errs.find((e) => e.param === "email")?.param ? "err" : ""}`}
      >
        <input
           data-testid="email-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFoucs(Inputs.Email)}
          onBlur={() => setFoucs(null)}
        ></input>

        <span className="label">Email</span>
        <span className="err">
          {errs.find((e) => e.param === "email")?.msg}
        </span>
      </div>{" "}
      <div
        className={`form__input ${
          foucs === Inputs.Password || password ? "focus" : ""
        } ${errs.find((e) => e.param === "password")?.param ? "err" : ""}`}
      >
        <input
           data-testid="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFoucs(Inputs.Password)}
          onBlur={() => setFoucs(null)}
        ></input>
        <span className="label">Password</span>
        <span className="err">
          {errs.find((e) => e.param === "password")?.msg}
        </span>
      </div>{" "}
      <button        data-testid="login-button" type="submit" className={`btn ${loading?'disable-btn':''}`}>
        Login
      </button>
       
      <Link className="link" to="/signup">
        If you have not account signup
      </Link>
    </form>
  );
};
export default Login;
