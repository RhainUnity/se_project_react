import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "./Profile.css";

export default function Profile({
  handleCardClick,
  weatherData,
  clothingItems = [],
  handleAddClick,
  onOpenEditProfile,
  onCardLike,
  onLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onOpenEditProfile={onOpenEditProfile} onLogout={onLogout} />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleCardClick={handleCardClick}
          weatherData={weatherData}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}
