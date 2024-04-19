import React, { useEffect, useState } from "react";
import "./userprofile.css";
import Header from "../components/Header";
import axios from "axios";
import Userprofiledata from "./user/Userprofiledata";
import Navigation from "../components/Navigation";

export default function Userprofile() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`https://doorstepservice.onrender.com/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const userData = response.data.data;
        setData(userData);
      });
  }, []);

  return (
    <>
      <Navigation />
      <div>
        <div
          className="container"
          style={{
            boxShadow:
              " 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            padding: "0",
            width: "450px",
            height: "600px",
            border: "1px solid grey",
            marginTop: "10px",
            borderRadius: "12px",
          }}
        >
          <div>
            <div
              className="pattern pattern-div"
              style={{
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                width: "100%",
                height: "130px",
                backgroundColor: "grey",
                borderBottom: "3px solid grey",
              }}
            ></div>
            <div
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                backgroundColor: "white",
                border: "3px solid grey",
                margin: "auto",
                marginTop: "-75px",
              }}
            ></div>
            <p style={{ textAlign: "center" }}>{data.username}</p>
          </div>

          <Userprofiledata details={data} value={100}/>

          
        </div>
      </div>
    </>
  );
}
