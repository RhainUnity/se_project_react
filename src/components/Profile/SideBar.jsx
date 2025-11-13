// SideBar.jsx
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";
import "./SideBar.css";

export default function SideBar({ onOpenEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const firstLetter = currentUser?.name?.[0]?.toUpperCase();
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="Avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div
            className="sidebar__avatar sidebar__avatar--fallback"
            aria-label="Avatar"
          >
            {firstLetter || "?"}
          </div>
        )}

        <p className="sidebar__username">
          {currentUser?.name || "Unknown User"}
        </p>
      </div>
      <button
        type="button"
        className="sidebar__btn"
        onClick={onOpenEditProfile}
      >
        Change profile data
      </button>
      <button type="button" className="sidebar__btn" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}
