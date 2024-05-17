let searchBar = document.querySelector(".search-bar");

let weather = {
  apiKey: "de48a7466dfe2f4af424bb33e0ae8d85",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        this.apiKey +
        "&units=metric"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found"); 
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data))
      .catch((error) => {        // Error handling
        if (error.message === "City not found") {
          searchBar.style.border = "1px solid red";
          searchBar.style.outline = "red";
          searchBar.placeholder = "Enter a valid location";
        }
      });
  },
  displayWeather: function (data) {
    searchBar.style.border = ""; // Resets the border color
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const roundedTemp = temp.toFixed(1);
    const { speed } = data.wind;
    const roundedSpeed = speed.toFixed(1);
    const { country } = data.sys;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".country").innerText = country;
    document.querySelector(".temp").innerText = roundedTemp + "°C";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + roundedSpeed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1920x1080/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Vienna");
