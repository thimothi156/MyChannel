import React, { useRef, useState,useEffect } from "react";
import consumer from "../channels/consumer";

export default function ChatCard(
    {
      className,
      card,
      hover_icon,
      onMouseLeave,
      onMouseEnter,
      element_hover,
      onClick,
      roomId
        }) {
      useEffect(() => {
        if (!roomId) return
        const subscription = consumer.subscriptions.create(
          {
            channel: "MessageChannel",
            room_id: roomId,
          },
          {
            connected() {
              console.log(`Connected to ${roomId}`);
            },

            received(data) {
              console.log(data);
              document.dispatchEvent(
                new CustomEvent("message.received", {detail: data})
            )},
          }
        );
         return () => subscription.unsubscribe();
        }, []);
    return (
        <div data-room_id={roomId} className={className} onMouseLeave={onMouseLeave} onMouseEnter = {onMouseEnter} onClick={onClick}  >
            <i className = {element_hover ? "fa-solid fa-caret-down" : card.icon } ></i>
            <span>{card.text}</span>
            {hover_icon}
        </div>
    )  
}