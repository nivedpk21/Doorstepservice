import React, { useState } from "react";
import Header from "../components/Header";
import "./register.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Registration() {
  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputvalues({ ...inputValues, [name]: value });
  };

  const [inputValues, setInputvalues] = useState({
    name: "",
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    address: "",
    district: "",
    city: "",
    pincode: "",
  });

  const validate = (values) => {
    var error = {};
    if (!values.name) {
      error.name = "enter name";
    }
    if (!values.username) {
      error.username = "enter username";
    }
    if (!values.email) {
      error.email = "enter email";
    }
    if (!values.phonenumber) {
      error.phonenumber = "enter phonenumber";
    }
    if (!values.password) {
      error.password = "enter password";
    }
    if (!values.address) {
      error.address = "enter address";
    }
    if (!values.district) {
      error.district = "select district";
    }
    if (!values.state) {
      error.state = "select state";
    }
    if (!values.city) {
      error.city = "selectcity";
    }
    if (!values.pincode) {
      error.pincode = "enterpincode";
    }
    return error;
  };

  const [formErrors, setformErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const token = localStorage.getItem("token");

  const submit = (e) => {
    e.preventDefault();
    setformErrors(validate(inputValues));
    setIsSubmit(true);

    console.log(Object.keys(formErrors).length);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("http://localhost:5000/user/register", inputValues, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          const toastmessage = response.data.message;
          toast.success(toastmessage);
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };

  const [view, setView] = useState(true);

  //     ------------------------buissnessform validation-----------------

  const [inputdata, setInputdata] = useState({
    username: "",
    name: "",
    password: "",
    phonenumber: "",
    address: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    category: "",
  });

  const inputEvent = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log(name, "name logged");
    console.log(value, "values logged");

    setInputdata({ ...inputdata, [name]: value });
  };

  const newValidate = (values) => {
    var error = {};
    if (!values.name) {
      error.name = "enter name";
    }
    if (!values.username) {
      error.username = "enter username";
    }
    if (!values.email) {
      error.email = "enter email";
    }
    if (!values.password) {
      error.password = "enter password";
    }
    if (!values.phonenumber) {
      error.phonenumber = "enter phonenumber";
    }
    if (!values.address) {
      error.address = "enter address";
    }
    if (!values.district) {
      error.district = "select district";
    }
    if (!values.state) {
      error.district = "select state";
    }
    if (!values.city) {
      error.city = "select city";
    }
    if (!values.pincode) {
      error.pincode = "enter pincode";
    }
    if (!values.category) {
      error.category = "select category";
    }
    return error;
  };

  const [newformErrors, setNewformErrors] = useState({});
  const [newisSubmit, setnewSubmit] = useState(false);

  const onsubmit = (e) => {
    e.preventDefault();
    setNewformErrors(newValidate(inputdata));
    setnewSubmit(true);

    console.log(inputdata, "before if");
    console.log(newformErrors, "form errors");

    if (Object.keys(newformErrors).length === 0 && newisSubmit) {
      console.log(inputdata, "after condition");
      console.log(inputdata, "after if");
      axios
        .post("http://localhost:5000/buissness/register", inputdata, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid border rounded-4" style={{ width: "50%", height: "500px", marginTop: "50px" }}>
        <div className="container-fluid" style={{ textAlign: "center", padding: "20px" }}>
          <h5>User Registration</h5>
          <p style={{ fontSize: "13px", color: "grey" }}>Signup and get full access to the website</p>
        </div>
      </div>

      <div>
        <Toaster position="top-center" reverseOrder={false} />

        {view == true ? (
          <div
            className="container-fluid-lg"
            style={{
              padding: 20,
              width: "50%",
              height: "100%",
              border: "0px solid grey",
              borderRadius: 20,
              margin: "auto",
              marginTop: 20,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <h5 style={{ textAlign: "center" }}>User Registration</h5>
            <p
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: 12,
                marginTop: 12,
                color: "gray",
              }}
            >
              Signup and get full access to the website
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => {
                  setView(true);
                }}
                style={{ width: 85, height: 35, marginRight: 3 }}
                type="button"
                className="btn btn-outline-primary "
              >
                User
              </button>
              <button
                onClick={() => {
                  setView(false);
                }}
                style={{ width: 85, height: 35 }}
                type="button"
                className="btn btn-outline-primary"
              >
                Buissness
              </button>
            </div>
            <form style={{ marginTop: 30 }}>
              <div className="row">
                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Name
                    </label>
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {formErrors.name}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="name"
                      onChange={inputChange}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Username
                    </label>
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {formErrors.username}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="username"
                      onChange={inputChange}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email
                    </label>
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {formErrors.email}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="email"
                      onChange={inputChange}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Phone number
                    </label>
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {formErrors.phonenumber}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="phonenumber"
                      onChange={inputChange}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Password
                    </label>
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {formErrors.password}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="password"
                      onChange={inputChange}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-lg-6">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Address
                    </label>
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "10px",
                      }}
                    >
                      {formErrors.address}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="address"
                      onChange={inputChange}
                    />
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-lg-6">
                  <div style={{ display: "flex" }}>
                    <div className="mb-3">
                      <label htmlFor="Select" className="form-label">
                        District
                      </label>
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginLeft: "10px",
                        }}
                      >
                        {formErrors.district}
                      </span>
                      <select
                        id="Select"
                        className="form-select"
                        style={{ height: 30, fontSize: 14 }}
                        name="district"
                        onChange={inputChange}
                      >
                        <option> select</option>
                        <option> Kozhikode</option>
                        <option> Kannur</option>
                        <option> Kasargod</option>
                        <option> Waynad</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Select" className="form-label">
                        State
                      </label>
                      <span
                        style={{
                          color: "red",
                          fontSize: "10px",
                          marginLeft: "10px",
                        }}
                      >
                        {formErrors.state}
                      </span>
                      <select
                        id="Select"
                        className="form-select"
                        style={{ height: 30, fontSize: 14 }}
                        name="state"
                        onChange={inputChange}
                      >
                        <option> select</option>
                        <option> Kerala</option>
                        <option> Karnataka</option>
                        <option> Tamilnadu</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-12 col-lg-6" style={{ display: "flex" }}>
                  <div className="mb-3">
                    <label htmlFor="Select" className="form-label">
                      City
                    </label>
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginLeft: "2px",
                      }}
                    >
                      {formErrors.city}
                    </span>
                    <select
                      id="Select"
                      className="form-select"
                      style={{ height: 30, fontSize: 14 }}
                      name="city"
                      onChange={inputChange}
                    >
                      <option> select</option>
                      <option> Kozhikode</option>
                      <option> Vadakara</option>
                      <option> Thalassery</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Pincode
                    </label>
                    <span
                      style={{
                        color: "red",
                        fontSize: "10px",
                        marginLeft: "2px",
                      }}
                    >
                      {formErrors.pincode}
                    </span>
                    <input
                      style={{ width: 105, height: 30 }}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      name="pincode"
                      onChange={inputChange}
                    />
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  style={{ width: "60%", marginTop: 8 }}
                  className="btn btn-primary"
                  type="button"
                  onClick={submit}
                >
                  Submit
                </button>
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontSize: 12,
                  marginTop: 12,
                  color: "gray",
                }}
              >
                Already have an account ? <span style={{ color: "blue" }}>signin</span>
              </p>
            </form>
          </div>
        ) : (
          //--------------------------- buissness registration ---------------------------------------
          <div
            className="container-fluid-lg"
            style={{
              padding: 20,
              width: 510,
              height: 550,
              border: "0px solid grey",
              borderRadius: 20,
              margin: "auto",
              marginTop: 20,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
          >
            <h5 style={{ textAlign: "center" }}>Buissness Registration</h5>
            <p
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: 12,
                marginTop: 12,
                color: "gray",
              }}
            >
              Signup and get full access to the website
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => {
                  setView(true);
                }}
                style={{ width: 85, height: 35, marginRight: 3 }}
                type="button"
                className="btn btn-outline-primary "
              >
                User
              </button>
              <button
                onClick={() => {
                  setView(false);
                }}
                style={{ width: 85, height: 35 }}
                type="button"
                className="btn btn-outline-primary"
              >
                Buissness
              </button>
            </div>
            <form style={{ marginTop: 30 }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Name
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.name}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={inputEvent}
                        name="name"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Username
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.username}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={inputEvent}
                        name="username"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Email
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.email}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={inputEvent}
                        name="email"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Phone number
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.phonenumber}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={inputEvent}
                        name="phonenumber"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Password
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.password}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={inputEvent}
                        name="password"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Address
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.address}</span>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={inputEvent}
                        name="address"
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="mb-3">
                      <label htmlFor="Select" className="form-label">
                        District
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.district}</span>
                      <select
                        id="Select"
                        className="form-select"
                        style={{ height: 30, fontSize: 14 }}
                        onChange={inputEvent}
                        name="district"
                      >
                        <option> select</option>
                        <option> Kozhikode</option>
                        <option> Kannur</option>
                        <option> Kasargod</option>
                        <option> Waynad</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Select" className="form-label">
                        Category
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.category}</span>
                      <select
                        id="Select"
                        className="form-select"
                        style={{ height: 30, fontSize: 14 }}
                        onChange={inputEvent}
                        name="category"
                      >
                        <option> select</option>
                        <option> Electrical</option>
                        <option> Plumbing</option>
                        <option> Gardening</option>
                        <option> Laundry</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="mb-3">
                      <label htmlFor="Select" className="form-label">
                        City
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.city}</span>
                      <select
                        id="Select"
                        className="form-select"
                        style={{ height: 30, fontSize: 14 }}
                        onChange={inputEvent}
                        name="city"
                      >
                        <option> select</option>
                        <option> Kozhikode</option>
                        <option> Vadakara</option>
                        <option> Thalassery</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">
                        Pincode
                      </label>
                      <span style={{ color: "red" }}>{newformErrors.pincode}</span>
                      <input
                        style={{ width: 105, height: 30 }}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={inputEvent}
                        name="pincode"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  style={{ width: "60%", marginTop: 8 }}
                  className="btn btn-primary"
                  type="button"
                  onClick={onsubmit}
                >
                  Submit
                </button>
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontSize: 12,
                  marginTop: 12,
                  color: "gray",
                }}
              >
                Already have an account ? <span style={{ color: "blue" }}>signin</span>
              </p>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
