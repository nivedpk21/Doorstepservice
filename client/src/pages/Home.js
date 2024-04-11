import React from "react";
import "./home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function Home() {
  return (
    <React.Fragment>
      <Navigation />
      <>
        <section>
          <div class="row justify-content-center align-items-center g-1">
            <div
              class="col-12 col-sm-12 col-md-12 col-lg-6  p-5"
              style={{ height: "600px", backgroundColor: "#244034" }}
            >
              <h1
                style={{
                  textAlign: "left",
                  color: "white",
                  fontFamily: "serif",
                  fontSize: "50px",
                  marginTop: "50px",
                }}
              >
                Experience effortless service booking. Elevate your routine with us!
              </h1>
              <p
                style={{
                  textAlign: "left",
                  color: "#d2f34c",
                  fontFamily: "cursive",
                  fontSize: "25px",
                  marginTop: "30px",
                }}
              >
                Explore seamless booking services for home .
              </p>
              <div style={{ textAlign: "left", marginTop: "30px" }}>
                <a
                  href="/login"
                  type="button"
                  class="btn rounded-0 m-1"
                  style={{ backgroundColor: "#d2f34c", color: "black" }}
                >
                  Login
                </a>
                <a href="/register" type="button" class="btn btn-outline-light rounded-0">
                  Register
                </a>
              </div>
            </div>
            <div
              class="col-12 col-sm-12 col-md-12 col-lg-6  p"
              style={{ height: "600px", textAlign: " ", backgroundColor: "#244034" }}
            >
              <img
                style={{ width: "79%" }}
                src="./images/Designer.png"
                class="img-fluid "
                alt="image"
              />
            </div>
          </div>
        </section>

        <section>
          <div style={{ minHeight: 590, marginBottom: 30 }}>
            <div style={{ marginTop: 70, marginBottom: 50 }}>
              <h3 style={{ textAlign: "center" }}>Explore Best Categories</h3>
              <p style={{ textAlign: "center" }}>
                blanditiis praesentium voluptatum deleniti atque corrupti quos dolores <br />
                voluptatum deleniti atque corrupti quos dolores
              </p>
            </div>
            <div
              className="row"
              style={{
                /* display: 'flex', */
                justifyContent: "space-around" /* flexWrap: 'wrap', */,
                alignItems: "center",
              }}
            >
              <div className="card col-6 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="70px" src="../images/avatar.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Electrition</p>
              </div>
              <div className="card col-6 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/plumber.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Plumber</p>
              </div>
              <div className="card col-6 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/carpenter.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Carpenter</p>
              </div>
              <div className="card col-6 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/gardening.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Gardener</p>
              </div>
              <div className="card col-6 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/painter.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Painter</p>
              </div>
              <div className="card col-6 col-sm-6 col-md-4 col-lg-2" style={{}}>
                <img width="65px" src="../images/pest-control.png" alt="" />
                <p style={{ textAlign: "center", fontFamily: "serif" }}>Pestcontrol</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="row" style={{ minHeight: 400, backgroundColor: "#d0dce5" }}>
            <div
              className="col-sm-12 col-md-6 col-lg-6"
              style={{
                backgroundColor: "#f2f9d8",
                padding: 30,
                textAlign: "center",
              }}
            >
              <h3 style={{ textAlign: "center", color: "black", marginTop: 75 }}>
                Ready to boost your business?
              </h3>
              <p style={{ textAlign: "center", color: "black" }}>
                Sign up now and enjoy the benefits of a strong local online presence!
              </p>
              <a href="/register" className="btn btn-dark" style={{ marginTop: 25, padding: 15 }}>
                Buissness Registration
              </a>
            </div>
            <div
              className="col-sm-12 col-md-6 col-lg-6"
              style={{ padding: 30, textAlign: "center", backgroundColor: "#d2f34c" }}
            >
              <h3 style={{ textAlign: "center", color: "white", marginTop: 75 }}>
                Looking for local services?
              </h3>
              <p style={{ textAlign: "center", color: "white" }}>
                Join us now to discover a variety of offerings from businesses in your area
              </p>
              <a href="/register" className="btn btn-light" style={{ marginTop: 25, padding: 15 }}>
                User Registration
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="container-fluid" style={{ width: "100%", height: "300px" }}></div>
        </section>
      </>

      <Footer />
    </React.Fragment>
  );
}
