var Users = require('../models/user.js');
var CocreationSong = require('../models/cocreationSong.js');
var apiController = require('./apiController.js')
var async = require('async');
var _ = require('underscore');


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
			// User.find({}, function(err, response){

			res.render('profile-user', {
				user: req.user
			})
			// });
		},
	profileBand: function(req, res) {
			res.render('profile-band', {
				user: req.user
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
				// var ids = [];
				// var names = [];
				// var songCollection;

				// 	CocreationSong.find({}, function(err, result){
				// 		// console.log('result', result);
				// 		songCollection = result;
					
				// 		result.map(function(song){
				// 			ids.push(song._id);
				// 			names.push(song.name);
				// 		});
				// 	});

				// async.whilst(
				// 	function(){ songCollection !== undefined && names.length === songCollection.length},
				// 	function(callback){
				// 		// console.log('testing');
				// 		setTimeout(callback, 5000);
				// 	},
				// 	function (err) {
				// 		// console.log('ids, names, songs: ', ids, names, songCollection);	
				// 		var songs = {
				// 			ids: ids,
				// 			names: names
				// 		}
				// 		// console.log('songs: ', songs);
				// 		res.render('cocreation', {
				// 			songs: songs
				// 		});
				       
				//     }
				// );
		},
		song: function(req, res){
			console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!', req.query);
			var tracks;
			var id = req.query.songId;
			console.log('id???', id);
			var songName;
			var song;

			CocreationSong.findOne({_id: id}, function(err, result){
				console.log('result in song render: ', result);
				songName = result.name;
				console.log('songName: ', songName);
				song = result;
				var track0 = song.tracks[5];
				var track1 = song.tracks[0];
				var track2 = song.tracks[1];
				var track3 = song.tracks[2];
				var track4 = song.tracks[3];
				var track5 = song.tracks[4];

				console.log('sorted???? ', track1);
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
			})
			});
		},
	liveStream: function(req, res) {
			res.render('live-stream', {
				user: req.user
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