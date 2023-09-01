function fetchapi(city) {
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=2886594badf27c473324ac12be74ba1f"
  )
    .then((response) => response.json())
    .then((responses) => {
      return calledweather(responses);
    });
}

function calledweather(responses) {
  (document.getElementById("city").innerHTML = `whether in ${responses.name}`),
    (document.getElementById("temp_degree").innerHTML = `${(
      responses.main.temp - 273.15
    ).toFixed(2)} °C`),
    (document.getElementById("wheth").innerHTML =
      responses.weather[0].description),
    (document.getElementById(
      "humi"
    ).innerHTML = `humidity: ${responses.main.humidity}%`),
    (document.getElementById(
      "wind"
    ).innerHTML = `wind speed: ${responses.wind.speed}km/h`);
}

function searchcity() {
  fetchapi(document.getElementById("inputcity").value);
}

fetchapi("tokyo");

function keyup(event) {
  if (event.key == "Enter") {
    fetchapi(document.getElementById("inputcity").value);
  }
}
