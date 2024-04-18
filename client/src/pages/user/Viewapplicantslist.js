import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./viewapplicantlist.css";

export default function Viewapplicantslist() {
  const { id } = useParams(); // jobid
  console.log("jobid:", id);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`https://doorstepservice.onrender.com/user/viewjobapplications/${id}`).then((response) => {
      console.log("response:", response);
      const data = response.data.data;
      setData(data);
    });
  }, []);

  const approve = (buissnessId) => {
    axios.get(`https://doorstepservice.onrender.com/user/approvejobapplication/${buissnessId}/${id}`).then((response)=>{
      console.log(response);
    })
  };

  return (
    <>
      <Header />
      <div
        className="mm container-fluid border rounded p-2"
        style={{ width: "50%", height: "550px", marginTop: "50px" }}
      >
        {data.map((item) => (
          <div
            className="border rounded p-3"
            style={{ width: "100%", height: "90px", display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ width: "40%" }}>
              <Link
                className="buissnessname"
                style={{ textDecoration: "none" }}
                to={`/viewapplicantprofile/${item.loginId}/${id}`}
              >
                {item.name}
              </Link>
              <p>{item.category}</p>
            </div>
            <div className="p-3" style={{ width: "35%", textAlign: "center" }}>
              <p>{item.city}</p>
            </div>
            <div className="pt-2 " style={{ width: "25%", textAlign: "right" }}>
              <button
                onClick={() => {
                  approve(item.loginId);
                }}
                className="btn btn-primary"
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
