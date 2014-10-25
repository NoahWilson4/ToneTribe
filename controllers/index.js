var Users = require('../models/user.js');
var CocreationSong = require('../models/cocreationSong.js');

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
			res.render('cocreation');
		},
	song: function(req, res){
		console.log('req.params: ', req.params);
		var id = req.params.id;
		CocreationSong.findOne({_id: id}, function(err, result){
			console.log('result.name: ', result.name);
			var name = result.name;
			res.render('song', {
				name: name
			});
			});
		},
	liveStream: function(req, res) {
			res.render('live-stream');
		},
	submitSearch: function(req, res) {
			res.render('search-results');
	}
};

module.exports = indexController;