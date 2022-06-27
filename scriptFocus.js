let weather = {
  apiKey: "8b56cf4f39ce44cb84823519222306",
  fetchWeather: function (city) {
    fetch(
      "http://api.weatherapi.com/v1/current.json?key=" +
        this.apiKey +
        "&q=" +
        city +
        "&aqi=no"
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data.location;
    const { icon, text } = data.current.condition;
    const { temp_c, humidity, wind_kph } = data.current;
    console.log(name, icon, text, temp_c, humidity, wind_kph);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = data.current.condition.icon;
    document.querySelector(".text").innerText = text;
    document.querySelector(".temp").innerText = temp_c + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind Speed: " + wind_kph + " kph";
  },
};
console.log(window.location.search.split("=")[1]); //?city=London
weather.fetchWeather(window.location.search.split("=")[1]);
