


var marker;
var point;

var mymap = L.map('mapid').setView([51.505, -0.09], 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	maxZoom: 18,	
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiYW1hbmphaW41MjIxIiwiYSI6ImNqYjdvYXJzMTEyMHIyeHFpNHByZHMweTQifQ.y4l3AMdMvrrwImi5AMY5pA'
}).addTo(mymap);

console.log("scope ans is  ....  ",$scope.ans);
// need from backend
// var ans 

// var start_port = ans.start_port;
// var markers = [];
// var end_port = ans.end_port;
// var shipmentStarted = ans.shipmentStarted;
// if(shipmentStarted){
// 	markers = ans.markers;
// 	for(var i=0;i<markers.length; i++){	
// 		point = markers[i].coordinates;
// 		marker = L.marker(point).addTo(mymap);
// 		markers[i] = markers[i].coordinates;
// 	}
// }



// markers.push(start_port.coordinates);
// marker = L.marker(start_port.coordinates).addTo(mymap);
// marker.bindPopup("Your shipment starts here", {closeOnClick: false, autoClose: false}).openPopup(); 


// markers.push(end_port.coordinates);
// marker = L.marker(end_port.coordinates).addTo(mymap);
// marker.bindPopup("Your shipment ends here",{closeOnClick: false, autoClose: false}).openPopup(); 


// if(shipmentStarted){
// 	markers.push(current);
// 	marker = L.marker(current).addTo(mymap);
// 	marker.bindPopup("Your shipment is here", {closeOnClick: false, autoClose: false}).openPopup();	
// }


// var bounds = L.latLngBounds(markers);
// mymap.fitBounds(bounds);

// // var circle = L.circle([51.508, -0.11], {
// //     color: 'red',
// //     fillColor: '#f03',
// //     fillOpacity: 0.5,
// //     radius: 500
// // }).addTo(mymap);
