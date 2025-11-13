// se_project_react/src/components/App/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import RequireAuth from "../RequireAuth/RequireAuth.jsx";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemsModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, apiKey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext.js";
import {
  getItems,
  postItems,
  deleteItems,
  signup,
  login,
  getCurrentUser,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../Profile/EditProfileModal.jsx";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";

function App() {
  // --- DEBUG ---
  console.log("API:", import.meta.env.VITE_API_BASE_URL);

  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temperature: { F: 999, C: 777 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState("preview");
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  // auth state
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // modal open/close
  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const closeModal = () => setActiveModal("");

  const handleRegister = async (form) => {
    try {
      // form = { name, email, password }
      setAuthLoading(true);
      setAuthError("");
      await signup(form);

      // auto-login with the same creds
      const data = await login({ email: form.email, password: form.password });
      if (data?.token) {
        setToken(data.token);
        localStorage.setItem("jwt", data.token);
        const me = await getCurrentUser(data.token);
        setCurrentUser(me);
      }
      setActiveModal(""); // close modal
    } catch (err) {
      console.error("Signup failed:", err);
      setAuthError(err.message || "Signup failed");
      // you can set an error state if you want to display it in the modal
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogin = async (creds) => {
    // creds = { email, password }
    try {
      setAuthLoading(true);
      setAuthError("");
      const data = await login(creds); // expect { token }
      if (data?.token) {
        setToken(data.token);
        localStorage.setItem("jwt", data.token);
      }
      setActiveModal("");
      // load the user right after login
      const me = await getCurrentUser(data.token);
      setCurrentUser(me);
    } catch (err) {
      console.error("Login failed:", err);
      setAuthError(err.message || "Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    if (!currentUser) return setActiveModal("login");
    setActiveModal("add-garment");
  };

  const handleAddItem = async (inputItems) => {
    const newItem = {
      name: inputItems.name,
      weather: inputItems.weatherType,
      imageUrl: inputItems.imageUrl,
    };

    return postItems(newItem, token).then((saved) => {
      setClothingItems((prev) => [saved, ...prev]);
    });
  };

  const handleConfirmDelModal = () => {
    setActiveModal("delete");
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItems(id, token);
      setClothingItems((prev) => prev.filter((item) => item._id !== id));
      closeModal();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const handleEditProfile = async (data) => {
    try {
      const updated = await updateUser(data, token);
      setCurrentUser(updated);
      setIsEditProfileOpen(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleCardLike = async (item) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const isLiked = item.likes.some((id) => id === currentUser?._id);

    try {
      const updatedCard = isLiked
        ? await removeCardLike(item._id, token)
        : await addCardLike(item._id, token);

      setClothingItems((cards) =>
        cards.map((card) => (card._id === item._id ? updatedCard : card))
      );
    } catch (err) {
      console.error("Like toggle failed:", err);
    }
  };

  useEffect(() => {
    (async () => {
      if (!token) return;
      try {
        const me = await getCurrentUser(token);
        setCurrentUser(me);
      } catch (e) {
        console.error("Failed to fetch current user:", e);
        setToken("");
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      }
    })();
  }, [token]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems(token)
      .then((data) => setClothingItems([...data].reverse()))

      .catch((error) => {
        console.error("Failed to fetch item data:", error);
      });
  }, [token]); // reload items on token change

  // ADD ESCAPE LISTENER
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here
  // end of Escape Listener

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onOpenLogin={openLogin}
              onOpenRegister={openRegister}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth user={currentUser}>
                    <Profile
                      handleCardClick={handleCardClick}
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onOpenEditProfile={() => setIsEditProfileOpen(true)}
                      onCardLike={handleCardLike}
                      onLogout={() => {
                        setToken("");
                        localStorage.removeItem("jwt");
                        setCurrentUser(null);
                      }}
                    />
                  </RequireAuth>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            buttonText="Add garment"
            title="New garment"
            closeModal={closeModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItem}
          ></AddItemModal>
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeModal={closeModal}
            confirmDelete={handleConfirmDelModal}
            user={currentUser}
          />
          <ConfirmDeleteModal
            activeModal={activeModal}
            card={selectedCard}
            closeModal={closeModal}
            deleteCard={handleDeleteItem}
          />
          <RegisterModal
            activeModal={activeModal}
            closeModal={closeModal}
            onRegister={handleRegister}
            loading={authLoading}
            error={authError}
          />
          <LoginModal
            activeModal={activeModal}
            closeModal={closeModal}
            onLogin={handleLogin}
            loading={authLoading}
            error={authError}
            onOpenRegister={openRegister}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            onSubmit={handleEditProfile}
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
