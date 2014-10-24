var Users = require('../models/user.js');

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
	liveStream: function(req, res) {
			res.render('live-stream');
		},
	submitSearch: function(req, res) {
			res.render('search-results');
	}
};

module.exports = indexController;