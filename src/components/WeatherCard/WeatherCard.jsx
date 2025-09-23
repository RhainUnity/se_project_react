import "./WeatherCard.css";
import { useContext } from "react";
import { weatherOptions } from "../../utils/constants";
import defaultWeatherCardImg from "../../assets/default-weather-card.png";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);
  const filteredWeatherOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const currentWeatherCard =
    filteredWeatherOption[0]?.url || defaultWeatherCardImg;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData?.temperature?.[currentTempUnit] ?? "-"}&deg;
        {currentTempUnit}
      </p>
      <img
        src={currentWeatherCard}
        alt={`${weatherData.isDay ? "Day" : "Night"} ${
          weatherData.condition || ""
        }`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
