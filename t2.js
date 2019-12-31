$(document).ready(function() {

  // This array will hold our list of searched cities
  var cityList = []; 


  function renderBtns() {
    $("#btn-list").empty();
    for (var i = 0; i < cityList.length; i++) {
      var newBtn = $("<button>");
      var btnText = cityList[i];
      newBtn.attr("type", "button");
      newBtn.attr("class", "btn");
      newBtn.attr("class", "btn-secondary");
      newBtn.attr("class", "city-btn");
      newBtn.attr("data-city", cityList[i]);
      newBtn.text(btnText);
      $("#btn-list").append(newBtn);
    };
  };

  $("#new-city").on("click", function() {
    event.preventDefault();
    var newCity;
    newCity = $("input").val();
        if (cityList.includes(newCity)) {
            console.log("You've already searched " + newCity + ".")
        } else {
            cityList.push(newCity);
            renderBtns();
        };
    console.log(cityList);
  });


  // This on click listener runs the showCity function whenever a button with the city-btn class is clicked
  $(document).on("click", ".city-btn", showCity);



  var currentCity;

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
      console.log(response);

      // store the response as a new variable, results
      var results = response;

      // set the currently displayed city to the top of the main display
      $("#city-name").append(currentCity);

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

      // var APIKey = "acc7c144d8d4d67c3bafe14ef897170e";
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

    });






  };

  // showCity();


})