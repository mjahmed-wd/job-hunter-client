import React, { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../ProvideAuth/ProvideAuth";
import "./Header.css";

const Header = () => {
  //   const [user, setUser] = useContext(UserContext);
  const { currentUser, auth } = useContext(AuthContext);

  const handleLogOut = () => {
    auth.signout().then((res) => console.log("user singed out response"));
  };
  let history = useHistory();
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="navbar navbar-dark bg-dark"
        sticky="top"
      >
        <Container>
          <Link to="/">
            <Navbar.Brand>Job Hunter</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              {currentUser === null && (
               <>
                <Link
                  to="/login"
                  style={{
                    color: "white",
                    backgroundColor: "#EFA522",
                    borderRadius: "5px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={{
                    color: "white",
                    backgroundColor: "#EFA522",
                    borderRadius: "5px",
                    paddingLeft: "25px",
                    paddingRight: "25px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    marginLeft: "10px"
                  }}
                >
                  Sign Up
                </Link>
               </>
              )}

              {currentUser && (
                <>
                  <Nav.Link
                    onClick={
                      () => history.push("/dashboard")
                    }
                  >
                    Dashboard
                  </Nav.Link>
                  <NavDropdown
                    title={currentUser?.displayName}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item className="w-100">
                      <h6 onClick={() => history.push("/orders")}>
                        My Activity
                      </h6>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <button
                        onClick={() => handleLogOut()}
                        className="btn btn-warning"
                      >
                        Log Out
                      </button>
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;