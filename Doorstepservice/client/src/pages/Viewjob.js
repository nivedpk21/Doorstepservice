import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import "./viewjob.css";
import toast, { Toaster } from "react-hot-toast";

export default function Viewjob() {
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/viewjobpost", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const jobData = response.data.data;
        setData(jobData);
      });
  }, []);

  const [data, setData] = useState([]);

  const deleteJob = (jobId) => {
    axios.get(`http://localhost:5000/user/deletejob/${jobId}`).then((response) => {
      console.log(response);

      const filterData = data.filter((obj) => {
        return obj._id != jobId;
      });
      setData(filterData);

      const message = response.data.message;
      toast.success(message);
    });
  };

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />

      <div
        className="container-fluid border border-2 rounded"
        style={{
          width: "60%",
          height: "100%",
          marginTop: "50px",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        {data.map((item) => (
          <div
            className="container-fluid border rounded"
            style={{
              width: "100%",
              height: "120px",
              display: "flex",
              padding: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ width: "50%" }} className="container">
              <Link to={`/singlejob/${item._id}`} style={{ textDecoration: "none", color: "#333" }} href="#">
                <h5 className="jobtitle" style={{ fontFamily: "serif", padding: "0px", margin: "0px" }}>
                  {item.title}
                </h5>
              </Link>
              <p>{item.category}</p>
              {item.status == "1" ? (
                <span class="badge text-bg-success">Approved</span>
              ) : (
                <span class="badge text-bg-danger">Pending</span>
              )}
            </div>

            <div style={{ width: "25%" }}></div>

            <div style={{ width: "25%" }}>
              {item.status == "1" ? (
                <div class="d-grid gap-1 col-6 mx-auto">
                  <Link
                    to={`/viewapplicantslist/${item._id}`}
                    style={{ height: "30px", padding: "0px" }}
                    class="btn btn-primary"
                    type="button"
                  >
                    Applicants
                  </Link>
                  <Link
                    to={`/editjob/${item._id}`}
                    style={{ height: "30px", padding: "0px" }}
                    class="btn btn-outline-secondary"
                    type="button"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      deleteJob(item._id);
                    }}
                    style={{ height: "30px", padding: "0px" }}
                    class="btn btn-outline-danger"
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <div class="d-grid gap-1 col-6 mx-auto">
                  <button style={{ height: "30px", padding: "0px" }} class="btn btn-outline-secondary" type="button">
                    Edit
                  </button>
                  <button style={{ height: "30px", padding: "0px" }} class="btn btn-outline-danger" type="button">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}