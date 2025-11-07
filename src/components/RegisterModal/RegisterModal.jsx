import "./RegisterModal.css";
import closeBtn from "../../assets/close-btn.svg";

function RegisterModal({ activeModal, closeModal, onRegister }) {
  if (activeModal !== "register") return null;
  const handleSubmit = (e) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const userData = Object.fromEntries(formData);
      onRegister(userData);
    };
    return (
      <div
        className={`modal ${activeModal === "register" ? "modal_opened" : ""}`}
      >
        <div className="modal__content modal__content_type_register">
          <button
            className="modal__close-btn"
            type="button"
            onClick={closeModal}
          >
            <img src={closeBtn} alt="Close" />
          </button>
          <h2 className="modal__title">Register</h2>
          <form className="modal__form" onSubmit={handleSubmit}>
            <input
              className="modal__input"
              type="text"
              name="username"
              placeholder="Username"
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
            <button className="modal__submit-btn" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    );
  };
}
export default RegisterModal;
