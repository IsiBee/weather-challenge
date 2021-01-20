
var currWeatherContainerEl = document.querySelector("#current-weather");


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
}