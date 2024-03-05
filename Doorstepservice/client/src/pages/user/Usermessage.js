import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Usermessage() {
  const token = localStorage.getItem("token");
  //   console.log(token);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/message/viewmessage", { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
        const messageData = response.data.data;
        setData(messageData);
      });
  }, []);
  return (
    <>
      <Header />
      <p>hehehhe</p>
      <div
        className="container-fluid border rounded "
        style={{ width: "60%", height: "550px", marginTop: "50px", padding: "10px" }}
      >
        {data.map((item) => (
          <div
            className="border rounded"
            style={{ textAlign: "center", width: "100%", height: "95px", padding: "10px" }}
          >
            <p>{item.name}</p>
            <Link to={`/viewuserchat/${item.loginId}`}>View</Link>
          </div>
        ))}
      </div>
    </>
  );
}
