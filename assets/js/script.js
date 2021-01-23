
var currWeatherContainerEl = document.querySelector("#current-weather");
var forecastContainerEl = document.querySelector("#forecast-container");

var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-search");
var cityListEl = document.querySelector("#city-list");

var storedCities = [];

// Uses the Current Weather API to get the city lon and lat coordinates
function getCoordinates(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6b2382b59ee5c3585d2c8565974577ef";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getWeather(data.coord.lon, data.coord.lat, city);
            });
        }
        else {
            alert("Hmmm we can't seem to find " + city + " on the map. Please try another city.");
        }
    })
        .catch(function (error) {
            alert("We are unable to connect to OpenWeather's Weather Vane at the moment.");
        });
};

// Uses the coordinates from getCoordinates call to get the current weather
function getWeather(lon, lat, city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=6b2382b59ee5c3585d2c8565974577ef";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrentWeather(data.current, city);
                displayForecast(data.daily);
            });
        }
        // This case will likely never fire as it should have been caught in the getCoordinates function.
        else {
            alert("Please enter a valid city name");
        }
    })
        .catch(function (error) {
            alert("We are unable to connect to OpenWeather.")
        });
};

// Display Current Weather to the screen
function displayCurrentWeather(weatherObj, cityString) {
    // clear old content
    currWeatherContainerEl.textContent = "";

    // convert dt field to a date
    var date = moment.unix(weatherObj.dt).format("L");

    // get icon for weather
    // extract icon code from weather object
    var currentIcon = weatherObj.weather[0].icon;
    var altText = weatherObj.weather[0].description;
    // insert code into image url
    var currentIconSrc = "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png";
    // create image element
    var currentIconEl = document.createElement("img");
    // set src
    currentIconEl.setAttribute("src", currentIconSrc);
    currentIconEl.setAttribute("alt", altText);


    // create city/date h3 element
    var titleEl = document.createElement("h3");
    // Remove US from city string
    var city = cityString.split(",")[0];
    var state = cityString.split(",")[1];

    if (state === " US" || state === undefined) {
        titleEl.textContent = city + " (" + date + ")";
    }
    else {
        titleEl.textContent = city + ", " + state + " (" + date + ")";
    }
    // create weather elements
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + weatherObj.temp + " °F";

    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + weatherObj.humidity + " %";

    var windEl = document.createElement("p");
    windEl.textContent = "Wind Speed: " + weatherObj.wind_speed + " MPH";

    var uviEl = document.createElement("p");
    uviEl.textContent = "UV Index: ";

    var uviContentEl = document.createElement("span");
    uviContentEl.textContent = weatherObj.uvi;

    uviContentEl.classList = "";
    uviContentEl.classList = (uvScale(weatherObj.uvi) + " col-3 py-2");

    uviEl.appendChild(uviContentEl);

    // add elements to the page
    titleEl.appendChild(currentIconEl);
    currWeatherContainerEl.appendChild(titleEl);
    currWeatherContainerEl.appendChild(tempEl);
    currWeatherContainerEl.appendChild(humidityEl);
    currWeatherContainerEl.appendChild(windEl);
    currWeatherContainerEl.appendChild(uviEl);
};

// Takes in a UV Index and determines whether it's low, moderate, or high
// The function returns Bootstrap class names to properly color the span element.
function uvScale(uvIndex) {
    if (Math.floor(uvIndex) <= 2) {
        return "bg-success text-light";
    }
    else if (Math.floor(uvIndex) <= 7) {
        return "bg-warning text-dark";
    }
    else {
        return "bg-danger text-light";
    }
};

