// src/components/Modal/Modal.jsx
import { useEffect } from "react";

export const Modal = ({ name, isOpen, onClose, children }) => {
  // Escape key handler – only active when modal is open
  useEffect(() => {
    if (!isOpen) return;

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
