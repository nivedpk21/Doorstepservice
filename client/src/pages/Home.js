import React, { useState } from "react";
import "./home.css";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <React.Fragment>
      <Navigation />
      <>
        <section>
          <div className="row justify-content-center align-items-center ">
            <div className="landing-textdiv col-12 col-sm-12 col-md-12 col-lg-6 ">
              <h1>Experience effortless service booking. Elevate your routine with us!</h1>
              <p>Explore seamless booking services for home </p>
              <div className="landing-buttondiv">
                <Link
                  to={"/login"}
                  type="button"
                  className="btn rounded-0 m-1"
                  style={{ backgroundColor: "#1F2938", color: "white", fontFamily: "serif" }}
                >
                  Login
                </Link>
                <Link
                  to={"/register"}
                  type="button"
                  className="btn btn-outline-dark rounded-0"
                  style={{ fontFamily: "serif" }}
                >
                  Register
                </Link>
              </div>
            </div>
            {/* landing image div */}
            <div className="landing-imagediv col-12 col-sm-12 col-md-12 col-lg-6 ">
              <img src="./images/Designer.png" className="img-fluid " alt="image" />
            </div>
          </div>
        </section>

        {/* categories section */}
        <section>
          <div className="categories-div">
            <div style={{ marginTop: 70, marginBottom: 50 }}>
              <h3 style={{ textAlign: "center" }}>Explore Best Categories</h3>
              <p style={{ textAlign: "center" }}>
                blanditiis praesentium voluptatum deleniti atque corrupti quos dolores <br />
                voluptatum deleniti atque corrupti quos dolores
              </p>
            </div>
            <div className="row justify-content-center align-items-center">
              <div className="card col-2 col-sm-2 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/avatar.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Electrition</p>
              </div>
              <div className="card col-2 col-sm-2 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/plumber.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Plumber</p>
              </div>
              <div className="card col-2 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/carpenter.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Carpenter</p>
              </div>
              <div className="card col-5 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/gardening.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Gardener</p>
              </div>
              <div className="card col-5 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/painter.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Painter</p>
              </div>
              <div className="card col-5 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/pest-control.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Pestcontrol</p>
              </div>
            </div>
          </div>
        </section>

        {/* registration section */}
        <section >
          <div className="row">
            <div className="buissness-div col-sm-12 col-md-6 col-lg-6">
              <h3 style={{ textAlign: "center", color: "black", marginTop: 75 }}>
                Ready to boost your business?
              </h3>
              <p style={{ textAlign: "center", color: "black" }}>
                Sign up now and enjoy the benefits of a strong local online presence!
              </p>
              <Link
                to={"/register"}
                className="btn btn-dark"
                style={{ marginTop: 25, padding: 15 }}
              >
                Buissness Registration
              </Link>
            </div>
            <div className="user-div col-sm-12 col-md-6 col-lg-6">
              <h3 style={{ textAlign: "center", color: "white", marginTop: 75 }}>
                Looking for local services?
              </h3>
              <p style={{ textAlign: "center", color: "white" }}>
                Join us now to discover a variety of offerings from businesses in your area
              </p>
              <Link
                to={"/register"}
                className="btn btn-light"
                style={{ marginTop: 25, padding: 15 }}
              >
                User Registration
              </Link>
            </div>
          </div>
        </section>

        <div className="white-space container-fluid"></div>
      </>

      <Footer />
    </React.Fragment>
  );
}
