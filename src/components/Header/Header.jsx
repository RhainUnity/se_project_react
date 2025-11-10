// Header.jsx
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

function Header({
  handleAddClick,
  weatherData,
  user,
  onOpenRegister,
  onOpenLogin,
  onLogout,
}) {
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
            <img
              className="header__avatar"
              src={user?.avatar || avatar}
              alt="Profile"
            />
          </Link>
          <button
            type="button"
            className="header__btn header__btn--ghost"
            onClick={onLogout}
          >
            Log out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
