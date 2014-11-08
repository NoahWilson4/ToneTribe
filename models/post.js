var mongoose = require('mongoose');

var Post = mongoose.Schema({
	user: mongoose.Schema.ObjectId,
	text: String,
	date: String,
	likes: Number,
	comments: [{
		user: mongoose.Schema.ObjectId,
		likes: Number,
		comment: String,
		date: String
	}]
});

module.exports = mongoose.model('post', CocreationSong);