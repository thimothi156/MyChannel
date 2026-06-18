import React from "react";

import Modal from "react-modal";

import { useState } from "react";


export default function MyModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <h2>Create Workspace</h2>

        <input
          type="text"
          placeholder="Workspace Name"
        />

        <button onClick={() => setIsOpen(false)}>
          Close
        </button>
      </Modal>
    </>
  );
}