import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./postjob.css";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function Postjob() {
  const token = localStorage.getItem("token");
  const [address, setAddress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/user/profile", {
        headers: { Authorization: `bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setAddress(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [inputvalues, setInputvalues] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    budget: "",
    image: "",
  });
  console.log(inputvalues);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputvalues({ ...inputvalues, [name]: value });
  };

  const photoChange = (event) => {
    setInputvalues({ ...inputvalues, image: event.target.files[0] });
  };

  const validate = (values) => {
    var error = {};

    if (!values.title) {
      error.title = "enter title";
    }
    if (!values.description) {
      error.description = "enter description";
    }
    if (!values.category) {
      error.category = "select category";
    }
    if (!values.date) {
      error.date = "select date";
    }
    if (!values.budget) {
      error.budget = "enter budget";
    }
    if (!values.image) {
      error.image = "upload image";
    }
    return error;
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const submit = (e) => {
    console.log("image", inputvalues.image);
    e.preventDefault();
    setFormErrors(validate(inputvalues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const formdata = new FormData();
      formdata.append("title", inputvalues.title);
      formdata.append("description", inputvalues.description);
      formdata.append("category", inputvalues.category);
      formdata.append("date", inputvalues.date);
      formdata.append("budget", inputvalues.budget);
      formdata.append("address", inputvalues.address);
      formdata.append("image", inputvalues.image);
      console.log(formdata, "formdata");
      // formdata.append("file",filedata)

      axios
        .post("https://doorstepservice.onrender.com/user/postjob", formdata, {
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
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
    }
  };

  return (
    <>
      <Navigation />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="main-div container-fluid border border-2 rounded ">
        <div className="heading-div container-fluid border-bottom  ">
          <h5 className="heading">Post Job</h5>
        </div>

        <div style={{ padding: "10px", marginTop: "10px" }}>
          <form encType="multipart/form-data">
            <div className="mb-3">
              <label for="jobtitle" className="formlabel">
                Job Title
              </label>
              <span className="error-text">{formErrors.title}</span>
              <input
                name="title"
                onChange={inputChange}
                type="text"
                className="form-control forminput"
              />
            </div>

            <div class="mb-3">
              <label for="" class="formlabel">
                Description
              </label>
              <span className="error-text">{formErrors.description}</span>
              <textarea
                onChange={inputChange}
                style={{ height: "70px" }}
                class="form-control"
                name="description"
                id=""
                rows="3"
              ></textarea>
            </div>

            <div className="row">
              <div className="col-12 col-sm-12 col-lg-6">
                <label className="formlabel">Category</label>
                <span className="error-text">{formErrors.category}</span>
                <select
                  className="form-select forminput"
                  aria-label="Default select example"
                  name="category"
                  onChange={inputChange}
                >
                  <option selected>Select category</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="pestcontrol">Pestcontrol</option>
                </select>
              </div>
            </div>

            <div className=" row mt-3 ">
              <div className="col-12 col-sm-12 col-lg-6 ">
                <div className="mb-3">
                  <label for="exampleInputEmail1" class="formlabel">
                    Date
                  </label>
                  <span className="error-text">{formErrors.date}</span>

                  <input
                    onChange={inputChange}
                    name="date"
                    type="date"
                    className="form-control forminput"
                  />
                </div>
              </div>

              <div className="col-12 col-sm-12 col-lg-6 ">
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="formlabel">
                    Budget
                  </label>
                  <span className="error-text">{formErrors.budget}</span>

                  <input
                    onChange={inputChange}
                    name="budget"
                    type="text"
                    className="form-control forminput"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label for="formFile" class="formlabel">
                Upload images
              </label>
              <span className="error-text">{formErrors.image}</span>

              <input
                onChange={photoChange}
                name="image"
                className="form-control  form-control-lg"
                type="file"
                id="formFile"
                style={{ fontSize: "16px" }}
              />
            </div>

            <div className="border rounded p-3 mb-3" style={{ height: "150px" }}>
              <h6>Address</h6>
              <p>
                {address.house},{address.street},<br />
                {address.town},{address.city},<br />
                {address.district},{address.state}
                <br />
                {address.pincode}
              </p>
            </div>
          </form>

          <div style={{ textAlign: "center" }}>
            <button onClick={submit} type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
