var geoLat = 0,
    geoLng = 0,
    tempInF = 0,
    tempInC = 0,
    currentTemp = 0;

// API Keys are located in config.js file which is .gitignore(d) 
var googleKey = config.GOOGLEKEY;
var darkSkyKey = config.DARKSKYKEY;

getLocation();

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      geoLat = position.coords.latitude;
      geoLng = position.coords.longitude;
      $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + geoLat + "," + geoLng + "&key=" + googleKey, function(json) {
        $("#location").html("You are located at " + json.results[0].formatted_address);
      });
      getWeather(geoLat, geoLng);
    });
  } else {
    $("#location").html("Your location could not be found");
    $("#temp").html("Temperature is unavailable when location services are turned off");
  }
}

function getWeather(arg1, arg2) {
  $.getJSON("https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyKey + "/" + arg1 + "," + arg2 +"?exclude=minutely,hourly,daily,alerts,flags", function(json) {
    tempInF = Math.floor(json.currently.temperature);
    currentTemp = tempInF;
    tempInC = Math.floor((tempInF - 32) / 1.8);
    $("#temp").html("The temperature is currently " + tempInF + "&deg; <a href='#' title='Click here for Celcius'>F</a>");
    $("#condition").html(" with " + json.currently.summary);
    switch (json.currently.icon) { // TODO: Fix the background image links
      case "clear-night":
      case "clear-day":
      case "wind":
        document.body.style.backgroundImage = "url('https://picsum.photos/1500/1500')";
        break;
      case "rain":
      case "snow":
      case "sleet":
      case "hail":
        document.body.style.backgroundImage = "url('https://picsum.photos/1500/1500')";
      break;
      case "partly-cloudy-day":
      case "partly-cloudy-night":
      case "cloudy":
      case "fog":
        document.body.style.backgroundImage = "url('https://picsum.photos/1500/1500')";
      break;
      case "thunderstorm":
      case "tornado":
        document.body.style.backgroundImage = "url('https://picsum.photos/1500/1500')";
      break;
    }
  });
}

$(document).ready(function() {
  $("#temp").on("click", function() {
    if (currentTemp === tempInF) {
      $("#temp").html("The temperature is currently " + tempInC + "&deg; <a href='#' title='Click here for Farenheit'>C</a>");
      currentTemp = tempInC;
    } else {
      $("#temp").html("The temperature is currently " + tempInF + "&deg; <a href='#' title='Click here for Celcius'>F</a>");
      currentTemp = tempInF;
    }
  });
});
