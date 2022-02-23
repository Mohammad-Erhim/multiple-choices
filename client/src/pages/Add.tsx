import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { authActions, RootState } from "../store";
import { Err } from "../util/ts";
enum Inputs {
  Question,
  Answer,
   
}
function Add() {
 
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [foucs, setFoucs] = useState<Inputs|null>(null);
  const [errs, setErrs] = useState<Err[]>([]);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state: RootState) => state.auth);
  const history = useHistory();

 
  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "/question/",
        {
          question,
          answer,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      history.goBack();
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setErrs(error.response.data.data);
      }
      setLoading(false);
    }
  };

  return (
    <form className="form init-animation" onSubmit={onSubmit}>
      
 
    <span className="title">Add Question</span>
    <div
      className={`form__input ${
        foucs === Inputs.Question || question ? "focus" : ""
      } ${errs.find((e) => e.param === "question")?.param ? "err" : ""}`}
    >
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        type="text"
        onFocus={() => setFoucs(Inputs.Question)}
        onBlur={() => setFoucs(null)}
      ></input>

      <span className="label">Question</span>
      <span className="err">{errs.find((e) => e.param === "question")?.msg}</span>
    </div>
    <div
      className={`form__input ${
        foucs === Inputs.Answer || answer ? "focus" : ""
      } ${errs.find((e) => e.param === "answer")?.param ? "err" : ""}`}
    >
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onFocus={() => setFoucs(Inputs.Answer)}
        onBlur={() => setFoucs(null)}
      ></input>

      <span className="label">Answer</span>
      <span className="err">
        {errs.find((e) => e.param === "answer")?.msg}
      </span>
    </div>{" "}
 
    <button type="submit" className={`btn ${loading?'disable-btn':''}`}>
      Save
    </button>
 
  </form>
  );
}

export default Add;
