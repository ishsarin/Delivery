import React, { useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router";
import { db, dbRef } from "../firebase";
import onValue from "../firebase";

const socket = io.connect("http://localhost:3001");
export const Manufacturer = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.querySelector(".form_data");
    const dropdown_data = document.querySelector(".dropdown");
    const dropdown = dropdown_data.options[dropdown_data.selectedIndex].text;
    // console.log(dropdown);
    // var formData = new FormData(document.querySelector('.form_data'))
    const formData = Object.fromEntries(new FormData(form).entries());
    const data = { ...formData, transporter: dropdown };
    socket.emit("send_message", data);
    const { order_id, qty, to, from, address, transporter } = data;
    const res = await fetch(
      "https://delivery-system-69ca9-default-rtdb.firebaseio.com/UserData.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id,
          qty,
          to,
          from,
          address,
          transporter,
        }),
      }
    );
    // console.log(res);
    navigate("/Manufacturer/message");
  };

  const handleClick = ()=>{
    navigate("/Manufacturer/message");
  }

  return (
    <>
      <h3>Enter the Details</h3>
      <form
        action="/Manufacturer/messages"
        onSubmit={handleSubmit}
      className="form_data"
        // required
      >
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">
            Order ID
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              name="order_id"
              placeholder="Order ID"
              className="order_id form-control"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">
            From
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control from"
              id="inputPassword3"
              name="from"
              placeholder="From"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">
            To
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control To"
              name="to"
              placeholder="To"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">
            Qty
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control qty"
              name="qty"
              placeholder="Qty"
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">
            Address
          </label>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control address"
              name="address"
              placeholder="Address"
              required
            />
          </div>
        </div>
        <div className="form-group-row">
          {" "}
          <label className="col-form-label" htmlFor="">
            Transporter
          </label>
          <select name="dropdown" id="" className="dropdown p-2" required>
            <option value="" disabled selected>
              Select the Transporter
            </option>
            <option value="" name="1">
              1
            </option>
            <option value="" name="2">
              2
            </option>
            <option value="" name="3">
              3
            </option>
          </select>
        </div>
        <div className="form-group-row p-4">
          <button className="btn btn-dark">Submit</button>
        </div>
      </form>
      <button className="btn btn-danger" onClick={handleClick}>
        Messages
      </button>
    </>
  );
};
// export default value;
