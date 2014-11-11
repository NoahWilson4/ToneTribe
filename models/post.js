var mongoose = require('mongoose');

var Post = mongoose.Schema({
	userName: String,
	userProfilePic: String,
	user: mongoose.Schema.ObjectId,
	postedTo: mongoose.Schema.ObjectId,
	text: String,
	date: String,
	likes: Number,
	comments: [{
		user: mongoose.Schema.ObjectId,
		likes: Number,
		comment: String,
		date: String
	}],
	cocreationSong: [mongoose.Schema.ObjectId]
});

module.exports = mongoose.model('post', Post);