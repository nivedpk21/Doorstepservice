import React, { useEffect, useState } from "react";
import "./buissnessverification.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navigation from "../../components/Navigation";

export default function Buissnessverification() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(`https://doorstepservice.onrender.com/admin/viewbuissnessprofile/${id}`)
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setData(data);
      });
  }, []);

  const approve = (loginId) => {
    axios
      .get(`https://doorstepservice.onrender.com/admin/updatestatus/${loginId}`)
      .then((response) => {
        console.log(response);
        const message = response.data.message;
        console.log(message);

        toast.success(message);

        setTimeout(() => {
          navigate("/verifications");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navigation />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bvp-main-div border rounded">
        <div className="border-bottom" style={{ height: "50px" }}></div>
        <div className="p-3">
          <h5>{data.businessname}</h5>
          <p>
            {data.category} <br />
            {data.city}
          </p>

          <div className="border rounded p-2 mt-5" style={{ height: "150px" }}>
            <h6>Address</h6>
            <p>
              {data.building},{data.street}
              <br />
              {data.town},{data.city}
              <br />
              {data.district},{data.state}
              <br />
              {data.pincode}
            </p>
          </div>

          <div className="border rounded p-2 mt-5" style={{ height: "150px" }}>
            <h6>Contact Details</h6>
            <p>
              Phone number:{data.phonenumber}
              <br />
              Email : {data.email}
            </p>
          </div>

          <div className="mt-4" style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                approve(data.loginId);
              }}
              type="button"
              class="btn btn-primary"
            >
              Approve
            </button>
            <button type="button" class="btn btn-outline-danger">
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
