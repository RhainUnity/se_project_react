import "./ConfirmDeleteModal.css";
import closeBtn from "../../assets/close-btn.svg";

function ConfirmDeleteModal({ activeModal, closeModal, card, deleteCard }) {
  ////console.log(closeBtn + "     " + deleteCard);
  return (
    <div className={`modal ${activeModal === "delete" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm-delete">
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <img src={closeBtn} alt="CLOSE" className="modal__close-btn-image" />
        </button>
        <h2 className="modal__deltete-confirmation">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          type="button"
          className="modal__delete-btn"
          onClick={() => deleteCard(card._id)}
        >
          Yes, delete item
        </button>
        <button
          type="button"
          className="modal__cancel-btn"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
