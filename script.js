// const itemsContainer = document.getElementById("list-items");

// function addItem(item) {
//   const itemHTML =
//     '<div class="card" style="width: 18rem;">\n' +
//     '    <div class="card-body">\n' +
//     '        <h5 class="card-title">' +
//     item.name +
//     "</h5>\n" +
//     '        <p class="card-text">' +
//     item.pantone_value +
//     "</p>\n" +
//     '        <div style="background:' +
//     item.color +
//     ';">' +
//     item.color +
//     "</div>\n" +
//     "    </div>\n" +
//     "</div>\n" +
//     "<br/>";
//   itemsContainer.innerHTML += itemHTML;
// }

let weather = {
  apiKey: "8b56cf4f39ce44cb84823519222306",
  fetchWeatherAndAddToLS: function (city) {
    fetch(
      "https://api.weatherapi.com/v1/current.json?key=" +
        this.apiKey +
        "&q=" +
        city +
        "&aqi=no"
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data);
        this.addToLocalStorage(data);
      });
  },
  fetchWeather: function (city) {
    fetch(
      "https://api.weatherapi.com/v1/current.json?key=" +
        this.apiKey +
        "&q=" +
        city +
        "&aqi=no"
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data);
      });
  },
  displayWeather: function (data) {
    const { name } = data.location;
    const { icon, text } = data.current.condition;
    const { temp_c, humidity, wind_kph } = data.current;
    console.log(name, icon, text, temp_c, humidity, wind_kph);
    // document.querySelector(".city").innerText = "Weather in " + name;
    // document.querySelector(".icon").src = data.current.condition.icon;
    // document.querySelector(".text").innerText = text;
    // document.querySelector(".temp").innerText = temp_c + "°C";
    // document.querySelector(".humidity").innerText =
    //   "Humidity: " + humidity + "%";
    // document.querySelector(".wind").innerText =
    //   "Wind Speed: " + wind_kph + " kph";

    //weather for one city
    const cardTemplate = `  
        <div class="weather">
        <a href="citiesFocus.html?city=${name}">
        <h2 class="city">${"Weather in " + name}</h2></a>
        <h1 class="temp">${temp_c + "°C"}</h1>
        <div class="flex">
          <img src="${data.current.condition.icon}" alt="" class="icon">
          <div class="text">${text}</div>
        </div> 
        <div class="humidity">${"Humidity: " + humidity + "%"}</div>
        <div class="wind">${"Wind Speed: " + wind_kph + " kph"}</div>
      </div>`;
    document.querySelector(".container").innerHTML += cardTemplate;
  },
  search: function () {
    this.fetchWeatherAndAddToLS(document.querySelector(".search-bar").value);
    document.querySelector(".search-bar").value = ""; //clearing search bar after searching
  },

  //adding to local storage
  addToLocalStorage: function (data) {
    let cities = JSON.parse(localStorage.getItem("cities")); //getting the existing values in the local storage (in the form of an array)
    if (cities === null) {
      //if there are no existing values in storage, let an empty array be created
      cities = [];
    }
    cities.push(data); //adding data to the array
    localStorage.setItem("cities", JSON.stringify(cities)); //setting the new array to the local storage by turning data into a string that you can work with
  },
};
let savedCities = JSON.parse(localStorage.getItem("cities")); //getting values from local storage (parse changes from a string to an array/object)
if (savedCities !== null) {
  for (let i = 0; i < savedCities.length; i++) {
    weather.fetchWeather(savedCities[i].location.name);
  }
}

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
  showHideSearchBar(); //toggling hidden
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
      showHideSearchBar(); //toggling hideen
    }
  });

function showHideSearchBar() {
  //creating toggle hidden function
  const searchDiv = document.querySelector(".search");
  searchDiv.classList.toggle("hidden");
}

function clearLocalStorage() {
  localStorage.removeItem("cities");
  location.reload();
}

// function fetchWeather() {
//   fetch(
//     `http://api.weatherapi.com/v1/current.json?key=8b56cf4f39ce44cb84823519222306&q=` +
//       `${cityinput}` +
//       `%aqi=no`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       const strData = JSON.stringify(data);
//       localStorage.setItem("response", strData);
//       console.log(JSON.parse(strData));
//     })
//     .catch((error) => {
//       console.log("error");
//     });
// }
// fetchWeather();
