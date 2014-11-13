var User = require('../models/user.js');
var CocreationSong = require('../models/cocreationSong.js');
var apiController = require('./apiController.js');
var async = require('async');
var _ = require('underscore');

function stringifyArray(array){
	return array.join(', ');
}

var indexController = {
	index: function(req, res) {
			res.render('cover', {
				user: req.user
			});
		},
	signup: function(req, res) {
			res.render('signup', {
				user: req.user
			});
		},
	signup2: function(req, res) {
			res.render('signup2', {
				user: req.user
			});
		},
	signup3: function(req, res) {
			res.render('signup3', {
				user: req.user
			});
		},
	signup4: function(req, res) {
			res.render('signup4', {
				user: req.user,
				profileUrl: '',
				id: '',
				backgroundUrl: ''
			});
		},
	profileUser: function(req, res) {
			User.findOne({_id: req.user._id})
				.populate('posts', null, 'post')
				.exec(function(err, user){
					// user.bands = stringifyArray(user.bands);
					// user.instruments = stringifyArray(user.instruments);
					// user.styles = stringifyArray(user.styles);
					// user.inspirations = stringifyArray(user.inspirations);
					// user.skills = stringifyArray(user.skills);
					res.render('profile-user', {
						user: user,
						currentUser: req.user._id
					});	
				});
		},
	profileBand: function(req, res) {
			var band = req.user;
			band.bands = stringifyArray(user.bands);
			band.instruments = stringifyArray(user.instruments);
			band.styles = stringifyArray(user.styles);
			band.inspirations = stringifyArray(user.inspirations);
			console.log('band: ', band);
			res.render('profile-band', {
				user: band
			});
		},
		viewProfile: function(req, res) {
			var id = req.query.id;
			console.log('id testing: ', id);
			User.findOne({_id: id}, function(err, result){
				console.log('result finding user viewProfile: ', result);
				var user = result;
				res.render('profile', {
					user: user,
					currentUser: req.user
				});
			});
		},
		addToTribe: function(req, res){
			User.findOne({_id: req.user.id}, function(err, result){
				result.tribe.push(req.body.userIdToAdd);
			});
		},
	search: function(req, res) {
			res.render('search', {
				user: req.user
			});
		},
	searchResults: function(req, res) {
			res.render('search-results', {
				user: req.user
			});
		},
	cocreation: function(req, res) {
			res.render('cocreation', {
				user: req.user
			});
	},
	cocreationUser: function(req, res){
		console.log('hello???');
		var songs = [];
		User
		.findOne({_id: req.user._id})
		.populate('cocreationSongs', null, 'cocreationsong')
		.populate('cocreationCollaborations', null, 'cocreationsong')
		.exec(function(err, result){
			console.log('result: ', result.cocreationSongs);
			for (var i = 0; i < result.cocreationSongs.length; i++){
				CocreationSong.findOne({_id: result.cocreationSongs[i]._id})
							.populate('users', null, 'user')
							.exec(function(err, data){
								console.log('mapping, ', data);
								songs.push(data);
								if (songs.length === result.cocreationSongs.length){

									console.log('complete with getting songs');
									res.render('cocreation-user', {
											user: result,
											songs: songs
									});
								}
							});
			}

		});

	
	},
	// cocreationOtherUser: function(req, res){
	// 	console.log('hello???', req.query.id);
	// 	var songs = [];
	// 	User
	// 	.findOne({_id: req.query.id})
	// 	.populate('cocreationSongs', null, 'cocreationsong')
	// 	.populate('cocreationCollaborations', null, 'cocreationsong')
	// 	.exec(function(err, result){
	// 		console.log('result: ', result.cocreationSongs);
	// 		for (var i = 0; i < result.cocreationSongs.length; i++){
	// 			CocreationSong.findOne({_id: result.cocreationSongs[i]._id})
	// 						.populate('users', null, 'user')
	// 						.exec(function(err, data){
	// 							console.log('mapping, ', data);
	// 							songs.push(data);
	// 							if (songs.length === result.cocreationSongs.length){
									
	// 								console.log('complete with getting songs');
	// 								res.render('cocreation-user', {
	// 										user: result,
	// 										songs: songs
	// 								});
	// 							}
	// 						});
	// 		}

	// 	});

	
	// },
	cocreationOtherUser: function(req, res){
		console.log('cocreationOtherUser req.query', req.query);
		User
		.findOne({_id: req.query.id})
		.populate('cocreationSongs', null, 'cocreationsong')
		.populate('cocreationCollaborations', null, 'cocreationsong')
		.exec(function(err, result){
			res.render('cocreation-other-user', {
				user: result,
				currentUser: req.user
			});
		});
	},
		song: function(req, res){
			// console.log('song req.query!!!', req.query);
			var tracks;
			var id = req.query.id;
			// console.log('id???', id);
			var songName;
			var song;

			CocreationSong.findOne({_id: id}, function(err, result){
				// console.log('result in song render: ', result);
				songName = result.name;
				// console.log('songName: ', songName);
				song = result;
				var track0;
				var track1;
				var track2;
				var track3;
				var track4;
				var track5;
				for (var i = 0; i < song.tracks.length; i++) {
					if (song.tracks[i].track === 0){
						track0 = song.tracks[i];
					} else if (song.tracks[i].track === 1) {
						track1 = song.tracks[i];
					} else if (song.tracks[i].track === 2) {
						track2 = song.tracks[i];
					} else if (song.tracks[i].track === 3) {
						track3 = song.tracks[i];
					} else if (song.tracks[i].track === 4) {
						track4 = song.tracks[i];
					} else if (song.tracks[i].track === 5) {
						track5 = song.tracks[i];
					} else {
						console.log('error with sorting out tracks...');
					}
				}

				// console.log('sorted???? ', track0, track1, track2, track3, track4, track5);
			req.user.password = '';
			res.render('song', {
				user: req.user,
				id: id,
				song: song,
				track0: track0,
				track1: track1,
				track2: track2,
				track3: track3,
				track4: track4,
				track5: track5
			});
			});
		},
	liveStream: function(req, res) {
			res.render('live-stream', {
				user: req.user,
				currentUser: req.user
			});
		},
	submitSearch: function(req, res) {
		console.log('req.body', req.body);

		res.render('search-results', {
				user: req.user
			});
	}
};

module.exports = indexController;