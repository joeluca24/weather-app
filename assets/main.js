var apiKey =  "b13e7f862d63d200aeb5250822646333";

var cities = ["los angeles"];

function display(city){
  console.log(city)
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}`,
        method: "GET"
      }).then(function(response) {
        window.response = response;
        console.log(response);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`,
          method: "GET"
        }).then(function(uvdata) {
          window.uvdata = uvdata;
          console.log(uvdata);
          createCard(response, uvdata);
        });
      })

}
function createCard(response, uvdata){
  var cardTag = $('#weather-card');
  var cardBody = $('<div>').addClass('card-body')
  var cardTitle = $("<h3>").addClass('card-title')
  var cardText = $("<p>").addClass('card-body')
  cardText.html(Math.round((( response.main.temp -273.15) * 9/5 + 32) * 100) / 100 + "&deg; F")
  var cardText4 = $("<p>").addClass('card-body');
  cardText4.html("wind speed: " + response.wind.speed + "m/s")
  response.weather[0].description
  var cardText5 = $("<p>").addClass('card-body');
  cardText5.html("conditions: " + response.weather[0].description );
  var cardText5 = $("<p>").addClass('card-body');
  cardText5.html("conditions: " + response.weather[0].description );
  

  var cardText2 = $("<p>").addClass('card-body');
  cardText2.html("humidity: " + response.main.humidity)
  var cardText3 = $("<p>").addClass('card-body');
  var date = new Date (response.dt * 1000);
  cardText3.html("date: " + (date.getMonth() + 1) + "/" + date.getDate() + "/" + (date.getYear() + 1900));

  cardTitle.text(response.name)
  cardTag.empty();
  cardTag.append(cardBody.append(cardTitle, cardText, cardText2,cardText3,cardText4,cardText5))
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
display("brick")