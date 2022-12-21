function showTemp(response) {
  let temperatureCurrent = Math.round(response.data.main.temp);
  console.log(temperatureCurrent);
  console.log(response);
  let currentTemp = document.querySelector("#temp-now");
  currentTemp.innerHTML = `${temperatureCurrent}°C`;
  let cityName = document.querySelector("#current-city");
  cityName.innerHTML = `${response.data.name}`;
  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-tape-on");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${searchInput.value}`;

  let apiKey = "0253ff28a88d857c4ea41ede9adb9d05";
  let city = searchInput.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

let cityCurrent = document.querySelector("#search-button");
cityCurrent.addEventListener("click", search);

function retrievePosition(position) {
  let apiKey = "0253ff28a88d857c4ea41ede9adb9d05";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(position);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

let currentlyTemp = document.querySelector("#currently-button");
currentlyTemp.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(retrievePosition)
);

let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  let formatedDate = `${currentDay}, ${currentHours}:${currentMinutes}`;
  let formatedDatePlus = `${currentDay}, ${currentHours}:0${currentMinutes}`;
  if (currentMinutes >= 10) {
    return formatedDate;
  } else {
    return formatedDatePlus;
  }
}
let datePlace = document.querySelector("#current-date");
datePlace.innerHTML = formatDate(currentTime);
