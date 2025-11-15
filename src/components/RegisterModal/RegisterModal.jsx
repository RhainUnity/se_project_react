// RegisterModal.jsx
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";
import "./RegisterModal.css";

function RegisterModal({
  activeModal,
  closeModal,
  onRegister,
  loading,
  error,
}) {
  if (activeModal !== "register") return null;

  const { values, handleChange, errors, isValid, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
    resetForm();
  };

  return (
    <ModalWithForm
      title="Register"
      isOpen={activeModal === "register"}
      closeModal={closeModal}
      onSubmit={handleSubmit}
      name="register-form"
      buttonText={loading ? "Creating..." : "Register"}
      submitDisabled={!isValid || loading}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          id="name"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          id="password"
          placeholder="Password"
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          id="avatar"
          placeholder="Avatar URL"
          required
        />
      </label>
      {error && <div className="modal__error">{error}</div>}
    </ModalWithForm>
  );
}

export default RegisterModal;
