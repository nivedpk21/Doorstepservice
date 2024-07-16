import React, { useEffect, useState } from "react";
import axios from "axios";
import Navigation from "../../components/Navigation";

export default function Appointments() {
  const token = localStorage.getItem("token");
  const [jobdata, setJob] = useState([]);

  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/buissness/viewjobappointments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const jobData = response.data.data;
        console.log("jobdata:", jobData);
        setJob(jobData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const taskcompleted = (applicationId, jobId) => {
    axios
      .get(`https://doorstepservice.onrender.com/buissness/jobfinished/${applicationId}/${jobId}`)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <Navigation />
      <div
        className="container-fluid border rounded   mt-5 p-2"
        style={{ width: "50%", height: "550px", background: "white" }}
      >
        {jobdata.map((item) => (
          <div
            className="container-fluid border rounded p-3"
            style={{
              width: "100%",
              height: "70px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a href={`/appointmentdetalis/${item._id}`} style={{ textDecoration: "none" }}>
              <h6 style={{ textAlign: "center", width: " ", color: "black" }}>{item.title}</h6>
            </a>
            <p style={{ textAlign: "center", width: "" }}>{item.date}</p>
            {/* <p style={{ textAlign: "center", width: "25%" }}>{item.city}</p> */}
            <div style={{ width: " ", display: "" }}>
              <button
                onClick={() => {
                  taskcompleted(item._id, item.jobId);
                }}
                className="btn btn-outline-primary"
              >
                completed
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
