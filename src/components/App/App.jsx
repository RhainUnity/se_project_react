import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import Footer from "../Footer/Footer.jsx";
//import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import AddItemModal from "../AddItemsModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import {
  coordinates,
  APIkey,
  /*defaultClothingItems THIS WILL CHANGE WHEN CALLINGTT API*/
} from "../../utils/constants.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext.js";
import { getItems } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temperature: { F: 999, C: 777 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState("preview");
  const [currentTempUnit, setCurrenTempUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrenTempUnit(currentTempUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleAddItem = (inputItem) => {
    setClothingItems([inputItem, ...clothingItems]);
    closeModal();
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
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
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Failed to fetch item data:", error);
      });
  }, []);

  // ADD ESCAPE LISTENER
  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
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
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        {/* //////////////////////// */}
        {/* <ModalWithForm
          buttonText="Add garment"
          title="New garment"
          activeModal={activeModal}
          closeModal={closeModal}
          isOpen={activeModal === "add-garment"}
        ></ModalWithForm> */}
        <AddItemModal
          buttonText="Add garment"
          title="New garment"
          closeModal={closeModal}
          isOpen={activeModal === "add-garment"}
          onAddItem={handleAddItem}
        >
          {"///////"}
        </AddItemModal>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeModal={closeModal}
        />
      </CurrentTempUnitContext.Provider>
    </div>
  );
}

export default App;
