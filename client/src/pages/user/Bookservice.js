import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Bookservice() {
  const { id } = useParams();
  const [businessData, setData] = useState({});
  const [userData, setUserdata] = useState({});
  const [formErrors, setFormerrorrs] = useState({});
  const [isSubmit, setIssubmit] = useState(false);

  const [bookingData, setBookingdata] = useState({
    title: "",
    description: "",
    jobtype: "",
    date: "",
  });

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setBookingdata({ ...bookingData, [name]: value });
  };

  const validate = (values) => {
    var error = {};
    if (!values.title) {
      error.title = "required";
    }
    if (!values.description) {
      error.description = "required";
    }
    if (!values.jobtype) {
      error.jobtype = "required";
    }
    if (!values.date) {
      error.date = "required";
    }
    return error;
  };

  const submit = (e) => {
    e.preventDefault();
    setIssubmit(true);
    setFormerrorrs(validate(bookingData));

    if (Object.keys(formErrors).length === 0 && isSubmit)
      axios
        .post(`https://doorstepservice.onrender.com/user/bookservice/${id}`, bookingData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const message = response.data.message;
          console.log(message);

          toast.success(message);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  useEffect(() => {
    axios.get(`https://doorstepservice.onrender.com/user/viewbuissnessdetails/${id}`).then((response) => {
      console.log(response);
      const buissnessData = response.data.data;
      setData(buissnessData);
    });
  }, []);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://doorstepservice.onrender.com/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("userdata", response);
        const userData = response.data.data;
        setUserdata(userData);
      });
  }, []);

  return (
    <>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="border rounded" style={{ width: "50%", height: "100%", margin: "50px auto" }}>
        <div className="border-bottom p-2 text-center" style={{ height: "50px" }}>
          <h5>Book Appointment</h5>
        </div>

        <div className="p-3 mt-3 ">
          <h6>
            {businessData.businessname}
            <br />
            {businessData.category}
            <br />
            {businessData.city}
          </h6>
        </div>

        <div class="mb-3 p-3">
          <label for="" class="formlabel">
            Title
          </label>
          <span style={{ color: "red" }}>{formErrors.title}</span>
          <input
            style={{ height: "40px" }}
            onChange={inputChange}
            type="text"
            class="form-control"
            name="title"
            id=""
            placeholder=""
          />
        </div>

        <div className="p-3 ">
          <div class="mb-3 ">
            <label for="" class="formlabel">
              Description
            </label>
            <span style={{ color: "red" }}>{formErrors.description}</span>
            <textarea
              onChange={inputChange}
              style={{ width: "100%", minHeight: "100px", maxHeight: "100px" }}
              class="form-control"
              name="description"
              id=""
              rows="3"
            ></textarea>
          </div>

          <div className="mt-4" style={{ display: "flex", justifyContent: "space-between" }}>
            <div class="mb-3" style={{ width: "40%" }}>
              <label for="" class="formlabel">
                JobType
              </label>
              <span>{formErrors.jobtype}</span>
              <select
                onChange={inputChange}
                style={{ height: "40px" }}
                class="form-select form-select-sm"
                name="jobtype"
                id=""
              >
                <option selected>Select one</option>
                <option value="repairing">Repairing</option>
                <option value="maintenance">Maintenance</option>
                <option value="installation">Installation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div class="mb-3" style={{ width: "40%" }}>
              <label for="" class="formlabel">
                Date
              </label>
              <span>{formErrors.date}</span>
              <input
                onChange={inputChange}
                style={{ height: "40px" }}
                type="date"
                class="form-control"
                name="date"
                id=""
                aria-describedby="helpId"
                placeholder=""
              />
            </div>
          </div>

          <div className="mt-3">
            <div className="border rounded p-3">
              <p>
                {userData.name}
                <br />
                {userData.phonenumber}
                <br />
                {userData.email}
              </p>
              <p>
                {userData.house},{userData.street}
                <br />
                {userData.town},{userData.city}
                <br />
                {userData.district},{userData.state}
                <br />
                {userData.pincode}
              </p>
            </div>
          </div>
          <div className="mt-3 text-center">
            <button onClick={submit} type="button" class="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
