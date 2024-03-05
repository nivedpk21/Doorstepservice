import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const logout = () => {
    localStorage.clear("role");
    localStorage.clear("token");

    navigate("/");
  };

  return (
    <>
      <header>
        {/* header section */}
        <div
          className="container-fluid border-bottom"
          style={{
            width: "100%",
            height: "80px",
            background: "white",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", padding: "20px", width: "50%" }}>
            <div style={{}}>
              <img src="./images/repairing-service.png" style={{ width: "45px" }} alt="logo" />
            </div>

            <div style={{ padding: "5px" }}>
              <h3>Doorstep Service</h3>
            </div>
          </div>

          <div style={{ width: "50%", textAlign: "end", padding: "21px" }}>
            {role == "admin" ? (
              <>
                <button onClick={logout} type="button" class="btn btn-danger">
                  Logout
                </button>
              </>
            ) : role == "user" ? (
              <button onClick={logout} type="button" class="btn btn-outline-danger">
                Logout
              </button>
            ) : role == "buissness" ? (
              <button onClick={logout} type="button" class="btn btn-outline--danger">
                Logout
              </button>
            ) : (
              <>
                <button type="button" class="btn btn-outline-success me-1">
                  Login
                </button>
                <button type="button" class="btn btn-warning">
                  Signup
                </button>
              </>
            )}
          </div>
        </div>

        {/* navigation */}

        {role === "admin" ? (
          <nav className="navbar navbar-expand-sm container-fluid border-bottom">
            <button
              className=" navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div class="topnav collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navitem-a navbar-nav mx-auto mb-2 mb-lg-0 p-2">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    HOME
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/verifications">
                    VERIFICATIONS
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/jobapprovals">
                    APPROVALS
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/userprofile">
                    PROFILE
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/buissnessmessages">
                    MESSAGES
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="#">
                    PAYMENTS
                  </a>
                </li>
              </ul>
              <ul className="navitem-b navbar-nav  mb-2 mb-lg-0 ">
                <li className="nav-item"></li>
                <li className="nav-item">
                  <a className="nav-link" href="/login"></a>
                </li>
              </ul>
            </div>
          </nav>
        ) : role === "user" ? (
          <nav className="navbar navbar-expand-sm container-fluid border-bottom">
            <button
              class=" navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="topnav collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navitem-a navbar-nav mx-auto mb-2 mb-lg-0 p-2">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/postjob">
                    Post Job
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/viewjob">
                    View Job
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/userprofile">
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/userappointments">
                    Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/searchservice">
                    Search service
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/usermessages">
                    Messages
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"></a>
                </li>
              </ul>

              <ul className="navitem-b navbar-nav  mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <a></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register"></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login"></a>
                </li>
              </ul>
            </div>
          </nav>
        ) : role == "buissness" ? (
          <nav className="navbar navbar-expand-sm container-fluid border-bottom">
            <button
              className=" navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="topnav collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navitem-a navbar-nav mx-auto mb-2 mb-lg-0 p-2">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/viewjoblistings">
                    Search jobs
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/buissnessprofile">
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/buissnessappointments">
                    Appointments
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/applications">
                    Applications
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/enquiries">
                    Enquiries
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/buissnessmessages">
                    Messages
                  </a>
                </li>
               
              </ul>
              <ul className="navitem-b navbar-nav  mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <a></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register"></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login"></a>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-sm container-fluid border-bottom">
            <button
              className=" navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div class="topnav collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navitem-a navbar-nav mx-auto mb-2 mb-lg-0 p-2">
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
              </ul>
              <ul className="navitem-b navbar-nav  mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <a className="nav-link" href="/register"></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login"></a>
                </li>
              </ul>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
