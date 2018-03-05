// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var airwaybillSchema = new Schema({
	tracking_id: String,
	receiver_name: String,
	journey_id: { type: Schema.Types.ObjectId, ref: 'Journey' },
	start_port: {place: String, coordinates: [Number]},
	end_port: {place: String, coordinates: [Number]}
});



module.exports = mongoose.model('Tracker', airwaybillSchema);
