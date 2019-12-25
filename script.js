$(document).ready(function() {

// These are our variables that look to elements on the dom
var btnList = document.querySelector("#btn-list");
var mainDislpayEl = document.querySelector("#main-display");

// This is our array holding city names that the user has searched for
var cityList = [];

// This function adds buttons with the history of searched city names below the search bar
$("#add-city").on("click", function() {
  event.preventDefault();
  var newCity;
  newCity = $("input").eq(0).val();
    if (newCity.length > 2) {
      cityList.push(newCity);
    };
  renderBtns();

// ADD THE SEARCHCITY FUNCTION
//   searchCity();
});

function renderBtns() {
  $(btnList).empty();
  for (var i = 0; i < cityList.length; i++) {
    var newBtn = $("<button>");
    var btnText = cityList[i];
    newBtn.attr("type", "button");
    newBtn.attr("class", "btn");
    newBtn.attr("class", "btn-secondary")
    newBtn.attr("class", "search-city")
    newBtn.attr("data-city", cityList[i]);
    newBtn.text(btnText);
    $(btnList).append(newBtn);
  };
};


  // This is the API query to OpenWeather
  $(document).on("click", ".search-city", searchCity)

  var currentCity;

  function searchCity() {

    $("#main-display").empty();

    $("#five-day").empty();

    currentCity = $(this).attr("data-city");
    var APIKey = "acc7c144d8d4d67c3bafe14ef897170e";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

      var results = response;

      var showCity = $("<div>");
      showCity.attr("class", "card");
      showCity.attr("class", "text-block");
      showCity.attr("class", "bg-light");
      showCity.attr("class", "mt-3");
      showCity.attr("class", "mr-3");
      $("#main-display").append(showCity);

      var cityHeader = $("<div>");
      cityHeader.attr("class", "card-header");
      showCity.append(cityHeader);

      var cityDisplayName = $("<h2>");
      cityDisplayName.text(currentCity);
      cityHeader.append(cityDisplayName);

      var cityCardBody = $("<div>");
      cityCardBody.attr("class", "card-body");
      $("#main-display").append(cityCardBody);

      var showTemp = $("<p>");
      var cityTemp = results.main.temp;
      showTemp.text("Temperature: " + cityTemp);
      cityCardBody.append(showTemp);

      var showHumidity = $("<p>");
      var cityHumidity = results.main.humidity;
      showHumidity.text("Humidity: " + cityHumidity);
      cityCardBody.append(showHumidity);
      
      var showWindSpeed = $("<p>");
      var cityWindSpeed = results.wind.speed;
      showWindSpeed.text("Wind Speed: " + cityWindSpeed);
      cityCardBody.append(showWindSpeed);
       
      // COME BACK TO UV INDEX
      // var showUVIndex = $("<p>");
      // var cityUVIndex =;
      
      renderFiveDay();

  
    });
  };

      // FIVE DAY FORECAST 
      
      function renderFiveDay() {
        var APIKey = "acc7c144d8d4d67c3bafe14ef897170e";
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=" + APIKey;
  
        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {

          var results = response;

          for (var i = 0; i < results.length; i++) {

            var fiveDayCard = $("<div>");
            fiveDayCard.attr("class", "card");
            fiveDayCard.attr("class", "text-white");
            fiveDayCard.attr("class", "bg-primary");
            fiveDayCard.attr("class", "float-left");
            fiveDayCard.attr("class", "mt-3");
            fiveDayCard.attr("class", "mr-3");
            $("#five-day").append(fiveDayCard);
      
            var fiveDayCardHeader = $("<div>");
            fiveDayCardHeader.attr("class", "card-header");
            fiveDayCard.append(fiveDayCardHeader);
  
            var fiveDayCardBody = $("<div>");
            fiveDayCardBody.attr("class", "card-body");
            fiveDayCard.append(fiveDayCardBody);
      
            var showFiveDayTemp = $("<p>");
            // var fiveDayTemp = results[i].;
            showFiveDayTemp.text(fiveDayTemp);

            var showFiveDayHumidity = $("<p>");
            var fiveDayHumidity = results[i].list.humidity;
            showFiveDayHumidity.text(fiveDayHumidity);

          };
        });

      };



// close doc ready
});
