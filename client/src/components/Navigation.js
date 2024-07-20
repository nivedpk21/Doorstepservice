import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./navigation.css";
import Avatar from "@mui/material/Avatar";

export default function Navigation() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const logout = () => {
    localStorage.clear("role");
    localStorage.clear("token");

    navigate("/");
  };
  const location = window.location;
  console.log(location);

  return (
    <>
      <header>
        {/*----------------------------navigation------------------------------------------------- */}

        {role === "admin" ? ( // ADMIN-----------------------------------
          <>
            <nav className="navbar navbar-expand-lg bg-body-light sticky-top border-bottom">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                  <img
                    className="d-inline-block align-text-center"
                    src="./images/repairing-service.png"
                    alt="logo"
                    width="45"
                  />
                  Doorstep Service
                </NavLink>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <NavLink className="nav-link" to="/">
                        Homes
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link" to="/verifications">
                        Verifications
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link " to="/jobapprovals">
                        JobApprovals
                      </NavLink>
                    </li>
                  </ul>

                  <div>
                    <div className="logout-div">
                      <Avatar
                        sx={{ width: "29px", height: "29px", backgroundColor: "green" }}
                        alt="Remy Sharp"
                        src="#"
                      >
                        A
                      </Avatar>
                      <button
                        onClick={logout}
                        className="btn btn-danger btn-sm"
                        style={{ marginLeft: "6px" }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </>
        ) : role === "user" ? ( // USER ----------------------------------
          <>
            <nav className="navbar navbar-expand-lg bg-body-light sticky-top border-bottom">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                  <img
                    className="d-inline-block align-text-center"
                    src="./images/repairing-service.png"
                    alt="logo"
                    width="45"
                  />
                  Doorstep Service
                </NavLink>
                <button
                  style={{ color: "white", backgroundColor: "white" }}
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink className="nav-link " aria-current="page" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/searchservice">
                        Services
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link " to="/postjob">
                        Postjob
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link " to="/viewjob">
                        Viewjobs
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link " to="/userappointments">
                        Appointments
                      </NavLink>
                    </li>
                    <li className="nav-item d-none">
                      <NavLink className="nav-link " to="/usermessages">
                        Messages
                      </NavLink>
                    </li>
                  </ul>

                  <div>
                    <div className="logout-div">
                      <Avatar
                        sx={{ width: "39px", height: "39px", backgroundColor: "black" }}
                        alt="Remy Sharp"
                        src="#"
                      >
                        U
                      </Avatar>
                      <button
                        onClick={logout}
                        className="btn btn-danger"
                        style={{ width: "70px", height: "35px", padding: "0", marginLeft: "6px" }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </>
        ) : role == "buissness" ? ( // BUSINESS-----------------------------
          <>
            <nav class="navbar navbar-expand-lg bg-body-light sticky-top border-bottom">
              <div class="container-fluid">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink
                        activeClassName="active"
                        className="nav-link"
                        to="/viewbuissnessprofile"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/viewjoblistings">
                        Searchjobs
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/applications">
                        Applications
                      </NavLink>
                    </li>
                    <li class="nav-item">
                      <NavLink className="nav-link" activeClassName="active" to="/enquiries">
                        Enquiries
                      </NavLink>
                    </li>
                    <li class="nav-item dropdown">
                      <NavLink
                        className="nav-link dropdown-toggle"
                        style={{ color: "black" }}
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Appointments
                      </NavLink>
                      <ul class="dropdown-menu">
                        <li>
                          <NavLink
                            className="nav-link"
                            activeClassName="active"
                            to="/buissnessappointments"
                          >
                            Job Contracts
                          </NavLink>
                        </li>
                        <li>
                          <NavLink className="nav-link" activeClassName="active" to="/jobbookings">
                            Bookings
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item d-none">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/buissnessmessages"
                      >
                        Messages
                      </NavLink>
                    </li>
                  </ul>
                  <div>
                    <div className="logout-div">
                      <Avatar sx={{ width: "39px", height: "39px" }} alt="Remy Sharp" src="#">
                        B
                      </Avatar>
                      <button
                        onClick={logout}
                        className="btn btn-warning"
                        style={{ width: "70px", height: "35px", padding: "0", marginLeft: "6px" }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </>
        ) : (
          <>
            <nav className="border-bottom navbar navbar-expand-lg bg-body-light sticky-top">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                  <img
                    className="d-inline-block align-text-center"
                    src="./images/repairing-service.png"
                    alt="logo"
                    width="45"
                  />
                  Doorstep Service
                </NavLink>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto ms-auto mb-2">
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link">
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link">
                        Register
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </>
        )}
      </header>
    </>
  );
}
