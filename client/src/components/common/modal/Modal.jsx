import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./modal.scss";
const modalRootEl = document.getElementById("modal-root");

const Modal = ({ children, open = false }) => {
  if (!open) return null;

  return ReactDOM.createPortal(children, modalRootEl);
};
export default Modal;
