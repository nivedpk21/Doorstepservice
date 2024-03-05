import React, { useEffect, useState } from "react";
import "./buissnessverification.css";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Buissnessverification() {
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/admin/viewbuissnessprofile/${id}`)
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setData(data);
      });
  }, []);

  const [data, setData] = useState({});

  const updateStatus = (loginId) => {
    axios
      .get(`http://localhost:5000/admin/updatestatus/${loginId}`)
      .then((response) => {
        console.log(response);
        const message = response.data.message;
        console.log(message);

        toast.success(message);
        navigate("/verifications");
      });
  };

  return (
    <>
      <Header />

      <Toaster position="top-center" reverseOrder={false} />
      <div
        style={{
          width: "500px",
          height: "600px",
          border: "1px solid",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <p>{data.username}</p>
        <p>{data.name}</p>
        <p>{data.email}</p>
        <p>{data.phonenumber}</p>
        <p>{data.address}</p>
        <p>{data.district}</p>
        <p>{data.city}</p>
        <p>{data.pincode}</p>
        <p>{data.status}</p>
        <button onClick={() => updateStatus(data.loginid)}>APPROVE</button>
        <button>REJECT</button>
      </div>
    </>
  );
}
