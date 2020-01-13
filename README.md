# Weather Dashboard
This browser application allows the user to get immediate as well as 5-day forecast infomration for cities of their choice.

## Table of Contents
List the different sections of your README here.

## Introduction
Using both user input and web-APIs, this application takes user input and displays relevant forecast information about the searched location. Additionally, it saves previous searches as buttons to the sidebar for convenient reference.

## Technologies Used
* HTML
* CSS
* JavaScript
* jQuery
* Web APIS - OpenWeather

## Requirements
The following are required to run this application:
* Browser
* JavaScript

## Under the Hood
Below are two examples of how the application utilizes querying the Open Weather API as well as dynamic element generation using jQuery to display the user's searched information to the DOM.

  // This on click listener runs the showCity function whenever a button with the city-btn class is clicked
  $(document).on("click", ".city-btn", showCity);

  function showCity() {

    // clear previous city information
    $("#city-name").empty();
    $("#city-temp").empty();
    $("#city-humidity").empty();
    $("#city-windspeed").empty();
    $("#city-uvindex").empty();

    // query the openweathermap api
    currentCity = $(this).attr("data-city");
    var APIKey = "acc7c144d8d4d67c3bafe14ef897170e";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;

    // make the ajax call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      // console.log(response);
      // store the response as a new variable, results
      var results = response;
      // set the currently displayed city to the top of the main display
      $("#city-name").append(currentCity);
      $("#city-name").append(" " + mainDate);

In this first section, we define the showCity() function and add it to the event listener that initiates whenever an element with the class of "city-btn" is "click"ed. The first work this does is to clear whatever information was previously displayed to the DOM using .emtpy() on the relevant elements, followed by an ajax call concatenating in the user's chosen city to the queryURL.

With that information, we do the following:

      // set a new variable that looks at the icon infomration in the weather array of the results
      var iconName;
          iconName = results.weather[0].icon;
      var iconImg;
          iconImg = "assets/" + iconName + ".png";
      // create a new <img> tag, set the source equal to the iconImg, then append it to the current city name
      var curIcon;
          curIcon = $("<img>");
          curIcon.attr("src", iconImg);
      $("#city-name").append(curIcon);
      // set new variables for each component of the weather information being displayed, then set those variables to be equal to their corresponding part of the response object, then append that information to the main display at the corressponding id tag
      var cityTemp;
          cityTemp = results.main.temp;
      $("#city-temp").append("Temperature: " + cityTemp);
      var cityHumidity;
          cityHumidity = results.main.humidity;
      $("#city-humidity").append("Humidity: " + cityHumidity);
      var cityWindSpeed;
          cityWindSpeed = results.wind.speed;
      $("#city-windspeed").append("Wind Speed: " + cityWindSpeed);
        // then, we make a second ajax call to pull the uv index based on the current latitude and longitude
        var lat;
            lat = results.coord.lat;
        var lon;
            lon = results.coord.lon;

        var UVqueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;
        
        // make the second ajax call, then throw the uv index to the dom by appending it to the element with the corresponding id tag
        $.ajax({
          url: UVqueryURL,
          method: "GET"
        }).then(function(response) {
          var cityUV;
          cityUV = response.value;
          $("#city-uvindex").append("UV Index: " + cityUV);
        });

      render5day();
    });
  };

Most of the information that we need to display lies within the "main" key of our returned object. The UV index, however, lies within the "value" key. To access this, we make a second nested ajax call to obtain this information, using the lat and lon values given to us from the previous query response.

The section above then throws this information to the tagged dom elements in question. The next excerpt demonstrates how those elements are generated dynamically using jQuery:

  function render5day() {

    var APIKey = "acc7c144d8d4d67c3bafe14ef897170e";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      var results = response;
      var list = results.list;

      $("#five-day-display").empty();

      for (var i = 4; i < list.length; i += 8) {
        
        var tempVal = list[i].main.temp;
        var humidityVal = list[i].main.humidity;
                
        lastDate += 1;

        var newCard = $("<div>");
        newCard.attr("class", "col-md-2");
          var cardStyle = $("<div>");
          cardStyle.addClass("card text-white bg-primary mt-3 mr-3");
            var cardHeader = $("<div>");
            cardHeader.addClass("card-header");
            cardHeader.text(
              today.getMonth() + "/" +
              lastDate + "/" + 
              today.getFullYear()
            );
            cardStyle.append(cardHeader);
            var cardBody = $("<div>");
            cardBody.addClass("card-body");
            cardBody.append("<br>");
              var temp = $("<p>");
              temp.addClass("card-text");
              temp.text("Temp: " + tempVal);
              cardBody.append(temp);
            cardBody.append("<br>");
              var humidity =$("<p>");
              humidity.addClass("card-text")
              humidity.text("Humidity: " + humidityVal)
              cardBody.append(humidity);
          cardStyle.append(cardBody);
        newCard.append(cardStyle)
        $("#five-day-display").append(newCard);
      };
    })
  };

Since we do not have any placeholder HTML elements to throw information to, we must generate it in our JavaScript file. Querying the 5-day 3-hour Open Weather API, this section of code serves to display the forecast for upcoming days in the searched location, in addition to the current weather conditions.

## The App in Action!
Try it out for yourself!
* [See Live Site](https://ietoy.github.io/Weather-Dashboard/)

## Authors
Ian Toy
* [GitHub](https://github.com/ietoy)
* [LinkedIn](https://www.linkedin.com/in/ian-toy-265077196/)

## Acknowledgements
Special thanks to our instructor Jerome, our TAs Mahisha and Kerwin, and my fellow classmates for the assistance and guidance. Thank you all!