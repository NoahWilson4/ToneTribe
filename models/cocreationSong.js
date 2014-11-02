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
		userId: String,
		comment: String
	}]

});

module.exports = mongoose.model('cocreationsong', CocreationSong);