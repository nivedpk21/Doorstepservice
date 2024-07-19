import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navigation from "../../components/Navigation";

export default function Viewmessage() {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [userData, setUserdata] = useState({});

  useEffect(() => {
    axios
      .get(`https://doorstepservice.onrender.com/message/viewchatmessage/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        const messageData = response.data.data;

        const sortData = messageData.sort((a, b) => parseInt(a.time) - parseInt(b.time));
        setData(sortData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://doorstepservice.onrender.com/buissness/viewuserdetails/${id}`)
      .then((response) => {
        console.log(response);
        const data = response.data.data;
        setUserdata(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [replyData, setReplydata] = useState({
    message: "",
  });

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setReplydata({ ...replyData, [name]: value });
  };

  const sendMessage = () => {
    if (replyData.message != "") {
      axios
        .post(`https://doorstepservice.onrender.com/message/savereplymessage/${id}`, replyData, {
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
      <Navigation />
      <div
        className="border p-3"
        style={{
          width: "35%",
          height: "80px",
          margin: "50px auto 0 auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: "50%",
            height: "60px",
            width: "60px",
            backgroundColor: "grey",
          }}
        ></div>
        <div className="p-1">
          <h6>{userData.name}</h6>
        </div>
        <div style={{ marginLeft: "auto " }}>
          {/* <div class="dropdown-center">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="#">
                  Clear Chat
                </a>
              </li>
              
            </ul>
          </div> */}
        </div>
      </div>
      <div
        className="container-fluid border "
        style={{
          padding: "10px",
          width: "35%",
          height: "450px",
          marginTop: "0px",
          overflowY: "auto",
          overflowX: "hidden",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
      >
        {data.map((item) => (
          <div className="border rounded p-2">
            {item.type == "reply" ? (
              <>
                <p className=" " style={{ textAlign: "end" }}>
                  {item.message}
                </p>
              </>
            ) : (
              <>
                <p style={{ textAlign: "start" }}>{item.message}</p>
              </>
            )}
          </div>
        ))}
      </div>
      <div
        className="border  p-1 mb-5"
        style={{ width: "35%", marginLeft: "auto", marginRight: "auto" }}
      >
        <div class=" " style={{ display: "flex", alignItems: "center" }}>
          <input
            onChange={inputChange}
            style={{ height: "35px" }}
            type="text"
            class="form-control"
            name="message"
            id=""
            aria-describedby="helpId"
            placeholder=""
          />
          <button onClick={sendMessage} type="button" class="btn btn-primary">
            send
          </button>
        </div>
      </div>
    </>
  );
}
