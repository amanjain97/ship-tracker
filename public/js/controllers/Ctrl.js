angular.module('Ctrl', [])
	.controller('MapController', function($scope, $http) {
		var mymap = L.map('mapid').setView([51.505, -0.09], 13);
				L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 18,	
				id: 'mapbox.streets',
				accessToken: 'pk.eyJ1IjoiYW1hbmphaW41MjIxIiwiYSI6ImNqYjdvYXJzMTEyMHIyeHFpNHByZHMweTQifQ.y4l3AMdMvrrwImi5AMY5pA'
			}).addTo(mymap);
		var m = null;
		var point;
 				

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
			  }, function errorCallback(response) {
			  	console.log("errorcall ", response);
			  	toastr.error(response.data);
			  });
		}



		function mapfun(){
			
			var ans = $scope.ans;
			if(ans == null)
				console.log("Ans is NULL in Map function")
			else{
				mymap.remove();
				mymap = L.map('mapid').setView([51.505, -0.09], 13);
					L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
					attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
					maxZoom: 18,	
					id: 'mapbox.streets',
					accessToken: 'pk.eyJ1IjoiYW1hbmphaW41MjIxIiwiYSI6ImNqYjdvYXJzMTEyMHIyeHFpNHByZHMweTQifQ.y4l3AMdMvrrwImi5AMY5pA'
				}).addTo(mymap);
				var markers = [];
				var markersforbound = [];

				var start_port = ans.start_port;
				var end_port = ans.end_port;
				var shipmentStarted = ans.shipmentStarted;
				if(shipmentStarted){
					markers = ans.markers;
					for(var i=0;i<markers.length; i++){	
						point = markers[i].coordinates;
						m = L.marker(point).addTo(mymap);
						markersforbound.push(markers[i].coordinates);
					}
				}



				markersforbound.push(start_port.coordinates);
				m = L.marker(start_port.coordinates).addTo(mymap);
				m.bindPopup("Your shipment starts here", { autoClose: false}).openPopup(); 


				markersforbound.push(end_port.coordinates);
				m = L.marker(end_port.coordinates).addTo(mymap);
				m.bindPopup("Your shipment ends here",{ autoClose: false}).openPopup(); 


				if(shipmentStarted){
					var current = ans.current;
					markersforbound.push(current);
					m = L.marker(current).addTo(mymap);
					m.bindPopup("Your shipment is here", {autoClose: false}).openPopup();	
				}


				var bounds = L.latLngBounds(markersforbound);
				mymap.fitBounds(bounds);
			
			}


		}
		

});

