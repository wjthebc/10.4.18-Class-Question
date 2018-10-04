var x = 1;
//fetches from web server for chrome and stores in var
fetch('./db.json')
//converts from JSON string to JSON object
.then(response => response.json()).then(products => {

//sets empty var for HTML to be stored in
var cities = [];

//maps through products, sets var html to "arrivingFrom: VALUE<br/><br/>arrivalTime: VALUE"
var arrCities = products.map(function(city){

var html =  "<div class= panel-default> <div class =panel-body>From " + city["name"] + " to DC" + city["arrival_time"] +  city["status"] + "</div></div>" ;
//pushes var html into var citties, which is global scope
    cities.push(html);
});

//sets var p to result ID in HTML
var p = document.querySelector("#result")
//passes var citites into var p
p.innerHTML = cities;

})


//registers service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {scope: '/'})
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}
