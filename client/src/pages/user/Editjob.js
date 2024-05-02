import React, { useEffect, useState } from "react";
import "./editjob.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../../components/Navigation";

export default function Editjob() {
  const { id } = useParams();
  console.log("jobid", id);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    city: "",
    date: "",
    budget: "",
    image: "",
    address: "",
  });
  console.log(data);
  const [isSubmit, setIsSubmit] = useState(false);
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    axios.get(`https://doorstepservice.onrender.com/user/viewpostedjob/${id}`).then((response) => {
      console.log(response);
      const jobdata = response.data.data;
      setData(jobdata);
    });
  }, []);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData({ ...data, [name]: value });
  };
  console.log(data);

  const setSelectedValue = (event) => {
    setData({ ...data, city: event.target.value });
  };

  const [formErrors, setFormErrors] = useState({});

  const validate = (values) => {
    var error = {};

    if (!values.title) {
      error.title = "enter title";
    }
    if (!values.description) {
      error.description = "enter description";
    }
    if (!values.category) {
      error.category = "enter category";
    }
    if (!values.city) {
      error.city = "enter city";
    }
    if (!values.date) {
      error.date = "enter date";
    }
    if (!values.budget) {
      error.budget = "enter budget";
    }
    if (!values.image) {
      error.image = "upload image";
    }
    if (!values.address) {
      error.address = "enter address";
    }
    return error;
  };

  const submit = (e) => {
    e.preventDefault();
    setFormErrors(validate(data));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios
        .post(`https://doorstepservice.onrender.com/user/savejob/${id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
        });
    }
  };
  return (
    <>
      <Navigation />

      <div>
        <div
          className="editjob-div container-fluid border border-2  rounded "
          style={{
            height: "100%",
            marginTop: "50px",
            padding: "0px",
            backgroundColor: "white",
          }}
        >
          <div className="container-fluid border-bottom  " style={{ padding: " 15px" }}>
            <h5 style={{ textAlign: "center" }}>Edit Job</h5>
          </div>
          <div style={{ padding: "20px" }}>
            <div>
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="formlabel">
                    Job Title
                  </label>
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      fontSize: "small",
                    }}
                  >
                    {formErrors.title}
                  </span>

                  <input
                    name="title"
                    onChange={inputChange}
                    type="text"
                    class="form-control forminput"
                    value={data.title}
                  />
                </div>

                <div class="mb-3">
                  <label for="exampleInputEmail1" class="formlabel">
                    Job Description
                  </label>
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      fontSize: "small",
                    }}
                  >
                    {formErrors.description}
                  </span>

                  <input
                    value={data.description}
                    name="description"
                    onChange={inputChange}
                    type="text"
                    class="form-control forminput"
                  />
                </div>

                <div className="row" style={{ marginTop: "20px" }}>
                  <div className=" col col-sm-12 col-lg-6 ">
                    <select
                      value={data.category}
                      id="Select"
                      className="form-select"
                      style={{ height: 50, fontSize: 14 }}
                      onChange={inputChange}
                      name="category"
                    >
                      <option> select</option>
                      <option value="Electrical"> Electrical</option>
                      <option value="Plumbing"> Plumbing</option>
                      <option value="Carpentry"> Carpentry</option>
                    </select>
                  </div>

                  <div className=" col col-sm-12 col-lg-6 mt-sm-3 mt-lg-0 ">
                    <select
                      value={data.city}
                      id="Select"
                      className="form-select"
                      style={{ height: 50, fontSize: 14 }}
                      onChange={setSelectedValue}
                      name="category"
                    >
                      <option> select</option>
                      <option value="Kozhikode"> Kozhikode</option>
                      <option value="Kannur"> Kannur</option>
                      <option value="Vadakara"> Vadakara</option>
                    </select>
                  </div>

                  <div className=" row " style={{ marginTop: "10px" }}>
                    <div className="col col-sm-12 col-lg-6 ">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="formlabel">
                          Date
                        </label>
                        <span
                          style={{
                            color: "red",
                            marginLeft: "10px",
                            fontSize: "small",
                          }}
                        >
                          {formErrors.date}
                        </span>

                        <input
                          value={data.date}
                          onChange={inputChange}
                          name="date"
                          type="date"
                          class="form-control forminput"
                        />
                      </div>
                    </div>

                    <div className="col col-sm-12 col-lg-6 ">
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="formlabel">
                          Budget
                        </label>
                        <span
                          style={{
                            color: "red",
                            marginLeft: "10px",
                            fontSize: "small",
                          }}
                        >
                          {formErrors.budget}
                        </span>

                        <input
                          value={data.budget}
                          onChange={inputChange}
                          name="budget"
                          type="text"
                          class="form-control forminput"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="formFile" class="formlabel">
                      Upload images
                    </label>
                    <span
                      style={{
                        color: "red",
                        marginLeft: "10px",
                        fontSize: "small",
                      }}
                    >
                      {formErrors.images}
                    </span>

                    <input
                      onChange={inputChange}
                      name="images"
                      class="form-control  form-control-lg"
                      type="file"
                      id="formFile"
                      style={{ fontSize: "16px" }}
                    />
                  </div>

                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="formlabel">
                      Address
                    </label>
                    <span
                      style={{
                        color: "red",
                        marginLeft: "10px",
                        fontSize: "small",
                      }}
                    >
                      {formErrors.address}
                    </span>

                    <textarea
                      value={data.address}
                      onChange={inputChange}
                      name="address"
                      type="text "
                      rows={3}
                      class="form-control forminput"
                    />
                  </div>
                </div>
              </form>

              <div style={{ textAlign: "center" }}>
                <button onClick={submit} type="button" class="btn btn-success">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
