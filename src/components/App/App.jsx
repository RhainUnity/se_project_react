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
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { login, signup, getCurrentUser } from "../../utils/auth.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../Profile/EditProfileModal.jsx";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";

function App() {
  // app state
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
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchItems = () =>
    getItems()
      .then((data) => setClothingItems([...data].reverse()))
      .catch((error) =>
        console.error("Failed to fetch item data:", error)
      );

  // modal open/close
  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const closeModal = () => setActiveModal("");

  const handleSubmit = async (request, onSuccess = closeModal) => {
    try {
      setIsLoading(true);
      setAuthError("");
      await request();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error submitting form:", err);
      setAuthError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Register(Signup) Handler //
  const handleRegister = (form) => {
    const makeRequest = async () => {
      // signup
      await signup(form);

      // auto-login
      const creds = { email: form.email, password: form.password };
      const data = await login(creds);

      if (data?.token) {
        setToken(data.token);
        localStorage.setItem("jwt", data.token);
        const me = await getCurrentUser(data.token);
        setCurrentUser(me);
        await fetchItems();
      }
    };

    handleSubmit(makeRequest);
  };

  // Login Handler //
  const handleLogin = (creds) => {
    const makeRequest = async () => {
      // creds = { email, password }
      const data = await login(creds); // expect { token }

      if (!data?.token) {
        throw new Error("No token received from server");
      }

      setToken(data.token);
      localStorage.setItem("jwt", data.token);

      // load the user right after login
      const me = await getCurrentUser(data.token);
      setCurrentUser(me);
      await fetchItems();
    };

    handleSubmit(makeRequest);
  };

  // Temp Unit Toggle Handler //
  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  // Card Click Handler //
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  // Authorized User Add Item Modal Handler //
  const handleAddClick = () => {
    if (!currentUser) return setActiveModal("login");
    setActiveModal("add-garment");
  };

  // Add Item Handler //
  const handleAddItem = (inputItems) => {
    const makeRequest = async () => {
      const newItem = {
        name: inputItems.name,
        weather: inputItems.weatherType,
        imageUrl: inputItems.imageUrl,
      };

      const saved = await postItems(newItem, token);
      setClothingItems((prev) => [saved, ...prev]);
    };

    handleSubmit(makeRequest);
  };

  // Delete Item Handlers //
  const handleConfirmDelModal = () => {
    setActiveModal("delete");
  };

  // Delete Item Handlers //
  const handleDeleteItem = async (id) => {
    try {
      setIsDeleting(true);
      await deleteItems(id, token);
      setClothingItems((prev) => prev.filter((item) => item._id !== id));
      closeModal();
    } catch (err) {
      console.error("Failed to delete item:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Edit Profile Handler //
  const handleEditProfile = (inputValues) => {
    const makeRequest = async () => {
      const updatedUser = await updateUser(inputValues, token);
      setCurrentUser(updatedUser);
    };

    handleSubmit(makeRequest, () => setIsEditProfileOpen(false));
  };

  // Like/Unlike Handlers //
  const handleCardLike = async (item) => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const isLiked = item.likes?.some((id) => id === currentUser?._id);

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
    fetchItems();
    //  ////////////if (!token) return;
    // getItems()
    //   .then((data) => setClothingItems([...data].reverse()))
    //   .catch((error) => {
    //     console.error("Failed to fetch item data:", error);
    //   });
  }, []); // load items on initial app mount

  // // ADD ESCAPE LISTENER

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
                  <RequireAuth>
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
          />
          <ConfirmDeleteModal
            activeModal={activeModal}
            card={selectedCard}
            closeModal={closeModal}
            deleteCard={handleDeleteItem}
            isDeleting={isDeleting}
          />
          <RegisterModal
            activeModal={activeModal}
            closeModal={closeModal}
            onRegister={handleRegister}
            loading={isLoading}
            error={authError}
            onOpenLogin={openLogin}
          />
          <LoginModal
            activeModal={activeModal}
            closeModal={closeModal}
            onLogin={handleLogin}
            loading={isLoading}
            error={authError}
            onOpenRegister={openRegister}
          />
          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={() => setIsEditProfileOpen(false)}
            onSubmit={handleEditProfile}
            loading={isLoading}
          />
        </CurrentTempUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
