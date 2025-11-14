// src/components/EditProfileModal/EditProfileModal.jsx
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";
import { useForm } from "../../hooks/useForm.js";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
}) {
  const currentUser = useContext(CurrentUserContext);
  // const [name, setName] = useState("");
  // const [avatar, setAvatar] = useState("");
  const { values, handleChange, errors, isValid, resetForm } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser && isOpen) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values); // { name, avatar }
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     setName(currentUser.name || "");
  //     setAvatar(currentUser.avatar || "");
  //   }
  // }, [currentUser, isOpen]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSubmit({ name, avatar });
  // };

  return (
    <ModalWithForm
      title="Edit Profile"
      isOpen={isOpen}
      closeModal={onClose}
      onSubmit={handleSubmit}
      buttonText={loading ? "Saving..." : "Save"}
      submitDisabled={loading || !isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          value={values.name || ""}
          onChange={handleChange}
          required
          minLength="2"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          id="avatar"
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
