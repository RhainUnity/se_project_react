// LoginModal.jsx
import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useForm.js";

function LoginModal({
  activeModal,
  closeModal,
  onLogin,
  loading,
  error,
  onOpenRegister,
}) {
  const { values, handleChange, resetForm, isValid } = useFormAndValidation();

  const isOpen = activeModal === "login";

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  const orButton = (
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
      isOpen={isOpen}
      closeModal={closeModal}
      onSubmit={handleSubmit}
      name="login-form"
      buttonText={loading ? "Logging in..." : "Log In"}
      submitDisabled={loading || !isValid}
      orButton={orButton}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          id="login-email"
          value={values.email || ""}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          id="login-password"
          value={values.password || ""}
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
