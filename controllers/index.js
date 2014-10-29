var Users = require('../models/user.js');
var CocreationSong = require('../models/cocreationSong.js');
var apiController = require('./apiController.js')
var async = require('async');
var _ = require('underscore');


var indexController = {
	index: function(req, res) {
			res.render('cover');
		},
	signup: function(req, res) {
			res.render('signup');
		},
	signup2: function(req, res) {
			res.render('signup2');
		},
	signup3: function(req, res) {
			res.render('signup3');
		},
	signup4: function(req, res) {
			res.render('signup4');
		},
	profileUser: function(req, res) {
			// User.find({}, function(err, response){

				res.render('profile-user')
			// });
		},
	profileBand: function(req, res) {
			res.render('profile-band');
		},
	search: function(req, res) {
			res.render('search');
		},
	searchResults: function(req, res) {
			res.render('search-results');
		},
	cocreation: function(req, res) {
				var ids = [];
				var names = [];
				var songCollection;

					CocreationSong.find({}, function(err, result){
						// console.log('result', result);
						songCollection = result;
					
						result.map(function(song){
							ids.push(song._id);
							names.push(song.name);
						});
					});

				async.whilst(
					function(){ songCollection !== undefined && names.length === songCollection.length},
					function(callback){
						// console.log('testing');
						setTimeout(callback, 5000);
					},
					function (err) {
						// console.log('ids, names, songs: ', ids, names, songCollection);	
						var songs = {
							ids: ids,
							names: names
						}
						// console.log('songs: ', songs);
						res.render('cocreation', {
							songs: songs
						});
				       
				    }
				);
		},
		song: function(req, res){
			console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!')
			var tracks;
			var id = req.params.id;
			console.log('id???', id);

			CocreationSong.findOne({_id: id}, function(err, result){
				console.log('result: ', result);
				songName = result.name;
				console.log('songName: ', songName);
			});

			res.render('song', {
				id: id
			})

			// apiController.getTrackUrls({id: id}, {}, function(tracks){

			// 	console.log('tracks just before render: ', tracks);
			// 	res.render('song', {
			// 		songName: songName,
			// 		tracks: tracks,
			// 		id: id
			// 	});
			// });
		
		},
	liveStream: function(req, res) {
			res.render('live-stream');
		},
	submitSearch: function(req, res) {
		console.log('req.body', req.body);

		res.render('search-results');
	}
};

module.exports = indexController;