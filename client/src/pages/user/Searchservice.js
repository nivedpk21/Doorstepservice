import React, { useState } from "react";
import Navigation from "../../components/Navigation";
import "./searchservice.css";
import axios from "axios";
import "./searchservice.css";
import { Link } from "react-router-dom";

export default function Searchservice() {
  const [data, setData] = useState({
    category: "",
    city: "",
  });

  const [searchresult, setSearchresult] = useState([]);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    console.log("value", value);

    setData({ ...data, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();

    if (Object.keys(data).length !== 0) {
      axios
        .post("https://doorstepservice.onrender.com/user/search", data)
        .then((response) => {
          console.log(response);
          const data = response.data.data;
          setSearchresult(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Navigation />
      <div className="container-fluid search-div-1 border rounded-3 mt-5">
        <div className="row pt-3 pb-3 pb-lg-0">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <select
              name="city"
              onChange={inputChange}
              className="form-select mb-3"
              aria-label="Default select example"
            >
              <option selected>Select City</option>
              <option value="kozhikode">Kozhikode</option>
              <option value="kannur">Kannur</option>
              <option value="kochi">Kochi</option>
            </select>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <select
              name="category"
              onChange={inputChange}
              className="form-select mb-3"
              aria-label="Default select example"
            >
              <option selected>Select Category</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="pestcontrol">PestControl</option>
            </select>
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <button type="button" className="btn btn-primary w-100" onClick={submit}>
              Search
            </button>
          </div>
        </div>
      </div>

      {searchresult.map((item) => (
        <div className="container border rounded mt-3 result-div-1">
          <div className="p-1 d-flex flex-wrap">
            <div>
              <img src="./images/smartphone.jpg" alt="logo" width="100px" />
            </div>
            <div className="ms-5">
              <p className="m-0 fs-5">{item.businessname}</p>
              <p>{item.city}</p>
              <p>{item.category}</p>
            </div>
            <div className="text-center ms-auto mt-1 btn-1-div">
              <Link
                type="button"
                className="btn btn-secondary btn-1"
                to={`/bookservice/${item._id}`}
              >
                Book
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
