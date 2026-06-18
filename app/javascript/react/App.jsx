import React from "react"
import { Routes } from "react-router-dom"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "../components/Home"
import Verify from "../components/Verify"
import ChatBoard from "../components/ChatBoard"
import MyModal from "../components/MyModal"

export default function App() { 
    return (
        <>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/user_chat" element={<ChatBoard/>} ></Route>
            <Route path ='/modal' element={<MyModal/>}></Route>
          </Routes>
         </BrowserRouter>
        </>
    )
}