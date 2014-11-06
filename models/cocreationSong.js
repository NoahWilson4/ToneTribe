var mongoose = require('mongoose');

var CocreationSong = mongoose.Schema({
	name: String,
	userId: String,
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
	comments: [],
	backgroundImage: String

});

module.exports = mongoose.model('cocreationsong', CocreationSong);