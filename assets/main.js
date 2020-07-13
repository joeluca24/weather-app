var apiKey =  "b13e7f862d63d200aeb5250822646333"

var queryUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=`
// This function will let the user search city weather
function search(city){
    console.log(city)
    var url = (queryUrl+city)
    console.log(url)
   $.ajax({
       url:url,
       method: "GET"


   }).then(function(response){
       console.log(response)
   })
} 

search("brick")
