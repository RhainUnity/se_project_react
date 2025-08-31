import "./WeatherCard.css";
import sunnyday from "../../assets/day-sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">74 &deg; F</p>
      <img src={sunnyday} alt="Sunny Day" className="weather-card__img" />
    </section>
  );
}

export default WeatherCard;
