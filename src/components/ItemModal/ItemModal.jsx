// ItemModal.jsx
import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";
import { Modal } from "../Modal/Modal.jsx";

function ItemModal({ confirmDelete, activeModal, closeModal, card }) {
  const currentUser = useContext(CurrentUserContext);
  const isOpen = activeModal === "preview";

  if (!isOpen || !card) return null;

  const canDelete =
    card && currentUser && String(card.owner) === String(currentUser._id);

  return (
    <Modal name="preview" isOpen={isOpen} onClose={closeModal}>
      <div className="modal__content modal__content_type_image">
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {canDelete && (
            <button
              type="button"
              className="modal__delete-btn"
              onClick={confirmDelete}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
