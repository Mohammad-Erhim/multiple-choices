import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { authActions, RootState } from "../store";
import { Err } from "../util/ts";

function Add() {
  const [loading, setLoading] = useState(false);

  const [errs, setErrs] = useState<Err[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
    <>
      <form onSubmit={onSubmit}>
      <div>
          <span>Question</span>{" "}
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></input>
          <span>{errs.find((e) => e.param === "question")?.msg}</span>
        </div>{" "}     <div>
          <span>Answer</span>{" "}
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          ></input>
          <span>{errs.find((e) => e.param === "answer")?.msg}</span>
        </div>{" "}
       {!loading&& <button type="submit">Add</button>}
      </form>
    </>
  );
}

export default Add;
