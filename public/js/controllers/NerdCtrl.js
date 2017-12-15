angular.module('NerdCtrl', [])
	.controller('NerdController', function($scope, $http) {
		console.log("controller called");
		var mymap = L.map('mapid').setView([51.505, -0.09], 13);
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 18,	
				id: 'mapbox.streets',
				accessToken: 'pk.eyJ1IjoiYW1hbmphaW41MjIxIiwiYSI6ImNqYjdvYXJzMTEyMHIyeHFpNHByZHMweTQifQ.y4l3AMdMvrrwImi5AMY5pA'
			}).addTo(mymap);

		mapfun();
		$scope.params;
		$scope.ans;
		$scope.receiver_name = "";
		$scope.markers = [];
		$scope.trackId = function(val){
			$scope.params = val;
			$http({
			  method: 'GET',
			  url: 'http://localhost:8080/getshipment/' + $scope.params,

			}).then(function successCallback(response) {
				console.log(response);
				$scope.ans = response.data;
				$scope.receiver_name = response.data.receiver_name;
				$scope.markers = response.data.markers;
				mapfun();
			    // this callback will be called asynchronously
			    // when the response is available
			  }, function errorCallback(response) {
			  	console.log("errorcall ", response);
			  	toastr.error(response.data);
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			  });
		}



		function mapfun(){
			var marker;
			var point;

			
			console.log("scope ans is  ....  ",$scope.ans);
			// need from backend
			var ans = $scope.ans;

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


		}
		

});

