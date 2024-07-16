import React, { useState } from "react";
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
        <div className="container-fluid header-container border-bottom">
          <div>
            <div className="brand-div">
              <img className="brand-logo" src="./images/repairing-service.png" />
              <h3 className="brand-name">Doorstep Service</h3>
            </div>
          </div>
        </div>
      </header>
      <header className="border-bottom">
        {/*----------------------------navigation------------------------------------------------- */}

        {role === "admin" ? ( // ADMIN----------------------------------
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
                      <a className="nav-link" aria-current="page" href="/">
                        Homes
                      </a>
                    </li>
                    <li class="nav-item">
                      <a className="nav-link" href="/verifications">
                        Verifications
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " href="/jobapprovals">
                        JobApprovals
                      </a>
                    </li>
                    {/* <li class="nav-item">
                      <a class="nav-link " href="/adminmessage">
                        Messages
                      </a>
                    </li> */}
                  </ul>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Avatar
                      sx={{ width: "39px", height: "39px", backgroundColor: "green" }}
                      alt="Remy Sharp"
                      src="#"
                    >
                      A
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
            </nav>
          </>
        ) : role === "user" ? ( // USER ----------------------------------
          <>
            <nav class="navbar navbar-expand-lg bg-body-light sticky-top border-bottom">
              <div class="container-fluid">
                <button
                  style={{ color: "white", backgroundColor: "white" }}
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
                      <a class="nav-link " aria-current="page" href="/">
                        Home
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="/searchservice">
                        Services
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " href="/postjob">
                        Postjob
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " href="/viewjob">
                        Viewjobs
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " href="/userappointments">
                        Appointments
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link " href="/usermessages">
                        Messages
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
            </nav>
          </>
        ) : role == "buissness" ? (
          <>
            <nav class="navbar navbar-expand-lg bg-body-light sticky-top">
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
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Appointments
                      </a>
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
                    <li class="nav-item">
                      <NavLink
                        className="nav-link"
                        activeClassName="active"
                        to="/buissnessmessages"
                      >
                        Messages
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
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
            </nav>
          </>
        ) : (
          <>
            <nav className="border-bottom navbar navbar-expand-lg bg-body-light sticky-top">
              <div className=" container-fluid">
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
                <div class=" collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <NavLink to="/" className="nav-link" activeClassName="active">
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
