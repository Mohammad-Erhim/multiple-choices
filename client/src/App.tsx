
import "./sass/main.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import { FC } from "react";
 

import {  useSelector } from "react-redux";
import {  RootState } from "./store";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Add from "./pages/Add";
import Exam from "./pages/Exam";

 
const App: FC = () => {
  const token  = useSelector((state: RootState) => state.auth).token;
 
  
  return (
    <> 
 
    <Switch>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>

      <Route path="/home" exact>
        <PrivateRoute token={token} auth={true}>
        <Home/>
        </PrivateRoute>
      </Route>
      <Route path="/add" exact>
        <PrivateRoute token={token} auth={true}>
        <Add/>
        </PrivateRoute>
      </Route>

      <Route path="/exam/" exact>
        <PrivateRoute token={token} auth={true}>
      <Exam/>
        </PrivateRoute>
      </Route>
      

      <Route path="/login" exact>
        <PrivateRoute token={token} auth={false}>
    <Login/>
        </PrivateRoute>
      </Route>
      <Route path="/signup" exact>
        <PrivateRoute token={token} auth={false}>
     <Signup/>
        </PrivateRoute>
      </Route>
      
      <Route path="*">not found</Route>
    </Switch>
    </>
  );
};

export default App;

const PrivateRoute = ({
  token,
  children,
  auth,
}: {
  token: string | null;
  children: any;
  auth: boolean;
}) => {
  if (auth) return token ? children : <Redirect to="/login" />;

  return !token ? children : <Redirect to="/home" />;
};
