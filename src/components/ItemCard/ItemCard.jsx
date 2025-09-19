import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleItemCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleItemCardClick}
      />
    </li>
  );
}

export default ItemCard;
