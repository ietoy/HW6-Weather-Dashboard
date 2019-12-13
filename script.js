// These are our variables that look to elements on the dom
var btnList = document.querySelector("#btn-list");

// This is our array holding city names that the user has searched for
var cityList = [];

// this function adds buttons with the history of searched city names below the search bar
$("#add-city").on("click", function() {
  event.preventDefault();
  var newCity;
  newCity = $("input").eq(0).val();
    if (newCity.length > 2) {
      cityList.push(newCity);
    };
  renderBtns();
});

function renderBtns() {
  $(btnList).empty();
  for (var i = 0; i < cityList.length; i++) {
    var newBtn = $("<button>");
    var btnText = cityList[i];
    newBtn.attr("type", "button");
    newBtn.attr("class", "btn");
    newBtn.attr("class", "btn-secondary")
    newBtn.text(btnText);
    $(btnList).append(newBtn);
  };
};





// "api.openweathermap.org/data/2.5/weather?q=" + searchCity
























// function renderBtns() {
//     btnList.empty();
//     for (var i = 0; i < cityList.length; i++) {
//         var newBtn = $("<button>");
//         newBtn.text(cityList[i]);
//         btnList.append(newBtn);
//     };
// };

// this is the function from the 16 all together activity that populates the animal buttons
// function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
//     $(areaToAddTo).empty();
//     for (var i = 0; i < arrayToUse.length; i++) {
//         var newButton = $("<button>");
//         newButton.addClass(classToAdd);
//         newButton.attr("data-type", arrayToUse[i]);
//         newButton.text(arrayToUse[i]);
//         $(areaToAddTo).append(newButton);
//       }
//     }








// addBtn function, currently non-functional >.<
// function addBtn() {
//   for (var i = 0; i < cityList.length; i++) {
//     var newBtn = $("<button>");
//     newBtn.text(cityList[i]);
//     $("#button-list").append(newBtn);
//   };  
// };







// $("#add-city").on("click", function() {
//     console.log("add function works!")
// });