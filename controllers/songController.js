var User = require('../models/user.js');
var CocreationSong = require('../models/cocreationSong.js');
var Post = require('../models/post.js');
var apiController = require('./apiController.js');
var async = require('async');
var _ = require('underscore');

function stringifyArray(array){
	return array.join(', ');
}

var songController = {
	likeSong: function(req, res){
		console.log('req.body', req.body);
		CocreationSong.findOne({_id: req.body._id}, function(err, song){
			console.log('song:', song);
			var likes;
			if (song.likes > 0) {
				likes = parseInt(song.likes);
				console.log('likes: ', likes);
				likes = likes + 1;
			} else {
				likes = 1;
			}
			song.likes = likes;
			console.log('song.likes updated:', song.likes);
			song.save();
			res.send({
				likes: likes
			});
		});
	}
};

module.exports = songController;