import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function Buissnessonsearch() {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/user/viewfullbuissnessprofile/${id}`).then((response) => {
      console.log("response", response);
      const data = response.data.data;
      setData(data);
    });
  }, []);

  const [data, setData] = useState({});

  const [messageData, SetMessagedata] = useState({
    message: "",
    time: "",
  });

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    SetMessagedata({ ...messageData, [name]: value });
  };
  const token = localStorage.getItem("token");

  const sendMessage = (buissnessId) => {
    axios
      .post(`http://localhost:5000/message/sendmessage/${buissnessId}`, messageData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <>
      <Header />

      <section>
        <div
          className="p-5"
          style={{
            width: "100%",
            height: "300px",
            margin: "auto",
            backgroundColor: "#244034",
          }}
        >
          <div
            className=" container  rounded" //profile-div
            style={{
              width: "80%",
              height: "160px",
              padding: "10px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  margin: "auto",
                  //   marginLeft: "40px",
                }}
              ></div>
            </div>

            <div className="p-3">
              <h5 style={{ color: "white", margin: "0" }}>{data.businessname}</h5>
              <p style={{ color: "white", margin: "0" }}>{data.category}</p>
            </div>

            <div className="p-3">
              <p style={{ color: "white", margin: "0" }}>Location</p>
              <h5 style={{ color: "white", margin: "0" }}>
                {data.city},{data.state}
              </h5>
            </div>

            <div className="p-3">
              <p style={{ color: "white", margin: "0" }}>Buissness time</p>
              <h5 style={{ color: "white", margin: "0" }}>mon - fri : 9:00Am - 10:00Pm </h5>
            </div>

            <div className="p-3">
              <p style={{ color: "white", margin: "0" }}>Rating</p>
              <h5 style={{ color: "white", margin: "0" }}>3 *****</h5>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0px",
            padding: "50px",
            backgroundColor: "#eff6f3",
          }}
        >
          <div
            className=" rounded-4 p-3"
            style={{ width: "65%", height: "300px", backgroundColor: "white" }}
          >
            <h5>Overview</h5>
            <p className="mt-4" style={{ lineHeight: "30px" }}>
              Hello my name is Ariana Gande Connor and I’m a Financial Supervisor from Netherlands,
              Rotterdam. In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse
              malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor non
            </p>
          </div>
          <div
            className="rounded-3 p-3"
            style={{
              width: "25%",
              minHeight: "300px",
              maxHeight: "auto",
              textAlign: "center",
              padding: "0",
              backgroundColor: "white",
            }}
          >
            <div style={{ minHeight: "140px" }}>
              <h5>Address</h5>
              <p></p>
            </div>
            <div>
              <h5>Contact</h5>
              <p className="mt-3">
                Ph: 9858658458 <br />
                Email: example@email.com
              </p>
              <div class="btn-group btn-group-sm" role="group" aria-label="default button group">
                <button type="button" class="btn btn-outline-primary">
                  Call
                </button>
                <Link
                  to={`/viewuserchat/${data.loginId}`}
                  type="button"
                  class="btn btn-outline-primary"
                >
                  Message
                </Link>
                <button type="button" class="btn btn-outline-primary">
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Modal --> ---------------------------------------*/}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Chat
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <div
                className="container border border-2"
                style={{ width: "100%", height: "300px" }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <form>
                  <div class="mb-3">
                    <input
                      name="message"
                      onChange={inputChange}
                      type="email"
                      class="form-control border border-secondary"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </form>
                <button
                  onClick={() => {
                    sendMessage(data.loginId);
                  }}
                  className="btn btn-primary"
                  style={{
                    height: "30px",
                    width: "60px",
                    padding: "0",
                    fontSize: "15px",
                    marginLeft: "2px",
                  }}
                >
                  Send
                </button>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
