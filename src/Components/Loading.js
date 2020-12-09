import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#loading");

const Loading = () => {
  return (
    <div style={{ zIndex: 9000 }}>
      <Modal
        isOpen={false}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h1>Rishi</h1>
      </Modal>
    </div>
  );
};
//736304931891-s9bh54hflv1r8upcrd0hokk79p80s5us.apps.googleusercontent.com
export default Loading;
