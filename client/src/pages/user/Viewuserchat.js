import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Viewuserchat() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  console.log(token);
  console.log("id:", id);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/message/viewuserchat/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
        const message = response.data.data;
        const sortData = message.sort((a, b) => parseInt(a.time) - parseInt(b.time));
        setData(sortData);
      });
  }, []);

  const [messageData, setMessageData] = useState({
    message: "",
  });
  console.log("messageData", messageData);

  const inputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("name", name);

    setMessageData({ ...messageData, [name]: value });
  };
  const sendMessage = () => {
    axios
      .post(`http://localhost:5000/message/sendmessage/${id}`, messageData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      });
  };
  console.log("data", data);
  return (
    <>
      <Header />
      <h4 style={{ textAlign: "center" }}>user</h4>

      <div
        className="container-fluid border rounded"
        style={{ padding: "10px", width: "50%", height: "100%", marginTop: "50px" }}
      >
        {data.map((item) => (
          <div className="border rounded p-2">
            {item.type == "sent" ? (
              <>
                <p style={{ textAlign: "end" }}>{item.message}</p>
              </>
            ) : (
              <>
                <p style={{ textAlign: "start" }}>{item.message}</p>
              </>
            )}
          </div>
        ))}
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
            sendMessage();
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
    </>
  );
}
