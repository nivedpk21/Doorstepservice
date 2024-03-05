import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

export default function Userappointments() {
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("data", response);
        const data = response.data.data;
        setData(data);
      });
  }, []);

  return (
    <>
      <Header />

      <div
        className="container-fluid border border-2 rounded"
        style={{
          width: "60%",
          minHeight: "500px",
          marginTop: "50px",
          padding: "10px",
        }}
      >
        {data.map((item) => (
          <div
            className="container border rounded"
            style={{ height: "60px", display: "flex", alignItems: "center" }}
          >
            <div style={{ width: "30%" }}>
              <h6>{item.title}</h6>
            </div>
            <div style={{ width: "20%" , textAlign: "center" }}>
              <p>Date{item.date}</p>
            </div>
            <div style={{ width: "50%", textAlign: "center" }}>
              <p>Agency :{item.category}</p>
            </div>
          </div>
        ))}
      </div>

    
    </>
  );
}
