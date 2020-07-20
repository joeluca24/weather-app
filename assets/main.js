var apiKey =  "b13e7f862d63d200aeb5250822646333";

var cities = ["los angeles"];

function display(city){
    $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}`,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        var cardTag = $('#weather-card');
        var cardBody = $('<div>').addClass('card-body')
        var cardTitle = $("<h3>").addClass('card-title')
        var cardText = $("<p>").addClass('card-body')
        cardText.html(Math.round((( response.main.temp -273.15) * 9/5 + 32) * 100) / 100 + "&deg; F")
        cardTitle.text(response.name)
        cardTag.empty();
        cardTag.append(cardBody.append(cardTitle, cardText))
      })

}

 // Function for displaying movie data
 function renderButtons() {
    //load persistent data if it isn't null
    if(localStorage.getItem("cities")){
        movies = JSON.parse(localStorage.getItem("cities"));
    }
    
    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Loops through the array of movies
    for (var i = 0; i < cities.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("city");
      // Added a data-attribute
      a.attr("data-name", cities[i]);
      // Provided the initial button text
      a.text(cities[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }
// display(cities[0]);
// var queryUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`
// // This function will let the user search city weather
// function search(city){
//     console.log(city)
//     var url = (queryUrl+city)
//     console.log(url)
//    $.ajax({
//        url:url,
//        method: "GET"


//    }).then(function(response){
//        console.log(response)
//    })
// } 

// search("brick")
function handleFormClick(event){
    event.preventDefault();

    // this is getting our form field city from the user
    console.log(event.target);
    var weatherInput = $('#weather-input').val();
    console.log(weatherInput);

    // display the city
    display(weatherInput);
}
function handleCityClick(event){
    event.preventDefault();

    console.log(event.target);
    var cityData = $(event.target).attr('data-name');
    console.log(cityData);

    display(cityData);
}
$('#add-city').on("click", handleFormClick);
$(document).on('click', '.city', handleCityClick)
renderButtons();