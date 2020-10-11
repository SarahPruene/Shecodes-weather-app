//Datum
function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let month = months[now.getMonth()];
  let cdate = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day}, ${cdate}.${month} ${year}, ${hour}:${minute}`;
}

let todaysDate = document.querySelector("#current-date");

let now = new Date();

todaysDate.innerHTML = formatDate(now);

// ==== Search Location ====
function searchLocation(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#current-city");
  let city = searchInput.value;
  let apiKey = "7f55ee00a68cad253e15491e99a36fbd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  currentCity.innerHTML = `${city}`;
  axios.get(apiUrl).then(currentWeather);
}
let formInput = document.querySelector("#form-container");

formInput.addEventListener("submit", searchLocation);

// Geo Btn
function useGeolocation() {
  navigator.geolocation.getCurrentPosition(currentCoord);
}

function currentCoord(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7f55ee00a68cad253e15491e99a36fbd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showLocation);
}

function showLocation(response) {
  let locationName = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${locationName}`;
  let apiKey = "7f55ee00a68cad253e15491e99a36fbd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(currentWeather);
}

let geoBtn = document.querySelector(".search-current");

geoBtn.addEventListener("click", useGeolocation);
// Current weather

function currentWeather(response) {
  let currentDescription = response.data.weather[0].description;
  let showDesc = document.querySelector(".current-weather-desc");

  showDesc.innerHTML = `${currentDescription}`;

  let currentTemp = Math.round(response.data.main.temp);
  let showTemp = document.querySelector(".current-temp");

  showTemp.innerHTML = `${currentTemp}`;

  let humanditydes = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humandity");

  humidity.innerHTML = `${humanditydes} %`;

  let precipdes = Math.round(response.data.main.feels_like);
  let precipitation = document.querySelector("#precipitation");

  precipitation.innerHTML = `${precipdes}°C`;

  let winddes = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");

  wind.innerHTML = `${winddes} mph`;
}
