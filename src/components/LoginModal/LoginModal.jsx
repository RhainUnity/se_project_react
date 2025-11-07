import "./LoginModal.css";
import closeBtn from "../../assets/close-btn.svg";

function LoginModal({ activeModal, closeModal, onLogin }) {
  if (activeModal !== "login") return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    onLogin(userData);
  };
  return (
    <div className={`modal ${activeModal === "login" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_login">
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <img src={closeBtn} alt="Close" />
        </button>
        <h2 className="modal__title">Login</h2>
        <form className="modal__form" onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginModal;
