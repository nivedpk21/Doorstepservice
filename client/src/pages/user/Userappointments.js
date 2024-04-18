import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

export default function Userappointments() {
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://doorstepservice.onrender.com/user/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("data", response);
        const data = response.data.data;
        setData(data);
      });
  }, []);

  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerpage, setPostsperpage] = useState(5);

  const lastPostindex = currentPage * postsPerpage;
  const firstPostindex = lastPostindex - postsPerpage;
  const currentPageposts = data.slice(firstPostindex, lastPostindex);

  return (
    <>
      <Header />
      <div
        className="border rounded p-2"
        style={{
          width: "50%",
          height: "550px",
          margin: "auto",
          marginTop: "50px",
        }}
      >
        {currentPageposts.map((item) => (
          <div
            className="border rounded p-2"
            style={{
              height: "100px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h5>{item.title}</h5>
            </div>
            <div>
              <p>{item.date}</p>
            </div>
            <div>
              <p>
                {item.businessname}
                <br />
                {item.city}
              </p>
            </div>
            <div>
              <Link to={``} type="button" class="btn btn-outline-primary">
                View
              </Link>
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
