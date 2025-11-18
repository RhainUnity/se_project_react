// src/components/EditProfileModal/EditProfileModal.jsx
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";
import { useFormAndValidation } from "../../hooks/useForm.js";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (currentUser && isOpen) {
      resetForm(
        {
          name: currentUser.name || "",
          avatar: currentUser.avatar || "",
        },
        {},
        true
      );
    }
  }, [currentUser, isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values); // { name, avatar }
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      isOpen={isOpen}
      closeModal={onClose}
      onSubmit={handleSubmit}
      buttonText={loading ? "Saving..." : "Save"}
      submitDisabled={loading || !isValid}
    >
      <label htmlFor="editProfile-name" className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          id="editProfile-name"
          value={values.name || ""}
          onChange={handleChange}
          required
          minLength="2"
        />
      </label>
      <label htmlFor="editProfile-avatar" className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          id="editProfile-avatar"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
}
