import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "./Profile.css";

export default function Profile({
  handleCardClick,
  weatherData,
  clothingItems = [],
  handleAddClick,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}
