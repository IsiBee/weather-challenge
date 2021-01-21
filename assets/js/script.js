
var currWeatherContainerEl = document.querySelector("#current-weather");
var foreCastContainerEl = document.querySelector("#forecast-container");

var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-search");


// Uses the Current Weather API to get the city lon and lat coordinates
function getCoordinates(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6b2382b59ee5c3585d2c8565974577ef";
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getWeather(data.coord.lon, data.coord.lat, city);
            });
        }
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
    });
};

// Display Current Weather to the screen
function displayCurrentWeather(weatherObj, city) {
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
    titleEl.textContent = city + " (" + date + ")";

    // create weather elements
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + weatherObj.temp + " °F";

    var humidityEl = document.createElement("p");
    humidityEl.textContent = "Humidity: " + weatherObj.humidity + " %";

    var windEl = document.createElement("p");
    windEl.textContent = "Wind Speed: " + weatherObj.wind_speed + " MPH";

    var uviEl = document.createElement("p");
    uviEl.textContent = "UV Index: " + weatherObj.uvi;

    // add elements to the page
    titleEl.appendChild(currentIconEl);
    currWeatherContainerEl.appendChild(titleEl);
    currWeatherContainerEl.appendChild(tempEl);
    currWeatherContainerEl.appendChild(humidityEl);
    currWeatherContainerEl.appendChild(windEl);
    currWeatherContainerEl.appendChild(uviEl);
};

// Display 5 Day Weather forecast
function displayForecast(weatherObj) {
    // clear old content
    foreCastContainerEl.textContent = "";

    // create title h4 element
    var titleEl = document.createElement("h4");
    titleEl.classList = "col-12 col-md-12 mt-3"
    titleEl.textContent = "5 Day Forecast: "

    foreCastContainerEl.appendChild(titleEl);

    for (var i = 1; i < (weatherObj.length - 2); i++) {
        // format date
        var date = moment.unix(weatherObj[i].dt).format("L");

        // create a container for each day
        var forecastEl = document.createElement("div");
        forecastEl.classList = "col-12 col-md-2 card card-body bg-primary text-light justify-space-between ml-4 mt-4 justify-content-left";

        // create a h5 element to hold the date
        var dateEl = document.createElement("h5");
        dateEl.textContent = date;

        // get icon from weather object
        var forecastIcon = weatherObj[i].weather[0].icon;
        var forecastAlt = weatherObj[i].weather[0].description;
        var forecastIconSrc = "http://openweathermap.org/img/wn/" + forecastIcon + "@2x.png";
        // create img element to hold icon
        var iconEl = document.createElement("img");
        iconEl.setAttribute("src", forecastIconSrc);
        iconEl.setAttribute("alt", forecastAlt);

        // create a span element to hold the temp
        var tempEl = document.createElement("span");
        tempEl.textContent = "Temp: " + weatherObj[i].temp.day + " °F";

        // create a span element to hold humidity
        var humidityEl = document.createElement("span");
        humidityEl.textContent = "Humidity: " + weatherObj[i].humidity + " %";

        // append to container
        forecastEl.appendChild(dateEl);
        forecastEl.appendChild(iconEl);
        forecastEl.appendChild(tempEl);
        forecastEl.appendChild(humidityEl);

        // append to the page
        foreCastContainerEl.appendChild(forecastEl);
    }

};

// When the user clicks search the contents of the form will be used to getCoordinates.
function formSubmitHandler(event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();
    if (city) {
        // if not null pass input into getCoordinates 
        // Note this does not check whether city is a valid city
        getCoordinates(city);
        // clear form 
        cityInputEl.value = "";
    }
    else {
        // if form is left blank we will alert the user to enter a city name
        alert("Please enter a city name");
    }
};

cityFormEl.addEventListener("submit", formSubmitHandler);

getCoordinates("Austin");