// Display 5 Day Weather forecast
function displayForecast(weatherObj) {
    // clear old content
    forecastContainerEl.textContent = "";

    // create title h4 element
    var titleEl = document.createElement("h4");
    titleEl.classList = "col-12 col-md-12 mt-3"
    titleEl.textContent = "5 Day Forecast: "

    forecastContainerEl.appendChild(titleEl);

    for (var i = 1; i < (weatherObj.length - 2); i++) {
        // format date
        var date = moment.unix(weatherObj[i].dt).format("L");

        // create a container for each day
        var forecastEl = document.createElement("div");
        forecastEl.classList = "col-12 col-md-2 card card-body forecast-bg text-light justify-space-between ml-4 mt-4 justify-content-center";

        // create a h5 element to hold the date
        var dateEl = document.createElement("h6");
        dateEl.textContent = date;

        // get icon from weather object
        var forecastIcon = weatherObj[i].weather[0].icon;
        var forecastAlt = weatherObj[i].weather[0].description;
        var forecastIconSrc = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";

        // create img element to hold icon
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", forecastIconSrc);
        iconEl.setAttribute("alt", forecastAlt);
        iconEl.setAttribute("width", "75px");
        iconEl.setAttribute("height", "75px");

        // create span element to format icon
        var iconContainerEl = document.createElement("span");
        iconContainerEl.classList = "d-flex align-self-md-center align-self-sm-start";
        iconContainerEl.appendChild(iconEl);

        // create a span element to hold the temp
        var tempEl = document.createElement("span");
        tempEl.textContent = "Temp: " + weatherObj[i].temp.day + " °F";
        tempEl.className = "mb-2";

        // create a span element to hold humidity
        var humidityEl = document.createElement("span");
        humidityEl.textContent = "Humidity: " + weatherObj[i].humidity + " %";

        // append to container
        forecastEl.appendChild(dateEl);
        forecastEl.appendChild(iconContainerEl);
        forecastEl.appendChild(tempEl);
        forecastEl.appendChild(humidityEl);

        // append to the page
        forecastContainerEl.appendChild(forecastEl);
    }

};

// adds searched city to the list of saved cities
function addSearchHistory(city) {
    // create a list element
    var saveCity = document.createElement("li");
    saveCity.classList = "list-group-item";
    saveCity.textContent = city;

    // add city to local storage
    storedCities.push(city);
    localStorage.setItem("cities", JSON.stringify(storedCities));

    // add city to the screen
    cityListEl.appendChild(saveCity);

};

// when the user clicks on a saved city the app will get the city's weather 
function savedCitySearch(event) {
    var city = event.target.textContent;
    var queryString = city + ", US";
    getCoordinates(queryString);
};

function displaySavedCities() {
    // get cities from local storage
    storedCities = JSON.parse(localStorage.getItem("cities"));
    if (!storedCities) {
        storedCities = [];
    }
    // create li elements for each city
    for (var i = 0; i < storedCities.length; i++) {
        var savedCity = document.createElement("li");
        savedCity.classList = "list-group-item";
        savedCity.textContent = storedCities[i];
        cityListEl.appendChild(savedCity);
    }

};

// When the user clicks search the contents of the form will be used to getCoordinates.
function formSubmitHandler(event) {
    event.preventDefault();
    // get value from input element
    var cityString = cityInputEl.value.trim();

    var city = cityString.split(",")[0];
    var state = cityString.split(",")[1];
    var countryCode = (cityString.split(",")[2] || "US");

    if (state === undefined) {
        if (cityString) {
            // if not null pass input into getCoordinates 
            // Note this does not check whether city is a valid city
            getCoordinates(city);
            addSearchHistory(city);
            // clear form 
            cityInputEl.value = "";
        }
        else {
            // if form is left blank we will alert the user to enter a city name
            alert("Please enter a city name");
        }

    }

    else {
        var queryString = city + ", " + state + ", " + countryCode;
        if (queryString) {
            getCoordinates(queryString);
            addSearchHistory(city + ", " + state);

            cityInputEl.value = "";
        }
        else {
            // if form is left blank we will alert the user to enter a city name
            alert("Please enter a city name");
        }
    }


};

// Event Listeners
cityFormEl.addEventListener("submit", formSubmitHandler);
cityListEl.addEventListener("click", savedCitySearch);

// Default city when the page first loads
getWeather(-111.8911, 40.7608, "Salt Lake City, UT");
displaySavedCities();