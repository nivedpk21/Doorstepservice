import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Bookingdetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axios
      .get(`https://doorstepservice.onrender.com/buissness/bookingappointments/${id}`)
      .then((response) => {
        const booking = response.data.data;
        console.log("bookingdata", booking);
        setData(booking);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const userId = data.userId;
  useEffect(() => {
    axios
      .get(`https://doorstepservice.onrender.com/buissness/viewuserdetails/${userId}`)
      .then((response) => {
        console.log("customer", response);
        const data = response.data.data;
        setProfile(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <>
      <Header />

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
            <span style={{ fontSize: "small", fontFamily: "serif" }}>jobtype</span>
            <p>{data.jobtype}</p>
          </div>
          <div>
            <span style={{ fontSize: "small", fontFamily: "serif" }}>city</span>
            <p>{profile.city}</p>
          </div>
          <div>
            <span style={{ fontSize: "small", fontFamily: "serif" }}>date</span>
            <p>{data.date}</p>
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
              <p>{profile.name}</p>
              <p>
                {profile.house},{profile.street}
                <br />
                {profile.town},{profile.city}
                <br />
                {profile.district},{profile.state}
                <br />
                {profile.pincode}
              </p>
            </div>
          </div>
          <div className="mt-3" style={{ textAlign: "center" }}>
            <button
                // onClick={() => {
                //   taskcompleted(data._id);
                // }}
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
