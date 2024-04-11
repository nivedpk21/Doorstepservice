import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./viewbuissnessprofile.css";
import axios from "axios";

export default function Viewbuissnessprofile() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/buissness/profile", {
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

  const [data, setData] = useState({});
  return (
    <>
      <Header />
      <section>
        <div
          className="p-5"
          style={{
            width: "100%",
            height: "300px",
            margin: "auto",
            backgroundColor: "#244034",
          }}
        >
          <div
            className=" container  rounded" //profile-div
            style={{
              width: "80%",
              height: "160px",
              padding: "10px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  margin: "auto",
                  //   marginLeft: "40px",
                }}
              ></div>
            </div>

            <div className="p-3">
              <h5 style={{ color: "white", margin: "0" }}>{data.businessname}</h5>
              <p style={{ color: "white", margin: "0" }}>{data.category}</p>
            </div>

            <div className="p-3">
              <p style={{ color: "white", margin: "0" }}>Location</p>
              <h5 style={{ color: "white", margin: "0" }}>{data.city}</h5>
            </div>

            <div className="p-3">
              <p style={{ color: "white", margin: "0" }}>Buissness time</p>
              <h5 style={{ color: "white", margin: "0" }}>mon - fri : 9:00Am - 10:00Pm </h5>
            </div>

            <div className="p-3">
              <p style={{ color: "white", margin: "0" }}>Rating</p>
              <h5 style={{ color: "white", margin: "0" }}>3 *****</h5>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0px",
            padding: "50px",
            backgroundColor: "#eff6f3",
          }}
        >
          <div
            className=" rounded-4 p-3"
            style={{ width: "65%", height: "300px", backgroundColor: "white" }}
          >
            <h5>Overview</h5>
            <p className="mt-4" style={{ lineHeight: "30px" }}>
              Hello my name is Ariana Gande Connor and I’m a Financial Supervisor from Netherlands,
              Rotterdam. In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse
              malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor non
            </p>
          </div>
          <div
            className="rounded-3 p-3"
            style={{
              width: "25%",
              height: "300px",
              textAlign: "center",
              padding: "0",
              backgroundColor: "white",
            }}
          >
            <div style={{ minHeight: "140px" }}>
              <h5>Address</h5>
              <p>
                {data.building},{data.street},<br />
                {data.town},{data.city},<br />
                {data.district},{data.state}
              </p>
            </div>
            <div>
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
