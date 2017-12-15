// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var journeySchema = new Schema({
	journey_id: String,
	ship_id: String,
	tracker_id: String,
	start_port: {place: String, coordinates: [Number]},
	end_port: {place: String, coordinates: [Number]},
	checkpoints: [{place: String, coordinates: [Number], isReached: Boolean}],	
	current_pos: [Number],
	isCompleted: Boolean
});


// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Journey', journeySchema);
