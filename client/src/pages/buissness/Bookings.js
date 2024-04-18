import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
export default function Bookings() {
  const token = localStorage.getItem("token");
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/buissness/bookingappointments", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((response) => {
        const booking = response.data.data;
        console.log("bookingdata", booking);
        setBookingData(booking);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateStatus = (bookingId) => {
    console.log(bookingId);
    axios
      .get(`https://doorstepservice.onrender.com/buissness/updatebooking/${bookingId}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header />

      <div
        className="container-fluid border rounded   mt-5 p-2"
        style={{ width: "50%", height: "550px", background: "white" }}
      >
        {bookingData.map((item) => (
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
            <a href={`/bookingdetalis/${item._id}`} style={{ textDecoration: "none" }}>
              <h6 style={{ textAlign: "center", width: "50%", color: "black" }}>{item.title}</h6>
            </a>
            <p style={{ textAlign: "center", width: "" }}>{item.date}</p>
            {/* <p style={{ textAlign: "center", width: "25%" }}>{item.city}</p> */}
            <div style={{ width: " ", display: "" }}>
              <button
                onClick={() => {
                  updateStatus(item._id);
                }}
                className="btn btn-outline-primary"
              >
                Finished
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
