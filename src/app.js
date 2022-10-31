function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = `${searchInput.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiKey = "f614c7fc88af7d5e895c61ef47af3b75";

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function showWeather(response) {
  let city = document.querySelector("#currentCity");
  city.innerHTML = response.data.name;
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = Math.round(response.data.main.temp) + "°C";
  let description = document.querySelector("#currentWeather");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#currentHumidity");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let wind = document.querySelector("#currentWind");
  wind.innerHTML = `${response.data.wind.speed}km/h`;
}

function currentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric`;
  let apiKey = "f614c7fc88af7d5e895c61ef47af3b75";
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
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

// change to fahrenheit
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
