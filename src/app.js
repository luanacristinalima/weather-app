function renderWeather(city) {
  let apiKey = "t62d70oe1100008354b8807464af7fad";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(`${apiUrl}`).then(showWeather);
}

function showWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.city;

  document.querySelector("#currentWeather").innerHTML =
    response.data.condition.description;

  document.querySelector(
    "#currentHumidity"
  ).innerHTML = `${response.data.temperature.humidity}%`;

  document.querySelector(
    "#currentWind"
  ).innerHTML = `${response.data.wind.speed}km/h`;

  document.querySelector("#currentDay").innerHTML = formatDate(
    response.data.time * 1000
  );

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  if (isFahrenheit === false) {
    document.querySelector("#currentTemp").innerHTML = Math.round(
      response.data.temperature.current
    );
  } else {
    document.querySelector("#currentTemp").innerHTML = convertToFahrenheit(
      response.data.temperature.current
    );
  }
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = `${searchInput.value}`;
  renderWeather(city);
  renderForecast(city);
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

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  let currentDate = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[date.getMonth()];
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  return `${day}, ${currentMonth} ${currentDate}, ${hours}:${minutes}`;
}

function convertToFahrenheit(celsius) {
  let fahrenheit = (celsius * 9) / 5 + 32;
  return Math.round(fahrenheit);
}
function changeToFahrenheit(event) {
  event.preventDefault();
  if (isFahrenheit === false) {
    let temperature = document.querySelector("#currentTemp");
    temperature.innerHTML = `${convertToFahrenheit(temperature.innerHTML)}`;
    document.querySelector("#fahrenheit").classList.add("active");
    document.querySelector("#celsius").classList.remove("active");
    isFahrenheit = true;
  }
}

function convertToCelsius(fahrenheit) {
  let celsius = ((fahrenheit - 32) * 5) / 9;
  return Math.round(celsius);
}
function changeToCelsius(event) {
  event.preventDefault();
  if (isFahrenheit === true) {
    let temperature = document.querySelector("#currentTemp");
    temperature.innerHTML = `${convertToCelsius(temperature.innerHTML)}`;
    document.querySelector("#fahrenheit").classList.remove("active");
    document.querySelector("#celsius").classList.add("active");
    isFahrenheit = false;
  }
}

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let currentDate = date.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[date.getMonth()];
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  return `${currentMonth} ${currentDate}`;
}

function formatWeekDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col card small-card-wrapper">
        <div class="future-dates">
          <h1>${formatWeekDayForecast(forecastDay.time)}</h1>
          <h2>${formatDayForecast(forecastDay.time)}</h2>
        </div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          class="weather-icon"
        />
        <p class="future-dates-weather">${forecastDay.condition.description}</p>
        <p><span class="degrees">${Math.round(
          forecastDay.temperature.maximum
        )}˚C </span> ${Math.round(forecastDay.temperature.minimum)}˚C</p>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function renderForecast(city) {
  let apiKey = "t62d70oe1100008354b8807464af7fad";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(`${apiUrl}`).then(displayForecast);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", search);

let currentCity = document.querySelector("#currentButton");
currentCity.addEventListener("click", currentWeather);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", changeToCelsius);

let isFahrenheit = false;

renderWeather("Castelo Branco");
renderForecast("Castelo Branco");
