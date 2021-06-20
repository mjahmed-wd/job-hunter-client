import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Shared/Login/Signup";
import Login from "./components/Shared/Login/Login";
import ProvideAuth from "./components/Shared/ProvideAuth/ProvideAuth";
import AdminRoute from "./components/Shared/AdminRoute/AdminRoute";
import EmployerRoute from "./components/Shared/EmployerRoute/EmployerRoute";
import EmployerJobPosting from "./components/Employer/EmployerJobPosting";
import Home from "./components/Shared/Home/Home";
import EmployerAllJobsPosted from "./components/Employer/EmployerAllJobsByHim";

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <EmployerRoute path="/addJob">
            <EmployerJobPosting />
          </EmployerRoute>
          <EmployerRoute path="/postedJobByMe">
            <EmployerAllJobsPosted />
          </EmployerRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default App;
