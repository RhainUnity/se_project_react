// Header.jsx
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
// import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";

function Header({ handleAddClick, weatherData, onOpenRegister, onOpenLogin }) {
  const user = useContext(CurrentUserContext);
  const firstLetter = user?.name?.[0]?.toUpperCase();
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // ///// TRYING TO ADD CITY AS OPTION -- OJO!! /////
  const city = weatherData?.city || "";

  return (
    <header className="header">
      <Link to="/" className="header__logo" aria-label="Home">
        <img src={logo} alt="wtwr" />
      </Link>
      <p className="header__date-loc">
        {currentDate}
        {city ? `, ${city}` : ""}
      </p>
      <ToggleSwitch />
      {/* Right-side actions */}
      {!user ? (
        // ---------- Logged OUT ----------
        <div className="header__actions">
          <button
            type="button"
            className="header__btn"
            onClick={onOpenRegister}
          >
            Sign Up
          </button>
          <button type="button" className="header__btn" onClick={onOpenLogin}>
            Log In
          </button>
        </div>
      ) : (
        // ---------- Logged In ----------
        <div className="header__actions">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__user-container">
            <p className="header__username">
              {user?.name || "Firstname Lastname"}
            </p>
            {user?.avatar ? (
              // User has an avatar URL - show normal <img>
              <img className="header__avatar" src={user.avatar} alt="Profile" />
            ) : (
              //  No avatar - show first-letter placeholder
              <div
                className="header__avatar header__avatar--fallback"
                aria-label="Profile"
              >
                {firstLetter || "?"}
              </div>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
