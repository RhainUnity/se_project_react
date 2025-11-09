// RegisterModal.jsx
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  activeModal,
  closeModal,
  onRegister,
  loading,
  error,
}) {
  if (activeModal !== "register") return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData); // { name, email, password }
    onRegister(userData);
  };

  return (
    <ModalWithForm
      title="Register"
      isOpen={activeModal === "register"}
      closeModal={closeModal}
      onSubmit={handleSubmit}
      name="register-form"
      buttonText={loading ? "Creating..." : "Register"}
      submitDisabled={loading}
    >
      <input
        className="modal__input"
        type="text"
        name="name"
        placeholder="Name"
        required
      />
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

      {error && <div className="modal__error">{error}</div>}
    </ModalWithForm>
  );
}

export default RegisterModal;
