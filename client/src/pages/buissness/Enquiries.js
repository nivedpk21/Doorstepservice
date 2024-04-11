import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "../../components/Pagination";

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

  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerpage, setPostsperpage] = useState(5);

  const lastPostindex = currentPage * postsPerpage;
  const firstPostindex = lastPostindex - postsPerpage;
  const currentPageposts = data.slice(firstPostindex, lastPostindex);

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div
        className="border rounded p-2"
        style={{ width: "50%", minHeight: "500px", margin: "auto", marginTop: "50px" }}
      >
        {currentPageposts.map((item) => (
          <div
            className="border rounded p-2"
            style={{
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <h5>{item.title}</h5>
              <p>
                {item.jobtype}
                <br />
                {item.date}
                <br /> <br />
                Description : <br />
                {item.description}
              </p>
            </div>

            <div style={{ marginLeft: "auto" }}>
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
      <Pagination
        totalPosts={data.length}
        postsPerpage={postsPerpage}
        setCurrentPage={setCurrentpage}
        currentPage={currentPage}
      />
    </>
  );
}
