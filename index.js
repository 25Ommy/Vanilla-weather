function searchFormSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = searchFormSubmit.value;
}
let searchForElement = document.querySelector("#search-form");
searchForElement.addEventListener("submit", searchFormSubmit);
