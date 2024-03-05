import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import "./postjob.css";

export default function Postjob() {
  // const [filedata,setFiledata] = useState()

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputvalues({ ...inputvalues, [name]: value });
  };
  const photoChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(event);

    setInputvalues({ ...inputvalues, image: event.target.files[0] });
  };
  const [inputvalues, setInputvalues] = useState({
    title: "",
    description: "",
    category: "",
    city: "",
    date: "",
    budget: "",
    address: "",
    image: "",
  });

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
    if (!values.city) {
      error.city = "select city";
    }
    if (!values.date) {
      error.date = "select date";
    }
    if (!values.budget) {
      error.budget = "enter budget";
    }
    if (!values.address) {
      error.address = "enter address";
    }
    if (!values.image) {
      error.image = "upload image";
    }
    return error;
  };

  const token = localStorage.getItem("token");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputvalues));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const formdata = new FormData();
      formdata.append("title", inputvalues.title);
      formdata.append("description", inputvalues.description);
      formdata.append("category", inputvalues.category);
      formdata.append("city", inputvalues.city);
      formdata.append("date", inputvalues.date);
      formdata.append("budget", inputvalues.budget);
      formdata.append("address", inputvalues.address);
      formdata.append("image", inputvalues.image);
      // formdata.append("file",filedata)

      axios
        .post("http://localhost:5000/user/postjob", formdata, {
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
      <Header />
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
              <input name="title" onChange={inputChange} type="text" className="form-control forminput" />
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="formlabel">
                Job Description
              </label>
              <span className="error-text">{formErrors.description}</span>
              <input name="description" onChange={inputChange} type="text" className="form-control forminput" />
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
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Carpentry">Capentry</option>
                </select>
              </div>

              <div className="col-12 col-sm-12 col-lg-6">
                <label className="formlabel">City</label>
                <span className="error-text">{formErrors.city}</span>
                <select
                  className="form-select forminput"
                  aria-label="Default select example"
                  name="city"
                  onChange={inputChange}
                >
                  <option selected>Select city</option>
                  <option value="Kozhikode">Kozhikode</option>
                  <option value="Kannur">Kannur</option>
                  <option value="Vadakara">Vadakara</option>
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

                  <input onChange={inputChange} name="date" type="date" className="form-control forminput" />
                </div>
              </div>

              <div className="col-12 col-sm-12 col-lg-6 ">
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="formlabel">
                    Budget
                  </label>
                  <span className="error-text">{formErrors.budget}</span>

                  <input onChange={inputChange} name="budget" type="text" className="form-control forminput" />
                </div>
              </div>
            </div>

            <div className="mb-3">
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

            <div class="mb-3">
              <label for="exampleInputEmail1" className="formlabel">
                Address
              </label>
              <span className="error-text">{formErrors.address}</span>

              <textarea
                onChange={inputChange}
                name="address"
                type="text "
                rows={3}
                className="form-control forminput"
              />
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
