// ItemCard.jsx
import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((id) => id === currentUser?._id);
  const likeClass = `card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`;

  const hasLikeHandler = typeof onCardLike === "function";

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
      {currentUser && hasLikeHandler && (
        <button
          type="button"
          className={likeClass}
          onClick={() => onCardLike(item)}
        ></button>
      )}
    </li>
  );
}

export default ItemCard;
