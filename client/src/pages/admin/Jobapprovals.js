import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Navigation from "../../components/Navigation";
import "./jobapprovals.css";
import Loading from "../../components/Loading";

export default function Jobapprovals() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/admin/jobapprovals")
      .then((response) => {
        console.log("response logged:", response);
        const data = response.data.data;
        console.log("data logged", data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerpage, setPostsperpage] = useState(5);

  const lastPostindex = currentPage * postsPerpage;
  const firstPostindex = lastPostindex - postsPerpage;
  const currentPageposts = data.slice(firstPostindex, lastPostindex);

  return (
    <>
      <Navigation />
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="p-1">
            <h5 style={{ textAlign: "center", color: "grey", marginTop: "30px" }}>Job Approval</h5>
          </div>
          <div className="ja-main-div border rounded p-2">
            {currentPageposts.map((item) => (
              <div
                className="border rounded mb-1 p-2"
                style={{
                  height: "120px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <h5>{item.title}</h5>
                  <p>
                    {item.category} <br />
                    {item.city}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/viewjobapproval/${item._id}`}
                    type="button"
                    class="btn btn-outline-primary"
                  >
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
      )}
    </>
  );
}
