import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../components/Navigation";

export default function Buissnessprofile() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/buissness/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response, "response consoled");
        const profileData = response.data.data;
        setData(profileData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navigation />

      <section>
        <div
          className="container-fluid border border-dark"
          style={{
            height: "300px",
            backgroundColor: "#016551",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            className="container border- imagecontainer"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div>
              <img
                src="/images/smartphone.jpg"
                class="img-fluid"
                alt="..."
                style={{ width: "180px", borderRadius: "12px" }}
              />
            </div>
            <div
              className=" border-"
              style={{
                width: "400px",
                height: "100%",
                // backgroundColor: "blue",
                padding: "20px",
              }}
            >
              <div>
                <button
                  className="btn  border border-2"
                  style={{
                    height: "25px",
                    width: "50px",
                    padding: "0px",
                    fontFamily: "serif",
                    backgroundColor: "#7bbd15",
                    color: "white",
                  }}
                >
                  Open
                </button>
              </div>
              <div style={{ marginTop: "13px", color: "white" }}>
                <h5>{data.businessname}</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <div>
                  <p
                    style={{
                      border: "1px solid",
                      padding: "4px",
                      fontFamily: "serif",
                      color: "white",
                    }}
                  >
                    {data.category}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      border: "1px solid",
                      padding: "4px",
                      fontFamily: "serif",
                      color: "white",
                    }}
                  >
                    Location
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      border: "1px solid",
                      padding: "4px",
                      fontFamily: "serif",
                      color: "white",
                    }}
                  >
                    hourly pay
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      border: "1px solid",
                      padding: "4px",
                      fontFamily: "serif",
                      color: "white",
                    }}
                  >
                    Experience
                  </p>
                </div>
              </div>
              <div style={{ marginTop: "5px" }}>
                <h6 style={{ color: "orange" }}>4.5 * * * * *</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            // border: "1px solid green",
            marginTop: "50px",
            padding: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            className="border border-2 row container"
            style={{ padding: "10px", borderRadius: "10px" }}
          >
            <div className=" col-sm-12 col-lg-7 p-1">
              <div
                className=" border border-2 rounded"
                style={{
                  height: "250px",
                  // border: "1px solid blue",
                  borderRadius: "10px",
                  padding: "20px",
                  // backgroundColor:"#d0dce5"
                }}
              >
                <h5>About</h5>
                <p style={{ fontFamily: "serif", marginTop: "30px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  <br /> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
            <div className=" col-sm-12 col-lg-5 p-1 ">
              <div
                className=" border border-2 rounded"
                style={{
                  height: "250px",
                  // border: "1px solid red",
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ height: "166px" }}>
                  <h5>Address</h5>
                  <p style={{ fontFamily: "serif", marginTop: "30px" }}>
                    ABC Archade , Old Street ,<br /> NewYork City ,<br />
                    USA
                  </p>
                </div>

                <div
                  className="border border-2 rounded"
                  style={{
                    height: "80px",
                    // border: "1px solid black",
                  }}
                >
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic outlined example"
                    style={{ padding: "20px" }}
                  >
                    <button type="button" class="btn btn-outline-success">
                      Edit
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      type="button"
                      class="btn btn-outline-success"
                    >
                      Delete
                    </button>
                    <button type="button" class="btn btn-outline-success">
                      none
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="border border-2 rounded "
          style={{
            backgroundColor: "white",
            display: "flex",
            // border: "1px solid black",
            marginTop: "50px",
            padding: "50px",
          }}
        >
          <div className="border border-2 " style={{ width: "70%", height: "300px" }}>
            <div></div>
          </div>
          <div className="border border-2" style={{ width: "30%", height: "300px" }}>
            map location
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            // border: "1px solid black",
            marginTop: "50px",
            padding: "50px",
            // backgroundColor:"#C8FCEB"
          }}
        >
          <div
            style={{
              width: "70%",
              height: "300px",
              border: "1px solid black",
              margin: "auto",
            }}
          >
            Ratings and reviews
          </div>
        </div>
      </section>
    </>
  );
}
