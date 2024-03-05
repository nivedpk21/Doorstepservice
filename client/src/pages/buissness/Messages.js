import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Messages() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  console.log("token", token);

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/viewmessage", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        console.log("messagedata", data);
        setData(data);
      });
  }, []);
  return (
    <>
      <Header />
      <div>
        <p>messages</p>
        {data.map((item) => (
          <div className="border border-secondary" style={{ width: "500px", height: "130px", margin: "auto" }}>
            <p>Name:{item.name}</p>
            <p>{item.message}</p>
            <Link to={`/viewmessage/${item.loginId}`} className="btn btn-primary">
              View
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
