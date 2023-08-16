import React, { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { db, dbRef } from "../firebase";
import { dbRef3 } from "../firebase";
import onValue from "../firebase";
import { useNavigate } from "react-router";
// import  value  from "./Manufacturer";
const socket = io.connect("http://localhost:3001");
export const TransporterMessages = () => {
  const navigate = useNavigate();
  // const value = [];

  const [value, setValue] = useState([]);
  const [messages, setMessages] = useState([]);
  let [message, setMessage] = useState("");
  const [get,setGet] = useState(false);

  useEffect(() => {
    socket.on("sent_from_man", (data) => {
      alert("New Order Recieved from the Manufacturer, Refresh the Page");
      console.log(data);
    });
    socket.on("message-from-back-to-tran", (message) => {
      // alert(message);
      console.log("Message from Man:", message);
      setMessages((oldArray) => [...oldArray, message]);
      setGet(!get);
      
    });
  }, [socket]);

  useEffect(() => {
    onValue(
      dbRef,
      (snapshot) => {
        setValue([]);
        console.log(snapshot)
        const data = snapshot.val();
        console.log(data);
        if (data != null) {
          Object.values(data).map((val) => {
            setValue((oldArray) => [...oldArray, val]);
          });
        }
      },

      {
        onlyOnce: true,
      }
    );
    onValue(
      dbRef3,
      (snapshot) => {
        setMessages([])
        console.log(snapshot)
        const data = snapshot.val();
        console.log(data);
        if (data != null) {
          Object.values(data).map((val) => {
            if(val.message!==" ")
            setMessages((oldArray) => [...oldArray, val.message]);
          });
        }
      },

      {
        onlyOnce: true,
      }
    );
  }, []);

  const reply = () => {
    const message_manufacturer = document.querySelector(
      ".message_manufacturer"
    );
    message_manufacturer.hidden = false;
    const reply_btn = document.querySelector(".reply_btn");
    reply_btn.disabled = true;
  };


  const reply_text = async(e) => {
    e.preventDefault();
    const replyText = document.querySelector(".reply-message-text");
    message = replyText.value;
    setMessage(replyText.value);
    socket.emit("message-from-tran-to-back", message);
    replyText.value = "";

    const res = await fetch(
      "https://delivery-system-69ca9-default-rtdb.firebaseio.com/TransporterMessages.json",
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
    // console.log(res);
      // console.log(res.json());

    // console.log(message);
  };

  return (
    <>
      <h1>All Messages from Manufacturer</h1>
      <div class="container messages">
        <div class="row">
          {value.map((val) => (
            <div class="col-3">
              <ul class="">
                <li class="list-group-item">
                  {" "}
                  <span className="font-weight-bold">Order ID:</span>{" "}
                  {val.order_id}
                </li>
                <li class="list-group-item">
                  {" "}
                  <span className="font-weight-bold">From:</span> {val.from}
                </li>
                <li class="list-group-item">
                  {" "}
                  <span className="font-weight-bold">To: </span> {val.to}
                </li>
                <li class="list-group-item">
                  {" "}
                  <span className="font-weight-bold">Qty:</span> {val.qty}
                </li>
                <li class="list-group-item">
                  {" "}
                  <span className="font-weight-bold">Transporter:</span>{" "}
                  {val.transporter}
                </li>
                <li class="list-group-item">
                  {" "}
                  <span className="font-weight-bold">Address:</span>{" "}
                  {val.address}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container p-3"style={{border:get ? "2px solid" : ""}}>
      <div className="mess"  >
        {messages.map((mess) => (
          mess===" " ? 
          <h6 style={{color:"red"}}>Error!!!! No Text</h6> : 
          <h6>{mess}</h6>
        ))}
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
        <button onClick={reply_text}>Send</button>
      </div>
      <button className="btn btn-success reply_btn mt-4" onClick={reply}>
        Message to the Manufacturer
      </button>
      </div>
    </>
  );
};
