$(document).ready(function() {

// These are our variables that look to elements on the dom
var btnList = document.querySelector("#btn-list");

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
  $(document).on("click", ".search-city", function() {
    var currentCity = $(this).attr("data-city");
    var APIKey = "acc7c144d8d4d67c3bafe14ef897170e";
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;

    // GETTING UNCAUGHT TYPE ERROR: $.AJAX IS NOT A FUNCTION HERE, PLZ HALP!
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {

      // var results = response;
      console.log(response);
    });
  });
});

// Open Weather NAME & COUNTRY path
// results.name
// results.sys.country

// Open Weather TEMP path
// results.main.temp

// Open Weather HUMIDITY path
// results.main.humidity

// Open Weather WIND SPEED
// results.wind.speed

// Open Weather UV INDEX
// ?????????????????????


// FIVE DAY FORECAST API
// "api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=" + APIKey

// api.openweathermap.org/data/2.5/forecast?q=london&units=imperial&appid=acc7c144d8d4d67c3bafe14ef897170e