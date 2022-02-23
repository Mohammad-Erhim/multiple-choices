import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSpeechSynthesis } from "react-speech-kit";
import { Link } from "react-router-dom";
import { appActions, authActions, RootState } from "../store";
import { Answer, Err, Question } from "../util/ts";

function Exam() {
  const [loading, setLoading] = useState(false);
  const { speak } = useSpeechSynthesis();
  const [errs, setErrs] = useState<Err[]>([]);
  const [question, setQuestion] = useState<Question>();
  const [answer, setAnswer] = useState<Answer>();

  const [options, setOptions] = useState<Answer[]>([]);
  const { questionNumber } = useSelector((state: RootState) => state.app);
  const { token } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/questions?skip=${questionNumber}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setQuestion(res.data.question);

        setOptions(res.data.options);
        speak({ text: res.data.question.text });
      } catch (error: any) {
        if (error?.response?.status === 401) {
          dispatch(authActions.setToken(null));
        }
        if (error?.response?.status === 404) {
          dispatch(appActions.resetQuestionNumber());
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [questionNumber]);

  const answerQuestion = async (_id: string) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/question/" + question?._id + "/answer/",
        {
          answerRef: _id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setAnswer(res.data.answer);
      dispatch(authActions.setUser(res.data.answer));
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setErrs(error.response.data.data);
      }
      setLoading(false);
    }
  };

  return (
    <div className="exam-content">
      {" "}
      <div className="exam-content__question">
        <button onClick={() => speak({ text: question?.text })}>
           {question?.text}
        </button>
      </div>
      {!loading && !answer && (
        <div className="exam-content__options">
          {options.map((option) => (
            <button
              style={{ display: "block" }}
              key={option._id}
              onClick={() => answerQuestion(option._id)}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
      {answer && (
        <div className="exam-content__answer">
          <span> {answer.text}</span>
          <button
            onClick={() => {
              setAnswer(undefined);
              dispatch(appActions.incQuestionNumber());
            }}
          >
            next
          </button>
        </div>
      )}
    </div>
  );
}

export default Exam;
