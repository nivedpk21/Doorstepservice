import React, { useEffect, useState } from "react";
import "./verifications.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Navigation from "../../components/Navigation";
import Loading from "../../components/Loading";

export default function Verifications() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/admin/buissnessverification")
      .then((response) => {
        setLoading(false);
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
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div style={{ backgroundColor: " ", paddingTop: "30px" }}>
            <div className="p-1">
              <h5 style={{ textAlign: "center", color: "grey" }}>Buissnes Verification</h5>
            </div>
            <div className="bv-main-div border rounded-4 p-2">
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
      )}
    </>
  );
}
