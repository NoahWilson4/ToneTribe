var CocreationSong = require('../models/cocreationSong.js');
var User = require('../models/user.js');

var apiController = {
	createNewSong: function(req, res){
		var songName = req.body;
		var newSong = new CocreationSong(songName);
		newSong.save(function(err, result){
			res.send(result);
		});
	}
};

module.exports = apiController;