import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemsModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import { coordinates, apiKey } from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext.js";
import { getItems, postItems, deleteItems } from "../../utils/api.js";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temperature: { F: 999, C: 777 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState("preview");
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  // /////////////////////////////////
  // const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleToggleSwitchChange = () => {
    setCurrentTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleAddItem = async (inputItems) => {
    const newItem = {
      _id: Date.now().toString(),
      name: inputItems.name,
      weather: inputItems.weatherType,
      imageUrl: inputItems.imageUrl,
    };

    return postItems(newItem).then((saved) => {
      setClothingItems((prev) => [saved, ...prev]);
    });
  };

  const handleConfirmDelModal = () => {
    setActiveModal("delete");
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItems(id);
      setClothingItems((prev) => prev.filter((item) => item._id !== id));
      closeModal();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  const closeModal = () => {
    setActiveModal("");
  };

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
    getItems()
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch((error) => {
        console.error("Failed to fetch item data:", error);
      });
  }, []);

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
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
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
        />
        <RegisterModal
          activeModal={activeModal}
          closeModal={closeModal}
          onRegister={() => {}}
        />
        <LoginModal
          activeModal={activeModal}
          closeModal={closeModal}
          onLogin={() => {}}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
