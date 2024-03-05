import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Enquiries() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/buissness/enquiries", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const bookingData = response.data.data;
        setData(bookingData);

        const datanumber = response.data.data.length;
        console.log("length", datanumber);
      });
  }, []);

  const updateStatus = (bookingId) => {
    axios.get(`http://localhost:5000/buissness/acceptbooking/${bookingId}`).then((response) => {
      console.log(response);

      const filterData = data.filter((obj) => {
        return obj._id != bookingId;
      });
      setData(filterData);

      const message = response.data.message;
      console.log("message", message);
      toast.success(message);
    });
  };

  const rejectBooking = (bookingId) => {
    axios.get(`http://localhost:5000/buissness/rejectbooking/${bookingId}`).then((response) => {
      console.log(response);
      const message = response.data.message;

      const filterData = data.filter((obj) => {
        return obj._id != bookingId;
      });
      setData(filterData);
      console.log("message", message);
      toast.error(message);
    });
  };

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        {data.map((item) => (
          <div
            className="border border rounded container-fluid"
            style={{
              marginTop: "50px",
              width: "50%",
              backgroundColor: "white",
              padding:"10px"
            }}
          >
            <div className="border rounded" style={{height:"110px",display:"flex"}}>
              <div>
              <p>{item.jobtype}</p>
              <p>{item.description}</p>
              </div>
              <div>
              <p>{item.date}</p>
              </div>

              <button
                onClick={() => {
                  updateStatus(item._id);
                }}
                className="btn btn-primary"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  rejectBooking(item._id);
                }}
                className="btn btn-danger"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
