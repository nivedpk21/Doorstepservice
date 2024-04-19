import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";

export default function Singlejob() {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [data, setData] = useState({});
  const [address, setAddress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/user/profile", { headers: { Authorization: `bearer ${token}` } })
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setAddress(data);
      });
  }, []);

  useEffect(() => {
    axios.get(`https://doorstepservice.onrender.com/user/viewsinglejob/${id}`).then((response) => {
      console.log(response);
      const jobdata = response.data.data;
      setData(jobdata);
    });
  }, []);

  const deleteJob = (jobId) => {
    axios.get(`https://doorstepservice.onrender.com/user/deletejob/${jobId}`).then((response) => {
      console.log(response);

      const message = response.data.message;
      toast.success(message);

      setTimeout(() => {
        navigate("/viewjob");
      }, 2000);
    });
  };

  return (
    <>
      <Navigation />
      <Toaster position="top-center" reverseOrder={false} />

      <div
        className="container-fluid border rounded  mt-5 p-2"
        style={{ width: "70%", height: "100%", backgroundColor: "white" }}
      >
        <div
          className="container-fluid "
          style={{
            width: "100%",
            height: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5>{data.title}</h5>
        </div>
        <div
          className="p-2 border rounded-3"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div>
            <span style={{ fontSize: "small", fontFamily: "serif" }}>category</span>
            <p>{data.category}</p>
          </div>
          <div>
            <span style={{ fontSize: "small", fontFamily: "serif" }}>city</span>
            <p>{address.city}</p>
          </div>
          <div>
            <span style={{ fontSize: "small", fontFamily: "serif" }}>date</span>
            <p>{data.date}</p>
          </div>
          <div>
            <span style={{ fontSize: "small", fontFamily: "serif" }}>budget</span>
            <p>{data.budget}</p>
          </div>
        </div>
        <div className="p-2 mt-4">
          <h6>Description</h6>
          <p style={{ textAlign: "justify" }}>{data.description}</p>

          <h6 className="mt-5">Images</h6>
          <div className="border rounded" style={{ width: "100%", height: "250px" }}></div>

          <h6 className="mt-5">Customer details</h6>
          <div className="border rounded p-4" style={{ width: "100%", height: "220px" }}>
            <div>
              <p>{address.name}</p>
              <p>
                {address.house},{address.street}
                <br />
                {address.town},{address.city}
                <br />
                {address.district},{address.state}
                <br />
                {address.pincode}
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-primary">
                  Edit
                </button>

                <button
                  onClick={() => {
                    deleteJob(data._id);
                  }}
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ minHeight: "300px" }}></div>
    </>
  );
}
