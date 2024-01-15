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

  console.log(response);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"  class="current-temperature-icon" width="70"/>`;
  timeElement.innerHTML = formatDate(date);

  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  tempElement.innerHTML = Math.round(temperature);
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

  let weekDay = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours > 10) {
    hours = `${hours}`;
  }
  return `${weekDay} ${hours}:${minutes}`;
}

function displayForeCast() {
  let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div>
            <span class="weather-forecast-day">${day}</span> <br />

            <span class="weather-forecast-icon">☁️</span> <br />
            <span
              ><strong class="weather-forecast-temperature"
                >19° 20°</strong
              ></span
            >
          </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
displayForeCast();
