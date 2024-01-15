function getWeather(response) {
  let iconElement = document.querySelector("#icon");
  let timeElement = document.querySelector("#current-date");
  let tempElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  let date = new Date(response.data.time * 1000);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"  class="current-temperature-icon" width="70"/>`;
  timeElement.innerHTML = formatDate(date);
  tempElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours > 10) {
    hours = `${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
  let apiKey = "8c8894fb74b2o09027cb643c5t33b24a";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getWeather);
}
function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
searchCity("Lisbon");

function getForecast(city) {
  let apiKey = "8c8894fb74b2o09027cb643c5t33b24a";

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForeCast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}
function displayForeCast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div>
            <span class="weather-forecast-day">${formatDay(
              day.time
            )}</span> <br />

            <span class="weather-forecast-icon"><img src="${
              day.condition.icon_url
            }"/></span> <br />
            <span
              ><strong class="weather-forecast-temperature"
                >   <span class="weather-forecast-temperature-max"> ${Math.round(
                  day.temperature.maximum
                )}°</span> 
                <span class="weather-forecast-temperature-min"> ${Math.round(
                  day.temperature.minimum
                )} °</span></strong
              ></span
            >
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
