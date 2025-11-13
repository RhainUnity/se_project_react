// src/components/EditProfileModal/EditProfileModal.jsx
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      isOpen={isOpen}
      closeModal={onClose}
      onSubmit={handleSubmit}
      buttonText={loading ? "Saving..." : "Save"}
    >
      <input
        className="modal__input"
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength="2"
      />
      <input
        className="modal__input"
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
    </ModalWithForm>
  );
}
