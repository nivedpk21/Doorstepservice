import React from "react";
import "./home.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <>
        <section>
          <div
            className="image-div"
            style={{
              width: "100%",
              minHeight: 590,
              border: "0px solid black",
              textAlign: "center",
              backgroundColor: "#87A922",
            }}
          >
            <div style={{ paddingTop: 75 }}>
              <h1 style={{ color: "white" }}>Discover the Excellence in Local Services</h1>
              <p style={{ color: "white" }}>
                Your One-Stop Destination for Reliable and Skilled Professionals.
                <br />
                Connecting You with Trusted Service Providers <br />
                in Your Neighborhood.
              </p>
            </div>
            <div
              className="container"
              style={{
                border: "1px solid black",
                borderRadius: 10,
                marginTop: 60,
                width: "60%",
                padding: "15px",
                paddingTop: "5px",
                paddingBottom: "5px",
                backgroundColor: "grey",
              }}
            >
              <div className="row">
                <div className="col-12 col-sm-12 col-lg-5 p-1">
                  <select style={{ textAlign: "center" }} className="form-select" aria-label="Default select example">
                    <option selected="">Category</option>
                    <option value={1}>Electrical</option>
                    <option value={2}>Plumbing</option>
                    <option value={3}>Carpentry</option>
                  </select>
                </div>
                <div className="col-12 col-sm-12 col-lg-4  p-1">
                  <select style={{ textAlign: "center" }} className="form-select" aria-label="Default select example">
                    <option selected="">City</option>
                    <option value={1}>Kochi</option>
                    <option value={2}>Calicut</option>
                    <option value={3}>Kannur</option>
                  </select>
                </div>
                <div className="col-12 col-sm-12 col-lg-3 d-grid gap-2 d-md-block  p-1">
                  <button style={{ width: "100%" }} className="btn btn-success">
                    Search
                  </button>
                </div>
              </div>
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
                backgroundColor: "#F4CE14",
                padding: 30,
                textAlign: "center",
              }}
            >
              <h3 style={{ textAlign: "center", color: "white", marginTop: 75 }}>Ready to boost your business?</h3>
              <p style={{ textAlign: "center", color: "white" }}>
                Sign up now and enjoy the benefits of a strong local online presence!
              </p>
              <button className="btn btn-light" style={{ marginTop: 25, padding: 15 }}>
                Buissness Registration
              </button>
            </div>
            <div
              className="col-sm-12 col-md-6 col-lg-6"
              style={{ padding: 30, textAlign: "center", backgroundColor: "#87A922" }}
            >
              <h3 style={{ textAlign: "center", color: "white", marginTop: 75 }}>Looking for local services?</h3>
              <p style={{ textAlign: "center", color: "white" }}>
                Join us now to discover a variety of offerings from businesses in your area
              </p>
              <button className="btn btn-light" style={{ marginTop: 25, padding: 15 }}>
                User Registration
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className="container-fluid" style={{width:"100%",height:"300px"}}> 

          </div>
        </section>
      </>

      <Footer />
    </React.Fragment>
  );
}
