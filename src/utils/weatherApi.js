export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => checkRequestResult(res));
};

function checkRequestResult(res) {
  if (res.ok) {
    return res.json();
  } else {
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }
}

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temperature = data.main.temperature;
  result.type = getWeatherCondition(result.temperature);
  result.condition = data.weather[0].main.toLowerCase(); //  //
  result.isDay = isDay(data.sys, Date.now()); //  //
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  //  //
  return sunrise * 1000 < now && now < sunset * 1000; //  //
}; //  //

const getWeatherCondition = (temperature) => {
  if (temperature >= 81) {
    return "hot";
  } else if (temperature > 63 && temperature < 81) {
    return "warm";
  } else {
    return "cold";
  }
};
