import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

export default function Applications() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/buissness/viewjobapplications`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response", response);
        const data = response.data.data;
        setData(data);
      });
  }, []);

  return (
    <>
      <Header />
      <div
        className="container-fluid border border-2 rounded "
        style={{ width: "50%", height: "500px", marginTop: "50px", padding: "10px" }}
      >
        {data.map((item) => (
          <div
            className="container-fluid border rounded"
            style={{
              width: "100%",
              height: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ width: "75%" }}>
              <h5>{item.title}</h5>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "red" }}>{item.status == "0" ? "Pending approval" : "approved"}</p>
                <p>{item.category}</p>
                <p>{item.city}</p>
                <p>{item.budget}$</p>
              </div>
            </div>
            <div style={{ width: "25%", textAlign: "center" }}>
              <button className="btn btn-primary">View</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}