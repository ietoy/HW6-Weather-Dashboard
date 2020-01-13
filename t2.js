// This tells the JS to run only once the html has loaded
$(document).ready(function() {

  // This array will hold our list of searched cities
  var cityList = [];

  var currentCity;

  // displays the current date by the current city name using the Date() object
  var today = new Date();
  var mainDate = (
    (today.getMonth() + 1) + "/" + 
    (today.getDate()) + "/" + 
    (today.getFullYear())
  );

  var lastDate = today.getDate();

  // This function displays all of the buttons displayed searched locations in the sidebar
  function renderBtns() {
    // first it empties the element with the id "#btn-list"
    $("#btn-list").empty();
    // It then loops through the array of cityList where we are storing our searched cities as a variable
    for (var i = 0; i < cityList.length; i++) {
      // we create a new button and define it as a newBtn variable
      var newBtn = $("<button>");
      // we set the text of that new buton to be the city we are currently looking at in the array
      var btnText = cityList[i];
      // We set new attributes for that city btton
      newBtn.attr("type", "button");
      newBtn.addClass("btn btn-secondary city-btn");
      newBtn.attr("data-city", cityList[i]);
      newBtn.text(btnText);
      // then we finally add that new button to the "#btn-list" element
      $("#btn-list").append(newBtn);
    };
  };


  $("#new-city").on("click", function() {
    event.preventDefault();
    var newCity;
    newCity = $("input").val();
    
        if (cityList.includes(newCity)) {
            // console.log("You've already searched " + newCity + ".")
        } else {
            cityList.push(newCity);
            renderBtns();
        };
  });


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

})