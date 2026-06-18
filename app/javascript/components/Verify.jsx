import React, { useRef, useState,useEffect } from "react";
import Modal from "react-modal";

import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./verify.css"


export default function Verify() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [index, setIndex] = useState(0);
  const [error,setError] = useState(false);
  const [second, setSecond] = useState(0)
  const inputsRef = useRef([]);
  const navigate = useNavigate();


  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecond(prev => prev + 1);
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 30000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
}, []);
  
const verifyTheCode = () => {
    const code = inputsRef.current.map(input => input.value).join("");
    if (code.length !==6){
      setError(true);
      return;
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, code: code })
    }).then(response => {
      if (!response.ok) {
        throw new Error("Invalid code");
      }
      navigate("/user_chat"); 
    }).catch(error => toast.error(error.message))
  }

  const handleFocusCycle = (forward,input_index) => {
    if (forward && index >= 5) return; // Prevent moving forward if at the last input
    if (!forward && index <= 0) return; // Prevent moving backward if at the first input
    if (forward){
         setIndex(input_index+1);
          inputsRef.current[input_index+1]?.focus();
    }
    else{
       setIndex(input_index-1);
       inputsRef.current[input_index-1]?.focus(); 
    }
  
  
  };

  const handleInputData = (e,i) => {
    const value = e.target.value;
    console.log(value.length)
    if (value.length > 0) {
      handleFocusCycle(true,i);
    }
    else{
      handleFocusCycle(false,i);
    }
  }
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6); // Get first 6 characters
    pasteData.split("").forEach((char, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = char; // Set value of each input
      }
    });
    setIndex(pasteData.length % 6); // Move focus to the next input after pasting
    inputsRef.current[pasteData.length % 6]?.focus();
  }

  const resentCode =()=>{
    fetch("/au")
  }

  return (
    <div id="verification_container">
       <ToastContainer />
      <p>
        We have sent a verification code to this <span>{email}</span>
      </p>

      <div id="code_verification">
        <div id="elements_box">
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              key={i}
              type="text"
              className={`item ${error && !inputsRef.current[i]?.value ? "border_red" : ""}`}
              onChange={(e)=> (handleInputData(e,i))}
              ref={(el) => (inputsRef.current[i] = el)}
              maxLength={1}
              onPaste={handlePaste}
            />
          ))}
        </div>
      </div>
      <div id="timer">
        <Link>Resend</Link>
        <span>{String(Math.floor(second / 60)).padStart(2, "0")}:{String(second % 60).padStart(2, "0")}</span>
      </div>
      <div id="verify_container">
        <button onClick={verifyTheCode} id="verify">Verify</button>
      </div>
    </div>
  );
}