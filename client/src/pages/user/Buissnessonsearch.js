import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
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
  const date = new Date();
  const fdate = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();
  const fulldate = fdate + "" + month + year + hour + minute + seconds;

  console.log("date", date);
  console.log("fulldate", fulldate);
  console.log("hour", hour);
  console.log("minute", minute);
  console.log("seconds", seconds);
  console.log("month", month);
  console.log("year", year);

  const time = new Date();
  const currentTime = time.getTime();
  console.log("current", currentTime);

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
          className="container-fluid border border-dark"
          style={{
            height: "300px",
            backgroundColor: "#016551",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container border- imagecontainer" style={{ display: "flex", alignItems: "center" }}>
            <div>
              <img
                src="/images/smartphone.jpg"
                class="img-fluid"
                alt="..."
                style={{ width: "180px", borderRadius: "12px" }}
              />
            </div>
            <div
              className=" border-"
              style={{
                width: "400px",
                height: "100%",
                // backgroundColor: "blue",
                padding: "20px",
              }}
            >
              <div>
                <button
                  className="btn  border border-2"
                  style={{
                    height: "25px",
                    width: "50px",
                    padding: "0px",
                    fontFamily: "serif",
                    backgroundColor: "#7bbd15",
                    color: "white",
                  }}
                >
                  Open
                </button>
              </div>
              <div style={{ marginTop: "13px", color: "white" }}>
                <h5>Buissness Name</h5>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <div>
                  <p
                    style={{
                      border: "1px solid",
                      padding: "4px",
                      fontFamily: "serif",
                      color: "white",
                    }}
                  >
                    Category
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      border: "1px solid",
                      padding: "4px",
                      fontFamily: "serif",
                      color: "white",
                    }}
                  >
                    Location
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      border: "1px solid",
                      padding: "4px",
                      fontFamily: "serif",
                      color: "white",
                    }}
                  >
                    hourly pay
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      border: "1px solid",
                      padding: "4px",
                      fontFamily: "serif",
                      color: "white",
                    }}
                  >
                    Experience
                  </p>
                </div>
              </div>
              <div style={{ marginTop: "5px" }}>
                <h6 style={{ color: "orange" }}>4.5 * * * * *</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            // border: "1px solid green",
            marginTop: "50px",
            padding: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div className="border border-2 row container" style={{ padding: "10px", borderRadius: "10px" }}>
            <div className=" col-sm-12 col-lg-7 p-1">
              <div
                className=" border border-2 rounded"
                style={{
                  height: "250px",
                  // border: "1px solid blue",
                  borderRadius: "10px",
                  padding: "20px",
                  // backgroundColor:"#d0dce5"
                }}
              >
                <h5>About</h5>
                <p style={{ fontFamily: "serif", marginTop: "30px" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
                  <br /> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                  anim id est laborum.
                </p>
              </div>
            </div>
            <div className=" col-sm-12 col-lg-5 p-1 ">
              <div
                className=" border border-2 rounded"
                style={{
                  height: "250px",
                  // border: "1px solid red",
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ height: "166px" }}>
                  <h5>Address</h5>
                  <p style={{ fontFamily: "serif", marginTop: "30px" }}>
                    ABC Archade , Old Street ,<br /> NewYork City ,<br />
                    USA
                  </p>
                </div>

                <div
                  className="border border-2 rounded"
                  style={{
                    height: "80px",
                    // border: "1px solid black",
                  }}
                >
                  <div class="btn-group" role="group" aria-label="Basic outlined example" style={{ padding: "20px" }}>
                    <button type="button" class="btn btn-outline-success">
                      Call
                    </button>
                    <button
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      type="button"
                      class="btn btn-outline-success"
                    >
                      Message
                    </button>
                    <button type="button" class="btn btn-outline-success">
                      Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="border border-2 rounded "
          style={{
            backgroundColor: "white",
            display: "flex",
            // border: "1px solid black",
            marginTop: "50px",
            padding: "50px",
          }}
        >
          <div className="border border-2 " style={{ width: "70%", height: "300px" }}>
            <div></div>
          </div>
          <div className="border border-2" style={{ width: "30%", height: "300px" }}>
            map location
          </div>
        </div>
      </section>
      <section>
        <div
          style={{
            display: "flex",
            // border: "1px solid black",
            marginTop: "50px",
            padding: "50px",
            // backgroundColor:"#C8FCEB"
          }}
        >
          <div
            style={{
              width: "70%",
              height: "300px",
              border: "1px solid black",
              margin: "auto",
            }}
          >
            Ratings and reviews
          </div>
        </div>
      </section>

      {/* <!-- Modal --> ---------------------------------------*/}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Chat
              </h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
              <div className="container border border-2" style={{ width: "100%", height: "300px" }}></div>
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
