import React, { useEffect, useState } from "react";
import "./viewjoblisting.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../../components/Navigation";

export default function Viewjoblisting() {
  const { id } = useParams();

  console.log("id:", id);

  useEffect(() => {
    axios
      .get(`https://doorstepservice.onrender.com/buissness/viewjobdetails/${id}`)
      .then((response) => {
        console.log("response logged", response);
        const jobdata = response.data.data;
        setData(jobdata);
        console.log("jobdata", jobdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [data, setData] = useState({});

  return (
    <>
      <Navigation />

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
          <button className="btn btn-primary">Apply</button>
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
              <p>Name</p>
              <p>
                Roseville
                <br />
                Backelstreet
                <br />
                Kozhikode,Kozhikode,Kerala
                <br />
                365245
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-primary">
                  Call
                </button>
                <button type="button" class="btn btn-outline-primary">
                  Message
                </button>
                <button type="button" class="btn btn-outline-primary">
                  Email
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
