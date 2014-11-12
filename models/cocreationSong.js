var mongoose = require('mongoose');

var CocreationSong = mongoose.Schema({
	name: String,
	createdBy: [mongoose.Schema.ObjectId],
	users: [mongoose.Schema.ObjectId],
	tracks: [
		{
			track: Number,
			userTracks: [
				{
					url: String,
					Key: String,
					user: mongoose.Schema.ObjectId,
					userId: String,
					userName: String,
					userPic: String,
					trackTitle: String,
					likes: Number
				}
			]
		}
	],
	comments: [{
		songId: String,
		likes: Number,
		comment: String,
		date: String,
		user: mongoose.Schema.ObjectId,
		userName: String,
		userProfilePic: String
	}],
	backgroundImage: String,
	backgroundThumbnail: String,
	description: String,
	likes: Number,
	styles: [String],
	date: String
});

module.exports = mongoose.model('cocreationsong', CocreationSong);