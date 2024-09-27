import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import io from "socket.io-client";
import { dbRef2 } from "../firebase";
import onValue from "../firebase";
import { db } from "../firebase";
const socket = io.connect("http://localhost:3001");

export const ManufacturerMessage = () => {
  let [message, setMessage] = useState("");
  let [messages, setMessages] = useState([]);
  const [get, setGet] = useState(false);

  useEffect(() => {
    socket.on("message-from-back-to-man", (message) => {
      setMessages((oldArray) => [...oldArray, message]);
      setGet(!get);
    });
  }, [socket]);

  useEffect(() => {
    onValue(
      dbRef2,
      (snapshot) => {
        setMessages([]);
        console.log(snapshot);
        const data = snapshot.val();
        console.log(data);
        if (data != null) {
          Object.values(data).map((val) => {
            if (val.message !== " ")
              setMessages((oldArray) => [...oldArray, val.message]);
          });
        }
      },

      {
        onlyOnce: true,
      }
    );
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Manufacturer");
  };

  const reply = () => {
    const message_manufacturer = document.querySelector(
      ".message_manufacturer"
    );
    message_manufacturer.hidden = false;
    const reply_btn = document.querySelector(".reply_btn");
    reply_btn.disabled = true;
  };
  const reply_text = async (e) => {
    e.preventDefault();
    const replyText = document.querySelector(".reply-message-text");
    message = replyText.value;
    setMessage(replyText.value);
    socket.emit("message-from-man-to-back", message);
    replyText.value = "";

    const res = await fetch(
      "https://delivery-system-69ca9-default-rtdb.firebaseio.com/ManufacturerMessages.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }
    );
    // console.log(message);
  };

  return (
    <div>
      <div className="container p-4">
        Message sent to the Transporter. Click to send something else.
      </div>
      <button className="btn btn-danger" onClick={handleClick}>
        Back to Manufacturer Page
      </button>

      <div
        className="container p-3 mt-3"
        style={{ border: get ? "2px solid" : "" }}
      >
        <div className="container mess">
          {messages.map((mess) =>
            mess === " " ? (
              <h6 style={{ color: "red" }}>Error!!!! No Text</h6>
            ) : (
              <h6>
                <span className="transport">Transport:</span>{" "}
                <span className="trans-message">{mess}</span>
              </h6>
            )
          )}
        </div>
        <div className="container p-2 message_manufacturer" hidden>
          <textarea
            name="reply"
            id=""
            cols="40"
            rows="3"
            className="reply-message-text p-2"
          >
            {" "}
          </textarea>
          <button onClick={reply_text} className="btn btn-primary w-50">
            Send
          </button>
        </div>
        <button className="btn btn-success reply_btn mt-4" onClick={reply}>
          Message to the Transporter
        </button>
      </div>
    </div>
  );
};
