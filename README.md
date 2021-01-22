# Weather Challenge

This challenge was to create a weather app using the Open Weather APIs. 

## Description

This module was all about using the fetch method to get information from a third party source and display it to the screen. Additionally this challenge taught us how to use form inputs, parse the user input, and use it in the query string. 

## Acceptance Criteria

GIVEN a weather dashboard with form inputs

WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

## Additional Information
### Notes
This challenge was a lot of fun. The fetch method and parsing the response object came naturally to me. I spiced up some of the bootstrap colors with my own custom CSS gradient. The only snag I ran into this week was with the icons, I was trying to "fetch" the icon image when all I needed to do was put it in the src of the img element. Other than that I added some additional error/input handling, (when I typed in Madison without a state I got the weather for Madison, Alabama), so I added the ability to include the state code. 

### Screenshot

![WeatherApp](./assets/images/WeatherApp.png?raw=true "Weather App")

### Access Application

You can find the scheduler here:
*  https://isibee.github.io/weather-challenge/

You can find the code here:
* https://github.com/IsiBee/weather-challenge/