import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { appActions, authActions, RootState } from "../store";
let mount = false;
function Home() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { questionNumber } = useSelector((state: RootState) => state.app);

  const history = useHistory();

  useEffect(() => {
    mount = true;
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "/me",

          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (mount) dispatch(authActions.setUser(res.data.user));
      } catch (error:any) {
        if (mount)
          if (error.response.status === 401) {
            dispatch(authActions.setToken(null));
          }
      } finally {
        if (mount) setLoading(false);
      }
    })();
   return ()=>{mount=false;}
  }, []);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(
        "/logout",

        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      
      dispatch(authActions.setToken(null));
      dispatch(authActions.setUser(null));
    } catch (error: any) {
      if (error?.response?.status === 401) {
        dispatch(authActions.setToken(null));
        dispatch(authActions.setUser(null));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="home" className="home-content">
      <div className="home-content__navigation">
        {" "}
        <input
          onChange={(e) =>
            dispatch(appActions.setQuestionNumber(+e.target.value))
          }
          value={questionNumber}
          type="number"
          min={0}
        ></input>
        <button className="btn logout" onClick={logout}>
          Log out
        </button>
        <button className="btn add" onClick={() => history.push("/add")}>
          Add
        </button>
        <button className="btn exam" onClick={() => history.push("/exam")}>
          Exam
        </button>
      </div>
      <div className="home-content__result">
        <span style={{ color: "green" }}>Success: {user?.success}</span>
        <span style={{ color: "red" }}>Fail: {user?.fail}</span>
      </div>
    </div>
  );
}

export default Home;
