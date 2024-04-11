import React, { useEffect, useState } from "react";
import "./verifications.css";
import Header from "../../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Navigation from "../../components/Navigation";

export default function Verifications() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/admin/buissnessverification").then((response) => {
      console.log(response, "res logged");
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
      <Navigation />
      <div style={{ backgroundColor: " ", paddingTop: "30px" }}>
        <div className="p-1">
          <h5 style={{ textAlign: "center",color:"grey" }}>Buissnes Verification</h5>
        </div>
        <div
          className="border rounded-4 p-2"
          style={{
            backgroundColor: "white",
            width: "50%",
            minHeight: "550px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {currentPageposts.map((item) => (
            <div
              className="border rounded  mb-1 p-2"
              style={{
                height: "120px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h5>{item.businessname}</h5>
                <p>
                  {item.category} <br />
                  {item.city},{item.district},{item.state}
                </p>
              </div>
              <div>
                <Link
                  to={`/buissnessverification/${item._id}`}
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
      </div>
    </>
  );
}
