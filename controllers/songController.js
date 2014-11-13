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
	},
	likeTrack: function(req, res){
		console.log('req.body', req.body);
		CocreationSong.findOne({_id: req.body.songId}, function(err, song){
			console.log('song:', song);
			for (var i = 0; i < song.tracks.length; i++){
				console.log(song.tracks[i].track, 'song.tracks[i].track');
				console.log(req.body.trackNum, 'req.body.trackNum');
				if(parseInt(song.tracks[i].track) === parseInt(req.body.trackNum)){
					console.log('found matching track object');
					var tracks = song.tracks[i];
					console.log('tracks, likeTrack', tracks);
					for (var i = 0; i < tracks.userTracks.length; i++){
						console.log('tracks.userTracks[i]._id', tracks.userTracks[i]._id);
						if(tracks.userTracks[i]._id.toString() === req.body.trackId.toString()){
							var likes;
							console.log('found match, tracks.userTracks[i].likes: ', tracks.userTracks[i].likes);
							if (tracks.userTracks[i].likes > 0) {
								console.log('greater than zero');
								likes = tracks.userTracks[i].likes;
								console.log('likes: ', likes);
								likes = likes + 1;
							} else {
								console.log('less than zero');
								likes = 1;
							}
							tracks.userTracks[i].likes = likes;
							console.log('tracks[i].likes updated:', tracks.userTracks[i].likes);
							song.save();
							res.send({
								likes: likes
							});	
						}	
					}
				}
			}

		});
	}
};

module.exports = songController;