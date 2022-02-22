import axios from "axios";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { authActions, RootState } from "../store";

function Home  () {
 
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {token,user}  = useSelector((state: RootState) => state.auth);
 
    const history = useHistory();

    useEffect(()=>{
     ( async () => {
        try {
          setLoading(true);
           const res=await axios.get(
            "/me",
     
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
 
     
          dispatch(authActions.setUser(res.data.user));
        } catch (error: any) {
          if (error?.response?.status === 401)
             { dispatch(authActions.setToken(null)); 
             }
     
        } finally {
          setLoading(false);
        }
      })()
    },[])

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
        if (error?.response?.status === 401)
           { dispatch(authActions.setToken(null));dispatch(authActions.setUser(null));
           }
      
      } finally {  setLoading(false);
      }
    };
 
    
  return (
    <>
 
 <button
        onClick={logout}
        
      >
        Log out 
      </button>
      <button
        onClick={()=>history.push('/add')}
        
      >
      Add
      </button> 
       <button
        onClick={()=>history.push('/exam')}
        
      >
      Exam
      </button>
      <div>
        <span>Success: {user?.success}</span>
        <span>Fail: {user?.fail}</span>
      </div>
    </>
  );
};

export default Home;
