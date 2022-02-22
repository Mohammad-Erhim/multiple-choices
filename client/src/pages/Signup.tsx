import axios from "axios";
import { FC, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

interface Err {
  location: string;
  msg: string;
  param: string;
  value: string;
}
function Signup() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <form onSubmit={onSubmit}>
      <span>Signup</span>
      <div>
        <span>Name</span>{" "}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        ></input>
        <span>{errs.find((e) => e.param === "name")?.msg}</span>
      </div>
      <div>
        <span>Email</span>{" "}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <span>{errs.find((e) => e.param === "email")?.msg}</span>
      </div>{" "}
      <div>
        <span>Password</span>{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <span>{errs.find((e) => e.param === "password")?.msg}</span>
      </div>{" "}
      <div>
        <span>Re-Password</span>{" "}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <span>{errs.find((e) => e.param === "confirmPassword")?.msg}</span>
      </div>
      <button type="submit">Signup</button>
      <Link className="link" to="/login">
        Do you have an account?
      </Link>
    </form>
  );
}
export default Signup;
