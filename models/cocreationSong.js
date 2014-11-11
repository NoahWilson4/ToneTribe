var mongoose = require('mongoose');

var CocreationSong = mongoose.Schema({
	name: String,
	users: [mongoose.Schema.ObjectId],
	tracks: [
		{
			track: Number,
			userTracks: [
				{
					url: String,
					Key: String,
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
		userName: String,
		userProfilePic: String
	}],
	backgroundImage: String,
	backgroundThumbnail: String,
	description: String,
	likes: Number
});

module.exports = mongoose.model('cocreationsong', CocreationSong);