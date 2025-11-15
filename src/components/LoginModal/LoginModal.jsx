// LoginModal.jsx
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm.js";

function LoginModal({
  activeModal,
  closeModal,
  onLogin,
  loading,
  error,
  onOpenRegister,
}) {
  if (activeModal !== "login") return null;

  const { values, handleChange, errors, isValid, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
    resetForm();
  };

  const orSignUp = (
    <button
      type="button"
      className="modal__switch-btn"
      onClick={onOpenRegister}
    >
      or Sign Up
    </button>
  );

  return (
    <ModalWithForm
      title="Log In"
      isOpen={activeModal === "login"}
      closeModal={closeModal}
      onSubmit={handleSubmit}
      name="login-form"
      buttonText={loading ? "Logging in..." : "Log In"}
      submitDisabled={loading}
      orSignUp={orSignUp}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
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
          placeholder="Password"
          required
        />
      </label>
      {error && <div className="modal__error">{error}</div>}
    </ModalWithForm>
  );
}

export default LoginModal;
