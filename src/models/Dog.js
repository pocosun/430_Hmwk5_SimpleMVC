var mongoose = require('mongoose');

var dogModel;

var dogSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},

	breed: {
		type: String,
		required: true,
		trim: true
	},

	age:{
		type: Number,
		required: true,
		trim: true,
	},

	createdData: {
        type: Date,
        default: Date.now
    }
});

dogSchema.statics.findByName = function(name, callback){

	var search = {
		name: name
	};

	return dogModel.findOne(search, callback);
};

dogModel = mongoose.model('Dog', dogSchema);

module.exports.dogModel = dogModel;
module.exports.dogSchema = dogSchema;