import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./components/Shared/Login/Signup";
import Login from "./components/Shared/Login/Login";
import ProvideAuth from "./components/Shared/ProvideAuth/ProvideAuth";
import AdminRoute from "./components/Shared/AdminRoute/AdminRoute";
import EmployerJobPosting from "./components/Employer/EmployerJobPosting";

const App = () => {
  return (
    <ProvideAuth>
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <Home /> */}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <AdminRoute path="/addJob">
            <EmployerJobPosting />
          </AdminRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

export default App;
