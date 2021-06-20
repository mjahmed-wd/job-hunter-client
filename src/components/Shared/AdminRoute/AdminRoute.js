import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../ProvideAuth/ProvideAuth";
// import { AuthContext } from "../ProvideAuth/ProvideAuth";


const AdminRoute = ({ children, ...rest }) => {
    const {currentUser}=useContext(AuthContext)

// const auth = useAuth()
const user=currentUser
console.log("AdminRoute",user.role==="Employer")

  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user&& user.role==="Employer") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AdminRoute;