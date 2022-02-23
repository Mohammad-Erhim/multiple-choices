import axios from "axios";
import { FC, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

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
const Signup: FC = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [foucs, setFoucs] = useState<Inputs|null>(null);
  const [errs, setErrs] = useState<Err[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.post("/signup", {
        name,
        email,
        password,
        confirmPassword,
      });
      history.push("/login");
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setErrs(error.response.data.data);
      }
      setLoading(false);
    }
  };
  return (
    <form className="form init-animation" onSubmit={onSubmit}>
      
 
      <span className="title">Signup "Multiple Choices"</span>
      <div
        className={`form__input ${
          foucs === Inputs.Name || name ? "focus" : ""
        } ${errs.find((e) => e.param === "name")?.param ? "err" : ""}`}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          onFocus={() => setFoucs(Inputs.Name)}
          onBlur={() => setFoucs(null)}
        ></input>

        <span className="label">Name</span>
        <span className="err">{errs.find((e) => e.param === "name")?.msg}</span>
      </div>
      <div
        className={`form__input ${
          foucs === Inputs.Email || email ? "focus" : ""
        } ${errs.find((e) => e.param === "email")?.param ? "err" : ""}`}
      >
        <input
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
      <div
        className={`form__input ${
          foucs === Inputs.ConfirmPassword || confirmPassword ? "focus" : ""
        } ${errs.find((e) => e.param === "confirmPassword")?.param ? "err" : ""}`}
      >
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setFoucs(Inputs.ConfirmPassword)}
          onBlur={() => setFoucs(null)}
        ></input>

        <span className="label">Re-Password</span>
        <span className="err">
          {errs.find((e) => e.param === "confirmPassword")?.msg}
        </span>
      </div>
      <button type="submit" className={`btn ${loading?'disable-btn':''}`}>
        Signup
      </button>
      <Link className="link" to="/login">
        Do you have an account?
      </Link>
    </form>
  );
};
export default Signup;

 