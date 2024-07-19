import React, { useEffect, useState } from "react";
import "./viewbuissnessprofile.css";
import axios from "axios";
import Navigation from "../../components/Navigation";

export default function Viewbuissnessprofile() {
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
          className="p-1"
          style={{
            width: "100%",
            height: "200px",
            margin: "auto",
            backgroundColor: "#244034",
          }}
        >
          {/* small screen profile */}
          <div className="p-4 small-screen-profile">
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "12px",
                backgroundColor: "white",
              }}
            ></div>
            <div
              className=" rounded"
              style={{ width: "170px", height: "140px", marginLeft: "10px" }}
            >
              <div className="p-">
                <h5 style={{ color: "white", margin: "0" }}>{"data.businessname"}</h5>
                <p style={{ color: "white", margin: "0" }}>{"data.category"}</p>
              </div>

              <div className="p-0 location-div">
                <p style={{ color: "white", margin: "0" }}>Location</p>
                <h5 style={{ color: "white", margin: "0" }}>{"data.city"}</h5>
              </div>

              <div className="p-0">
                <p style={{ color: "white", margin: "0" }}>Business time</p>
                <h5 style={{ color: "white", margin: "0" }}>9:00Am - 10:00Pm</h5>
              </div>
            </div>
          </div>

          {/* small screen profile ---end here */}
          <div className="profile-div container rounded border">
            <div>
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "12px",
                  backgroundColor: "white",
                  margin: "auto",
                  //   marginLeft: "40px",
                }}
              ></div>
            </div>

            <div className="p-0 name-div">
              <h5 style={{ color: "white", margin: "0" }}>{data.businessname}</h5>
              <p style={{ color: "white", margin: "0" }}>{data.category}</p>
            </div>

            <div className="p-0 location-div">
              <p style={{ color: "white", margin: "0" }}>Location</p>
              <h5 style={{ color: "white", margin: "0" }}>{data.city}</h5>
            </div>

            <div className="p-0">
              <p style={{ color: "white", margin: "0" }}>Business time</p>
              <h5 style={{ color: "white", margin: "0" }}>9:00Am - 10:00Pm</h5>
            </div>

            <div className="p-0 rating-div">
              <p style={{ color: "white", margin: "0" }}>Rating</p>
              <h5 style={{ color: "white", margin: "0" }}>3 *****</h5>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="about-main-div">
          <div className="about-div rounded-4 p-3">
            <h5>Overview</h5>
            <p className="mt-4" style={{ lineHeight: "30px" }}>
              Hello my name is Ariana Gande Connor and I’m a Financial Supervisor from Netherlands,
              Rotterdam. In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse
              malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor non
            </p>
          </div>
          <div className="address-div rounded-3 p-3">
            <div className="ad-div">
              <h5>Address</h5>
              <p>
                {data.building},{data.street},<br />
                {data.town},{data.city},<br />
                {data.district},{data.state}
              </p>
            </div>
            <div className="ct-div">
              <h5>Contact</h5>
              <p className="mt-3">
                Ph: {data.phonenumber} <br />
                Email: {data.email}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
