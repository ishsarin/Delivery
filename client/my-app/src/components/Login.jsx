import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
let val;
export const Login = () => {

    const navigate = useNavigate();
    const type_submission = ()=>{
       const form_val = document.querySelector('.form-control');
        val = form_val.options[form_val.selectedIndex].text;
        console.log(val);
       if(val==="Manufacturer")
       {
        navigate(`/Manufacturer`);
       }
       else if(val==="Transporter")
       {
        navigate(`/Transporter/messages`);
       }
       else
       {
        const option = document.querySelector(".no_option");
        option.hidden = false;
       }
    }
  return (
    <>
        <form>
      <div class="form-group">
        <select class="form-control form-control-lg">
          <option disabled selected>Select the Option</option>
          <option>Manufacturer</option>
          <option>Transporter</option>
        </select>
      </div>
      
    </form>
    <button onClick={type_submission} class="btn btn-primary">
        Submit
    </button>
    <h5 className="no_option p-4" hidden>Please select an option</h5>
    </>
  );
};
export default val;