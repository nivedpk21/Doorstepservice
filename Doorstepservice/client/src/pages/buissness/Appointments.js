import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

export default function Appointments() {
  const token = localStorage.getItem("token");
  console.log("token:", token);
  const [data, setData] = useState([]);
  console.log("data", data);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/buissness/viewjobappointments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response", response);
        const jobData = response.data.data;
        console.log("jobdata:", jobData);
        setData(jobData);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/buissness/viewbookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const bookingdata = response.data.data;

        setBookingData(bookingdata);
      });
  }, []);

  return (
    <>
      <Header />
      <div
        className="container-fluid border rounded   mt-5 p-2"
        style={{ width: "50%", height: "550px", background: "white" }}
      >
        {data.map((item) => (
          <div
            className="container-fluid border rounded"
            style={{
              width: "100%",
              height: "70px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h6 style={{ textAlign: "center", width: "20%" }}>{item.title}</h6>
            <p style={{ textAlign: "center", width: "25%" }}>{item.date}</p>
            <p style={{ textAlign: "center", width: "25%" }}>{item.city}</p>
            <div style={{ width: "30%", display: "flex" }}>
              <button className="btn btn-success " style={{marginRight:"3px"}}>start Job</button>
              <button className="btn btn-outline-primary">Finished</button>

            </div>
          </div>
        ))}
      </div>
    </>
  );
}
