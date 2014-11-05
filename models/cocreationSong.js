var mongoose = require('mongoose');

var CocreationSong = mongoose.Schema({
	name: String,
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
		user: {},
		comment: String,
		date: String,
		likes: Number
	}]

});

module.exports = mongoose.model('cocreationsong', CocreationSong);