// ItemModal.jsx
import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";
import closeBtn from "../../assets/close-btn.svg";

function ItemModal({ confirmDelete, activeModal, closeModal, card }) {
  const currentUser = useContext(CurrentUserContext);
  if (activeModal !== "preview" || !card) return null;
  const canDelete =
    card && currentUser && String(card.owner) === String(currentUser._id);

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button className="modal__close-btn" type="button" onClick={closeModal}>
          <img src={closeBtn} alt="CLOSE" className="modal__close-btn-image" />
        </button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
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
  );
}

export default ItemModal;
