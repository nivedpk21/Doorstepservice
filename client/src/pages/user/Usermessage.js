import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from "../../components/Navigation";

export default function Usermessage() {
  const token = localStorage.getItem("token");
  //   console.log(token);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/message/viewmessage", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const messageData = response.data.data;
        setData(messageData);
      });
  }, []);
  return (
    <>
      <Navigation />
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
              <h6>{item.businessname}</h6>
            </div>
            <div style={{ marginLeft: "auto " }}>
              <Link
                to={`/viewuserchat/${item.loginId}`}
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
