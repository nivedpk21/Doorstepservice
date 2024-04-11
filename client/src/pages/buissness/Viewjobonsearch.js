import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function Viewjobonsearch() {
  const [data, setData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/buissness/viewjobonsearch/${id}`).then((response) => {
      console.log(response);
      const data = response.data.data;
      setData(data);
    });
  }, []);

  const token = localStorage.getItem("token");

  const sendApplication = (jobid) => {
    try {
      axios
        .post(`http://localhost:5000/buissness/apply/${jobid}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          const message = response.data.message;
          toast.success(message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
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
            <p>{data.city}</p>
          </div>
          <div>
            <span style={{ fontSize: "small", fontFamily: "serif" }}>date</span>
            <p>{data.city}</p>
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
              <p>{data.name}</p>
              <p>
                {data.house},{data.street}
                <br />
                {data.town},{data.city}
                <br />
                {data.district},{data.state}
                <br />
                {data.pincode}
              </p>
            </div>
          </div>
          <div className="mt-3" style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                sendApplication(data._id);
              }}
              className="btn btn-primary"
            >
              Apply
            </button>
          </div>
        </div>
      </div>

      <div style={{ minHeight: "300px" }}></div>
    </>
  );
}
