import ItemCard from "../ItemCard/ItemCard.jsx";
import "./ClothesSection.css";

export default function ClothesSection({
  handleCardClick,
  clothingItems = [],
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button className="clothes-section__add-item_btn">+ Add New</button>
      </div>

      <ul className="clothes-section__cards_list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
