var express    = require('express'); 
var Journey     = require('./models/journey');
var AirwayBill = require('./models/airwaybill');
var router = express.Router(); 

module.exports = function(app) {

	// add a journey
	app.post('/addJourney', function(req, res){
		console.log(req.body);
		var journey = new Journey(req.body);
		console.log(journey);
        
        journey.save(function(err) {
            if (err)
                res.send(err);

            res.send('Journey created!');
        });
	});


	// add a shipment 
	app.post('/addShipment', function(req, res){
		var airwaybill = new AirwayBill(req.body);
		console.log(airwaybill);
		var journey_id = req.body.journey_id;

		Journey.findById(journey_id, function(err, journey) {

            if (err){
                res.send(err);
            }
            console.log(journey);

            if(journey == null){
            	res.status(500).send("Journey not found! Please check the journey that you are chosing");
            }
           	else if(journey.isCompleted == 1){
           		res.status(500).send("This journey has already been completed");
           	}
           	else{
           		var checkpoints = journey.checkpoints;
           		var start_coordinates = req.body.start_port.coordinates;
           		var end_coordinates = req.body.end_port.coordinates;
           		var flag1 = false;
           		var flag2 = false;
           		for(var i=0; i<checkpoints.length; i++){
           			console.log(checkpoints[i]);
           			if((checkpoints[i].coordinates[0] == start_coordinates[0]) && (checkpoints[i].coordinates[1] == start_coordinates[1]))
           				flag1 = true;
           			if(flag1 && (checkpoints[i].coordinates[0] == end_coordinates[0]) && (checkpoints[i].coordinates[1] == end_coordinates[1]))
           				flag2 = true;
           		}
           		if(flag1 && flag2){
           			airwaybill.save(function(err) {
			            if (err)
			                res.send(err);

			            res.send('shipment added to the ship on journey id ' + req.body.journey_id + ' and will be delivered to ' + req.body.receiver_name);
			        });
           		}
           		else{
           			res.send("We are not planning to stop for this shipment. Please choose any other journey for this");
           		}
           	}
            
        });

	});




	//gps update 
	app.put('/gpsupdate/:tracker_id', function(req, res){
		Journey.find({"tracker_id": req.params.tracker_id}, function(err, journey) {

            if (err)
                res.send(err);


            if(journey.length <= 0){
            	res.status(500).send("Dude you are sending a wrong tracker_id")
            }
            else{
            	var currentJourney = -1;
	            var flag = false;
	            for(var i=0;i<journey.length;i++){
	            	if(journey[i].isCompleted == 0){
	            		currentJourney = i;
	            		if(flag == true)
	            			res.status(500).send("There are two incomplete journey with same tracker_id");
	            		else
	            			flag = true;
	            	}
	            }
	            if(currentJourney == -1)
	            	res.status(500).send("All journeys are completed. Bye");
	            else{
	            	var journey = journey[currentJourney];

		            var current = req.body.current_pos;
		            journey.current_pos[0] = current[0];
		            journey.current_pos[1] = current[1]; 

		            

				  //   var maxDistanceAllowed = 5/6371; // divided by radiusof earth
				  //   Journey.find({
				  //   	current_pos: {
				  //   		$near: current,
				  //   		$maxDistance: maxDistanceAllowed
				  //   	}
				  //   }).exec(function(err, locations){
				  //   	if (err) {
						// 	return res.json(500, err);
						// }

						// res.json(200, locations);
				  //   });


		            //update checkpoints with near query 
		            var checkpoints = journey.checkpoints;
		            for(var i=0;i<checkpoints.length;i++){
		            	if(checkpoints[i].coordinates[0] == current[0] && checkpoints[i].coordinates[1] == current[1]){
		            		checkpoints[i].isReached = 1;
		            	}

		            	if(journey.end_port.coordinates[0] == current[0] && journey.end_port.coordinates[1] == current[1]){
		            		journey.isCompleted = 1;
		               	}

		            }




		            console.log("updated journey is", journey);
		            var journeyId = journey._id;
		            delete journey._id;

		            Journey.update({"_id": journey._id}, {$set:journey}, function(err, result) {
		                if (err)
		                    res.send(err);

		                res.send('Journey updated!');
		                console.log(result);
		            });
	            }
	            
            }
            

        });
	});






	app.get('/getshipment/:id',function(req, res){

    	AirwayBill.find({"tracking_id":req.params.id}, function(err, airwaybill){
    		if(err)
    			res.send(err);

    		if(airwaybill.length <= 0){
    			res.status(500).send("Please check the tracking_id/Airway Bill number you entered");
    		}
    		else if(airwaybill.length > 1)
    			res.status(500).send("There is some discrepency as many bills with same tracking id is there ");
    		else{
    			console.log(airwaybill);
				AirwayBill
					.find({"tracking_id":req.params.id})
					.populate("journey_id")
					.exec(function(err, airwaybills){
						if(err)
							return handleError(err);
						
						//airwaybills is the airway bill to be tracked
						console.log(airwaybills);
						
						airwaybill = airwaybills[0];
						var journey = airwaybill.journey_id;


						var journeyCheckpoints = journey.checkpoints;
						var markers=[]; // markers to be on map

						var start_port = airwaybill.start_port; // place and coordinates
						var end_port = airwaybill.end_port; // place and coordinates

						// if journey is started ... show current also
						
						// if shipment is not started
						// start port ,end port , and nothing else


						// if shipment is started and not ended
						// start,end, checkpoints, current

						// if shipment started and ended
						// startport,end ,checkpoints
						var shipmentStarted = 0;
						for (var i = 0; i < journeyCheckpoints.length; i++) {
							if(journeyCheckpoints[i].isReached && journeyCheckpoints[i].coordinates[0] == start_port.coordinates[0] && journeyCheckpoints[i].coordinates[1]==start_port.coordinates[1]){
								shipmentStarted = 1;
							}
							if(shipmentStarted){
								if(journeyCheckpoints[i].isReached){
									// insert checkpoint to markers
									markers.push(journeyCheckpoints[i]);
								}
								
							}
						}

						var current = [];
						if(shipmentStarted){
							current = journey.current_pos;
						}
						console.log("------------");
						var ans = {};
						ans.start_port = start_port;
						ans.end_port = end_port;
						ans.receiver_name = airwaybill.receiver_name;
						if(shipmentStarted){
							ans.shipmentStarted = true;
							ans.markers = markers;
							ans.current = current;
						}
						else{
							ans.shipmentStarted= false;
							ans.markers = [];
							ans.current = [];
						}

						console.log("start_port", start_port);
						console.log("end_port", end_port);
						if(shipmentStarted){
							console.log("markers are ",markers);
							console.log("current is ",current);
						}


						res.send(ans);
					});   
				 // res.send() 			
    		}
    	});
    });



	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	// app.get('*', function(req, res) {
	// 	res.sendfile('./public/index.html');
	// });

};