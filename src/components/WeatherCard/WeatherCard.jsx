import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredWeatherOption = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOptionUrl = filteredWeatherOption[0]?.url;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temperature} &deg; F
        {/* /{" "}
        {weatherData.isDay ? "DAY" : "NIGHT"}
        {" / "}
        {weatherData.condition && `${weatherData.condition.toUpperCase()}`}  */}
      </p>
      <img
        src={weatherOptionUrl}
        alt={`${weatherData.isDay ? "Day" : "Night"} ${weatherData.condition}`}
        className="weather-card__img"
      />
    </section>
  );
}

export default WeatherCard;
