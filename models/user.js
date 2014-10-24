var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	password: String,
	email: String,
	name: String,
	location: String,
	bands: [String],
	profilePic: String,
	backgroundPic: String,
	instruments: [String],
	styles: [String],
	skills: [String],
	inspirations: [String],
	improvComp: Number,
	birthdate: String,
	age: Number,
	astro: String,
	about: String,
	philosophy: String,
	media: [String]
});

module.exports = mongoose.model('user', userSchema);