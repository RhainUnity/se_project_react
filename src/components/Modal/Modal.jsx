// src/components/Modal/Modal.jsx
import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({ name, isOpen, onClose, children }) => {
  if (!isOpen) return;

  // Escape key handler – only active when modal is open
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // Overlay click handler
  const handleOverlay = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}
      onMouseDown={handleOverlay}
    >
      {children}
    </div>
  );
};
