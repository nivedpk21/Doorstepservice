import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Viewmessage() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/message/viewchatmessage/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response);
        const messageData = response.data.data;

        const sortData = messageData.sort((a, b) => parseInt(a.time) - parseInt(b.time));
        console.log("sortData", sortData);
        setData(messageData);
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
    axios
      .post(`http://localhost:5000/message/savereplymessage/${id}`, replyData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);

        const filterData = data.filter((obj) => {
          return obj._id != id;
        });
        setData(filterData);
      });
  };

  return (
    <>
      <Header />
      <div
        className="container-fluid border rounded"
        style={{ padding: "10px", width: "50%", height: "100%", marginTop: "50px" }}
      >
        {data.map((item) => (
          <div className="border rounded" style={{ margin: "2px", padding: "15px" }}>
            {item.type == "reply" ? (
              <>
                <p style={{ textAlign: "end", fontFamily: "serif" }}>{item.message}</p>
              </>
            ) : (
              <>
                <p style={{ textAlign: "start", fontFamily: "serif" }}>{item.message}</p>
              </>
            )}
          </div>
        ))}

        <div style={{ display: "flex" }}>
          <div style={{ width: "75%" }}>
            <input
              name="message"
              onChange={inputChange}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div style={{ width: "25%" }}>
            <button onClick={sendMessage} className="btn btn-primary">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
