import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../ProvideAuth/ProvideAuth";

const JobSeekerRoute = ({ children, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  const user = currentUser;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.role==="Job Seeker" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default JobSeekerRoute;
