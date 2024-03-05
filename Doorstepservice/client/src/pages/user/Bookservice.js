import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Bookservice() {
  const { id } = useParams();
  console.log("buissness loginid:", id);
  const [data, setData] = useState({});
  const [userData, setUserdata] = useState({});
  const [bookingData, setBookingdata] = useState({
    date: "",
    jobtype: "",
    description: "",
  });

  console.log("bookindata", bookingData);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setBookingdata({ ...bookingData, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/viewbuissnessdetails/${id}`)
      .then((response) => {
        console.log(response);
        const buissnessData = response.data.data;
        setData(buissnessData);
      });
  }, []);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("userdata", response);
        const userData = response.data.data;
        setUserdata(userData);
      });
  }, []);

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/user/bookservice/${id}`, bookingData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("bookingRespponse", response);
      });
  };

  return (
    <>
      <Header />
      <div
        className="container-fluid border border-2 rounded"
        style={{
          width: "60%",
          height: "100%",
          marginTop: "50px",
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <div
          className="border rounded"
          style={{ height: "100px", padding: "10px" }}
        >
          <h5>{data.name}</h5>
          <p style={{ margin: "0px" }}>{data.city}</p>
          <p>{data.category}</p>
        </div>
        <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="formlabel">
              Name
            </label>
            <input
              name="name"
              value={userData.name}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ height: "50px" }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="formlabel">
              Phonenumber
            </label>
            <input
              name="phonenumber"
              value={userData.phonenumber}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ height: "50px" }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="formlabel">
              Email
            </label>
            <input
              name="text"
              value={userData.email}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ height: "50px" }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="formlabel">
              Address
            </label>
            <input
              name="address"
              value={userData.address}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ height: "50px" }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="formlabel">
              city
            </label>
            <input
              name="city"
              value={userData.city}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ height: "50px" }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="formlabel">
              Date
            </label>
            <input
              name="date"
              onChange={inputChange}
              type="date"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ height: "50px" }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="formlabel">
              Jobtype "(Installation/Repair/Maintenance)"
            </label>
            <input
              name="jobtype"
              onChange={inputChange}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ height: "50px" }}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="formlabel">
              Description
            </label>
            <input
              name="description"
              onChange={inputChange}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              style={{ height: "50px" }}
            />
          </div>

          <button onClick={submit} type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
