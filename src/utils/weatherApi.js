import { checkRequestResult } from "./api";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((res) => checkRequestResult(res));
};

export const filterWeatherData = (data) => {
  const F = Math.round(data.main.temp);
  const C = Math.round(((F - 32) * 5) / 9);
  const result = {};
  result.city = data.name;
  result.temperature = { F, C };
  result.type = getWeatherCondition(result.temperature.F);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherCondition = (temperature) => {
  if (temperature >= 81) {
    return "hot";
  } else if (temperature > 63 && temperature < 81) {
    return "warm";
  } else {
    return "cold";
  }
};
