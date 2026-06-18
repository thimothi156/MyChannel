import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Task from "../components/Task"

// Need to design home user enter email
export default function Home() {
    const navigate = useNavigate();
    const buttonLogic = () => {
        const email = document.querySelector("input[type='email']").value;
        fetch("/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        }).then(response => {
            if (!response.ok) {
                throw new Error("Internal Server Error");
            }
           navigate(`/verify?email=${email}`); 
        }).catch(error => toast.error(error.message))
    }
    return (
        
        <div>
            <ToastContainer />
            <input type="email" placeholder="Enter your email" />
            <button onClick={buttonLogic}>Submit</button>
        
        </div>
    )
}
