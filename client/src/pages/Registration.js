import React, { useState } from "react";
import Header from "../components/Header";
import "./register.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "../components/Navigation";

export default function Registration() {
  const [active, setActive] = useState("user");
  const [form, setForm] = useState("user");

  // ---------------------------------- user form ----------------------------------------------------

  const token = localStorage.getItem("token");
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setformErrors] = useState({});
  console.log(formErrors);

  const [inputValues, setInputvalues] = useState({
    name: "",
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    house: "",
    street: "",
    town: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
  });

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputvalues({ ...inputValues, [name]: value });
  };

  const validate = (values) => {
    var error = {};
    if (!values.name) {
      error.name = "required";
    }
    if (!values.username) {
      error.username = "required";
    }
    if (!values.email) {
      error.email = "required";
    }
    if (!values.phonenumber) {
      error.phonenumber = "required";
    }
    if (!values.password) {
      error.password = "required";
    }
    if (!values.street) {
      error.street = "required";
    }
    if (!values.house) {
      error.house = "required";
    }
    if (!values.town) {
      error.town = "required";
    }
    if (!values.district) {
      error.district = "required";
    }
    if (!values.state) {
      error.state = "required";
    }
    if (!values.city) {
      error.city = "required";
    }
    if (!values.pincode) {
      error.pincode = "required";
    }
    return error;
  };

  const submit = (e) => {
    e.preventDefault();
    setformErrors(validate(inputValues));
    setIsSubmit(true);

    console.log(Object.keys(formErrors).length);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post("https://doorstepservice.onrender.com/user/register", inputValues, {
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

  //     ------------------------buissnessform -----------------

  const [newisSubmit, setnewIsSubmit] = useState(false);
  const [newformErrors, setnewformErrors] = useState({});
  console.log(newformErrors);

  const [newinputValues, setnewInputvalues] = useState({
    businessname: "",
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    building: "",
    street: "",
    town: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    category: "",
  });
  console.log(newinputValues);

  const newinputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setnewInputvalues({ ...newinputValues, [name]: value });
  };

  const newvalidate = (values) => {
    var error = {};
    if (!values.businessname) {
      error.businessname = "required";
    }
    if (!values.username) {
      error.username = "required";
    }
    if (!values.email) {
      error.email = "required";
    }
    if (!values.phonenumber) {
      error.phonenumber = "required";
    }
    if (!values.password) {
      error.password = "required";
    }
    if (!values.street) {
      error.street = "required";
    }
    if (!values.building) {
      error.building = "required";
    }
    if (!values.town) {
      error.town = "required";
    }
    if (!values.district) {
      error.district = "required";
    }
    if (!values.state) {
      error.state = "required";
    }
    if (!values.city) {
      error.city = "required";
    }
    if (!values.pincode) {
      error.pincode = "required";
    }
    if (!values.category) {
      error.category = "required";
    }
    return error;
  };

  const newsubmit = (e) => {
    e.preventDefault();
    setnewformErrors(newvalidate(newinputValues));
    setnewIsSubmit(true);

    if (Object.keys(newformErrors).length === 0 && newisSubmit) {
      axios
        .post("https://doorstepservice.onrender.com/buissness/register", newinputValues, {
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

  return (
    <>
      <Navigation />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="registration-maindiv container-fluid border rounded-4 ">
        <div className="container-fluid" style={{ textAlign: "center", padding: "20px" }}>
          <h5>Registration</h5>
          <p style={{ fontSize: "13px", color: "grey" }}>
            Signup and get full access to the website
          </p>

          <div>
            <button
              style={{ marginRight: "3px" }}
              type="button"
              className={active == "user" ? "btn btn-warning " : "btn btn-outline-primary"}
              onClick={() => {
                setActive("user");
                setForm("user");
              }}
            >
              User
            </button>
            <button
              type="button"
              className={active == "seller" ? "btn btn-warning " : "btn btn-outline-primary"}
              onClick={() => {
                setActive("seller");
                setForm("seller");
              }}
            >
              Buissness
            </button>
          </div>
        </div>
        {form == "user" ? (
          <>
            <div>
              <div class="row justify-content-center align-items-center ">
                <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                  <div>
                    {/* form ---------------------------------------------------*/}
                    <div class="mb-3">
                      <label for="" class="form-label">
                        Name
                      </label>
                      <span className="error-text">{formErrors.name}</span>
                      <input
                        onChange={inputChange}
                        type="text"
                        class="form-control"
                        name="name"
                        id=""
                        placeholder=""
                      />
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        Username
                      </label>
                      <span className="error-text">{formErrors.username}</span>
                      <input
                        onChange={inputChange}
                        type="text"
                        class="form-control"
                        name="username"
                        id=""
                        placeholder=""
                      />
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        Email
                      </label>
                      <span className="error-text">{formErrors.email}</span>
                      <input
                        onChange={inputChange}
                        type="email"
                        class="form-control"
                        name="email"
                        id=""
                        placeholder="abc@mail.com"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        Phonenumber
                      </label>
                      <span className="error-text">{formErrors.phonenumber}</span>

                      <input
                        onChange={inputChange}
                        type="text"
                        class="form-control"
                        name="phonenumber"
                        id=""
                        placeholder=""
                      />
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        Password
                      </label>
                      <span className="error-text">{formErrors.password}</span>

                      <input
                        onChange={inputChange}
                        type="password"
                        class="form-control"
                        name="password"
                        id=""
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                {/* col 2 ------------------------------*/}
                <div class="col">
                  <div>
                    <div class="mb-3">
                      <label for="" class="form-label">
                        House
                      </label>
                      <span className="error-text">{formErrors.house}</span>

                      <input
                        onChange={inputChange}
                        type="text"
                        class="form-control"
                        name="house"
                        id=""
                        placeholder=""
                      />
                    </div>

                    <div style={{ display: "flex" }}>
                      <div class="mb-3">
                        <label for="" class="form-label">
                          Street
                        </label>
                        <span className="error-text">{formErrors.street}</span>

                        <input
                          onChange={inputChange}
                          type="text"
                          class="form-control"
                          name="street"
                          id=""
                          placeholder=""
                        />
                      </div>

                      <div class="mb-3">
                        <label for="" class="form-label">
                          Town
                        </label>
                        <span className="error-text">{formErrors.town}</span>

                        <input
                          onChange={inputChange}
                          type="text"
                          class="form-control"
                          name="town"
                          id=""
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div class="mb-3">
                        <label for="" class="form-label">
                          State
                        </label>
                        <span className="error-text">{formErrors.state}</span>

                        <select
                          onChange={inputChange}
                          class="form-select form-select-sm"
                          name="state"
                          id=""
                        >
                          <option selected>Select one</option>
                          <option value="kerala">Kerala</option>
                          <option value="karnataka">Karnataka</option>
                          <option value="tamilnadu">TamilNadu</option>
                        </select>
                      </div>

                      <div class="mb-3">
                        <label for="" class="form-label">
                          District
                        </label>
                        <span className="error-text">{formErrors.district}</span>

                        <select
                          onChange={inputChange}
                          class="form-select form-select-sm"
                          name="district"
                          id=""
                        >
                          <option selected>Select one</option>
                          <option value="kozhikode">Kozhikode</option>
                          <option value="kannur">Kannur</option>
                          <option value="thrissur">Thrissur</option>
                        </select>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        City
                      </label>
                      <span className="error-text">{formErrors.city}</span>

                      <input
                        onChange={inputChange}
                        type="text"
                        class="form-control"
                        name="city"
                        id=""
                        placeholder=""
                      />
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        Pincode
                      </label>
                      <span className="error-text">{formErrors.pincode}</span>

                      <input
                        onChange={inputChange}
                        type="text"
                        class="form-control"
                        name="pincode"
                        id=""
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="d-grid gap-2"
                style={{ width: "60%", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}
              >
                <button onClick={submit} type="button" name="" id="" class="btn btn-primary">
                  Signup
                </button>
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontSize: 13,
                  marginTop: 12,
                  color: "gray",
                }}
              >
                Already have an account ? <span style={{ color: "blue" }}>signin</span>
              </p>
            </div>
          </>
        ) : (
          // -----------------buissness form---------------------------------------------------------------------------------
          <>
            <div class="row justify-content-center align-items-center ">
              <div class="col-6 col-sm-12 col-md-12 col-lg-6" >
                <div>
                  {/* form ---------------------------------------------------*/}
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Buissness Name
                    </label>
                    <span className="error-text">{newformErrors.businessname}</span>
                    <input
                      onChange={newinputChange}
                      type="text"
                      class="form-control"
                      name="businessname"
                      placeholder=""
                    />
                  </div>

                  <div class="mb-3">
                    <label for="" class="form-label">
                      Username
                    </label>
                    <span className="error-text">{newformErrors.username}</span>
                    <input
                      onChange={newinputChange}
                      type="text"
                      class="form-control"
                      name="username"
                      id=""
                      placeholder=""
                    />
                  </div>

                  <div class="mb-3">
                    <label for="" class="form-label">
                      Email
                    </label>
                    <span className="error-text">{newformErrors.email}</span>
                    <input
                      onChange={newinputChange}
                      type="email"
                      class="form-control"
                      name="email"
                      id=""
                      placeholder="abc@mail.com"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="" class="form-label">
                      Phonenumber
                    </label>
                    <span className="error-text">{newformErrors.phonenumber}</span>

                    <input
                      onChange={newinputChange}
                      type="text"
                      class="form-control"
                      name="phonenumber"
                      id=""
                      placeholder=""
                    />
                  </div>

                  <div class="mb-3">
                    <label for="" class="form-label">
                      Password
                    </label>
                    <span className="error-text">{newformErrors.password}</span>

                    <input
                      onChange={newinputChange}
                      type="password"
                      class="form-control"
                      name="password"
                      id=""
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              {/* col 2 ------------------------------*/}
              <div class="col-6 col-sm-12 col-md-12 col-lg-6"> 
                <div>
                  <div class="mb-3">
                    <label for="" class="form-label">
                      Building name/no:
                    </label>
                    <span className="error-text">{newformErrors.building}</span>

                    <input
                      onChange={newinputChange}
                      type="text"
                      class="form-control"
                      name="building"
                      id=""
                      placeholder=""
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div class="mb-3">
                      <label for="" class="form-label">
                        Street
                      </label>
                      <span className="error-text">{newformErrors.street}</span>

                      <input
                        onChange={newinputChange}
                        type="text"
                        class="form-control"
                        name="street"
                        id=""
                        placeholder=""
                      />
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        Town
                      </label>
                      <span className="error-text">{newformErrors.town}</span>

                      <input
                        onChange={newinputChange}
                        type="text"
                        class="form-control"
                        name="town"
                        id=""
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div class="mb-3">
                      <label for="" class="form-label">
                        State
                      </label>
                      <span className="error-text">{newformErrors.state}</span>

                      <select
                        onChange={newinputChange}
                        class="form-select form-select-sm"
                        name="state"
                        id=""
                      >
                        <option selected>Select one</option>
                        <option value="kerala">Kerala</option>
                        <option value="karnataka">Karnataka</option>
                        <option value="tamilnadu">TamilNadu</option>
                      </select>
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        District
                      </label>
                      <span className="error-text">{newformErrors.district}</span>

                      <select
                        onChange={newinputChange}
                        class="form-select form-select-sm"
                        name="district"
                        id=""
                      >
                        <option selected>Select one</option>
                        <option value="kozhikode">kozhikode</option>
                        <option value="kannur">kannur</option>
                        <option value="thrissur">thrissur</option>
                      </select>
                    </div>

                    <div class="mb-3">
                      <label for="" class="form-label">
                        category
                      </label>
                      <span className="error-text">{newformErrors.category}</span>

                      <select
                        onChange={newinputChange}
                        class="form-select form-select-sm"
                        name="category"
                        id=""
                      >
                        <option selected>Select one</option>
                        <option value="electrical">Electrical</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="pestcontrol">Pestcontrol</option>
                      </select>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="" class="form-label">
                      City
                    </label>
                    <span className="error-text">{newformErrors.city}</span>

                    <input
                      onChange={newinputChange}
                      type="text"
                      class="form-control"
                      name="city"
                      id=""
                      placeholder=""
                    />
                  </div>

                  <div class="mb-3">
                    <label for="" class="form-label">
                      Pincode
                    </label>
                    <span className="error-text">{newformErrors.pincode}</span>

                    <input
                      onChange={newinputChange}
                      type="text"
                      class="form-control"
                      name="pincode"
                      id=""
                      placeholder=""
                    />
                  </div>
                </div>
              </div>

              <div
                class="d-grid gap-2"
                style={{ width: "60%", marginLeft: "auto", marginRight: "auto", marginTop: "20px" }}
              >
                <button onClick={newsubmit} type="button" name="" id="" class="btn btn-primary">
                  Signup
                </button>
              </div>

              <p
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontSize: 13,
                  marginTop: 12,
                  color: "gray",
                }}
              >
                Already have an account ? <span style={{ color: "blue" }}>signin</span>
              </p>
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
}
