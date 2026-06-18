// import consumer from "./consumer"
// document.querySelectorAll(".room_id").forEach((roomElement) => {
//   const roomId = roomElement.dataset.roomId;
//   console.log("thimothi")
//   consumer.subscriptions.create(
//     {
//       channel: "MessageChannel",
//       room_id: roomId,
//     },
//     {
//       connected() {
//         console.log(`Connected to room ${roomId}`);
//       },

//       received(data) {
//         console.log(data);

//         document.dispatchEvent(
//           new CustomEvent("message.received", {
//             detail: data,
//           })
//         );
//       },
//     }
//   );
// });