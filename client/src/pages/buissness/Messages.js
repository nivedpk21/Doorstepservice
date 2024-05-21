import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";

export default function Messages() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/message/viewbuissnessmessage", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        console.log("messagedata", data);
        setData(data);
      });
  }, []);
  return (
    <>
      <Navigation />
      buissness
      <div
        className="border rounded p-2"
        style={{ margin: "auto", marginTop: "50px", width: "35%", height: "500px" }}
      >
        {data.map((item) => (
          <div
            className="border rounded p-2"
            style={{ height: "80px", display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                borderRadius: "50%",
                height: "60px",
                width: "60px",
                backgroundColor: "grey",
              }}
            ></div>
            <div className="p-1">
              <h6>{item.name}</h6>
            </div>
            <div style={{ marginLeft: "auto " }}>
              <Link
                to={`/viewmessage/${item.loginId}`}
                type="button"
                class="btn btn-outline-primary"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
