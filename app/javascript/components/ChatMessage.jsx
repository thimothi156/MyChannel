import React from "react";
import ChatCard from "./ChatCard";

export default function ChatMessage({user,messages}){
    return(<div id="message_box">
          {messages.map((message,index)=>{
            return (<ChatCard className="message_line" card={{text:message.text, icon:"fa-solid fa-user"}}/>)
          })}
    </div>)
}