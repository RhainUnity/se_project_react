// ConfirmDeleteModal.jsx
import "./ConfirmDeleteModal.css";
import closeBtn from "../../assets/close-btn.svg";

function ConfirmDeleteModal({
  activeModal,
  closeModal,
  card,
  deleteCard,
  isDeleting,
}) {
  const isOpen = activeModal === "delete";
  if (!isOpen || !card) return null;

  const handleDeleteClick = () => {
    if (isDeleting) return; // guard just in case
    deleteCard(card._id);
  };
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm-delete">
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <img src={closeBtn} alt="CLOSE" className="modal__close-btn-image" />
        </button>
        <h2 className="modal__delete-confirmation">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          type="button"
          className="modal__final-delete-btn"
          onClick={handleDeleteClick}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          type="button"
          className={
            isDeleting
              ? "modal__cancel-btn modal__cancel-btn_disabled"
              : "modal__cancel-btn"
          }
          onClick={closeModal}
          disabled={isDeleting}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
