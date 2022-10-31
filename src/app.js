function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = `${searchInput.value}`;

  let apiKey = "t62d70oe1100008354b8807464af7fad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.city;

  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.temperature.current
  );

  document.querySelector("#currentWeather").innerHTML =
    response.data.condition.description;

  document.querySelector(
    "#currentHumidity"
  ).innerHTML = `${response.data.temperature.humidity}%`;

  document.querySelector(
    "#currentWind"
  ).innerHTML = `${response.data.wind.speed}km/h`;

  document.querySelector("#currentIcon").innerHTML =
    response.data.condition.icon_url;
}

function currentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "t62d70oe1100008354b8807464af7fad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(`${apiUrl}`).then(showWeather);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);

let currentCity = document.querySelector("#currentButton");
currentCity.addEventListener("click", currentWeather);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();

let currentDate = document.querySelector("#currentDay");
currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

// change celsius to fahrenheit
let isFahrenheit = false;

function convertToFahrenheit(celsius) {
  let fahrenheit = (celsius * 9) / 5 + 32;
  return Math.round(fahrenheit);
}
function changeToFahrenheit(event) {
  event.preventDefault();
  if (isFahrenheit === false) {
    let temperature = document.querySelector("#currentTemp");
    temperature.innerHTML = `${convertToFahrenheit(
      Number(temperature.innerHTML)
    )}`;
    isFahrenheit = true;
  }
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

function convertToCelsius(fahrenheit) {
  let celsius = ((fahrenheit - 32) * 5) / 9;
  return Math.round(celsius);
}
function changeToCelsius(event) {
  event.preventDefault();
  if (isFahrenheit === true) {
    let temperature = document.querySelector("#currentTemp");
    temperature.innerHTML = `${convertToCelsius(
      Number(temperature.innerHTML)
    )}`;
    isFahrenheit = false;
  }
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);
