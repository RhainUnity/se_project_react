// ClothesSection.jsx
import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";

export default function ClothesSection({
  handleCardClick,
  clothingItems = [],
  handleAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);
  const myItems = currentUser
    ? clothingItems.filter((item) => {
        const ownerId = item.owner?._id || item.owner;
        return String(ownerId) === String(currentUser._id);
      })
    : [];
  return (
    <section className="profile__clothes-section">
      <div className="clothes-section__container">
        <div className="clothes-section__header">
          <p>Your items</p>
          <button
            onClick={handleAddClick}
            type="button"
            className="clothes-section__add-item_btn"
          >
            + Add New
          </button>
        </div>

        <ul className="clothes-section__cards_list">
          {myItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </div>
    </section>
  );
}
