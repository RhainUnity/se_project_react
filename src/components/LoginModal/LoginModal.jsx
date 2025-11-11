// LoginModal.jsx
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({
  activeModal,
  closeModal,
  onLogin,
  loading,
  error,
  onOpenRegister,
}) {
  if (activeModal !== "login") return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const creds = Object.fromEntries(formData); // { email, password }
    onLogin(creds);
  };

  return (
    <ModalWithForm
      title="Log In"
      isOpen={activeModal === "login"}
      closeModal={closeModal}
      onSubmit={handleSubmit}
      name="login-form"
      buttonText={loading ? "Logging in..." : "Log In"}
      submitDisabled={loading}
    >
      <input
        className="modal__input"
        type="email"
        name="email"
        placeholder="Email"
        required
      />
      <input
        className="modal__input"
        type="password"
        name="password"
        placeholder="Password"
        required
      />
      <button
        type="button"
        className="modal__switch-btn"
        onClick={onOpenRegister}
      >
        or Sign Up
      </button>

      {error && <div className="modal__error">{error}</div>}
    </ModalWithForm>
  );
}

export default LoginModal;
