// ModalWithForm.jsx
import "./ModalWithForm.css";
import closeBtn from "../../assets/close-btn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  closeModal,
  isOpen,
  onSubmit,
  name,
  formRef,
  submitDisabled,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <img src={closeBtn} alt="CLOSE" className="modal__close-btn-image" />
        </button>
        <form
          className="modal__form"
          name={name}
          onSubmit={onSubmit}
          ref={formRef}
        >
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={submitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
