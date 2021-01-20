
var currWeatherContainerEl = document.querySelector("#current-weather");
var foreCastContainerEl = document.querySelector("#forecast-container");


// Uses the Current Weather API to get the city lon and lat coordinates
function getCoordinates(city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=6b2382b59ee5c3585d2c8565974577ef";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                getWeather(data.coord.lon, data.coord.lat, city);
            });
        }
    });
};

// Uses the coordinates from getCoordinates call to get the current weather
function getWeather(lon, lat, city){
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=6b2382b59ee5c3585d2c8565974577ef";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayCurrentWeather(data.current, city);
                displayForecast(data.daily);
            });
        }
    });
};

// Display Current Weather to the screen
function displayCurrentWeather(weatherObj, city){
    // clear old content
    currWeatherContainerEl.textContent = "";

    // convert dt field to a date
    var date = moment.unix(weatherObj.dt).format("L");

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
    currWeatherContainerEl.appendChild(titleEl);
    currWeatherContainerEl.appendChild(tempEl);
    currWeatherContainerEl.appendChild(humidityEl);
    currWeatherContainerEl.appendChild(windEl);
    currWeatherContainerEl.appendChild(uviEl);
};

// Display 5 Day Weather forecast
function displayForecast(weatherObj){
    // clear old content
    foreCastContainerEl.textContent = "";

    // create title h4 element
    var titleEl = document.createElement("h4");
    titleEl.classList = "col-12 col-md-12 mt-3"
    titleEl.textContent = "5 Day Forecast: "

    foreCastContainerEl.appendChild(titleEl);

    for(var i = 1; i < (weatherObj.length - 2); i++){
        // format date
        var date = moment.unix(weatherObj[i].dt).format("L");

        // create a container for each day
        var forecastEl = document.createElement("div");
        forecastEl.classList = "col-2 col-md-2 card card-body bg-primary text-light justify-space-between ml-2 mt-4 justify-content-left";

        // create a h5 element to hold the date
        var dateEl = document.createElement("h5");
        dateEl.textContent = date;

        // create a span element to hold the temp
        var tempEl = document.createElement("span");
        tempEl.textContent = "Temp: " + weatherObj[i].temp.day + " °F";

        // create a span element to hold humidity
        var humidityEl = document.createElement("span");
        humidityEl.textContent = "Humidity: " + weatherObj[i].humidity + " %";

        // append to container
        forecastEl.appendChild(dateEl);
        forecastEl.appendChild(tempEl);
        forecastEl.appendChild(humidityEl);

        // append to the page
        foreCastContainerEl.appendChild(forecastEl);
    }

};

getCoordinates("Austin");